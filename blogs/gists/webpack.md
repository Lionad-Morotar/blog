# Webpack

[TOC]

<div style="position: relative; padding: 20px; background: #2b3a42;">
  <div class="cube__container splash-viz__cube" style="width:180px;height:180px;padding-left:70.58823529411765px"><span class="cube cube--dark" style="width:120px;padding-bottom:60px"><figure class="cube__outer" style="width:120px;height:120px;transform:translateX(-50%) scale3d(1,1,1) rotateX(0deg) rotateY(7470deg) rotateZ(0deg)"><section class="cube__face" style="transform:rotateX(0deg) translateZ(60px);border-width:1px 1px 6px 6px"></section><section class="cube__face" style="transform:rotateX(-90deg) translateZ(60px);border-top-width:1px;border-right-width:1px;border-bottom-width:1px;border-left-width:1px"></section><section class="cube__face" style="transform:rotateX(90deg) translateZ(60px);border-width:6px 1px 1px 6px"></section><section class="cube__face" style="transform:rotateY(-90deg) translateZ(60px);border-width:1px"></section><section class="cube__face" style="transform:rotateY(90deg) translateZ(60px);border-width:1px 6px 6px 1px"></section><section class="cube__face" style="transform:rotateY(180deg) translateZ(60px);border-width:1px"></section></figure><figure class="cube__inner" style="width:120px;height:120px;transform:translateX(-50%) scale3d(0.5,0.5,0.5) rotateX(0deg) rotateY(-7470deg) rotateZ(0deg)"><section class="cube__face" style="transform:rotateX(0deg) translateZ(60px)"></section><section class="cube__face" style="transform:rotateX(-90deg) translateZ(60px)"></section><section class="cube__face" style="transform:rotateX(90deg) translateZ(60px)"></section><section class="cube__face" style="transform:rotateY(-90deg) translateZ(60px)"></section><section class="cube__face" style="transform:rotateY(90deg) translateZ(60px)"></section><section class="cube__face" style="transform:rotateY(180deg) translateZ(60px)"></section></figure></span></div>
  <style>
    <style>
    @-webkit-keyframes sbx-reset-in {}
    .cube {
        -webkit-box-sizing: border-box;
        position: relative;
        display: block;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        -webkit-transform: rotateX(-33.5deg) rotateY(45deg);
        transform: rotateX(-33.5deg) rotateY(45deg)
    }
    .cube__inner,.cube__outer {
        -webkit-box-sizing: border-box;
        display: inline-block;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        -webkit-transition: -webkit-transform 1000ms;
        transition: -webkit-transform 1000ms;
        transition: transform 1000ms;
        transition: transform 1000ms,-webkit-transform 1000ms
    }
    .cube__inner {
        -webkit-box-sizing: border-box;
        position: absolute;
        top: -2px;
        left: 0
    }
    .cube__face {
        -webkit-box-sizing: border-box;
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px solid #ffffff
    }
    .cube .cube__outer .cube__face {
        -webkit-box-sizing: border-box;
        background: rgba(141,214,249,0.5);
        -webkit-transition: border-width 0.2s;
        transition: border-width 0.2s;
        -webkit-transition-delay: 0.2s;
        transition-delay: 0.2s
    }
    .cube .cube__inner .cube__face {
        -webkit-box-sizing: border-box;
        background: #175d96;
        border: 2px solid #ffffff
    }
    .splash-viz {
        -webkit-box-sizing: border-box;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: calc(100vh - 55px);
        min-height: 320px;
        max-height: 720px;
        background: #2b3a42;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        overflow: hidden
    }
    .splash-viz__cube {
        -webkit-box-sizing: border-box;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 1
    }
  </style>
  <svg viewBox="0 100 1088 415" version="1.1">
    <g stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(1002, 326)">
            <g>
                <use fill-opacity="0.1" fill="#526B78" fill-rule="evenodd" xlink:href="#path-1"></use>
                <rect stroke="#526B78" stroke-width="4" x="-2" y="-2" width="84" height="84" rx="3"></rect>
            </g>
            <text font-family="'Source Sans Pro', sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">
                <tspan x="18.891" y="46.7096774">.png</tspan>
            </text>
        </g>
        <g transform="translate(1002, 214)">
            <g>
                <use fill-opacity="0.1" fill="#526B78" fill-rule="evenodd" xlink:href="#path-2"></use>
                <rect stroke="#526B78" stroke-width="4" x="-2" y="-2" width="84" height="84" rx="3"></rect>
            </g>
            <text font-family="'Source Sans Pro', sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">
                <tspan x="22.532" y="46.7096774">.css</tspan>
            </text>
        </g>
        <g transform="translate(894, 326)">
            <g>
                <use fill-opacity="0.1" fill="#526B78" fill-rule="evenodd" xlink:href="#path-3"></use>
                <rect stroke="#526B78" stroke-width="4" x="-2" y="-2" width="84" height="84" rx="3"></rect>
            </g>
            <text font-family="'Source Sans Pro', sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">
                <tspan x="21.817" y="46.7096774">.jpg</tspan>
            </text>
        </g>
        <g transform="translate(894, 214)">
            <g>
                <use fill-opacity="0.1" fill="#526B78" fill-rule="evenodd" xlink:href="#path-4"></use>
                <rect stroke="#526B78" stroke-width="4" x="-2" y="-2" width="84" height="84" rx="3"></rect>
            </g>
            <text font-family="'Source Sans Pro', sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">
                <tspan x="29" y="46.7096774">.js</tspan>
            </text>
        </g>
        <g transform="translate(342, 225)" stroke="#7E8C94" stroke-width="4">
            <path d="M499.558824,86.52 C499.558824,86.52 484.852941,81.02 439.908088,109.436667 C394.963235,137.853333 380.992647,164.436667 380.992647,164.436667" stroke-dasharray="7"></path>
            <path d="M499.558824,86.0616667 C499.558824,86.0616667 484.852941,91.5616667 439.908088,63.145 C394.963235,34.7283333 380.992647,8.145 380.992647,8.145" stroke-dasharray="7"></path>
            <path d="M0.477941176,170.395 C0.477941176,170.395 169.382939,98.895 447.847936,98.895" stroke-dasharray="6"></path>
            <path d="M0.477941176,72.395 C0.477941176,72.395 169.382939,0.895 447.847936,0.895" stroke-dasharray="6" transform="translate(224.162939, 36.645000) scale(1, -1) translate(-224.162939, -36.645000) "></path>
        </g>
        <g transform="translate(228, 335)">
            <g>
                <use fill-opacity="0.1" fill="#526B78" fill-rule="evenodd" xlink:href="#path-5"></use>
                <rect stroke="#526B78" stroke-width="4" x="-2" y="-2" width="66" height="66" rx="3"></rect>
            </g>
            <text font-family="'Source Sans Pro', sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">
                <tspan x="12.817" y="38">.jpg</tspan>
            </text>
        </g>
        <g transform="translate(228, 223)">
            <g>
                <use fill-opacity="0.1" fill="#526B78" fill-rule="evenodd" xlink:href="#path-6"></use>
                <rect stroke="#526B78" stroke-width="4" x="-2" y="-2" width="66" height="66" rx="3"></rect>
            </g>
            <text font-family="'Source Sans Pro', sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">
                <tspan x="9.891" y="38">.png</tspan>
            </text>
        </g>
        <g transform="translate(302, 414.500000) scale(1, -1) translate(-302, -414.500000) translate(182, 404)">
            <rect fill="#BBDBEC" x="0" y="0" width="2" height="6"></rect>
            <rect fill="#BBDBEC" x="76" y="6" width="2" height="12"></rect>
            <rect fill="#BBDBEC" transform="translate(75.304690, 4.704683) rotate(-45) translate(-75.304690, -4.704683) " x="74.3046896" y="1.87968342" width="2" height="5.6500001"></rect>
            <rect fill="#BBDBEC" x="2" y="2" width="72" height="2"></rect>
            <polyline stroke="#BBDBEC" stroke-width="2" points="80 12 77 20.8000002 74 12"></polyline>
        </g>
        <g transform="translate(116, 391)">
            <g>
                <use fill-opacity="0.1" fill="#526B78" fill-rule="evenodd" xlink:href="#path-7"></use>
                <rect stroke="#526B78" stroke-width="4" x="-2" y="-2" width="66" height="66" rx="3"></rect>
            </g>
            <text font-family="'Source Sans Pro', sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">
                <tspan x="8.076" y="38">.sass</tspan>
            </text>
        </g>
        <g transform="translate(116, 279)">
            <g>
                <use fill-opacity="0.1" fill="#526B78" fill-rule="evenodd" xlink:href="#path-8"></use>
                <rect stroke="#526B78" stroke-width="4" x="-2" y="-2" width="66" height="66" rx="3"></rect>
            </g>
            <text font-family="'Source Sans Pro', sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">
                <tspan x="8.076" y="38">.sass</tspan>
            </text>
        </g>
        <g transform="translate(182, 201)">
            <rect fill="#BBDBEC" x="0" y="0" width="2" height="6"></rect>
            <rect fill="#BBDBEC" x="76" y="113" width="2" height="12"></rect>
            <rect fill="#BBDBEC" transform="translate(75.304690, 111.704683) rotate(-45) translate(-75.304690, -111.704683) " x="74.3046896" y="108.879683" width="2" height="5.6500001"></rect>
            <rect fill="#BBDBEC" x="26" y="109" width="48" height="2"></rect>
            <rect fill="#BBDBEC" transform="translate(24.704683, 108.304690) rotate(-45) translate(-24.704683, -108.304690) " x="23.7046835" y="105.47969" width="2" height="5.6500001"></rect>
            <rect fill="#BBDBEC" x="22" y="6" width="2" height="101"></rect>
            <rect fill="#BBDBEC" transform="translate(21.304690, 4.704683) rotate(-45) translate(-21.304690, -4.704683) " x="20.3046896" y="1.87968342" width="2" height="5.6500001"></rect>
            <rect fill="#BBDBEC" x="2" y="2" width="18" height="2"></rect>
            <polyline stroke="#BBDBEC" stroke-width="2" points="80 118 77 126.8 74 118"></polyline>
        </g>
        <g transform="translate(182, 189)">
            <rect fill="#BBDBEC" x="0" y="0" width="2" height="6"></rect>
            <rect fill="#BBDBEC" x="76" y="6" width="2" height="19"></rect>
            <rect fill="#BBDBEC" transform="translate(75.304690, 4.704683) rotate(-45) translate(-75.304690, -4.704683) " x="74.3046896" y="1.87968342" width="2" height="5.6500001"></rect>
            <rect fill="#BBDBEC" x="2" y="2" width="72" height="2"></rect>
            <polyline stroke="#BBDBEC" stroke-width="2" points="80 18 77 26.8000002 74 18"></polyline>
        </g>
        <g transform="translate(116, 167)">
            <g>
                <use fill-opacity="0.1" fill="#526B78" fill-rule="evenodd" xlink:href="#path-9"></use>
                <rect stroke="#526B78" stroke-width="4" x="-2" y="-2" width="66" height="66" rx="3"></rect>
            </g>
            <text font-family="'Source Sans Pro', sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">
                <tspan x="20" y="38">.js</tspan>
            </text>
        </g>
        <g transform="translate(110, 470.500000) scale(1, -1) translate(-190, -470.500000) translate(150, 460)">
            <rect fill="#BBDBEC" x="0" y="0" width="2" height="6"></rect>
            <rect fill="#BBDBEC" x="76" y="6" width="2" height="12"></rect>
            <rect fill="#BBDBEC" transform="translate(75.304690, 4.704683) rotate(-45) translate(-75.304690, -4.704683) " x="74.3046896" y="1.87968342" width="2" height="5.6500001"></rect>
            <rect fill="#BBDBEC" x="2" y="2" width="72" height="2"></rect>
            <polyline stroke="#BBDBEC" stroke-width="2" points="80 12 77 20.8000002 74 12"></polyline>
        </g>
        <g transform="translate(4, 447)">
            <g>
                <use fill-opacity="0.1" fill="#526B78" fill-rule="evenodd" xlink:href="#path-10"></use>
                <rect stroke="#526B78" stroke-width="4" x="-2" y="-2" width="66" height="66" rx="3"></rect>
            </g>
            <text font-family="'Source Sans Pro', sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">
                <tspan x="8.076" y="38">.sass</tspan>
            </text>
        </g>
        <g transform="translate(70, 363)">
            <rect fill="#BBDBEC" x="0" y="0" width="2" height="6"></rect>
            <rect fill="#BBDBEC" x="76" y="6" width="2" height="12"></rect>
            <rect fill="#BBDBEC" transform="translate(75.304690, 4.704683) rotate(-45) translate(-75.304690, -4.704683) " x="74.3046896" y="1.87968342" width="2" height="5.6500001"></rect>
            <rect fill="#BBDBEC" x="2" y="2" width="72" height="2"></rect>
            <polyline stroke="#BBDBEC" stroke-width="2" points="80 12 77 20.8000002 74 12"></polyline>
        </g>
        <g transform="translate(4, 335)">
            <g>
                <use fill-opacity="0.1" fill="#526B78" fill-rule="evenodd" xlink:href="#path-11"></use>
                <rect stroke="#526B78" stroke-width="4" x="-2" y="-2" width="66" height="66" rx="3"></rect>
            </g>
            <text font-family="'Source Sans Pro', sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">
                <tspan x="15.38" y="38">.cjs</tspan>
            </text>
        </g>
        <g transform="translate(38, 307)">
            <rect fill="#BBDBEC" x="0" y="22" width="6" height="2"></rect>
            <rect fill="#BBDBEC" x="2" y="6" width="2" height="16"></rect>
            <rect fill="#BBDBEC" transform="translate(4.704683, 4.704683) rotate(45) translate(-4.704683, -4.704683) " x="3.70468347" y="1.87968342" width="2" height="5.6500001"></rect>
            <rect fill="#BBDBEC" x="6" y="2" width="62" height="2"></rect>
            <polyline stroke="#BBDBEC" stroke-width="2" transform="translate(66.400000, 3) rotate(270) translate(-66.400000, -3) " points="69.4000001 -1.4000001 66.4000001 7.4000001 63.4000001 -1.4000001"></polyline>
        </g>
        <g transform="translate(26, 289)">
            <polyline stroke="#BBDBEC" stroke-width="2" points="6 30 3 38.8000002 0 30"></polyline>
            <rect fill="#BBDBEC" x="2" y="0" width="2" height="39"></rect>
            <rect fill="#BBDBEC" x="0" y="0" width="6" height="2"></rect>
        </g>
        <g transform="translate(110, 246.500000) scale(1, -1) translate(-190, -246.500000) translate(150, 236)">
            <rect fill="#BBDBEC" x="0" y="0" width="2" height="6"></rect>
            <rect fill="#BBDBEC" x="76" y="6" width="2" height="12"></rect>
            <rect fill="#BBDBEC" transform="translate(75.304690, 4.704683) rotate(-45) translate(-75.304690, -4.704683) " x="74.3046896" y="1.87968342" width="2" height="5.6500001"></rect>
            <rect fill="#BBDBEC" x="2" y="2" width="72" height="2"></rect>
            <polyline stroke="#BBDBEC" stroke-width="2" points="80 12 77 20.8000002 74 12"></polyline>
        </g>
        <g transform="translate(4, 223)">
            <g>
                <use fill-opacity="0.1" fill="#526B78" fill-rule="evenodd" xlink:href="#path-12"></use>
                <rect stroke="#526B78" stroke-width="4" x="-2" y="-2" width="66" height="66" rx="3"></rect>
            </g>
            <text font-family="'Source Sans Pro', sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">
                <tspan x="10.947" y="38">.hbs</tspan>
            </text>
        </g>
        <g transform="translate(32, 177)">
            <polyline stroke="#BBDBEC" stroke-width="2" points="6 30 3 38.8000002 0 30"></polyline>
            <rect fill="#BBDBEC" x="2" y="0" width="2" height="39"></rect>
            <rect fill="#BBDBEC" x="0" y="0" width="6" height="2"></rect>
        </g>
        <g transform="translate(4, 111)">
            <g>
                <use fill-opacity="0.1" fill="#526B78" fill-rule="evenodd" xlink:href="#path-13"></use>
                <rect stroke="#526B78" stroke-width="4" x="-2" y="-2" width="66" height="66" rx="3"></rect>
            </g>
            <text font-family="'Source Sans Pro', sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">
                <tspan x="20" y="38">.js</tspan>
            </text>
        </g>
    </g>
  </svg>
