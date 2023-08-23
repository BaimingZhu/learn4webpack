let babel = require('@babel/core')
let loaderUtils = require("loader-utils");

function loader(source) {
    // console.log(this.resourcePath)  运行时返回一个绝对路径
    let options = loaderUtils.getOptions(this);
    // console.log('----', options)
    // options 打印为{ presets: [ '@babel/preset-env' ] }

    let cb = this.async()// loader上下文 默认有async这个方法 异步执行 在哪执行调用cb就可以

    //babel的transform有三个参数  第一个 转换哪些代码  第二个 转换选项  第三个 异步回调函数
    babel.transform(source, {
        ...options,
        sourceMaps: true,
        filename : this.resourcePath.split('/').pop()
    }, function (err, result) {
        cb(err, result.code, result.map)
    })
    // return source
}

module.exports = loader