# 浏览器相关

[TOC]

## 组成原理

#### 浏览器有哪些组件 / 浏览器架构？

![浏览器的主要组件](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200811234200.png)

#### 进程和线程的区别是什么？

进程是系统分配资源的最小单位，线程是 CPU 调度的最小单位。线程间资源独立，但是启动、切换和通讯代价较大。线程间资源共享，但一个卡死全员卡死。

#### 浏览器的进程线程结构是怎么样的？

一般浏览器由主进程（浏览器进程）、渲染进程（浏览器内核）、插件进程和GPU 进程组成。和页面渲染相关的是渲染进程，一般由网络请求线程、脚本引擎线程、GUI 渲染线程、合成器线程、光栅线程、事件触发线程、定时器线程和 Worker 线程组成。

#### 每个页面都有一个对应的渲染进程吗？

一般来说是的，给页面一个独立的渲染进程，可以保证该页面崩溃的时候不会影响其它页面。如果页面内有跨站 iFrame，那么会由新的渲染进程接管，这样更安全。此外，由于创建和维持页面的渲染进程需要消耗大量内存，所以浏览器的实践是在进程数达到一定限制后，新页面会共享老页面的渲染进程。

#### Service Worker 是如何工作的？

注册 Service Worker 时，浏览器会保存其作用域。每当请求一个新的资源时，浏览器通过比对资源 URL 是否在某个 Service Worker 的职责中。如果是，会在渲染进程中执行 Service Worker 代码，它可能中缓存中加载数据（同时中止网络请求），也可能从网上请求新的资源。

#### 为什么渲染和脚本执行不可以同时进行？

由于 JS 执行过程中可能操作 DOM，所以为了防止渲染时同时执行脚本导致前后结果的不一致，脚本线程和 GUI 线程被设计为互斥的：JS 执行时 GUI 会被挂起，等到 JS 线程空闲 GUI 才会更新。

#### WebWorker 和 SharedWorker 的资源是谁来管理的？

WebWorker 由当前页面进程管理，它是一个新的线程；SharedWorker 由浏览器的 SharedWorker 进程管理。

## 网络请求

#### 请求 CDN 中的资源的流程是怎样的？

1. 发请求，本地 DNS 服务器根据记录将请求重定向到 CDN 专用的 DNS 服务器
2. CDN 专用 DNS 服务器将全局负载均衡服务器的 IP 地址返回给用户
3. 发请求，负载均衡根据用户 IP 将区域负载均衡设备 IP 地址返回给用户
4. 发请求，区域负载均衡设备将缓存服务器 IP 地址返回给用户
5. 发请求，根据各级缓存服务器查找对应资源

## 解析

#### 浏览器怎么根据请求的文件类型来进一步处理？

可以根据 HTTP Header 中携带的 Content-Type 或是 MIME 嗅探技术来判断文件类型。如果是 HTML 之类的文档则交由渲染进程，如果是其他文件，则转交给下载管理器。

#### 渲染进程的大致工作流程是怎样的？

具体工作流程因浏览器而异，但总体而言都是要解析文档与资源并将其渲染至屏幕。总的来说分为解析、构建、布局和渲染四个步骤。

渲染引擎会从网络线程中逐缓存区地取出文档（8KB）进行解析。

解析分 HTML、CSS 和 JS。解析 HTML 时是一个从字符流到标记（Tokenizing），再到带属性对象（Lexing），最后组成 DOM Tree 的过程。解析 CSS 类似，最后会组成 CSSOM Tree。如果是普通脚本，解析时会阻塞 DOM Tree 和 CSSOM Tree 的构建。

当 DOM Tree 和 CSSOM Tree 准备好后，依据 CSS 规范构建渲染树。渲染树将会被带入布局处理，计算节点在屏幕上的精确坐标，随后在图层合层过程中分割为磁贴，并交由栅格线程栅格化并储存在显存中。最后，由浏览器主进程通知渲染GPU 进程渲染页面。

#### 为什么解析 HTML 无法使用自上而下或自下而上的解析器？

TODO。主要是因为其语言规范宽松，并且内容在解析时可能发生改变。

