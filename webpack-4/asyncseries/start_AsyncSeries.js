const { AsyncSeriesHook } = require('tapable')

class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesHook(['name'])
        }
        this.index = 0
    }
    //异步方法的第一种 tapAsync
    // tap() {   //注册 监听函数
    //     this.hooks.arch.tapAsync('node', (name, cb) => {
    //         setTimeout(() => {
    //             console.log('node', name)
    //             cb()
    //         }, 1000)
    //     })

    //     this.hooks.arch.tapAsync('react', (name, cb) => {
    //         setTimeout(() => {
    //             console.log('react', name)
    //             cb()
    //         }, 1000)
    //     })
    // }
    // start() {
    //     this.hooks.arch.callAsync('hanke', function () {
    //         console.log("end")
    //     })
    // }
    //异步方法的第2种 tapPromise
    tap() {   
        this.hooks.arch.tapPromise('node',name => {
          return new Promise((resolve,reject)=>{
            setTimeout(()=>{
              console.log('node',name)
              resolve()
            },1000)
          })
          
        })
        this.hooks.arch.tapPromise('react',name => {
          return new Promise((resolve,reject)=>{
            setTimeout(()=>{
              console.log('react',name)
              resolve()
            },1000)
          })
        })
      }
      start() {
        this.hooks.arch.promise('hanke').then(function(){
          console.log("end")
        })
      }
}


let l = new Lesson()
l.tap() //注册这两个事件
l.start() //启动钩子函数