</div>

大学毕业论文我写的是关于前端页面加载性能优化这方面的内容。也正是在那段时期，正式学习了 Webpack、Gulp 等自动化工具。第一次接触 Webpack 时，在官网看到这张标题图片，我还挺懵的。直到之后看到了经过 Webpack 打包出来的 dist 文件夹中的内容，恍然大悟。“打包”不就是“整合资源”嘛...

> 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
> <name>webpack.docschina.org</name>

## 功能综述

简单来说，在 Webpack 最重要功能就是**打包**。Webpack@5 之前的几个最重要的概念不外乎就是入口、出口、模块和代码包（Bundle）[^重要概念]。从入口开始，通过分析 JS 之间，以及 JS 引入的不同资源之间的依赖关系（Resource），把这些模块打包成一块整体，Bundle。见下图，指示了 Webpack 从 Entry 到 Output 的一个过程。

<img class="nb w80" alt="Webpack Entry to Output" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200729011803.png" />

从入口文件（Entry）开始，Webpack 对模块进行分析及编译。模块之间可以有多种依赖关系。Webpack 不仅要处理 JS 模块规范下的 Require、Import，还要处理如 CSS 文件之间的  @import 等引用关系。通过分析这些模块依赖关系，Webpack 将代码打包成一份或多份代码包（Bundle）。最后，把这些资源全部塞到一个构建目录（比如 dist），至此，Webpack 的目标所有就完成了。

