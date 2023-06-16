const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

// 模块happypack 可以实现多线程来打包 进程（node中线程与进程关系） 打包文件会加快（文件很小时可能会变慢）
const Happypack = require('happypack')

module.exports = {
    mode: 'development',//production development
    // optimization:{// commonChunkPlugins
    //     splitChunks:{// 分割代码块
    //         cacheGroups:{// 缓存组
    //             common:{//公共的模块
    //                 chunks:'initial',//initial 非异步加载的初始chunk。 async 管理异步加载的chunk。 all 全都要。
    //                 minSize:0,
    //                 minChunks:2
    //             },
    //             vendor:{
    //                 priority:1,
    //                 test:/node_modules/,//用到这个目录下的代码抽离出来
    //                 chunks: 'initial', 
    //                 minSize:0,
    //                 minChunks:2
    //             }
    //         }
    //     }
    // },
    entry: {
        index: './src/index.js',
        // other: './src/other.js'
    },
    devServer: {
        //热更新
        hot: true,
        port: 3000,
        open: false,
        contentBase: './dist'
    },
    module: {
        //不去解析jquery中的依赖库 
        // noParse: /jquery/,
        rules: [
            {
                test: /\.js$/,
                //指定一个id  可能css也需要多线程打包
                // use: 'Happypack/loader?id=js',
                exclude: /node_modules/,
                include: path.resolve('src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        //  happyplugin配置
        // new Happypack({
        //     id: 'js',
        //     use: [{
        //         loader: 'babel-loader',
        //         options: {
        //             presets: [
        //                 '@babel/preset-env',
        //                 '@babel/preset-react',
        //             ]
        //         }
        //     }]
        // }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),

        //webpack自带的             动态引入链接库
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'manifest.json')
        })
    ]
}