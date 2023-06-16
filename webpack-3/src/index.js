// // import jquery from 'jquery'
// import moment from "moment"

// //手动引入所需要的语言包
// import 'moment/locale/zh-cn'

// //设置语言
// moment.locale('zh-cn')

// console.log(moment().endOf('day').fromNow())


// import React from 'react'
// import { createRoot } from 'react-dom/client'
// const root = createRoot(window.root)
// root.render(<h1>jsx</h1>)



// import calc from './test'
// //import 在生产环境下 会自动去除掉没用的代码
// // tree-shaking 把没用的代码 自动删除掉
// // es6模块会把结果放到default里面
// // let calc = require('./test') //不支持tree-shaking
// console.log('--', calc.sum(1, 2))


// // scope hosting 作用域提升
// let a = 1
// let b = 2
// let c = 3
// let d = a + b + c// 在webpack中自动省略 可以简化代码
// console.log('d:', d)




//抽离公共代码
// import  './a'
// import  './b'

// import $ from 'jquery'
// console.log($)



//懒加载

// let button = document.createElement('button')
// button.innerHTML = '按钮'
// //vue 的懒加载  react的懒加载
// button.addEventListener('click', function(){
//     console.log('click')
//     //es6 草案中的语法 jsonp实现动态加载文件
//     import('./source.js').then(data => {
//         console.log(data)
//     })
// })

// document.body.appendChild(button)


import str from './source'
console.log(str)
if (module.hot) {
    module.hot.accept('./source', () => {
        let str = require('./source')
        console.log('--', str.default)
    })
}