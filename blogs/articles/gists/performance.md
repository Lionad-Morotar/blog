# 页面性能评估方案

没有性能指标，页面性能很难被“描述”出来，因为评估性能的好坏需要对比，比方说：

* 某个用户访问页面可能要比另某个用户快。快的原因可能是他的网络条件更好（100M光纤 VS. 50M光纤）、设备处理性能更高（台式电脑 VS. 手机）。
* 两个页面在同一时间触发了 onLoad 事件（对浏览器来说两个页面同时加载完毕），但是用户就是感觉其中某个页面更快。页面白屏时间、内容闪烁的强度、渲染是否是渐进式的、页面的可交互时间...这些内容都会影响用户对页面加载速度的判定。

所以我们需要性能指标来描述页面性能。概括来说，评估页面性能即评估以下几个方面的内容：

* 加载耗时：花了多少时间解析代码并渲染到页面上。
* 加载时反应耗时：页面加载时会同时解析、运行脚本，这时候是“无反应”的，不论用户点击按钮还是点击输入框，浏览器都响应。
* 运行时反应耗时：页面加载完毕后，用户交互需要多久才会被响应。比如用户点击提交按钮后，多久才会得到用来展示处理结果的弹窗。
* 运行时帧率：帧率，即每秒渲染到屏幕的次数。
* 视觉稳定性：页面内容不应该发生突然的变化，比如瞬间移动、突然消失。此外，页面帧率也应该保持稳定。

可以发现，性能指标所代表的意义最终会回归到“用户体验”。随着技术的进步，用户的体验阀值被不断推高，开发需要与时俱进，甚至要领先技术一步，才能满足用户体验。

## 性能指标

页面加载时会有一些基础的性能数据。“数据”意味着这是可精准测量的数字，即是定量的指标。下图表明了根据 Navigation Timing 规范，浏览器从发起请求到页面加载完毕期间记录的各关键操作时间节点。

![](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/page-load.svg)

我们可以使用 JS 获取页面的性能数据：

```js
console.log(performance.timing)

{
  domainLookupEnd: 1609911752411
  domainLookupStart: 1609911752411
  fetchStart: 1609911752411
  /* ... */ 
  responseEnd: 1609911752706
}
```

<details>
  <summary>点此查看完整的 Navigation Timing 性能数据示例。</summary>
  <Highlight>
    {
      connectEnd: 1609911752411
      connectStart: 1609911752411
      domComplete: 1609911753413
      domContentLoadedEventEnd: 1609911753047
      domContentLoadedEventStart: 1609911753037
      domInteractive: 1609911752927
      domLoading: 1609911752716
      domainLookupEnd: 1609911752411
      domainLookupStart: 1609911752411
      fetchStart: 1609911752411
      loadEventEnd: 1609911753417
      loadEventStart: 1609911753415
      navigationStart: 1609911752395
      redirectEnd: 0
      redirectStart: 0
      requestStart: 1609911752411
      responseEnd: 1609911752706
      responseStart: 1609911752690
      secureConnectionStart: 0
      unloadEventEnd: 1609911752709
      unloadEventStart: 1609911752709
    }
  </Highlight>
</details>

如果想要知道浏览器请求某个网页时花费了多少 DNS 查询时间多久，那么只要用 domainLookupEnd - domainLookupStart 就得到结果了。

## 性能模型

页面性能模型和数据指标概念上有所不同。性能模型是按照固定算法将指标聚合形成的用来描述页面性能的方法。比方说，页面白屏时间可以被描述为：请求、下载资源时间 + 解析文档与样式时间 + 构建渲染树时间。

没有性能模型，许多综合性的指标无法恒定，以下图为例，图片展现了两个加载时间完全相同的页面因渐进式渲染带来的两种体验。

![页面的渐进式渲染](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/progressive-rendering.png)

**性能模型分为两种：通用性能模型和自定义性能模型。**

通用性能指标是指像 [Web Vitals](https://web.dev/vitals/) 这种，不相关业务的、可直接拿来使用的最佳实践。

<div style="display:flex; justify-content:space-evenly;">
  <img src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/lcp_ux.svg" width="33%" alt="Largest Contentful Paint threshold recommendations">
  <img src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/fid_ux.svg" width="33%" alt="First Input Delay threshold recommendations">
  <img src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/cls_ux.svg" width="33%" alt="Cumulative Layout Shift threshold recommendations">
</div>

Web Vitals 主要评估以下维度的数据：

* [LCP（Largest Contentful Paint）](https://web.dev/lcp/)：最大内容渲染时间，指页面从开始加载到视窗内最大的图片或文本块的渲染时间。
* [FID（First Input Delay）](https://web.dev/fid/)：页面可交互时间。可交互指：某个按钮可点击、输入框可聚焦并输入...
* [CLS（Cumulative Layout Shift）](https://web.dev/cls/)：布局偏移评分。若视图加载时，渲染内容发生了位置变换，那么评分就会降低。

自定义性能模型说起来比较宽泛，可以包含各式各样的内容，举几个例子：

* 在单页面应用中，点击菜单切换页面到渲染完毕，耗时多少？
* 业务数据缓存在 local storage 中，只有特定用户能访问到，那么命中率是多少？

这就需要结合业务去制定具体的评估性能的模型了。

## 评估工具



## 阅读更多

* [Custom metrics](https://web.dev/custom-metrics/)
* [Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report)

[^api]: [User Timing API](https://w3c.github.io/user-timing/)、[Long Tasks API](https://w3c.github.io/longtasks/)、[Element Timing API](https://wicg.github.io/element-timing/)、[Navigation Timing API](https://w3c.github.io/navigation-timing/)、[Resource Timing API](https://w3c.github.io/resource-timing/)、[Server timing](https://w3c.github.io/server-timing/)