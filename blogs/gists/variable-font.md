# 可变字体

[TOC]

##### <Link type='h5' to='https://mgear-file.oss-cn-shanghai.aliyuncs.com/Silly%20hover%20effects%20and%20the%20future%20of%20web%20typography%20%E2%80%93%20Pixelambacht.html' source='https://pixelambacht.nl/2017/variable-hover-effects/' >《Silly hover effects and the future of web typography》</Link>

可变字体相比普通字体，还携带形变信息等数据，所以我们可以使用 CSS 轻松控制其宽高、大小甚至是 x-height、边缘形状等样式。

作者讨论了几个使用可变字体时需要注意的点：

* 字体的斜体一般会单独设计一套，不应该用可变字体来制作斜体，不然你会在斜体和非斜体两个样式之间得到一些有着奇怪样式的字体。
* 改变字体宽高可能导致布局改变，带来性能和体验问题。
* 相比传统字体文件，可变字体的确能节约 HTTP 请求，但是它并不能对字体加载带来更好的优化效果。

