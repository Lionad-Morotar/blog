---
title: 可视化
description: 可视化是一种通过图表、图形、地图等视觉元素来传达信息的方式。可视化技术是一种将数据转换为可视化图形的技术，是数据分析的重要手段之一。
---

## 技术

#### 模糊效果的实现

::AspectRatio
---
h: 503px
placeholder: TODO - <Article-G210206-BlurStandards />
---
::

如果打不开的话 P5.js 官网有个简单的示例：[https://editor.p5js.org/p5/sketches/Image:_Blur](https://editor.p5js.org/p5/sketches/Image:_Blur)

原理非常简单，模糊后的像素的颜色由它旁边一些像素点的颜色决定。

我这里使用的是最简单的计算方法，一个点的值由其相邻的八个像素点的值决定：

|  | **x-1**  | **x**  | **x+1** |
|---|---|---|---|
| **y-1** | 1/8  | 1/8  | 1/8  |
| **y** | 1/8  | 0  | 1/8  |
| **y+1** | 1/8  | 1/8  | 1/8  |

我们把某个像素点 (x,y) 附近的八个像素的值代入这个 3x3 表格中与乘积之和，得到的结果，就是模糊后应得的值。这个 3x3 表格也叫掩膜（Mask）。有一种类似原理的算法你们应该听过，叫做“高斯模糊”，只不过高斯模糊的掩膜的权重分配使用了高斯的正态分布函数。

#### <Link type='h5' source='https://www.zhihu.com/question/54918332/answer/142137732' >《高斯模糊的原理是什么，怎样在界面中实现？》</Link>

此回答介绍了高斯模糊算法中的一些优化点：

* 可以使用两个一维高斯滤波替代二维滤波减少运算量
* 可以使用查表法优化

## 概念

## 视错觉的形成原理？

神经科学告诉我们，注意力更像一层滤网，而不是探照灯。视觉（包括其它知觉）的形成并不是因为人被动的接受信息（感觉），而是外界信息传入后，脑内负责记忆、情感的神经网络主动参与到信息的解释中来。这也就意味着眼睛看到事物其实包含了两个阶段：一是物体发射或反射出的光进入眼睛，在视网膜上成像；二是光信号被视网膜上的细胞捕捉后，经由视觉神经网络传入大脑，大脑再对这些信号进行判断和解读 [^theory]。

[^theory]: [《浅析图形中的视觉错视》](https://www.zhihu.com/xen/market/pdf-view/paid_magazine/1395853043884298240)

> 观看从一开始就是有选择的，眼睛对样本做出什么反应，取决于许多生理与心理因素。
> <name>贡布里希</name>

物理性错视：色彩的膨胀感、进退感、冷暖感、轻重感。

由于眼球的上、下运动比左、右运动困难，因而容易疲倦 ；因为疲倦 ，也就觉得上下的距离要比左右的更长了。

* 将两条长短相等的直线垂直摆放，垂线要比水平线略显得略长。
* 徒手画个正方形，是个横向扁长的长方形；标准的正方形倒是看起来竖向扁长。

神经信号的传递并不是像机械电路般“一电到底”：信号在神经细胞传递是依靠生物电，但在神经细胞间的传递则需要依靠物理系统的突触结构。突出结构间产生的物质并不一定会被即刻销毁，所以兴奋的神经网络会产生痕迹效应，也就导致了视觉残像。同时，因为神经细胞兴奋会引起“疲劳”，所以对响应的色彩敏感度也会降低，这导致了补色残像的发生。

错觉的分类：

* 角度或方向的错视
* 分割的错视
* 对比的错视
* 垂直水平的错视
* 上方距离过大错视
* 反转性实体错视

错视图形的作用可以总结为：增强艺术作品的感染力，增强画面趣味性，增强画面空间想象；其表现手法则大致可分为：图底反转、矛盾空间、图形同构 [^express-methods]。

[^express-methods]: [《平面设计中错视图形运用探析》](https://www.zhihu.com/xen/market/pdf-view/paid_magazine/1396623366007263232)

人们在观察一个图形时，我们的视知觉往往会把包围且封闭的部分归结为图，而把未包围的部分看成底，部分情况下也有把大面积的部分看为底，积的部分看为图 [^reversal-theory]。

[^reversal-theory]: [《浅析视错觉手段在平面设计中的运用技巧》](https://xueshu.baidu.com/usercenter/paper/show?paperid=622d7ace43a552f1e6d11575575728f2)

矛盾空间的形成原因是图案违反了现实的透视原理。

同构图形即将事物转化成一种新的形象。
