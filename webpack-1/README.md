# learn4webpack  学习课程地址：（https://www.bilibili.com/video/BV1a4411e7Bz?p=5）

## webpack安装
- 安装本地的webpack
- webpack webpack-cli -D (yarn add webpack webpack-cli -D)


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

## 安装html-webpack-plugin插件
- yarn add html-webpack-plugin -D

- 在webpack配置文件进行配置

##  样式处理 安装css-loader
- yarn add css-loader style-loader less-loader -D

##  样式处理  把css抽离  自动加前缀
- yarn add mini-css-extract-plugin -D
- yarn add postcss-loader autoprefixer -D 

##  压缩css
- yarn add optimize-css-assets-webpack-plugin -D

##  压缩js
- yarn add uglifyjs-webpack-plugin -D

## es6转es5
- yarn add babel-loader @babel/core @babel/preset-env -D

## es6转es5
- yarn add @babel/plugin-proposal-class-properties -D
- yarn add babel-loader @babel/plugin-proposal-decorators -D

## 处理外部文件（减少打包资源大小）
- yarn add expose-loader -D(暴露全局的loader)
- ProvidePlugin (每个模块注入)
- externals 配置（html引入，打包的时候不打包该模块）

## 处理文件引入（图片）
- yarn add file-loader -D
- yarn add url-loader -D






## 运行命令，把资源地址设置成npm淘宝源（避免超时问题）
- npm config set registry https://registry.npm.taobao.org
- npm config set disturl https://npm.taobao.org/dist