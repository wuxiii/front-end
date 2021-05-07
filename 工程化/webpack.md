# webpack

## 快速上手

- 安装依赖
  `yarn add webpack webpack-cli --dev`

- 运行打包
  `yarn webpack`

## 配置文件

- webpack 4 之后默认入口文件 src/index.js,输出文件 dist/mian.js
- 修改默认配置方式，根目录下新建 webpack.config.js 文件

  ```js
  const path = require('path)
  module.exports = {
      mode:'production'
      entry:'.scr/index.js',
      output:{
          filenameL:'main.js'
          path:path.join(__dirname,'dist')
      }
      ...
  }

  ```

## 工作模式

共有三种模式 production ，development， none。

有两种设置工作模式的方式

1. 命令传入参数`yarn webpack --mode production`
2. 配置文件中添加 mode

## webpack 资源加载

**webpack 默认只会处理 js 文件**，处理其它类型文件需要添加对应的 loader，可以有多个 loader 处理同一个类型的资源，使用多个 loader 的时候是从右往左执行的

```js
const path = require('path)
module.exports = {
    mode:'production'
    entry:'.scr/index.js',
    output:{
        filenameL:'main.js'
        path:path.join(__dirname,'dist')，
        publicPath:'dist/'
    }，
    module:{
        rules:[
            {
                test:/.css$/.
                // 使用多个loader的时候是从右往左执行的
                use:[
                    'style-loader' // 将处理好的css文件插入页面中
                    'css-loader' // 处理css文件
                ]
            },

            {
                test:/.png$/.
                use:{
                   loader: 'url-loader' // 处理图片资源
                   options:{
                    //10kb 以下使用此loader，超出后自动使用file-loader
                       limit:10*1024
                   }
                }
            }
        ]
    }
}

```

## webpack URL 加载器（url-loader）

url-loader 作用与 file-loader 类似，但是如果文件大小小于限制的大小则会返回一个 DataURL ，例如 base64 就是 DateURL 协议，具体形式如下
![Date Url 协议](./../assets/20200622220907.jpg)

url-loader 优点

- 小文件使用 DataURL，减少请求次数
- 大文件单独存放，提高加载速度

## babel loader 使用

安装依赖

> `yarn add babel-loader @babel/core @babel.preset-env --dev`

值得注意的是`options.presets`配置可能被`babel.config.js`中的配置覆盖

```js
   {
        test:/.js$/.
        use:{
            loader: 'babel-loader'
            options:{
                presets:['@babel/preset-env]
            }
        }
    }
```

## webpack 加载资源的方式

js 代码

- 遵循 ES Modules 标准 import 申明
- 遵循 CommonJS 的标准 require 函数
- 遵循 AMD 标准的 define 函数和 require 函数

非 js 模块也会触发 webpack 的资源加载

- @import 指令和 url 函数
- 图片 src 属性

webpack 会找到对应的 loader 去解析资源

## webpack 核心工作原理

根据配置找到一个入口文件，通过这个入口文件代码中的出现的 import 等加载资源的语句找到资源模块，解析资源模块对应的依赖，形成一个依赖树，然后递归资源树找到对应的资源文件，然后根据配置文件中的 rules 属性 找到加载器（loader）去加载资源，将加载结果放入到 bundle.js，从而实现整个项目的打包。

## webpack 插件机制

增强 webpack 自动化的能力，解决除资源加载以外其他自动化工作，如清除 dist 目录，拷贝不需打包的资源，压缩打包后代码

### 常用的插件

- html-webpack-plugin 自动生成 html
- clean-webpack-plugin 清除生成的文件
- copy-webpack-plugin 拷贝资源文件，一般用于拷贝静态资源文件，为了提高打包效率，建议不要在开发环境中使用
- DefinePlugin 允许在编译时创建配置的全局对象，是一个 webpack 内置的插件，不需要安装

```js
// 引入plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { DefinePlugun } = require('webpack')

module.exports = {
    mode:'production'
    entry:'.scr/index.js',
    output:{
        filenameL:'main.js'
        path:path.join(__dirname,'dist')，
    }，
    module:{
        rules:[
            ....
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 自定义 html 属性
            title:'这是html的title'，
            mete:{
                viewport:'width=device-width'
            },
            // 自定义html模板
            template:'./src/index.html'
        }),
        // 如果有多个页面k可以创建多个HtmlWebpackPlugin实例
        new HtmlWebpackPlugin({
            // 指定生成的文件名
            filename:'home.html'
        }),
        new CopyWebpackPlugin([
            //指定拷贝目录
              "pbulic"
        ])
         new DefinePlugin({
            BASE_URL:'"./"'
        })
    ]
}
```

## webpack 插件开发

首先了解 webpack 提供的 hooks(生命周期)

plugin 必须是一个函数或者包含 apply 方法的对象，apply 接受一个 comiler 对象，Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息

```js
class MyPlugin {
  apply(comiler) {
      //tap注册hooks名称
    comiler.hooks.emit.tap('MyPlugin',compilcation=>{
        const {assets} = compilcation
        ...
    })
  }
}
```

## webpack 自动编译

启动 webpack 时添加`--watch`参数，以监视模式运行，监视文件的变化，自动打包，例如

```js
yarn webpack ---watch
```

## webpack dev server

官方提供方的开发工具，提供一个开发 http 服务器，集成 watch 模式，自动编译和自动刷新浏览器，这个工具并不会将项目编译到磁盘而上写入内存中，所以不会生成 dist 目录

### 使用方式

```js
//安装
yarn add webpack-dev-server
//运行
yarn webpack-dev-server --open
```

### webpack-dev-server 配置

```js
module.exports = {
   ...
    devServer:{
        //访问静态资源
        contentBase:['./public'],
        //设置代理
        proxy:{
            'api'：{
                target:'https://api.github.com',
                //代理路径
                pathRewrite:{'^/api':''},
                changeOrigin:true
                }
        }，
        //开启HMR
        hot：true，
    }，
    // 配置sorce-map
    devtool:'sorce-map'，
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]

}
```

#### webpack-dev-server 中的代理

proxy 的属性名称是需要被代理的请求路径前缀，一般为了辨别都会设置前缀为/api，值为对应的代理匹配规则，对应如下：

- target：表示的是代理到的目标地址
- pathRewrite：默认情况下，我们的 /api-hy 也会被写入到 URL 中，如果希望删除，可以使用 pathRewrite
- secure：默认情况下不接收转发到 https 的服务器上，如果希望支持，可以设置为 false
- changeOrigin：它表示是否更新代理后请求的 headers 中 host 地址

#### proxy 工作原理

proxy 工作原理实质上是利用 http-proxy-middleware 这个 http 代理中间件，实现请求转发给其他服务器
