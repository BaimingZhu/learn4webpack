const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const copyWpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

//
module.exports = {
    mode: 'production',//development production
    entry: {
        // home: './src/index.js',
        // other: './src/other.js'

        index: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js&/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-evt']
                    }
                }
            }
        ]
    },
    // //监控 实时打包   类似node里边那个实时监控的
    // watch: true,
    // //监控的选项
    // watchOptions: {
    //     poll: 1000, //每秒问1000次
    //     aggregateTimeout: 500,//防抖 （类似于函数防抖）
    //     ignored: /node_modules/ //忽略哪个文件
    // },

    //增加 devtool 源码映射 可以很方便的调试源代码  
    //  源码映射 单独生成一个 source-map文件 出错会标识出错的列和行 大和全
    // devtool:'source-map',

    //  不会单独生成一个文件 但会显示行和列
    // devtool: 'eval-source-map',

    //  不会产生单独列 但会生成一个映射文件
    // devtool: 'cheap-module-source-map', //保留 后来调试用
    //  不会单独生成文件 集成在打包文件中 也不产生列
    // devtool: 'cheap-module-eval-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template : './src/index.html',
        //     filename : 'home.[hash:4].html',
        //     chunks:['home']
        // }),
        // new HtmlWebpackPlugin({
        //     template : './src/index.html',
        //     filename : 'other.html',
        //     chunks:['other']
        // }),

        new HtmlWebpackPlugin({
            template: './src/index.html',
            //多个 html
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),//自动清理打包目录
        // new copyWpackPlugin(
        //     //接受一个数组 可以多个文件
        //     [{from:'./doc',to:'./'}]
        // ),
        // new webpack.BannerPlugin('make by zhu'),//给每个js首行加注释
    ],
    devServer: {
        //这时 服务器为 /api/user
        // proxy : {
        //     '/api':'http://localhost:3000'
        // },

        // 这时 服务器为 /user
        // proxy : {
        //     '/api' : {
        //         target : 'http://localhost:3000',
        //         pathRewrite:{
        //             '/api' : '/'
        //         }
        //     }
        // },

        //这时不存在跨域的问题
        // before(app) {//提供的方法 相当于钩子 
        //     app.get('/api/user', (req, res) => {
        //         res.json({
        //             name : 'panmi-before'
        //         })
        //     })
        // }

        //有服务端，但是不用代理来处理 在服务器端开启webpack 端口用服务端端口
    }
}