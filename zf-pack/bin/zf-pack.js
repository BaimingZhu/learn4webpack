#! C:\Program Files\nodejs\node.exe
let path = require('path')

let config = require(path.resolve('webpack.config.js'))

let Compiler = require('../lib/Compiler')

let compiler = new Compiler(config)
compiler.hooks.entryOption.call()

//入口函数
// compiler.hooks.entryOption.call()

compiler.run()
