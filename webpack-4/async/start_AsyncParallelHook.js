let { AsyncParallelHook } = require('tapable')
//异步的钩子  并行 等待所有并发的异步事件执行后再执行回调方法
// 同时发送 多个请求

//tapable有 注册分为三种方法  tap同步   tapAsync(cb) tapPromise(new Promise)
// 调用也分为三种方法  call callAsync promise

class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
        }
    }
    // //异步方法的第一种 tapAsync
    // tap() {//注册监听函数
    //     this.hooks.arch.tapAsync('node', (name, cb) => {
    //         setTimeout(() => {
    //             console.log('node', name)
    //             cb()
    //         }, 1500)
    //     })
    //     this.hooks.arch.tapAsync('react', (name, cb) => {
    //         setTimeout(() => {
    //             console.log('react', name)
    //             cb()
    //         }, 1000)
    //     })
    // }
    tap() {
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('node', name)
                    resolve()
                }, 1500)
            })
        })
        this.hooks.arch.tapPromise('react', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('react', name)
                    resolve()
                }, 1500)
            })
        })
    }
    start() {
        this.hooks.arch.callAsync('jw', () => {
            console.log('--end--')
        });
    }
}

let l = new Lesson()

l.tap()//注册这两个事件
l.start()//启动钩子函数