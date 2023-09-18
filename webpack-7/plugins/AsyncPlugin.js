class AsyncPlugin{
    apply(complier){
        complier.hooks.emit.tapAsync('AsyncPlugin', (compliation, cb) => {
            setTimeout(() => {
                console.log('文件发射出来 等一下');
                cb()
            }, 2000)
        })

        complier.hooks.emit.tapPromise('AsyncPlugin', (compliation, cb) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('再等一秒')
                    resolve()
                }, 1000)
            })
        })
    }
}

module.exports = AsyncPlugin