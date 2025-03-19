---
title: 面相对象编程
description: 面向对象编程是一种编程范式，它将数据和操作封装在对象中，对象之间通过消息传递进行通信。
---

#### 面向对象主要关注哪些方面？

四个核心概念：封装（Encapsulation）、继承（Inheritance）、多态（Polymorphism）、抽象（Abstraction）。

见：[JavaScript OOP 面向对象编程 @Mosh](https://www.bilibili.com/video/BV1gb411w7eW)，非常基础，适合新手入门

#### 面相对象和设计模式的关系？

一般意义上的设计模式指的是在 OOP 编程范式的实践下总结出来的一些用来解决特定问题的代码设计经验。

见：[设计模式](/maps/_software/design-patterns)

## UML

类之间的关系总的来说可以包含这几种：

* A 依赖 B：对类 B 的修改会影响到类 A
* A 关联 B：对象 A 知道对象 B，类 A 依赖于类 B
* A 聚合 B：对象 A 由 B 构成，类 A 依赖于类 B
* A 组合 B：对象 A 由 B 构成且管理 B 的生命周期，类 A 依赖于类 B
* A 实现 B：对象 A 可视为对象 B，类 A 定义了接口 B 声明的方法，类 A 依赖于类 B
* A 继承 B：对象 A 可视为对象 B，类 A 继承类 B 的接口和实现，还可以对其扩展，类 A 依赖于类 B

![[Class Relations](https://www.processon.com/diagraming/614de5c01efad403f3727f1c)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/b3612320-5822-48fc-8041-ead5c269f8e5.svg)

![[Object Relations](https://www.processon.com/diagraming/614df346e0b34d7b34328c22)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/cff33e77-e9aa-48eb-ae0d-01dd1561abd0.svg)

## 设计原则

什么是优秀的软件设计？

显然，在不同的公司、不同的项目，软件设计并没有一个恒定的标准，不过总的来说我们会讨论代码复用以及代码的扩展性。

有几个基础的设计准则能帮助你做到这两点：

* 封装变化：找到程序中易变的内容并将其和不变的内容区分开来
* 面向接口：依赖抽象通常优于依赖具体
* 优先组合：组合优于继承，因为继承有着挺多保守诟病之处
* SOLID 原则

### 组合优于继承

继承通常会引发大量问题：

* 子类不能减少父类的接口，并且需要保证兼容
* 继承使状态逃离了父类的封装，子类和父类关系过于紧密
* 继承经常被滥用，导致平行继承体系的出现

假设你在售卖一些计算机，这些计算机包含笔记本，台式电脑以及算盘！

如果使用继承的思路组织代码，你很可能对得到以下结构：

![[Computer Structure V1](https://www.processon.com/diagraming/614e0c510791290c0c424dc2)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/348faf14-874b-410d-b4b9-ff00b04ab14e.svg)

使用组合可以方便地把不同的“维度”之间的并行关联拆分出来，降低代码复杂度：

![[Computer Structure V2](https://www.processon.com/diagraming/614e080b637689481b658be2)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/6cbffe1a-8efd-4de6-9ed3-bfef8392bab5.svg)
