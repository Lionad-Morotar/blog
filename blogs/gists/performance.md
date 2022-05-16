# 页面性能

[TOC]

## 阅读更多

##### <Link type='h5' to='https://mgear-file.oss-cn-shanghai.aliyuncs.com/React%2016%20%E5%8A%A0%E8%BD%BD%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E6%8C%87%E5%8D%97.html' source='https://zhuanlan.zhihu.com/p/37148975' >《React 16 加载性能优化指南》</Link>

作者把页面加载状态划分了四个步骤：

1. 打开页面到首屏渲染（浏览器首次渲染可见的内容）
2. 首屏渲染到首次内容渲染（相关业务的内容）
3. 内容渲染到页面可交互
4. 页面逐渐加载（诸如图片等元素）直到页面内容加载完毕

在很多应用中，首屏渲染约等于首次内容渲染，这是因为加载 HTML 和 CSS 之后，要等待业务 JS 加载完毕才能看到有意义的内容。其实可以通过几种方法完善首屏加载的 HTML 和 CSS，增加加载状态，减少用户等待焦虑。

* 在 HTML 模板中使用 SVG 图案（比如通过 html-webpack-plugin 自动插入）
* 使用 pupeteer 等工具预渲染首屏

业务内容加载的过程中，JS 的影响最大。业务 JS 代码可以大致划分为：基础框架、垫片、业务基础库、业务代码这四大类，所以讲到优化 JS 其实是说如何通过分缓存去优化几种不同类型的 JS。

* 基础框架需要长时间缓存，适合强缓存
* 使用 polyfill.io，根据 UA 自动垫片
* 使用 SplitChunksPlugin 替代 CommonChunksPlugin
* 使用 TreeShaking
* 如果打包出来的 Bundle 体积巨大，可以考虑使用代码分割功能，比如 React Loadable 动态载入代码。
* 为绝大多数用户提供 ES6+ 的代码，使用 nomodule 标志为老的浏览器保留 ES5 版本代码

最后，在页面可交互到页面加载完毕这个阶段，可以使用图片懒加载或者骨架屏等形式提高体验。

##### [关于性能优化的9大策略和6大指标](https://juejin.cn/post/6981673766178783262)

* 网络层面
  * 构建工具优化
    * include/exclude 避免不必要的查找，比如用在 bable-loader 可以避免不必要的转译
    * bable-loader 可配置 cache，只编译修改过的文件
    * alias 优化文件查找性能
    * thread-loader 多进程编译
    * BundleAnalyzer 分析文件体积
    * SplitChunks 替换 CommonChunks，渐进式加载
    * 摇树优化
    * [按需加载](/articles/source-code/vuejs/element-ui.html#如何按需载入组件)
    * 动态垫片
    * 变量提升
    * 压缩，比如 [terser](https://webpack.docschina.org/plugins/terser-webpack-plugin/)
  * 图像策略
  * 内容分发
    * 域名分开，避免 Cookie
    * 静态资源走 CDN
  * 服务器和浏览器缓存
    * reusable response? no -> no-store
    * revalidate each time? yes -> no-cache
    * cacheable by proxy? yes -> public, no -> private
    * maximum cache lifetime? expires / cache-control, max-age=1s
    * modified? last-modified / etag

