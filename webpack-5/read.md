## package.json

> ```json
> "bin":{
>     "zf-pack": "./bin/zf-pack.js"
> }
> ```
>
> bin相当于运行哪一个命令，执行哪一个文件

## npm link的流程

> ```shell
> #在zf-pack目录下  注意package.json中的bin配置以及后边是bin目录下的zf-pack.js 
> npm link 
> #在webpack-go5下
> npm link zf-pack 
> 
> #注意 这样npm link后可以直接使用zf-pack.cmd  就可以在webpack-go5下边运行了
> ```
>
> 