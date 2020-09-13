//webpack 是node写出来的node的写法
let path = require('path')
// console.log(path.resolve('dist'))

let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devServer:{
        port:8080,
        progress:true,//进度
        contentBase:'./build'
    },
    mode : 'production', //模式默认两种 production development
    entry: './src/index.js',//入口
    output : {
        filename:'budle.[hash:4].js',//打包后的文件名
        path: path.resolve(__dirname, 'build'),//路径必须是一个绝对路径
    },
    plugins : [//放着所有的webpoack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            hash:true
        })
    ]
}