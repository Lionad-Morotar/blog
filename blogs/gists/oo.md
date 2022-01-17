# 面向对象

[TOC]

## UML

类之间的关系总的来说可以包含这几种：

* A依赖B：对类B的修改会影响到类A
* A关联B：对象A知道对象B，类A依赖于类B
* A聚合B：对象A由B构成，类A依赖于类B
* A组合B：对象A由B构成且管理B的生命周期，类A依赖于类B
* A实现B：对象A可视为对象B，类A定义了接口B声明的方法，类A依赖于类B
* A继承B：对象A可视为对象B，类A继承类B的接口和实现，还可以对其扩展，类A依赖于类B

![[Class Relations](https://www.processon.com/diagraming/614de5c01efad403f3727f1c)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/b3612320-5822-48fc-8041-ead5c269f8e5.svg)

![[Object Relations](https://www.processon.com/diagraming/614df346e0b34d7b34328c22)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/cff33e77-e9aa-48eb-ae0d-01dd1561abd0.svg)

## 设计原则

什么是优秀的软件设计？

显然，在不同的公司、不同的项目，软件设计并没有一个恒定的标准，不过总的来说我们会讨论代码复用以及代码的扩展性。

有几个基础的设计准则能帮助你做到这两点：

* 封装变化：找到程序中易变的内容并将其和不变的内容区分开来
* 面向接口：依赖抽象通常优于依赖具体
* 优先组合：组合优于继承，因为继承有着挺多保守诟病之处
* SOLID原则

### 组合优于继承

继承通常会引发大量问题：

* 子类不能减少父类的接口，并且需要保证兼容
* 继承使状态逃离了父类的封装，子类和父类关系过于紧密
* 继承经常被滥用，导致平行继承体系的出现

假设你在售卖一些计算机，这些计算机包含笔记本，台式电脑以及算盘！

如果使用继承的思路组织代码，你很可能对得到以下结构：

![[Computor Structure V1](https://www.processon.com/diagraming/614e0c510791290c0c424dc2)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/348faf14-874b-410d-b4b9-ff00b04ab14e.svg)

使用组合可以方便地把不同的“维度”之间的并行关联拆分出来，降低代码复杂度：

![[Computor Structure V2](https://www.processon.com/diagraming/614e080b637689481b658be2)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/6cbffe1a-8efd-4de6-9ed3-bfef8392bab5.svg)
