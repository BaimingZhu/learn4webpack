// let str = require('./a.js')

// console.log('hello ' + str)

require('./index.css')

require('./index.less')


let fn = () => {
    console.log('log')
}

fn()

@log
class A {
    a = 1;
}

let  a = new A()
console.log('a->', a.a )

function log(target){
    console.log(target, 213)
}