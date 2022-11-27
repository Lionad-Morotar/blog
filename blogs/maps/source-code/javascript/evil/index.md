# Evil.js

[TOC]

#### 如何阻止类似 evil.js 的投毒？

* 使用 Function.toString 检测函数是否经过篡改（但是 toString 本身可以被篡改）
* 使用 iFrame 获取相对干净的全局对象（但是 appendChild 和 toString 本身可以被篡改）
* 使用 NodeJS VM 模块获得干净的运行环境
* 使用 ShadowRealm 获得干净的运行环境
* 在代码最上层使用 Object.freeze 冻结全局对象的原型（这会导致依赖改动原型的框架失效，比如 Vue2 修改了数组原型）
* 在代码最上层缓存原型方法的引用，在使用的时候进行对比
* 使用万能的 Proxy

见：[怎么防止 Evil.js 代码投毒](https://www.bilibili.com/video/BV1fe4y1o7kV)