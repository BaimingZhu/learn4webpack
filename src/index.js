// import $ from 'jquery'
//默认 是 立即执行函数的loader 不会暴露全局变量
//expose-loader  暴露全局的loader  内联的loader
//pre  post normal 

// 暴露出去 下边是写法规范
import $ from 'jquery'
// import $ from 'expose-loader?$!jquery'
console.log($)
console.log(window.$)

// // let str = require('./a.js')

// // console.log('hello ' + str)

// require('./index.css')

// require('./index.less')

// require('@babel/polyfill')

// let fn = () => {
//     console.log('log')
// }

// fn()

// @log
// class A {
//     a = 1;
// }

// function log(target){
//     target.abc = 1
// }

// let  a = new A()
// console.log('a->', A.abc )


// function * gen(){
//     yield 1
// }

// console.log(gen().next())

// 'aaa'.includes('a')