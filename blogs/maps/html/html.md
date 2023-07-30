# HTML Mind Map

[TOC]

## 简介

#### H5 带来了哪些改进？

新增了一些语义化标签如 main；删除了一些纯表现元素如 center；新增了 API 如拖拽、音视频、Canvas、Local Storage、Web Worker 等。

#### 语义化标签有哪些？

常见的语义化标签：

* header：标题栏，字面意义，包含了页面标题、作者信息、编辑日期等内容
* nav：导航栏，通常包含一组列表组织的链接
* main：页面内容主体，每个文档最好只包括一个 main 标签
* aside：侧栏，用来存放和上下文中主要内容不是很密切相关的栏目，如广告栏、搜索、说明性文字等
* footer：页脚，通常包含版权信息、来源、友情链接等内容

#### 如何理解语义化标签？

一是方便搜索引擎或读屏器解析页面，二是方面使开发人员维护，其实，遵守 HTML5 规范是应该做的。

#### 为什么要增强页面的可访问性？

增强页面的可访问目的是使网页能够被更多的人使用，包括残障人士的读屏器、处理性能底下、带宽低的设备等。

## 标签明细

#### http-equiv 有什么用？

是一个 HTML 中的程序指令，可以用来定义 CSP、Content-Type、Refresh 等 HTTP 头部。

```html
<meta http-equiv="refresh" content="0; url=https://www.lionad.art">
```

见：[http-equiv](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv)

#### src 和 href 的区别？

src 即 Source，指使用外部对象替换当前元素；href 即 Hypertext Reference，指元素与外部的链接关系。

见：[Difference between SRC and HREF](https://stackoverflow.com/questions/3395359/difference-between-src-and-href/21549827#21549827)，这是一个 12 年前的问题，至今为止被浏览了 14w 次。

#### defer VS async

defer 和 async 都是并行下载，defer 延迟执行，async 下载完执行。

![bare script VS defer script VS async script](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220618194223.png)

#### strong、em、b、i 有什么不同？

* strong 表示本段文本在文中**语义上**十分重要，如精彩观点
* em 可以理解为平时交谈时的<em>语音着重</em>
* b 仅仅意味着<b>样式加粗</b>，没有语义，可用于长文本中的产品名称加粗
* i 标签，一般用来表示外来词汇、英文书名或词语定义

VuePress 会把 Markdown 文件中两个星号（**）中的内容，用 strong 包裹住。

#### label 是什么？

label 用来表示 input 的标题，并且提供了一些体验优化，比方说点击 Input Checkbox 的 label 时，相当于点击 Checkbox。

```js
<label for="Name">Number:</label>
<input type="text" name="Name" id="Name"/>
```

见 MDN 的 [示例](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)。

#### 使用 iframe 需要注意什么？

iframe 会和父页面共享 TCP 并发上限，也会阻塞父页面的 onload 事件。可以等页面加载完再动态设置 src 属性，就可以规避以上问题。

## H5

#### 离线储存（manifest）

看起来很有用的东西，工程上用不到，但是面试会问，很奇怪。

manifest 机制的硬伤在于它是根据规则强制缓存的，只有用户手动清除缓存或者改变 manifest 文件本身，缓存的内容才有机会改变。后者意味着这是建立在文件名对比机制上的缓存机制，所以不可靠。

其次，尽管大多数浏览器支持 manifest，单它其实是一个废弃了的东西，见 [MDN manifest](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html/manifest)。

见 [为什么 .appcache 没有得到大规模应用？它有哪些硬伤吗？](https://www.zhihu.com/question/29876535/answer/2534558479)。

#### Web Worker

* Worker 可以降低主线程的计算压力，不会导致 UI 卡顿。
* SharedWorker 是在同域下共享数据的一个解决方案。
* ServiceWorker 可以缓存资源，提供离线服务。

## 更多

* [高频前端面试题汇总之 HTML 篇](https://juejin.cn/post/6905294475539513352)