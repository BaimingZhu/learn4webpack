# learn4webpack

## webpack安装
- 安装本地的webpack
- webpack webpack-cli -D (yarn ass webpack webpack-cli -D)


## webpack可以进行0配置
- 打包工具 -> 输出结果（js模块）

- 打包 （支持我们的js模块化）

## 手动配置webpack
- 默认配置文件的名字 webpack.config
- package.json 添加脚本  
    "scripts": {
        "build": "webpack --config webpack.config.js"
    },

## 安装webpack-dev-server
- yarn add webpack-dev-server -D
- 运行npx webpack-dev-server