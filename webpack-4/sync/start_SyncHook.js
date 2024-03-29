let { SyncHook } = require('tapable')

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncHook(['name'])
        }
    }
    //发布订阅的方式
    tap() {//注册监听函数
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name)
        })
        this.hooks.arch.tap('react', function (name) {
            console.log('react', name)
        })
    }
    start() {
        this.hooks.arch.call('jw');
    }
}

let l = new Lesson()

l.tap()//注册这两个事件
l.start()//启动钩子函数