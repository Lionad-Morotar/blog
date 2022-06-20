# 面试及知识图谱

[TOC]

## 面试流程

* [反向面试（感兴趣的问题）](./reverse-interview.html)

## JavaScript

* [FrontEnd Mind Map](./front-end-mind-map.html)

## HTML

* [HTML Mind Map](./html-mind-map.html)

## CSS

* [CSS Mind Map](./css-mind-map.html)

## Network

* [Network Mind Map](./network-mind-map.html)

##### [Vue的高频面试](https://zhuanlan.zhihu.com/p/438669938)

* MVVM、MVC 的区别

都是软件架构模式，主要区别是关注点不一样，Controller 用来承接交互操作并触发 Model 的修改，而 ViewModel 和 Model 层是双向绑定的。

* keep-alive 的理解，它是如何实现的，具体缓存的是什么？

keep-alive 是一个内置抽象组件，会根据内部组件的 key，使用 LRU 策略来缓存组件实例。

* Vue 的生命周期

keep-alive 独有 activated 和 deactivated 两个生命周期。

* Vue 子组件和父组件执行顺序

父组件 mount 前，初始化子组件，所以父组件 beforeMount 后直到子组件 mounted 完成，再挂载。update 和 destroy 两个阶段类似，都是子组件先行。

* $route VS $router

$route 是路由信息对象，包含 path、params、hash、query 等，$router 是 vue-router 实例，包含路由跳转方法和钩子函数等。
