# 页面性能

[TOC]

## 指标与模型

#### 网页性能的上下游？

选定合适的 API 收集数据，进行简单预处理后，通过 SDK 上报到后端或者云服务。为了展示收集到的数据，可以设置 99 线等图表，在某些特定的业务场景，还可以设置 A/B 图和告警。

#### 性能指标和性能模型的不同？

两个立场不同，性能指标如 Navigation Timing 使用绝对的量来衡量页面各项性能参数，性能模型如 Web Vitals 使用算法定性分析页面加载时的用户体验。

#### 为什么需要性能模型？

用户体验很难用具体或者绝对的量来衡定，比如说在渐进式加载中，只对比白屏时间和 onload 时间只能说明用户提早看到了内容，却不能说明渐进式加载好在哪里，好了多少。

![页面渐进式加载示例](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/progressive-rendering.png)

#### 合成监控和真实用户监控是什么？

从技术上来说，可以把监控分为合成监控（Synthetic Monitoring，SYN）和真实用户监控（Real User Monitoring，RUM）。合成监控是在一个模拟的场景中，使用 Lighthouse 等工具，提取出性能指标并获得审计报告。真实用户监控是在真实用户访问时，通过数据源获取数据，再上报到日志服务器，以用来展示和分析这么一流程。

#### Web Vitals 有哪些指标？

Web Vitals 关注 <abbr title="Largest Contentful Paint">LCP</abbr>、<abbr title="First Input Delay">FID</abbr>、<abbr title="Cumulative Layout Shift">CLS</abbr> 的测量，分别描述最大内容渲染时间评分、页面可交互时间评分和布局偏移评分。

<div style="display:flex; justify-content:space-evenly;">
  <img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/lcp_ux.svg" width="33%" alt="Largest Contentful Paint threshold recommendations">
  <img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/fid_ux.svg" width="33%" alt="First Input Delay threshold recommendations">
  <img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/cls_ux.svg" width="33%" alt="Cumulative Layout Shift threshold recommendations">
</div>