除此之外，Webpack 提供了 Loader 接口，丰富了**模块处理**的能力。像图片、样式、字体这些资源，通过 Require 函数引入再打包到构建目录为止这个过程，需要很多处理函数的参与。我们把处理函数称为“Loader”，而整个处理过程因为像是链式操作，所以被称为“Chain Loader”。由下图可见，index.js 引用的 index.css，首先会经过文件名及后缀的判定，判定成功后，再由 Webpack 加载对应的 Loaders，即 CSS Loader、Style Loader 进行处理。

<img class="nb w80" alt="Webpack Loaders" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200729021114.png" />

Loaders 相当灵活，可以任意组合、嵌套，达到你想要的模块解析结果。比如说，针对样式文件。你可以配置 PostCSS Loader，并引入 StyleLint、CSS Module 等功能。PostCSS 处理过你的样式文件之后，结果可以继续交给 CSS Loader 解析 CSS 语法生成 AST，最后交由 Style Loader 将 CSS 整合输入到某个文件中。可以想象，Loader 其实是基于字符串的流水线式处理。

<img class="nb" alt="Webpack Style Loaders" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200729022653.png" />

Plugin 对于 Webpack 而言，则是增强了任务流处理功能。Webpack 在编译的过程中，会触发很多事件钩子。我们可以通过配置介入这些钩子，触达Webpack 的加载、编译模块等任意事件，以拓展自定义功能。