#### 碰到错误的标签会怎么处理？

看具体的浏览器。一般来说，碰到错误的内容，解析器和 DOM Tree 的构建过程都会想方设法去揣摩正确的代码。浏览器是很包容的。

#### CSS 解析和 HTML 的有什么不同？

因为 CSS 的语法上下文无关，所以可以使用传统的解析器进行解析，比如 WebKit 使用 Bison 解析 CSS。CSS 的词法及语法都由 CSS 规范定义好了。词法用正则描述，比如 num: [0-9]+|[0-9]*\.[0-9]+，语法则用 BNF（巴科斯范式）描述。

#### 构建渲染树时用了什么优化策略？

样式计算是一个复杂操作，因为 DOM Tree 和 CSSOM Tree 都是树状结构。DOM 元素都携带了样式属性，这会消耗了大量的内存，并且，样式的嵌套和层叠会引发计算性能问题。

WebKit 使用共享渲染样式对象来优化，但要求元素类名相同、属性及值相同，且不能由 Inline，且不能使用 ID 选择器、属性选择器、同级选择器。

Firefox 使用了**规则树**这一方案。TODO

![规则树](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200813142147.png)

## 渲染

#### 如何避免重绘与回流？

渲染树将会被带入布局处理，计算节点在屏幕上的精确坐标，随后在图层合层过程中分割为磁贴，并交由栅格线程栅格化并储存在显存中。如果更改了节点宽高等属性，可能需要从新计算渲染树，然后从布局开始执行逻辑，这叫做回流。如果只是改动节点的文字颜色等属性，只要从重新绘制单个节点开始，这叫做重绘。所以避免回流和重绘，需要减少更改样式的频率，或者换方式实现。

浏览器会用一个队列缓存频繁的重绘和回流相关操作，但是如果用了 getComputedStyle、getBoundingRect 接口，会立即清空队列，所以频繁使用此类接口是有害性能的。

#### DOMContentLoaded 和 onload 事件先后顺序是？

所有同步脚本执行完，DOM Tree 构建好之后，触发 DOMContentLoaded。所有样式、图片都加载完了才会触发 window.onload。

#### 复合（Composite）是什么？

复合是将页面分割为不同的图层，分别栅格化，然后组合为帧的流程。

![Composite Thread](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220627000101.png)

#### 图层是什么？

图层是用来管理渲染树的一种结构。在一个图层中的渲染树的所有节点都会经过布局再交给 GPU 绘制，若 DOM 元素发生改变，可能会引起相应图层中的回流与重绘。可以通过通过 translate3D、will-change 等方式创建新图层（复合图层），这样一来相关元素会被单独绘制，不会影响默认图层。

#### 浏览器硬件加速是指什么？

硬件加速是通过指定 transform、opacity、filter 等 CSS 属性，使浏览器使用很大并行计算能力的 GPU 替 CPU 分担这些元素的渲染工作，降低 CPU 负载，达到渲染更加流畅的效果。使用硬件加速的图层都会使用新图层绘制，所以为了提前告知浏览器，将元素直接渲染至新图层，而不是从默认图层中拷贝过去，可以使用 will-change 属性明示。

