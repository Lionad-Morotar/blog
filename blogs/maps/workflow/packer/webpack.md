# webpack

[TOC]

<div style="position: relative; padding: 20px; background: #2b3a42;">
  <div class="cube__container splash-viz__cube" style="width:180px;height:180px;padding-left:70.58823529411765px">
    <span class="cube cube--dark" style="width:120px;padding-bottom:60px">
      <figure class="cube__outer" style="width:120px;height:120px;transform:translateX(-50%) scale3d(1,1,1) rotateX(0deg) rotateY(7470deg) rotateZ(0deg)">
        <section class="cube__face" style="transform:rotateX(0deg) translateZ(60px);border-width:1px 1px 6px 6px"></section>
        <section class="cube__face" style="transform:rotateX(-90deg) translateZ(60px);border-top-width:1px;border-right-width:1px;border-bottom-width:1px;border-left-width:1px"></section>
        <section class="cube__face" style="transform:rotateX(90deg) translateZ(60px);border-width:6px 1px 1px 6px"></section>
        <section class="cube__face" style="transform:rotateY(-90deg) translateZ(60px);border-width:1px"></section>
        <section class="cube__face" style="transform:rotateY(90deg) translateZ(60px);border-width:1px 6px 6px 1px"></section>
        <section class="cube__face" style="transform:rotateY(180deg) translateZ(60px);border-width:1px"></section>
      </figure>
      <figure class="cube__inner" style="width:120px;height:120px;transform:translateX(-50%) scale3d(0.5,0.5,0.5) rotateX(0deg) rotateY(-7470deg) rotateZ(0deg)">
        <section class="cube__face" style="transform:rotateX(0deg) translateZ(60px)"></section>
        <section class="cube__face" style="transform:rotateX(-90deg) translateZ(60px)"></section>
        <section class="cube__face" style="transform:rotateX(90deg) translateZ(60px)"></section>
        <section class="cube__face" style="transform:rotateY(-90deg) translateZ(60px)"></section>
        <section class="cube__face" style="transform:rotateY(90deg) translateZ(60px)"></section>
        <section class="cube__face" style="transform:rotateY(180deg) translateZ(60px)"></section>
      </figure>
    </span>
  </div>
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

## 简介

#### webpack 是什么？

webpack 是一个静态模块打包器，它会递归地构建一个模块的依赖关系图，然后将所有这些模块打包成一个或多个 bundle。

#### 打包流程是怎么样的？

从入口文件（Entry）开始，Webpack 对模块进行分析及编译。模块之间的依赖关系可能是 JS 模块规范下的 Require、Import，也可能是 CSS 文件的  @import。通过分析依赖关系，Webpack 将代码打包成一份或多份代码包（Bundle）。最后，写入到构建目录（比如 dist）。

![webpack Entry to Output](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200729011803.png?type=draw&w=80)

#### Loader 是什么？

webpack 提供的 Loader 接口丰富了模块处理的能力。使用自定义 Loader 可以加载诸如图片、样式、字体这些资源，资源经过不同的 Loader 处理，并发往下一个 Loader，所以可以把 Loader 看作基于字符串的流水线式处理。比如说针对样式文件，可以配置 PostCSS Loader，而 PostCSS Loader 可以使用插件接入 StyleLint、CSS Module 等功能。PostCSS Loader 处理后，结果继续交给 CSS Loader 解析 CSS 语法生成 AST，又交由 Style Loader 将 CSS 整合输入到某个文件中。

![webpack Style Loaders](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200729022653.png?type=draw&w=40)

#### Plugin 是什么？

在打包的过程中，Webpack 运行的内部会触发很多事件钩子。可以通过配置 Plugin 介入这些钩子来操作资源，以拓展自定义功能。

#### HMR 原理？

TODO，[webpack 热更新实现原理分析](https://zhuanlan.zhihu.com/p/30623057)

TODO，[webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)

#### 模块联邦是什么？

使用模块联邦插件后，每次构建都可以作为打包后的容器，向其它容器（构建）提供模块或者消费其它容器提供的模块。能直接解决微前端项目中基础库升级后，其它业务项目也要重新拉新版基础库并构建、发版带来的繁琐的问题。

见：[模块联邦浅析](https://juejin.cn/post/7101457212085633054)

## Links

TODO，[Webpack4中的Tree-Shaking](https://zhuanlan.zhihu.com/p/193663299)

TODO，[透过分析 webpack 面试题，构建 webpack5.x 知识体系<进阶篇>](https://zhuanlan.zhihu.com/p/454945287)

[^重要概念]: 见[《前端工程化 - 聊聊 webpack v3 到 webpack v5 的核心架构变迁》](https://juejin.im/post/5f1ac4725188252e4839cfe6)