---
title: 低代码
description: 无代码、低代码、高代码，这是一个围绕人机交互的有趣话题。
---

## TODO

* [低代码平台设计的边界问题](https://zhuanlan.zhihu.com/p/361233277)
* [可视化拖拽组件库一些技术要点原理分析](https://juejin.cn/post/6918881497264947207)

## 项目参考

#### 使用 MyBricks 搭建计算器

<!-- ![[使用 MyBricks 搭建一个计算器。png]] -->

## 简介

#### 什么是低码？

低代码是指使用可视化技术来创建应用的平台，特点是应用中的代码量要比传统开发少得多。低码是一种理念，许多商业产品在十几甚至几十年前就开始尝试用 GUI 的方式来开发应用了，只是在今年来才改名叫低码平台。

## 模式

#### React 框架下改变组件父级会导致组件 remount 怎么解决？

可以使用 [KeepAlive](https://mp.weixin.qq.com/s/1fYO__dfUy2MIjHi3IJrmg) 模式解决。在画布的 DOM 结构中用 KeepElement 作为组件的 DOM 包装，而组件本身通过 createPortal 的方式挂载到画布外的地方。这样一来，和拖拽相关的 KeepElement 结构而言组件层级是正确的，对于渲染相关的结构而言，父子结构没有改变，所以不会触发组件的 remount。

## 相关产品

#### 页面搭建类

* [budibase](/maps/_business/_low-code/budibase)

#### 动作编排类（工作流）

* n8n
<!-- * [n8n](/maps/_business/_low-code/n8n) -->

#### 逻辑编排类

* [dynamo](/maps/_business/_low-code/dynamo)
