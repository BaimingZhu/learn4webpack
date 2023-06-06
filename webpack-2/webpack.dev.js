let {smart} = require('webpack-merge')
let base    = require('./webpack.config.js')


module.exports = smart(base, {
    mode : 'development',
    devtool:'source-map'
})