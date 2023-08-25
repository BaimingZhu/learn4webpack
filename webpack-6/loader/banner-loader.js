let loaderUtils = require('loader-utils')
let { validate } = require('schema-utils')

let fs = require('fs')
function loader(source) {
    this.cacheable && this.cacheable() //一般这样用 
    //this.cacheable(false) //禁用缓存

    let options = loaderUtils.getOptions(this);
    // console.log('------', options)
    let cb = this.async()
    let schema = {
        type: 'object',
        properties: {
            text: {
                type: 'string',

            },
            filename: {
                type: 'string'
            }
        }
    }
    //将骨架和参数对比   'banner-loader'出问题（如果报错）
    validate(schema, options, 'banner-loader')
    if (options.filename) {
        this.addDependency(options.filename) //自动地 添加文件依赖   加入这一句话 开启实时监控(watch) webpack也会监控这个文件 这个文件更新也会实时更新
        fs.readFile(options.filename, 'utf-8', function (err, data) {
            cb(err, `/**${data}**/${source}`)
        })
    } else {
        cb(null, `/**${options.text}**/${source}`)
    }
    // return source
}

module.exports = loader