const express  = require('express')
const app = express()
const webpack = require('webpack')


const middle = require('webpack-dev-middleware')

const config = require('./webpack.config')

let compiler = webpack(config)

app.use(middle(compiler))

app.get('/api/user', (req, res) => {
    res.json({
        name : 'zhu'
    })
})

app.get('/user', (req, res) => {
    res.json({
        name : 'panmi'
    })
})

app.listen(3000)