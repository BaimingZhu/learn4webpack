console.log('hello word')

//inline-loader! 这样会运行inline-loader
// -!不会通过 pre normal来处理了
// !没有normal
// !!什么都不要  只用inline-loader
// require('-!inline-loader!./a.js')

// class Person{
//     constructor(){
//         this.name = 'zhu'
//     }
//     getName(){
//         return this.name
//     }
// }

// let p1 = new Person()
// console.log(p1.getName())


import p from './image.jpg'
let img = document.createElement('img');
img.src = p
document.body.appendChild(img)



import './index.less'