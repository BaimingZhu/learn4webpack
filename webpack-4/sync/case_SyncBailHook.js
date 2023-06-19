class SyncBailHook {
    constructor(args) {
        this.tasks = []
    }
    tap(name, task){
        this.tasks.push(task)
    }
    call(args){
        for(let i = 0; i< this.tasks.length; i++){
            let result = this.tasks[i](...args)
            if(result) return 
        }
    }
}

let hook = new SyncBailHook(['name'])

hook.tap('node', function(name){
    console.log('node', name)
    return '不太会等一等'
})
hook.tap('react', function(name){
    console.log('react', name)
})

hook.call(['done'])