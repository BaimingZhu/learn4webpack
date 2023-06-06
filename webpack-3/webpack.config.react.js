const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',//development
    entry: {
        // test: './src/test.js'
        react : ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js', //产生文件名
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]',
        //配置commonjs 会变成export["ab"] 配置umd会变成umd模式 可配置 commonjs var this 主要用var(默认就是)
        //libraryTarget: 'var'
    },
    plugins : [
        new webpack.DllPlugin({
            name : '_dll_[name]',
            path : path.resolve(__dirname, 'dist', 'manifest.json')
        })
    ]
}