## 代码模块化

可以发现目前为止我们都是在和文件级别的“模块”打交道。在我们跳脱模块的概念以作一些优化处理之前，还可以追溯回“为什么我们需要把代码拆分为模块”这样一个问题。这可以从模块化的历史进程开始说起，不过由于本文重心在“Webpack”，模块化相关故事这里暂且不提了。对模块化感兴趣的朋友可以自行搜索资料了解：<a href="/gists/js-module-history.html">模块化</a>。

### SplitChunks

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
  maxInitialRequest: 3,
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

### TreeShake

以下两种给项目引入 Element-UI 的写法会对打包体积产生影响吗？

```js
import { Tag } from 'element-ui'

Vue.use(Tag)

new Vue({
    template: '<el-tag>引入单个组件</el-tag>'
})
```

```js
import element from 'element-ui'

Vue.use(element)

new Vue({
    template: '<el-tag>引入单个组件</el-tag>'
})
```

实验结果如下：

* 引入单个组件风格项目打包体积

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20201012104756.png)

* 直接引入 element-ui 后项目打包体积

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20201012105204.png)

可以发现，没甚么变化。

为了使得引入 Element-UI 时支持按需引入，需要将写法改为：

```js
var tag = require('element-ui/lib/tag').default
// 或：import tag from 'element-ui/lib/tag'

Vue.use(tag)

new Vue({
    template: '<el-tag>引入单个组件</el-tag>'
})
```

这样的话，效果立竿见影（或者使用 ElementUI 推荐的写法，[引入 babel-plugin-components](https://element.eleme.cn/#/zh-CN/component/custom-theme)）。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20201012112121.png)

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

## 阅读更多

* [Webpack实战：入门、进阶与调优](https://book.douban.com/subject/34430881/)
* [Webpack 中文网](https://www.webpackjs.com/concepts/)
* [从webpack4打包文件说起](https://cloud.tencent.com/developer/article/1172453)

[^重要概念]: 见[《前端工程化 - 聊聊 Webpack v3 到 Webpack v5 的核心架构变迁》](https://juejin.im/post/5f1ac4725188252e4839cfe6)