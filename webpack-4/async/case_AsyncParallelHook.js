class AsyncHook {//钩子是同步的
    constructor(args) {
        this.tasks = []
    }
    //实现tapPomise
    tapPromise(name, task) {
        this.tasks.push(task)
    }
    promise(...arg) {
        //用map映射 保存到tasks数组中 再使用Promise.all方法 全部运行后才执行
        let tasks = this.tasks.map(task => task(...arg))
        return Promise.all(tasks)
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let count = 0
        let done = () => {
            count++
            if (count == this.tasks.length) {
                finalCallback()
            }
        }
        this.tasks.forEach(task => {
            task(...args, done)
        })
    }
}

let hook = new AsyncHook(['name'])

// hook.tapAsync('node', (name, cb) => {
//     setTimeout(() => {
//         console.log('node', name)
//         cb()
//     }, 1500)
// })
// hook.tapAsync('react', (name, cb) => {
//     setTimeout(() => {
//         console.log('react', name)
//         cb()
//     }, 1000)
// })

// hook.callAsync(['done'], function () {
//     console.log('--end--')
// })

hook.tapPromise('node', name => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name)
            resolve()
        }, 1000)
    })
})
hook.tapPromise('react', name => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name)
            resolve()
        }, 1000)
    })
})
hook.promise('hanke').then(() => {
    console.log('end')
})