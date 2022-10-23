# 路由技术

[TOC]

## URL

#### URL 由哪些部分组成？

<!-- TODO same -->

协议头、域名、端口、目录、文件名（index.html）、页面锚、参数。

#### URL 与前端框架的大致交互方式是怎样的？

![[滚吧，react-router ——记React前端路由改造](https://zhuanlan.zhihu.com/p/52693438)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20221023215703.png?type=win11&w=g)

pathname 解析为 params 以及对应的页面名，页面名连同哈希参数以及 search 转换为的 query 四种信息，交由 ReactRouter.Provider 处理，根据路由表渲染出指定的组件。

## 路由

#### 嵌套路由是什么？

嵌套路由体现在页面分割为不同的模块，每个模块嵌套在另一个模块。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/Kapture-2022-09-21-at-07.41.46.gif)

#### 嵌套路由的代码实现？

在 React 中，Context.Consumer 总是消费最近的 Context.Provider 提供的值，所以只要 Context.Provider 每次只解析并提供一层由斜线分割的 pathname 就很容易写出递归写法的嵌套路由。

见：[微前端架构中的路由设计#可嵌套的Provider](https://www.tangshuang.net/8594.html#title-3-1)、[VueRouter Nested@CodeSandBox](https://codesandbox.io/s/nested-views-vue-router-4-examples-hl326)