见：[Web Vitals](https://github.com/GoogleChrome/web-vitals)

#### 有哪些开发工具？

* [Web Vitals](https://github.com/GoogleChrome/web-vitals)，获取 Web Vitals 评分。
* [simple-web-perf](https://github.com/cssmagic/simple-web-perf)，Navigation Timing 数据上报封装。
* [webpack-lighthouse-plugin](https://github.com/Lionad-Morotar/webpack-lighthouse-plugin)，在打包结束后自动运行 Lighthouse 并输出报告。
* [lighthouse-parade](https://github.com/cloudfour/lighthouse-parade)，递归抓取页面并评分，输出关于网站的完整报告。

![webpack-lighthouse-plugin](https://github.com/Lionad-Morotar/webpack-lighthouse-plugin/blob/main/assets/example.gif?raw=true)

---

* [TODO，Web Performance @MDN](https://developer.mozilla.org/zh-CN/docs/Web/Performance)

## 如何测量性能指标

#### 怎么测定页面帧率？

可以使用 requestAnimationFrame，但是不推荐，因为脚本本身就会对性能造成影响。

#### 可以使用哪些 API 测量性能？

![Web Performance Related Specs](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220630135906.png)

#### Performance Timing 被弃用了？

Performance Timing 被弃用了，取而代之的是 Performance Navigation Timing。不应该再使用 performance.navigation、performance.getEntries 等 API，这些旧的 API 没有办法肩检测如加载新脚本等情况，不支持新的性能指标如 Long Tasks API，此外可能干扰页面性能，所以推荐使用 Navigation Timing API 获取数据，并使用 Performance Observer 进行侦测。

![Navigation Timing Level 2](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220628165411.png)

见：[Navigation Timing Level 2](https://www.w3.org/TR/navigation-timing-2/)

#### Navigation Timing 中不同的阶段是连续的吗？

可能不是。如浏览器有同域下最多 6 个请求并行的限制，那么 domainLoopupEnd 到 requestStart 之间可能会出现较长的等待时间（Stalled Time）。此外，不一定每个阶段都会有数据，如：未发生跳转时，redirectCount 为 0；如果页面没有 service worker，那么 workerStart 为 0；DNS 从缓存中获取时，domainLoopupStart 和 domainLoopupEnd 可能相等。

#### PerformanceObserver 是什么？

“有效的性能测量的第一条规则是确保性能测量技术本身不会导致性能问题”，使用 Performance Observer 可以获取某个具体类型的指标的同时不会干扰或影响页面性能，因为它会在浏览器空闲时期执行。

```js
try {
  // "element"、"event"、"first-input"、
  // "largest-contentful-paint"、"layout-shift"、
  // "longtask"、"mark"、"measure"、
  // "navigation"、"paint"、"resource"
	PerformanceObserver.supportedEntryTypes.map(type => {
		new PerformanceObserver((list) => {
		  for (const entry of list.getEntries()) {
		    console.log(entry.toJSON())
		  }
	    }).observe({
        type,
        // 使用 buffered 可以在第一次回调时获取缓存区中的历史记录
        buffered: true
      })
	})
} catch {
	// nothing	
}
```

见：[Performance Observer](https://web.dev/custom-metrics/#)

#### Long Tasks API 是什么？

Long Tasks API 将会汇报使主线程阻塞超过 50ms 的任何任务。通过观测阻塞时长，可以获得诸如 TTI（Time To Interactive）、TBT（Total Blocking Time）等数据。

见：[Long Tasks API](https://web.dev/custom-metrics/#long-tasks-api)

#### 如何测量函数执行的时长？

可以使用 Date.now()、performance.now()，但是如果不考虑兼容性的话，使用 User Timing API 要更好一些，它可以和相关套件很好的结合：比如说在 Performance 面板中可视化，或通过 Performance Observer 进行观测。

```js
performance.mark('myTask:start')
await task()
performance.mark('myTask:end')
performance.measure('myTask', 'myTask:start', 'myTask:end')
```

见：[User Timing API](https://web.dev/custom-metrics/#user-timing-api)

#### 如何测量元素的渲染时间？

可以使用 Element Timing API。通过给 element 增加 elementtiming 属性，可以在注册 Performance Observer 后监听 element 类型的事件并获得元素渲染时间。LCP 指标就是建立在 ET API 基础上的，只是汇报的是最大内容元素的渲染时间。

```html
<img elementtiming="hero-image" />
<script>
  new PerformanceObserver(/* ... */)
    .observe({ type: 'element', buffered: true })
</script>
```

见：[Element Timing API](https://web.dev/custom-metrics/#element-timing-api)

#### Event Timing API 是什么？

见：[Event Timing API](https://web.dev/custom-metrics/#event-timing-api)

#### Resource Timing API 是什么？

见：[Resource Timing API](https://web.dev/custom-metrics/#resource-timing-api)

#### Navigation Timing API 是什么？

类似于 Resource Timing API，但不同的地方在于它会在导航时被触发，还附带了 DOMContentLoaded 和 load 事件的触发事件。

见：[Navigation Timing API](https://web.dev/custom-metrics/#navigation-timing-api)

#### 除了规范定义数据，还可以上报哪些？

**5W**：时间、地理位置、页面 URL、浏览器、系统、账号 ID、现场还原。**网络**：页面加载方式、Service Worker、HTTP 协议版本、资源压缩方式。**其它**：页面在前台还是后台。

### Links

* [蚂蚁金服如何把前端性能监控做到极致?](https://mp.weixin.qq.com/s/pqFhhb5u6w7gmUutilH5xQ)

## 性能优化

#### 做性能优化的基本法则是什么？

编译层参见 webpack 优化；网络层减少请求；客户端预加载、预渲染、预执行。以及两句名言：“空间换时间”、“串行改并行”。

## SSR 及混合应用优化

#### CSR 是什么？

Client Side Rendering，和 SSR 相对应，指页面渲染、逻辑、路由、请求都是在浏览器发生的。想要提高 CSR 项目的用户体验，可以考虑在编译时通过预渲染首屏、骨架屏等形式对性能指标进行优化，或者，上 SSR。

#### 从 CSR 到 SSR 有哪些过渡方案？

CSP -> CSP with prerender -> SSR with hydration -> static SSR -> SSR

![From CSP to SSR](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220629020645.png)

见：[TODO，Rendering on the Web](https://web.dev/rendering-on-the-web/)、[CSR、SSR、NSR、ESR傻傻分不清楚](https://blog.csdn.net/m0_37411791/article/details/106513195?utm_source=blogxgwz7)

#### ESR 是什么？

TODO，[边缘计算听说过吗？淘宝用它提升了69%的首屏性能](https://juejin.im/post/5ecf90b7f265da76e7651a96)

#### 经典直出方案是什么？

直出指在后端渲染好 HTML 后再回传给客户端这种方式，直出可以节约许多 HTML 渲染及 AJAX 请求的时间，对 Web 前端的侵入性最小。

#### 离线包缓存是什么？

直出方案仍需要把时间花在请求、加载 HTML 上，离线包缓存意味着把 HTML、CSS、JS、数据提前缓存在本地，只有部分需要异步更新的页面才通过请求的方式加载新数据并重新渲染页面。

![直出 VS 离线包缓存](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220628233615.png)

#### 容器化方案是什么？

TODO，http://www.alloyteam.com/2020/06/fast-open-h5/

#### PWA 怎么配合 SSR 做优化？

PWA 能够通过 Service Worker 对缓存进行精细化控制，在客户端使用无头浏览器提前加载 HTML，等到实际加载时请求的就是由 Service Worker 缓存下来的资源了。

![PWA + Headless Webview](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220628235637.png?w=30)

#### NSR 是什么？

Native Side Render，GMTC 2019 UC 团队提到的一种“前端 SSR”方案，它借助浏览器启动一个额外的 JS Runtime，将提前下载好的 HTML 模板和数据预渲染出来。这种方案的瓶颈在于他会带来额外的流量和性能开销，所以如何预测用户行为，提高命中率是非常重要的事。

### Links

* [H5 秒开方案大全](http://www.alloyteam.com/2019/10/h5-performance-optimize)

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

