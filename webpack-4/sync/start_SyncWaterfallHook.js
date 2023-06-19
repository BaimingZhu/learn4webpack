let {SyncWaterfallHook} = require('tapable')


class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncWaterfallHook(['name'])
        }
    }
    //发布订阅的方式
    tap() {//注册监听函数
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name)
            return 'node学得不错'
        })
        this.hooks.arch.tap('react', function (data) {
            console.log('react', data)
        })
    }
    start() {
        this.hooks.arch.call('jw');
    }
}

let l = new Lesson()

l.tap()//注册这两个事件
l.start()//启动钩子函数