---
title: 浏览器
description: 浏览器引擎、原理、新特性与开发技术
original_path: content/6.maps/_web/browser/index.md
---

## 浏览器引擎

* [浏览器引擎](./browser-engine) - Ladybird 等独立引擎项目

## 浏览器原理

* [浏览器原理](./principle)
* [路由技术](./router)

## 浏览器新特性

* [Web.dev 月刊](./new)
* [主流浏览器的新特性支持率](https://wpt.fyi/interop-2023)
* [CSS 2023](https://developer.chrome.com/blog/css-wrapped-2023?hl=en)

#### JavaScript 向平台层迁移

技术正从 JavaScript 循环中移出，深入平台层，在 CSS 或 HTML 本身中可用（如 popup 属性）。
这意味着开发者可以"删除字节"，将原本需要 JavaScript 实现的功能交给原生平台。

见：[Web of State of the Browser Day Out](https://remysharp.com/2026/03/18/web-of-state-of-the-browser-day-out)：Remy Sharp 的会议回顾

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

#### Baseline 30 个月预测模型

Rachel Andrew 指出，Baseline 数据使得浏览器支持时间可预测：特性从 "newly available" 到
"widely available" 固定需要 30 个月。这意味着开发周期超过一年的项目，可以选用当前尚未
广泛支持但预计上线时已普及的特性，为技术选型提供数据支撑。

见：[Web of State of the Browser Day Out](https://remysharp.com/2026/03/18/web-of-state-of-the-browser-day-out)：Remy Sharp 的会议回顾

## 浏览器插件

* [Chrome Extensions API](https://developer.chrome.com/docs/extensions/reference/api?hl=zh-cn)

## 浏览器开发

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

#### 如何使用 Bookmarklet 快速注入脚本？

Bookmarklet（小书签）是将 JavaScript 代码保存为浏览器书签的技术。将代码包装为 IIFE 并添加 `javascript:` 前缀即可使用。

创建步骤：
1. 编写普通 JavaScript 代码
2. 包装为立即执行函数表达式 (IIFE)
3. URL 编码特殊字符
4. 添加 `javascript:` 前缀

示例代码：
```javascript
javascript:(() => {
  const sheet = new CSSStyleSheet();
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  sheet.insertRule("body { border: 5px solid rebeccapurple !important; }", 0);
})();
```

浏览器长度限制：Firefox/Safari 最大 65,536 字节，Chrome 约 999 万字符。

注意事项：
- 网站 CSP 可能阻止执行
- 存在恶意 bookmarklet 风险（窃取账号凭证等）
- 浏览器会自动去除地址栏中的 `javascript:` 前缀防止误执行

见：[A Complete Guide to Bookmarklets](https://css-tricks.com/a-complete-guide-to-bookmarklets/)

## 调试

#### 代码覆盖率怎么看？

通过代码覆盖率选项查看某个页面或某流程中，执行到的 JS 和 CSS 代码的百分比。可以用来优化首屏等场景。

![Code Coverage](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220704211729.png)

#### Media Source Extensions (MSE) API

MSE 让 JavaScript 能动态构建媒体流并喂给 `<video>`/`<audio>` 元素播放，解耦了播放器和媒体源。不再依赖单一 URL，而是通过 `MediaSource` 对象把多个媒体片段按需拼接。

```javascript
const mediaSource = new MediaSource();
video.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener('sourceopen', () => {
  const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E"');
  sourceBuffer.appendBuffer(videoSegment);
});
```

**有意思的项目方向**：

- **自适应流媒体**：自建 DASH/HLS 客户端，根据网络动态切换码率
- **实时视频拼接**：多路摄像头、屏幕共享、预录片段混剪输出
- **P2P 视频传输**：WebRTC DataChannel + MSE 实现去中心化流媒体
- **浏览器内视频编辑器**：前端剪辑重排，导出片段列表给服务端合成
- **动态广告插入**：直播流中无缝插入广告，平滑过渡
- **字幕/音轨热切换**：多语言音轨、字幕按需加载，无需下载完整文件
