---
title: 浏览器
---

## Statics

* [主流浏览器的新特性支持率](https://wpt.fyi/interop-2023)

## News

* [Web.dev 月刊（新浏览器特性）](/maps/_web/browser/new)
* [CSS 2023](https://developer.chrome.com/blog/css-wrapped-2023?hl=en)

## BaseLine

从 2023-12 月开始，在 caniuse 网站上能看到 Baseline 标志了，见：[Baseline 2023](https://web.dev/blog/baseline2023)

在开源项目 webstatus.dev 可以查看 BaseLine 在各浏览器的支持情况：[WebStatus.dev](https://github.com/GoogleChrome/webstatus.dev)

#### [A definition update for Baseline](https://web.dev/blog/baseline-definition-update?hl=en)

新更新的 Baseline 包含两个关键时间点：

* Newly available：所有主流浏览器开始支持某个特性
* Widely available：Newly available 过后的 30 个月（通常已经覆盖到 95% 的用户）

<q>We have also expanded the core browser set to explicitly include mobile versions of those browsers.</q>

在这个列表里，Edge 的移动端不算主流浏览器，em...

![core browser include mobile versions](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20231227012228.png)

## 浏览器插件

* [Chrome Extensions API](https://developer.chrome.com/docs/extensions/reference/api?hl=zh-cn)

## 架构

* [浏览器原理](/maps/_web/browser/principle)
* [路由技术](/maps/_web/browser/router)

## 开发

#### 事件捕获机制？

浏览器的事件传播分为三个阶段：Capturing、Targeting、Bubbling，顺序上来说是先从根元素一直向目标元素传播，然后再由目标元素向根元素传播。事件捕获默认发生在冒泡阶段，但可以在事件监听时使用 useCapture 参数使回调在 Capture 阶段触发。

![event processing in browser](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/event-capture.svg?w=60)

#### 为什么 passive true 能改善滚动性能？

绑定了事件的 DOM 相关区域会在合成器线程中被标记为 Non-fast Scrollable Region，滚动时，需要等待可能的 JS 执行（比如说 e.preventDefault），将渲染树复合分割为磁贴后，交由栅格线程渲染，最后由 GPU 绘制到界面上。当一个事件标记了 passive: true 之后，合成器线程知悉 JS 执行不会改变滚动事件，所以可以直接走复合、栅格化、渲染的流程。

passive 在 document 绑定 touchmove 或 touchstart 时默认是开启的，但是如果内部使用了 preventDefault，则会使优化失效，在控制台也会报警告。

#### BFCache 是如何运作的？

[BFCache（Back/Forward Cache）](https://www.youtube.com/watch?v=cuPsdRckkF0) 是一种缓存策略。浏览器会把当前页面的快照（包括 JS Heap 快照）缓存到内存中，以便用户从当前页面导航到其它页面短暂浏览后又返回原先页面时，迅速地展现页面。

为了使 BFCache 生效，不能使用 unload、beforeunload 事件，不能指明 window.open，此外，在离开前面前需要连接是关闭状态的（WS、fetch 等）。

见：[BFCache](https://web.dev/bfcache)

#### 浏览器怎么跨页面通信？

考虑兼容性的话需要使用服务器中转，否则使用 Broadcast Channel 非常合适。Broadcast Channel 可以在 Workers 中使用，它能实现同源 URL 下多窗口、多标签或 iFrames 中的通信。

见：[Broadcast Channel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)

#### Compression Streams

* Compression Streams：[Compression Streams are now supported on all browsers](https://web.dev/blog/compressionstreams?hl=en)

#### EventSource

EventSource 是一个基于 HTTP 协议，能在浏览器端自动重连的服务端推送协议。常用于股票、天气等服务端需要实时向客户端推送消息的场景。

见：[Event Source API Test](https://github.com/Lionad-Morotar/read-source-code/blob/6e866c893fc1edb3fa2da1979af0c1b252f81da5/api/event-source/index.html)

## 调试

#### 代码覆盖率怎么看？

通过代码覆盖率选项查看某个页面或某流程中，执行到的 JS 和 CSS 代码的百分比。可以用来优化首屏等场景。

![Code Coverage](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220704211729.png)
