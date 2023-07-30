# 网站的可访问性

[TOC]

增强页面的可访问目的是使网页能够被更多的人使用，包括残障人士、使用处理性能底下或带宽低的设备的人等。

## 页面观感

### 文字对比度

很多网站会使用白色加灰色文字来创造一种“高级感”，不过使用这种技巧的同时，为了保证可读性，文字一般会变得非常大。所以这种技巧一般使用于各种营销设计页面。而像我这种作为文字阅读类型的网站，我更加需要考虑如何提高阅读的舒适度[^舒适度]，而非挣扎于那些“拐弯抹角”的“高级灰”。所以从建站初期开始，我便跟进了排版技术的学习。

[^舒适度]: 这里是指和文本内容无关的、存粹视觉意义上的舒适度。

如何测试页面上的文字颜色与背景颜色的对比度呢？你可以使用 Chrome 自带的颜色对比度检测工具。看下图，右下角打了勾勾，就说明没啥问题：

![Chrome Inspect](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200718183201.png)

老样子，还是要推荐一下 VisBug 插件，比起 Chrome 自带的东西，虽然不那么好用，但是功能更全一些。下图展示 VisBug 的颜色对比度测试：

![VisBug 的颜色对比度测试](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200718180918.png)

### 图片的替换文本

最基本的可访问性图片标签是怎么写的？有三点建议：

* 给 HTML 中的所有图片都加上 alt 属性
* 给 CSS 中的背景图片对应的 HTML 的容器加上 aria-label 属性
* 装饰性的图案使用空 alt 属性

```html
<img alt="a dog" />

<div class="background-image" aria-label="a dog" />

<img id="decorative-image" alt="" />
```

### 可点击的小玩意儿

页面上的没有文字提示，却又有点击作用的图片、图标、按钮，实在是另人头疼。

我曾在某博客看到一排微信、豆瓣等应用的图标。鼠标悬浮上去，也没有提示。我以为是博主的联系方式。结果点击了，跳出一个分享页面，才知道，嗷，原来是骗我分享用的。

除非是非常棒的、一眼就能让人理解的设计，否则，文字和图片请一起加上吧！就像这样：

![文字+图标](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200718185203.png)

或者，至少加个 title 也行鸭（arial-label 也不能少）！

![带 title 属性的图片](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200718190935.png)

## WAI

W3C 无障碍推进小组（WAI）为提高残障人士的网页体验，指定了一组被国际公认的无障碍标准指南，其中包括：

* [WCAG（网页内容无障碍指南）](https://www.w3.org/TR/WCAG20/)
* [UAAG（用户代理无障碍指南）](https://www.w3.org/TR/2015/NOTE-UAAG20-20151215/)
* [ATAG（创作工具无障碍指南）](https://www.w3.org/TR/2015/REC-ATAG20-20150924/)
* WAI-ARIA（无障碍富网络应用）

## ARIA

为了增强页面相对于屏幕阅读器的可访问性，无障碍富网络应用项目（WAI-ARIA）优雅地给 HTML 元素按照其所在页面的角色（roles，控件的作用）、状态（states，包含的数据）、及角色属性（properties，控件属性）设定元素的语义。比如，你想把一个 div 作为按钮时，就需要给标签加上 `role="button"`。当然，如果你已经用的是 button 了，那就没有再加 `role="button"` 的必要咯。

### roles

按照控件的作用，可以将 roles 划分为以下几类[^category]：

[^category]: [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques)

* **功能控件**：button（按钮）、checkbox（勾选框）、link（链接）、progressbar（进度条）、radio（单选框）、radiogroup（选项组）、switch（开关）、tab（标签页）、slider（轮播）、textbox（文本编辑区）
* **结构控件**：img（图片）、list（列表）、listitem（列表项）
* **坐标控件**：banner（横幅）、search（搜索区）、complementary（补充）、contentinfo（内容信息）、navigation（导航）
* **动态控件**：alert（警告）、计时器（timer）、log（记录）、status（状态栏）
* **窗口控件**：alertdialog（警告框）、dialog（对话框）


### States & Properties

## 反面教材

掘金上的一些文章喜欢直接套用 Markdown Nice 的排版：

![掘金某文章](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200718182207.png?w=70)

从设计的角度而言，这种网格纸背景能给人带来一丝“学习”、“青春”之类的联想，也许能提高读者的阅读理解水平。但这种背景既不吸引注意，又无法忽视它，我不喜欢[^不喜欢格子背景]。

[^不喜欢格子背景]: 也许我上了年纪，不是这种文章的目标读者了~

## 阅读更多

* [The 6 Most Common Accessibility Problems (and How to Fix Them)](https://blog.scottlogic.com/2020/07/02/6-most-common-accessibility-problems.html#empty-links-and-empty-buttons)