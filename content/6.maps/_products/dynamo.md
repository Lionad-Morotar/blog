---
title: Dynamo
description: Dynamo 原本是 Revit 中建筑信息模型 (BIM) 的附加模块，后来发展成熟，成为一个给设计师探索可视化编程、解决问题并自行制作工具的平台。
---

> 一款可视化编程工具，旨在同时供非编程人员和编程人员使用。它使用户能够直观地查看脚本行为、定义自定义逻辑以及使用各种文本编程语言的脚本。

一个 Dynamo 示例：

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501311908636.png)

#### Dynamo Primer

Autodesk 给 Dynamo 编写了一册全面指南，叫 [Dynamo Primer](https://primer.dynamobim.org/zh-cn/index.html)。

* 上下文：“可视化编程”的确切含义是什么？我需要了解哪些概念才能深入了解 Dynamo？
* 快速入门：如何获取 Dynamo 并创建第一个程序？
* 程序中的内容：Dynamo 的功能部分是什么以及如何使用它们？
* 构建块：“数据”是什么，我可以在程序中开始使用哪些基本类型？
* 用于设计的几何体：如何在 Dynamo 中使用几何元素？
* 列表、列表、列表：如何管理和协调数据结构？
* 节点中的代码：如何使用自己的代码开始扩展 Dynamo？
* 计算 BIM: 如何将 Dynamo 与 Revit 模型结合使用？
* 自定义节点：如何创建自己的节点？
* 软件包：如何与社区共享我的工具？

程序需要按照算法来工作，所以这些操作必然遵循输入、处理和输出的基本逻辑。

编程的关键及我们会遇到的第一个障碍是：必须依靠某种形式的抽象形式，才能与计算机进行有效通信。

可视化编程把描述性操作抽象成了节点（及节点关系）。Dynamo 将节点关系描述为“连接，将定义数据流”。下面是一个通过中心点和半径创建圆的例子：

![Dynamo example to create a circle](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501270238695.png)

Dynamo 的开发版本叫做“bleeding edge”。出血（bleeding）是一个设计领域术语，指裁切边缘距材料边缘的距离。

## 界面

节点主要分为如下几个部分，其中，“核心”和“几何”包含最多数量的节点（“核心”是什么？）。

![Dynamo Libs](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501270249685.png)

1. 词典
2. 显示
3. 几何
4. ImportExport
5. 输入
6. 列表
7. 匹配
8. Revit
9. 脚本
10. 字符串
11. 附加模块

可以参考一下节点布局算法。界面中的“节点清理”即节点布局：

![after clean nodes](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501270257741.png)

![一个 Dynamo 节点](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501270309333.png)

<ol>
  <li>名称 - 具有 Category.Name 命名约定的节点名称</li>
  <li>主节点 - 节点的主体 - 在此处单击鼠标右键可显示整个节点级别的选项</li>
  <li>端口（输入输出）- 导线的接受器，它们向节点提供输入数据以及节点操作的结果，有类型和值</li>
  <li>连缀图标 - 表示为匹配列表输入指定的“连缀”选项（稍后再做详细介绍）</li>
  <li>默认值 - 在输入端口上单击鼠标右键 - 某些节点具有可以使用也可以不使用的默认值。</li>
</ol>

节点根据颜色还划分为：非活动、错误、冻结、选中、警告等状态。

所有节点只分三层排列，其命名惯例为：library.category.nodeName。

如何管理大量节点？通过注释标记节点功能、Watch 节点观察节点输出、Group 分组节点。

因为节点的颜色已经被用来表示节点的状态，所以节点层面还缺少一种视觉方式来表示节点的类型。在 PRay 中也许可以使用图标、背景纹案之类的方案。

在工程中 Dynamo 使用分组颜色来区分不用的功能区域。

![dynamo project template](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501311703670.png)

Dynamo 的节点很清晰也很漂亮：

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501270327205.png)

节点的抽象层级应该符合用户的认知层级，过高过低都不行，所以产品设计上经常会有“表达式”这么一个用来描述公式化逻辑的节点。如果要用节点把公式写出来那就太麻烦了，比如黄金螺旋的公式很简单：$x=r\cos(\theta)$, $y=r\sin(\theta)$，但是如果用节点来表达就会变得很复杂，如下图：

![Gold Spiral](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501270345013.png)

怎么处理混乱的输入？

如图，有三种条件逻辑的表达方式，但是为了给这三个节点输入统一的值，输入连线处理得很难看：

![three ways to express conditional logic](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501270349782.png)

