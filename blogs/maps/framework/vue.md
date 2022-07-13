# Vue Mind Map

[TOC]

## TODO

* [Vue.js 技术揭秘](https://www.zhihu.com/question/390956688/answer/1184696066)
* [vue-design](https://github.com/HcySunYang/vue-design/blob/elegant/docs/art/1start-learn.md)

## 简介

#### MVVM、MVC 的区别

都是软件架构模式，主要区别是关注点不一样，Controller 用来承接交互操作并触发 Model 的修改，而 ViewModel 和 Model 层是双向绑定的。

#### 为什么要重写 Vue2？

有两个关键因素：主流浏览器逐渐兼容 Proxy 以及修复旧的架构上的设计缺陷。

切换到 Proxy 可以修复过去 setter、getter 无法拦截数组修改以及修改了对象本身带来的语义变化的问题，但由于它是一个原生特性，无法 polyfill，所以对 Vue 而言是一个重大的突破性变动。

过去的架构带来了模板很难正确的在 source-map 中追溯、渲染器（如 DOM 渲染器）不是渐进式的可选项的问题，再加上框架内部代码的耦合，使得摇树优化变得困难，代码也不便理解。

见：[重头来过的 Vue 3 带来了什么？](https://zhuanlan.zhihu.com/p/147022323)

## 模板

#### Vue3 双向绑定的原理？

见：[TODO，Vue.js 3.x 双向绑定原理](https://segmentfault.com/a/1190000041716718)

## 编译器

#### Vue3 做的静态优化有哪些？

![Vue3 Compiler Example](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220628022452.png)

## VDOM

#### Vue2 和 Vue3 的 DOM Diff 算法有什么不同？

Vue2 使用双端 diff，Vue3 使用最长递增子序列。

### TODO

为什么 React 的 Diff 算法不采用 Vue 的双端对比算法？https://juejin.cn/post/7116141318853623839

diff 算法深入一下？https://zhuanlan.zhihu.com/p/401340016

聊聊 Vue 的双端 diff 算法 https://zhuanlan.zhihu.com/p/534903909

diff算法之双端对比 https://zhuanlan.zhihu.com/p/432927438

## 组件

#### keep-alive 的理解，它是如何实现的，具体缓存的是什么？

keep-alive 是一个内置抽象组件，会根据内部组件的 key，使用 LRU 策略来缓存组件实例。

#### Vue 的生命周期

keep-alive 独有 activated 和 deactivated 两个生命周期。

#### Vue 子组件和父组件执行顺序

父组件 mount 前，初始化子组件，所以父组件 beforeMount 后直到子组件 mounted 完成，再挂载。update 和 destroy 两个阶段类似，都是子组件先行。

## Vue Router

#### \$route VS \$router

$route 是路由信息对象，包含 path、params、hash、query 等，$router 是 vue-router 实例，包含路由跳转方法和钩子函数等。

## SSR

TODO

[Vue SSR](https://vuejs.org/guide/scaling-up/ssr.html)