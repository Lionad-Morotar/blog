# HTML Mind Map

[TOC]

## 标签明细

#### 语义化标签

常见的语义化标签：

* header：标题栏，字面意义，包含了页面标题、作者信息、编辑日期等内容
* nav：导航栏，通常包含一组列表组织的链接
* main：页面内容主体，每个文档最好只包括一个 main 标签
* aside：侧栏，用来存放和上下文中主要内容不是很密切相关的栏目，如广告栏、搜索、说明性文字等
* footer：页脚，通常包含版权信息、来源、友情链接等内容

#### strong、em、b、i

在观察 VuePress 编译出的 HTML 时，我发现它把 Markdown 文件中两个星号 （**）之间的内容，用 strong 标签给包裹住了。
我想起了以前看 SEO 相关内容时，提到的 HTML 标签，strong、em、b、i 之间的辨析，特意又去 MDN 上看了一眼，加深了一下印象。

* **strong 标签用来表示“本段文本在文中十分重要”**
* em 标签，则是突出和强调的意思，可以理解为平时交谈时的<em>语音着重</em>
* b 标签，最好不要用到，因为他仅仅意味着<b>样式加粗</b>，几乎没有语义，并且**违反了 HTML 和 CSS 的分离原则**
* i 标签，一般情况不会用到，它用来表示文本流中的不同概念的文本，比如英文斜体（书名等）。

简单说明一下这几种标签的应用场景：

* strong 我常用来表示一段文本中的精彩部分，如观点、总结等
* em 强调句子中的重点，比如 “Just <em>do</em> it” 中的 “do”
* b 标签适合用于关键字加粗，比如长文本中出现的产品名称
* i 标签常用于特殊字体标记、外来词汇、词语定义

#### Label

Label 用来表示 input 的标题，并且提供了一些体验优化，比方说点击 Input Checkbox 的 Label 时，相当于点击 Checkbox。

```js
<label for="Name">Number:</label>
<input type="text" name="Name" id="Name"/>
```

见 MDN 的 [示例](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)。

#### [Difference between SRC and HREF](https://stackoverflow.com/questions/3395359/difference-between-src-and-href/21549827#21549827)

这是一个 12 年前的问题，至今为止被浏览了 14w 次。

#### defer VS async

defer 和 async 都是并行下载，defer 延迟执行，async 下载完执行。

![bare script VS defer script VS async script](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220618194223.png)

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