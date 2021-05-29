# 听说你还在手写懒加载?

[TOC]

过去, 我们对含有大量图片的网站进行优化无外乎要依靠 JS 逻辑或是相关插件来完成, 比如`懒加载`技术. 而现在(至少在不久的将来), Chrome 75 版本将增加`原生懒加载`功能.

![原生懒加载](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/chrome-image-lazyload/2019-04-23-01-30-25.png)

### 直接开始使用

当然, 你也可以现在就开始体验这一功能, 在浏览器的标签栏输入`browser://flags/#enable-lazy-image-loading`并进入页面, 找到`enable-lazy-image-loading`这一项打开它, 重启后即可使用.

![如何开启](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/chrome-image-lazyload/2019-04-23-00-45-26.png)

### 标准之下

有关`loading`的使用, 我相信你想知道更多, 你可以使用以下三个属性来定义浏览器加载行为:

- lazy: 使用懒加载, 当屏幕滚动到图片附近时
- eager: 立即加载图片
- auto: 由浏览器自行决定

有关懒加载的讨论, 你可以通过这个[`issue`](https://github.com/whatwg/html/pull/3752)进一步探索.

### 开始使用新代码

也许你想把这一特征立即运用到你的项目中, 但是你别忘了至少目前为止他还是实验性的功能, 所以需要做功能检测, 对不支持的浏览器进行兼容:

![功能检测](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/chrome-image-lazyload/2019-04-23-01-37-31.png)

仅仅这样还不够, 为了不使你的 Image 标签被不支持`loading`属性的浏览器立即加载出来, 你还需要把`src`属性替换为其它属性, 同时还得考虑浏览器不支持 JS 的情况, 比如像这样做:

![兼容](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/chrome-image-lazyload/2019-04-23-01-31-00.png)

### 抛弃非原生懒加载?

抛弃非原生懒加载? 答案在任何情况下都是`否`.

如果未来浏览器都支持懒加载, 并且标准较现在没有改变的话, 它只适用于一些简单的网页浏览场景, 比如像掘金这种文本和图片混排的页面.对于特殊场景下, 比如[这位老哥](https://juejin.im/post/5cbd30e7e51d456e803516ba)的这篇文章里描绘的问题, 我们还是得需要根据需求, 书写大量原生 JS 逻辑.除非问题本质得到解决, 否者**任何在体验上的优化, 都是优化一部分场景的性能, 而放弃另一部分场景的性能**(甚至负优化)

### 最后

文中代码图片是使用[`Carbon`](https://carbon.now.sh)合成的, 掘金的代码高亮实在是... 么得办法~~

### 阅读更多

* [Native image lazy-loading for the web!](https://addyosmani.com/blog/lazy-loading/)
* [Lazyload images and iframes](https://github.com/whatwg/html/pull/3752)
* [图片和视频的懒加载](https://github.com/dwqs/blog/issues/74)
* [极致性能 – 图片渐进显示和懒加载](http://medium.yintage.com/?p=44)


