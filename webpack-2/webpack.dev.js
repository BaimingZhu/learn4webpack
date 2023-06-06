let {smart} = require('webpack-merge')
let base    = require('./webpack.config.js')


module.exports = smart(base, {
    model : 'development',
    devServer: {},
    devtool:'source-map',
})