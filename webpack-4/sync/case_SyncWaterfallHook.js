class SyncWaterfallHook {//
    constructor(args){
        this.tasks = []
    }
    tap(name, task){
        this.tasks.push(task)
    }
    call(args){
        // let result = ''
        // let index = 0
        // do{
        //     result = this.tasks[index].apply(null, result ? [result] : args)
        //     index++
        // }while(index < this.tasks.length)
        
        let [first, ...other] = this.tasks
        let ret = first(...args)
        other.reduce((o, v) => {
            return v(o)
        }, ret)
    }
}

let hook = new SyncWaterfallHook(['name'])

hook.tap('node', function(name){
    console.log('node', name)
    return 'node学得不错'
})
hook.tap('react', function(name){
    console.log('react', name)
    return 'react学得不错'
})
hook.tap('vue', function(name){
    console.log('vue', name)
    return 'vue学得不错'
})

hook.call(['done'])