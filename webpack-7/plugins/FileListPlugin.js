class FileListPlugin {
    constructor({ filename }) {
        this.filename = filename
    }

    apply(compiler) {

        compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, cb) => {
            let content = `##  文件名    资源大小\r\n`;
            let assets = compilation.assets
            Object.entries(assets).forEach(([filename, staObj]) => {
                content += `- ${filename} ${staObj.size()}\r\n`
            })
            // console.log('---', assets, Object.entries(assets))

            //资源对象
            assets[this.filename] = {
                source() {
                    return content;
                },
                size() {
                    return content.length;
                }
            };
            cb()
        })
    }
}

module.exports = FileListPlugin