应该创建“节点分身”之类的概念，或是“幽灵节点”？操作逻辑可以是：从一个非分身节点复制出一个分身，分身和节点的数据保持一致，两者都可以修改。然后可以将分身节点拖到任意地方使用，这样就解耦了输入和使用方。不过，这样似乎会导致新的混乱，em...

## 几何体

“维数是一种开始对几何图形进行分类的便捷方法，但它不一定是最佳方法。毕竟，我们不仅使用“点”、“线”、“平面”和“方框”建模 - 如果我想要弯曲，该怎么办？”

正如游戏建模中接触的“网格”的概念，Dynamo 中自有一套几何体的数据类型（估计和 Autodesk 其他产品保持一致）：

![Geometry Data Types](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501270420841.png)

之前用过 C4D 和 Blender，这些数据类型都和 Dynamo 的类似（或者说几乎一致？）

![Geometry Types](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501270423147.png)

“抽象”的数据类型不能在屏幕上预览，这和“headless”的概念很类似，都是在界面底层通过操作数据结构来创建一种更基本的“逻辑”，可以没有界面。说“可以”是因为比如“平面”之类的数据类型尽管是抽象的，但（为了操作的便利性）仍可以在界面上预览。

节点冻结用于禁用当前及下游节点，可以避免修改上游节点导致下游节点重新计算带来的巨大性能开销，如下图，冻结了圆和圆锥的 Union 操作。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501270450836.png)

Comfy UI 在跑流程时，节点上会有个进度条显示，暗示当前的执行进度。

两种形式分别对应：实时预览和离线计算。鉴于 PRay 的代码编辑需要实时预览，但是节点的执行机制需要设计成离线式的，也就是全部走异步+防抖的形式。不过，这样的话又会碰到副作用的问题。.. 还是再考虑下。

## 数据结构

对于能接受列表的节点，比如 PolyCurve.ByPoints 和 Circle.ByCenterPointRadius，他们都能接受点列表作为输入，但是逻辑处理机制不同，前者按照点列表生成多段曲线，后者生成多个圆。也就是说，对于后者，似乎存在一个隐式的“循环”操作。

当两个列表长度不匹配时，通过设置“连缀”选项来处理，可选“最短列表”、“笛卡尔积（叉积）”等。鉴于在非绘图绘表的 Web 数据处理一般是操作相同长度的列表，所以这个设计不能直接套用。

因为用节点编排逻辑只是代码的某种子集，所以见到 Dynamo 中有“节点转换到代码”这种功能也不足为奇。在 Dynamo Primer 的“最佳实践”章节，甚至直接提到了可以使用节点到代码功能降低图形复杂度。只是，他还说节点到代码“无法轻松返回”？难道节点到代码丢失了除了节点位置之类的其他信息，或者只是单纯没有代码解析器所以提供这个功能。

![dynamo nodes 2 codes](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501311638043.png)

至于在创建、操作数据和编排逻辑这块，代码的表达性要比节点强太多了，以条件逻辑举例，见下图。

![condition expression](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202501311643375.png)

那么节点强在什么地方呢？举个例子，可视化变成的一个优势是可以直观的观察到数据流，并且提供了更强的人机交互。所以，如果代码块支持用模版语法自定义变量，再由节点作为可控输入，就可以二者的优势。这其实是“函数”，也就是说，代码块本身只是代码，并没有显示的切换成“表达式”、“语句”、“函数”等模式，而传统意义上的代码中的“函数”在可视化编程中是个外显的界面概念。

实际上，在 Dynamo 的“代码块”可以声明“函数”。声明后，其他代码块可以直接调用函数而无需连线。在这里，节点的操作和代码创建函数共享了一整个空间，不过事情似乎会变得更难以理解。

最后，一个节点的示例文档，介绍了输入输出、分类、使用案例，以及进阶使用方法。

![https://dictionary.dynamobim.com/#/Core/Color/Create/Add](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503200342002.png)

* [节点文档](https://dictionary.dynamobim.com)

## 扩展

关于 Dynamo 的自定义节点，找到几个有用的库：

* [Data Shapes](https://data-shapes.io/blog/)：绘图和数据处理用的节点，包含了图表、表单、地图、表格、UI 构建（用户侧的表单等）。
* [BIMORPH Nodes](https://bimorph.com/bimorph-nodes/)：包含了碰撞检测等高级功能，主要面向 CAD、Curve、Revit 之类的数据结构。
* [Bumblebee](https://github.com/ksobon/Bumblebee)：用于操作 Excel，但是最近一次提交在 2019 年。

Data Shapes 太棒了，可以用图表快速分析图中的数据。但是 Github 上只有 50+ 星星，看来 Dynamo 的用户中懂代码的群体还是太小了。其实就连 Dynamo 仓库本身的 Issue 数量也才 300+（未关闭的）。
