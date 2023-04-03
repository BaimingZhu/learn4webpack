// let str = require('./a.js')

// console.log('hello ' + str)

require('./index.css')

require('./index.less')

require('@babel/polyfill')

let fn = () => {
    console.log('log')
}

fn()

@log
class A {
    a = 1;
}

function log(target){
    target.abc = 1
}

let  a = new A()
console.log('a->', A.abc )


function * gen(){
    yield 1
}

console.log(gen().next())

'aaa'.includes('a')