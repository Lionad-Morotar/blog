# Webpack 实战：入门、进阶与调优

## Module
module.epxports 和 exports

require 使用 module.loaded 用来标志模块是否已经被解析。
第一次 require 时，运行代码，module.loaded 设置为 true。
再次 require 时，直接导出上次运行结果。

require 是动态的；es module 是静态的。
require 导入值的拷贝，而 es module 导入值的映射（就算是数值也能动态变化）。
es module 可以利于编译器优化，做接口类型检测、死代码优化等工作。

## SplitChunks

主要分为四部分：

* 匹配模式：chunks
* 匹配条件：minSize、minChunks、maxAsyncRequests、maxInitialRequest
* 命名：name、delimeter
* 缓存：cacheGroup

```js
{splitChunks: {
  chunks: 'initial' | 'async' | 'all',
  minSize: {
    javascript: 30 * 1000,
    style: 50 * 1000
  },
  maxSize: 0,
  minChunks: 1, // 只有该模块被 n 个入口同时引用才会被提取
  maxAsyncRequests: 5,
  maxInitialRequest: 3
  name: true, // vendors~a~b~c.js
  defaultNameDelimeter: '~',
  cacheGroup: {
    vendor: { // 提取所有 node_modules 中符合条件的模块
      test: /node_modules/,
      priority: -10,
    },
    default: {  // 所有被多次引用的模块
      minChunks: 2,
      priority: -20,
    }
  }
}}
```

异步模块：

```js
import(/* webpackChunkName: "add" */ 'a.js').then(({ add }) => {})
```

## 生产环境

* 生产环境配置：webpack-merge；mode: production
* 环境变量：webpack.DefinePlugin
* SourceMap：区分 JS 和 CSS，主要考虑 JS；
  * 开发：devtool: 'source-map' | 'cheap-source-map' | 'eval-source-map'
  * 生产：UgligyJSPlugin；'source-map' | 'hidden-source-map' | 'nosources-source-map'；或者可以使用 source-map 白名单方案
* 压缩：区分 JS 和 CSS
  * JS：optimization: { optimize: true; optimizer: Terser }
  * CSS：optimization: { optimize: true; optimizer: OptimizeCSSPlugin }
* 缓存：ContentHash + html-webpack-plugin；Webpack 3 以下，模块 ID 变动会导致 ContentHash 改变，可以使用 HashedModuleIdsPlugin 或 webpack-hashed-id-plugin
* 体积：webpack-bundle-analyzer

## 打包优化

* 缩小打包资源：Exclude & Inlcude；module.noparse: /regex/；webpack.IgnorePlugin；
* 增加硬件资源：从模块找到资源时需要转译，此时可以通过 HappyPack 充分利用 CPU 多进程来提高转译速度；
* 预打包：先通过 webpack.DllPlugin 将 vendor 打包好，然后在正常打包时就可以直接调用了；
* 死代码检测：ESModule + webpack-terser-plugin

## 周边工具

* webpack-bundle-anylyzer
* webpack-dashboard
* speed-measure-webpack-plugin
* HMR（react-hot-reloader）

### HMR

1. 比较构建的哈希值变化
2. 哈希值若变化，再请求改变的 module 的信息
3. 请求改变的 module 的资源

通过 module.hot.accept/decline 控制热更新的范围

## 勘误

* 4：模块的顺序应该是：CommonJS AMD CMD
* 9：bundle.js
