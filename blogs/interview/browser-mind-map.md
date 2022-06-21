# 浏览器相关

[TOC]

## 组成原理

#### 浏览器有哪些组件（架构）？

![浏览器的主要组件](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200811234200.png)

#### 进程和线程的区别是什么？

进程是系统分配资源的最小单位，线程是 CPU 调度的最小单位。线程间资源独立，但是启动、切换和通讯代价较大。线程间资源共享，但一个卡死全员卡死。

#### 浏览器的进程线程结构是怎么样的？

一般浏览器由主进程（浏览器进程）、渲染进程（浏览器内核）、插件进程和GPU 进程组成。和前端相关最紧密的是渲染进程，由网络请求请求、脚本引擎线程、GUI 渲染线程、事件触发线程和定时器组成。

#### 为什么渲染和脚本执行不可以同时进行？

由于 JS 执行过程中可能操作 DOM，所以为了防止渲染时同时执行脚本导致前后结果的不一致，脚本线程和 GUI 线程被设计为互斥的：JS 执行时 GUI 会被挂起，等到 JS 线程空闲 GUI 才会更新。

#### WebWorker 和 SharedWorker 的资源是谁来管理的？

WebWorker 由当前页面进程管理，它是一个新的线程；SharedWorker 由浏览器的 SharedWorker 进程管理。

## 解析与渲染

#### 渲染进程的工作流程是怎样的？

具体工作流程因浏览器而异，但总体而言都是要解析文档与资源并将其渲染至屏幕。总的来说分为解析、构建、布局和渲染四个步骤。

渲染引擎会从网络线程中逐缓存区地取出文档（8KB）进行解析。

解析分 HTML、CSS 和 JS。解析 HTML 时是一个从字符流到标记（Tokenizing），再到带属性对象（Lexing），最后组成 DOM Tree 的过程。解析 CSS 类似，最后会组成 CSSOM Tree。如果是普通脚本，解析时会阻塞 DOM Tree 和 CSSOM Tree 的构建。

当 DOM Tree 和 CSSOM Tree 准备好后，依据 CSS 规范构建渲染树。渲染树将会被带入布局处理，计算节点在屏幕上的精确坐标，随后在图层合层过程中渲染成像素。最后，交由浏览器主进程渲染（主进程依赖底层 GPU 进程）。

#### DOMContentLoaded 和 onload 事件的先后是？

所有同步脚本执行完，DOM Tree 构建好之后，触发 DOMContentLoaded。所有样式、图片都加载完了才会触发 window.onload。

#### 图层是什么？

图层是用来管理渲染树的一种结构。在一个图层中的渲染树的所有节点都会经过布局再交给 GPU 绘制，若 DOM 元素发生改变，可能会引起相应图层中的回流与重绘。可以通过通过 translate3D、will-change 等方式创建新图层（复合图层），这样一来相关元素会被单独绘制，不会影响默认图层。

#### 为什么解析 HTML 无法使用自上而下或自下而上的解析器？

TODO。主要是因为其语言规范宽松，并且内容在解析时可能发生改变。

#### 碰到错误的标签会怎么处理？

看具体的浏览器。一般来说，碰到错误的内容，解析器和 DOM Tree 的构建过程都会想方设法去揣摩正确的代码。浏览器是很包容的。

#### CSS 解析和 HTML 的有什么不同？

因为 CSS 的语法上下文无关，所以可以使用传统的解析器进行解析，比如 Webkit 使用 Bison 解析 CSS。CSS 的词法及语法都由 CSS 规范定义好了。词法用正则描述，比如 num: [0-9]+|[0-9]*\.[0-9]+，语法则用 BNF（巴科斯范式）描述。

#### 构建渲染树时用了什么优化策略？

样式计算是一个复杂操作，因为 DOM Tree 和 CSSOM Tree 都是树状结构。DOM 元素都携带了样式属性，这会消耗了大量的内存，并且，样式的嵌套和层叠会引发计算性能问题。

WebKit 使用共享渲染样式对象来优化，但要求元素类名相同、属性及值相同，且不能由 Inline，且不能使用 ID 选择器、属性选择器、同级选择器。

Firefox 使用了**规则树**这一方案。TODO

![规则树](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200813142147.png)

## 缓存

#### BFCache 是如何运作的？

[BFCache（Back/Forward Cache）](https://www.youtube.com/watch?v=cuPsdRckkF0)是一种缓存策略。浏览器会把当前页面的快照（包括 JS Heap 快照）缓存到内存中，以便用户从当前页面导航到其它页面短暂浏览后又返回原先页面时，迅速地展现页面。

为了使 BFCache 生效，不能使用 unload、beforeunload 事件，不能指明 window.open，此外，在离开前面前需要连接是关闭状态的（WS、fetch 等）。

见：[BFCache](https://web.dev/bfcache)

## 阅读更多

* [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
* [HTML SPEC](https://html.spec.whatwg.org/multipage/parsing.html#parsing)
* [CSS Selectors Level 3](https://www.w3.org/TR/selectors-3/#grammar)