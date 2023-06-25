class AsyncSeriesHook {
    constructor(args) {
        this.tasks = []
    }
    tapPromise(name, task) {
        this.tasks.push(task)
    }
    promise(...args) {
        let [first, ...others] = this.tasks
        return others.reduce((o, v) => {
            return o.then(() => v(...args))
        }, first(...args))
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        let end_fn = args.pop()
        let index = 0
        let next = () => {
            if (index === this.tasks.length) return end_fn()
            this.tasks[index++](...args, next)
        }
        next()
    }
}


let hook = new AsyncSeriesHook(['name'])

hook.tapAsync('node', (name, cb) => {
    setTimeout(() => {
        console.log('node', name)
        cb()
    }, 1000)
})
hook.tapAsync('react', (name, cb) => {
    setTimeout(() => {
        console.log('react', name)
        cb()
    }, 1000)
})
hook.tapAsync('vue', (name, cb) => {
    setTimeout(() => {
        console.log('vue', name)
        cb()
    }, 1000)
})

hook.callAsync('hello', function () {
    console.log('--end--')
})

// hook.tapPromise('node', name => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('node', name)
//             resolve()
//         }, 1000)
//     })
// })
// hook.tapPromise('react', name => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('react', name)
//             resolve()
//         }, 1000)
//     })
// })
// hook.promise('hanke').then(() => {
//     console.log('end')
// })