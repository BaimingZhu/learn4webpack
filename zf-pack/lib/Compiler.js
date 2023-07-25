const path = require('path')
const fs = require('fs')
const babylon = require('babylon')
const t = require('@babel/types')
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default
let ejs = require('ejs')
let {SyncHook} = require('tapable')

// babylon 主要把源码 转换成ast
// @babel/traverse  遍历节点
// @babel/types 替换结果
// @babel/generator
class Compiler {
    constructor(config) {
        this.config = config;
        //保存入口文件的路径
        this.entryId
        //保存所有的模块依赖
        this.modules = {}

        this.entry = config.entry
        //工作路径
        this.root = process.cwd()
        this.hooks = {
            entryOption: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook()
          }
        //如果传递了plug
        let plugins = this.config.plugins
        //如果是数组
        if(Array.isArray(plugins)){
            plugins.forEach(plugin=>{
                plugin.apply(this)
            })
        }
        this.hooks.afterPlugins.call()
    }

    getSource(modulePath) {
        let content = fs.readFileSync(modulePath, 'utf-8')

        //拿到每个规则来处理
        let rules = this.config.module.rules

        rules.forEach(rule => {
            let { test, use } = rule
            let len = use.length - 1
            if (test.test(modulePath)) {
                //loader获取对应的loader函数
                (function normallLoader(){
                    let loader = require(use[len--]);
                    //递归调用loader实现转化功能
                    content = loader(content)
                    if(len >= 0){
                        normallLoader()
                    }
                })()
            }
        })
        return content
    }
    //解析源码
    parse(source, parentPath) { //AST解析语法树
        // console.log(source, parentPath)
        let ast = babylon.parse(source)
        let dependencies = []
        traverse(ast, {
            CallExpression(p) {// require()
                let node = p.node;
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value; //取到的就是模块的引用名字
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js')
                    moduleName = './' + path.join(parentPath, moduleName); //'src/a.js'
                    dependencies.push(moduleName)
                    node.arguments = [t.stringLiteral(moduleName)]
                }
            }
        })
        let sourceCode = generator(ast).code
        return { sourceCode, dependencies }
    }
    //构建模块
    buildModule(modulePath, isEntry) {
        //拿到文件内容
        let source = this.getSource(modulePath)

        //模块id modulePath = modulePath - this.root src/index.js
        let moduleName = './' + path.relative(this.root, modulePath)

        if (isEntry) {
            this.entryId = moduleName
        }
        //解析需要把source源码进行改造 返回一个依赖列表
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));

        //把相对路径
        this.modules[moduleName] = sourceCode

        dependencies.forEach(dep => { // 附属模块加载 递归加载
            this.buildModule(path.join(this.root, dep), false)
        })
    }

    emitFile() {// 发射文件
        //用数据渲染我们的模板
        // 拿到输出到哪个目录下 输出路径
        let main = path.join(this.config.output.path, this.config.output.filename);
        //模板路径
        let templateStr = this.getSource(path.join(__dirname, 'main.ejs'))

        let code = ejs.render(templateStr, {
            entryId: this.entryId,
            modules: this.modules
        })
        this.assets = {}
        //资源中 路径对应的代码
        this.assets[main] = code;
        fs.writeFileSync(main, this.assets[main])
    }

    run() {
        //执行并创建模块的依赖关系
        this.hooks.run.call()
        this.hooks.compile.call()
        this.buildModule(path.resolve(this.root, this.entry), true)
        this.hooks.afterCompile.call()
        
        console.log(this.modules, this.entryId)
        //发射一个文件 打包后的文件
        this.hooks.afterCompile.call()
        this.emitFile()
        this.hooks.emit.call()
        this.hooks.done.call()
    }

}

module.exports = Compiler