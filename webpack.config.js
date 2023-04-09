//webpack 是node写出来的node的写法
let path = require('path')
// console.log(path.resolve('dist'))

let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')

let webpack = require('webpack')

module.exports = {
    optimization: {//优化项
        minimizer: [
            new UglifyJsPlugin({
                cache: true,//缓存
                parallel: true,//并发打包
                sourceMap: true//源码映射
            }),
            new OptimizeCss()
        ]
    },
    devServer: {
        port: 8080,
        progress: true,//进度
        contentBase: './build',
        // open: true//自动打开浏览器
    },
    mode: 'development', //模式默认两种 production development
    entry: './src/index.js',//入口
    output: {
        filename: 'budle.[hash:4].js',//打包后的文件名
        path: path.resolve(__dirname, 'build'),//路径必须是一个绝对路径
    },
    // externals: {
    //     jquery: '$'
    // },
    plugins: [//放着所有的webpoack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            hash: true, //引用的js加上哈希值,
            minify: {
                removeAttributeQuotes: true,//去除标点符号
                collapseWhitespace: true,//弄成一行
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:4].css",
        }),
        // new webpack.ProvidePlugin({//在每个模块注入jQuery，但不在window上存在
        //     $: 'jquery'
        // }),
        new CleanWebpackPlugin(),//自动清理打包目录
    ],
    module: {//模块
        rules: [
            {
                test: /\.html$/,
                use: 'html-withimg-loader'//处理html本身就引入的图片
              },
            {
                test: /\.(png|jpg|gif)$/, 
                //做一个限制  当小于多少k 用base64来转化 base64文件可以减少http请求 但是比原文件大3分之1
                // 否则用file-loader来产生真实的图片
                use: {
                  loader: 'url-loader',
                  options: {
                    limit: 50 * 1024,//小于50kb的图片将转化为base64
                    //输出的路径
                    outputPath: 'img/',
                  }
                }
              },
            // {
            //     test : /\.(png|jpg|gif)/,
            //     use : 'file-loader'
            // },
            //校验js的  先关闭  最后用到 修改
            // {
            //     test: /\.js$/,
            //     use: [
            //         {
            //             loader: 'eslint-loader',
            //             options: {
            //                 enforce: 'pre'
            //                 //强制 pre 之前执行  post 之后  未设置为普通的loader
            //             }
            //         }
            //     ],
            //     exclude: /node_modules/
            // },
            // {
            //     // 添加loader规则 就不再需要import $ from 'expose-loader?$!jquery' 这样 直接 import
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$',
            //     // exclude: /node_modules/
            // },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',//es6转es5
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],//装饰器
                            ["@babel/plugin-proposal-class-properties"],//类的转换
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
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