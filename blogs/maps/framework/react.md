# React Mind Map

[TOC]

## 架构

#### Fiber 是什么，怎么实现的？

在 React 15 之前更新 VDOM 树时，React 会找到所有差异并一次性地同步更新它们，这可能会导致卡顿。使用 Fiber 后，React 把树的遍历转换为从父节点，到子节点，到兄弟节点，再回到父节点这一流程，使得遍历是可以中断的，分批异步更新 DOM 成为可能。React 可以在浏览器有动画、用户输入任务等高优先级任务时，先执行高优先级任务。直到有空闲才继续执行 Diff 操作。

```js
const tasks = []
function diff (time) {
  while (time > 0 & task.length) {
    doHighLevelWork()
  }
  if (task.length) {
    requestIdelCallBack(diff)
  }
}
requestIdelCallBack(render)
```

#### SyntheticEvent 是什么？

合成事件（SyntheticEvent）是 React 17 以前的事件系统设计思路，它是 DOM 事件上的一层封装。合成事件解决了浏览器兼容性问题，并且通过池化技术减少了内存消耗。不过，池化技术会在事件回收时，将对象属性重置为空，所以合成事件用于异步时，需要提前将值缓存或者使用 event.persist 将事件持久化。

见：[SyntheticEvent](https://reactjs.org/docs/events.html)

#### PureComponent 是怎么更新视图的？

React.PureComponent 中默认在 shouldComponentUpdate 中实现了 state 和 props 的浅比较，以达到性能提升的目的。

#### 受控组件和非受控组件有什么区别？

受控组件通过绑定 value state 以及 onChange 事件来控制表单的状态，使用 HOC 能轻松创建受控组件。非受控组件则直接通过 ref 拿到表单的值。后者的代码要简单不少。

#### React 的生命周期是怎么样的？

组件的生命周期分为 Mount、Update 和 Unmount 三个阶段，每个阶段又可以划分出渲染、预提交和提交三个过程。未挂载的组件会在实例创建好后，调 render 函数更新 DOM 节点，最后触发 componentDidMount 钩子，组件更新时则是根据 props 和 states 通过 shouldComponentUpdate 钩子来判断是否要调用 render 函数。

![React 16.4 Lifecycles](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220627111627.png)

见：[React Lifecycles](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

#### getDerivedStateFromProps 是做什么的？

getDerivedStateFromProps 是 React 16.3 后引入的生命周期，用来替代 componentWillReceiveProps。它用来接受来自 props 的更新，以更新当前组件的 States。在 getDerivedStateFromProps 之后，states 和 props 的改变都会走 shouldComponentUpdate 来确定是否跳过渲染。

```js
static getDerivedStateFromProps(nextProps, prevState) {
  const { type } = nextProps
  if (type !== prevState.type) {
    return {
      type,
    }
  }
  return null
}
```

#### 为什么在 componentDidMount 而不是其它生命周期中取请求数据？

其它生命周期可能执行多次，比如说 componentWillMount 会在服务端和客户端各执行一次。

#### 类组件和函数组件有什么不同？

类组件是面向对象的，函数组件是函数式的，了解前者主要需要知道继承、生命周期概念，后者则是 state、无副作用和引用透明。类组件依靠 shouldComponentUpdate 来优化性能，函数组件使用 React.memo。

#### setState 是同步的还是异步的？

在大部分情况下 setState 是异步的。多次 setState 的状态会被合并，直到当前宏任务跑完才会触发重新渲染。这和 Taro 的思路是一致的。

#### React 和 Vue 有什么异同？

相同的地方在于他们都是渐进式的框架，都有自己的脚手架和最佳实践的模板；在框架层面，数据流都是自顶向下的，都引入了 VDOM。

不同的地方在于 Vue 的数据和视图是双向绑定的，React 推崇不可变数据，并且需要手动优化。所以 Vue 的模板是有利于静态优化的。

## Hooks

TODO

* [useHooks(🐠)](https://usehooks.com/)
* [精读《Hooks 取数 - swr 源码》](https://juejin.cn/post/6844903991730503687)
* [从 UX 与 DX 来谈一谈 React SWR](https://my.oschina.net/wsafight/blog/3133057)

## 应用

#### 什么是 HOC？

高阶组件是一种使用 React 组件的组合特性，把某种组件转换成另一种组件的设计模式，可以用来处理有横切关系的组件。

见：[高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)、[TODO 深入理解 React 高阶组件](https://zhuanlan.zhihu.com/p/24776678)

#### 什么是组件横切关系？

横切关系是那些和程序中大部分模块都有联系的部分，它们形成了切面开发的基础单元。
