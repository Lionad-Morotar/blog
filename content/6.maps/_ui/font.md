---
title: 字体
description: 字体是文字的视觉表现形式，是视觉设计的基础。字体的选择、排版、字重、字体大小、行高等都是影响视觉效果的重要因素。
---

#### <Link type='h5' to='https://mgear-file.oss-cn-shanghai.aliyuncs.com/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%20line-height%E3%80%81vertical-align%20-%20%E5%A4%A7%E6%AD%A5%E5%BE%80%E5%89%8D%E8%B5%B0_%E4%B8%8D%E5%9B%9E%E5%A4%B4%20-%20%E5%8D%9A%E5%AE%A2%E5%9B%AD.html' source='https://www.cnblogs.com/wfeicherish/p/8884903.html' >《深入理解：line-height、vertical-align》</Link>

由于每个字体占据的行内的实际高度是要按照字体属性计算的，font-size 指定了 em-square 的大小，但是字体展示在行内的高度（内容区高度）是按照字体的 Ascent 和 Descent 属性计算的，这就是为什么设置了字体的展示范围要比 font-size 大得多。

见下图， font-size 为 100 时，实际的字体展示区域为 $$(Ascent+Descent)*(font-size/em-square)$$

也就是 $$(1100 + 540) * (100 / 1000) = 164px$$

![font-size | https://www.pinterest.com/pin/an-introduction-to-the-inline-formatting-context-explores-lineheight-and-verticalalign-properties-as-well-as-the-font-metrics-underst--54958057934130156/](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210924175812.png)

所以可想而知，line-height 设为数字时，行高为 font-size 的值的倍数关系，是个糟糕的实践。

因为不同字体的属性还不一样，而行盒子计算其自身高度是取每行中个元素的最高点和最低点，这也就导致了行高和字体的高度可能对不上。

![line-box | https://www.pinterest.com/pin/an-introduction-to-the-inline-formatting-context-explores-lineheight-and-verticalalign-properties-as-well-as-the-font-metrics-underst--54958057934130156/](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210924172252.png)

和大家理解的不太一样，line-height：middle 并不是指父元素的中线位置，而是父元素的 base-line + half-x-height。

## 免费商用字体

https://www.figma.com/file/mtPPLBBq4p3RFKucX47wFW/%E5%85%8D%E8%B4%B9%E5%95%86%E7%94%A8%E5%AD%97%E4%BD%93%E5%BA%93-(Community)?type=design&node-id=1-177&mode=design&t=NBLaDAXojVu6beVl-0

## 可变字体

#### <Link type='h5' to='https://mgear-file.oss-cn-shanghai.aliyuncs.com/Silly%20hover%20effects%20and%20the%20future%20of%20web%20typography%20%E2%80%93%20Pixelambacht.html' source='https://pixelambacht.nl/2017/variable-hover-effects/' >《Silly hover effects and the future of web typography》</Link>

可变字体相比普通字体，还携带形变信息等数据，所以我们可以使用 CSS 轻松控制其宽高、大小甚至是 x-height、边缘形状等样式。

作者讨论了几个使用可变字体时需要注意的点：

* 字体的斜体一般会单独设计一套，不应该用可变字体来制作斜体，不然你会在斜体和非斜体两个样式之间得到一些有着奇怪样式的字体。
* 改变字体宽高可能导致布局改变，带来性能和体验问题。
* 相比传统字体文件，可变字体的确能节约 HTTP 请求，但是它并不能对字体加载带来更好的优化效果。
