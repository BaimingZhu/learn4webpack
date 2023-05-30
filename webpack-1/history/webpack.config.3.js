//webpack 是node写出来的node的写法
let path = require('path')
// console.log(path.resolve('dist'))

let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    optimization: {//优化项
        minimizer:[
            new UglifyJsPlugin({
                cache: true,//缓存
                parallel: true,//并发打包
                sourceMap: true//源码映射
            }),
            new OptimizeCss()
        ]
    },
    devServer:{
        port:8080,
        progress:true,//进度
        contentBase:'./build'
    },
    mode : 'development', //模式默认两种 production development
    entry: './src/index.js',//入口
    output : {
        filename:'budle.[hash:4].js',//打包后的文件名
        path: path.resolve(__dirname, 'build'),//路径必须是一个绝对路径
    },
    plugins : [//放着所有的webpoack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            hash:false //引用的js加上哈希值
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
    ],
    module:{//模块
        rules:[//规则 css-loader 接续 @import这种语法的
                //规则 style-loader 把css插入到head支持在head的标签中
                {
                    test: /\.css$/, 
                    use: [
                        MiniCssExtractPlugin.loader,//作为文件引入
                        'css-loader',
                        'postcss-loader'//加上前缀
                    ]
                },
                {
                    test: /\.less$/, 
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',//解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。
                        'postcss-loader',//加上前缀
                        'less-loader'//把less转换成css
                    ]
                }
        ]
    }
}