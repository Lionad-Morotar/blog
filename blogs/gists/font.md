# 字体

[TOC]

##### <Link type='h5' to='https://mgear-file.oss-cn-shanghai.aliyuncs.com/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%20line-height%E3%80%81vertical-align%20-%20%E5%A4%A7%E6%AD%A5%E5%BE%80%E5%89%8D%E8%B5%B0_%E4%B8%8D%E5%9B%9E%E5%A4%B4%20-%20%E5%8D%9A%E5%AE%A2%E5%9B%AD.html' source='https://www.cnblogs.com/wfeicherish/p/8884903.html' >《深入理解：line-height、vertical-align》</Link>

由于每个字体占据的行内的实际高度是要按照字体属性计算的，font-size 指定了 em-square 的大小，但是字体展示在行内的高度（内容区高度）是按照字体的 Ascent 和 Descent 属性计算的，这就是为什么设置了字体的展示范围要比 font-size 大得多。

见下图， font-size 为 100 时，实际的字体展示区域为 $$(Ascent+Descent)*(font-size/em-sqaure)$$

也就是 $$(1100 + 540) * (100 / 1000) = 164px$$

![font-size | https://www.pinterest.com/pin/an-introduction-to-the-inline-formatting-context-explores-lineheight-and-verticalalign-properties-as-well-as-the-font-metrics-underst--54958057934130156/](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210924175812.png)

所以可想而知，line-height 设为数字时，行高为 font-size 的值的倍数关系，是个糟糕的实践。

因为不同字体的属性还不一样，而行盒子计算其自身高度是取每行中个元素的最高点和最低点，这也就导致了行高和字体的高度可能对不上。

![line-box | https://www.pinterest.com/pin/an-introduction-to-the-inline-formatting-context-explores-lineheight-and-verticalalign-properties-as-well-as-the-font-metrics-underst--54958057934130156/](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210924172252.png)

和大家理解的不太一样，line-height：middle 并不是指父元素的中线位置，而是父元素的 base-line + half-x-height。