见：[搞懂 GPU 和 CSS 硬件加速](https://zhuanlan.zhihu.com/p/404656386)

## 浏览器操作

#### 从输入 URL 到页面显示的过程？

1. 浏览器进程响应键鼠操作，将 URL 传递给网络线程准备进行请求。
2. 根据 Expired、Cache-Control 查看缓存是否过期。如果已过期，则携带 If-Modified-Since、If-Match 字段准备发起请求。
3. 解析域名，DNS 查址。涉及浏览器、操作系统、HOSTS、路由器、各级 DNS 服务器缓存。
4. 如果是请求 CDN 中的资源，见：[请求 CDN 中的资源的流程是怎样的？](#请求-cdn-中的资源的流程是怎样的)
5. 建立 TCP 链接。如果是 HTTPS，涉及 HTTPS 握手过程和 CA 认证过程。
6. 服务器收到请求，根据 Nginx 重新向到具体文件后，检查 If-Modified-Since、If-Match 字段。缓存新鲜则返回 304，否则计算并设置 Etag 返回最新资源。
7. 浏览器根据响应，缓存资源。
8. 渲染进程开始渲染，见：[渲染进程的大致工作流程是怎样的？](#渲染进程的大致工作流程是怎样的)
9. 渲染结束，所以资源加载完毕，触发 onload 事件。

#### 简单介绍一下浏览器的事件捕获机制？

浏览器的事件传播分为三个阶段：Capturing、Targeting、Bubbling，顺序上来说是先从根元素一直向目标元素传播，然后再由目标元素向根元素传播。事件捕获默认发生在冒泡阶段，但可以在事件监听时使用 useCapture 参数使回调在 Capture 阶段触发。

![event processing in browser](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/event-capture.svg?w=60)

#### 为什么 passive true 能改善滚动性能？

绑定了事件的 DOM 相关区域会在合成器线程中被标记为 Non-fast Scrollable Region，滚动时，需要等待可能的 JS 执行（比如说 e.preventDefault），将渲染树复合分割为磁贴后，交由栅格线程渲染，最后由 GPU 绘制到界面上。当一个事件标记了 passive: true 之后，合成器线程知悉 JS 执行不会改变滚动事件，所以可以直接走复合、栅格化、渲染的流程。

passive 在 document 绑定 touchmove 或 touchstart 时默认是开启的，但是如果内部使用了 preventDefault，则会使优化失效，在控制台也会报警告。

#### BFCache 是如何运作的？

[BFCache（Back/Forward Cache）](https://www.youtube.com/watch?v=cuPsdRckkF0)是一种缓存策略。浏览器会把当前页面的快照（包括 JS Heap 快照）缓存到内存中，以便用户从当前页面导航到其它页面短暂浏览后又返回原先页面时，迅速地展现页面。

为了使 BFCache 生效，不能使用 unload、beforeunload 事件，不能指明 window.open，此外，在离开前面前需要连接是关闭状态的（WS、fetch 等）。

见：[BFCache](https://web.dev/bfcache)

#### 浏览器怎么跨页面通信？

考虑兼容性的话需要使用服务器中转，否则使用 Broadcast Channel 非常合适。Broadcast Channel 可以在 Workers 中使用，它能实现同源 URL 下多窗口、多标签或 iFrames 中的通信。

见：[Broadcast Channel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)

## Dev Tools

#### 代码覆盖率怎么看？

通过代码覆盖率选项查看某个页面或某流程中，执行到的 JS 和 CSS 代码的百分比。可以用来优化首屏等场景。

![Code Coverage](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220704211729.png)

## API

#### EventSource

EventSource 是一个基于 HTTP 协议，能在浏览器端自动重连的服务端推送协议。常用于股票、天气等服务端需要实时向客户端推送消息的场景。

见：[Event Source API Test](https://github.com/Lionad-Morotar/read-source-code/blob/6e866c893fc1edb3fa2da1979af0c1b252f81da5/api/event-source/index.html)

## TODO

* [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
* [HTML SPEC](https://html.spec.whatwg.org/multipage/parsing.html#parsing)
* [CSS Selectors Level 3](https://www.w3.org/TR/selectors-3/#grammar)
* [Inside look at modern web browser (part 1)](https://developer.chrome.com/blog/inside-browser-part1/)
* [图解浏览器的基本工作原理](https://zhuanlan.zhihu.com/p/47407398)，现代浏览器内部原理系列的中文翻译其一。
* [浏览器地址栏中输入URL到页面显示，浏览器到底发生了什么？](https://www.starryskystar.space/detail/612beeddf1daf402f34f4fa5)，综合笔记。
- [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)
- [构造函数与 new 命令](https://javascript.ruanyifeng.com/oop/basic.html)
- [V8 之旅：垃圾回收器](http://newhtml.net/v8-garbage-collection/)
- [Concurrent marking in V8](https://v8.dev/blog/concurrent-marking)
- [内存分析与内存泄漏定位](https://juejin.im/post/59fbdb46f265da4321536565)