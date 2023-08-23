let path = require('path')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        //第三种方法 配置modules  默认去node_modules下找 找不到去loader文件夹下找
        modules: ["node_modules", path.resolve(__dirname, "loader")]
        //第二种方法  配置 loader别名配置别名
        // alias:{
        //   'loader1':path.resolve(__dirname,'loader','loader1.js')
        // } 
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]



        // loader的分类 pre 在前面  post在后面  normal

        // loader
        // rules: [
        //     {
        //         test: /\.js$/,
        //         use: [//从右到左 从下到上执行
        //             'loader1'
        //         ],
        //         enforce: 'pre'//强制优先
        //     },
        //     {
        //         test: /\.js$/,
        //         use: "loader2"
        //     },
        //     {
        //         test: /\.js$/,
        //         use: "loader3",
        //         enforce: "post"//最后处理
        //     }
        // ]
    }
}