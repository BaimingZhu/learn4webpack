//webpack 是node写出来的node的写法
let path = require('path')
// console.log(path.resolve('dist'))

let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devServer:{
        port:8080,
        progress:true,//进度
        contentBase:'./build'
    },
    mode : 'development', //模式默认两种 production development
    entry: './src/index.js',//入口
    output : {
        filename:'budle.[hash:4].js',//打包后的文件名
        path: path.resolve(__dirname, 'build'),//路径必须是一个绝对路径
    },
    plugins : [//放着所有的webpoack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            hash:true //引用的js加上哈希值
        })
    ],
    module:{//模块
        rules:[//规则 css-loader 接续 @import这种语法的
                //规则 style-loader 把css插入到head支持在head的标签中
                {
                    test: /\.css$/, 
                    use: [
                        {
                            loader:'style-loader',
                            options: {//配置插入在head元素的css之前
                                insert: function insertAtTop(element) {
                                    var parent = document.querySelector('head');
                                    // eslint-disable-next-line no-underscore-dangle
                                    var lastInsertedElement =
                                      window._lastElementInsertedByStyleLoader;
                    
                                    if (!lastInsertedElement) {
                                      parent.insertBefore(element, parent.firstChild);
                                    } else if (lastInsertedElement.nextSibling) {
                                      parent.insertBefore(element, lastInsertedElement.nextSibling);
                                    } else {
                                      parent.appendChild(element);
                                    }
                    
                                    // eslint-disable-next-line no-underscore-dangle
                                    window._lastElementInsertedByStyleLoader = element;
                                  },
                            }
                        },
                        'css-loader'
                    ]
                },
                {
                    test: /\.less$/, 
                    use: [
                        {
                            loader:'style-loader',
                        },
                        'css-loader',//解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。
                        'less-loader'//把less转换成css
                    ]
                }
        ]
    }
}