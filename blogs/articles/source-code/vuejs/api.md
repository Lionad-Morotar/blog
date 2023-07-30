# VueJS 全局 API

[TOC]

## \$nextTick

阅读这个 API 首先要先熟悉浏览器的任务循环机制。

Vue.\$nextTick 是在实例渲染时被挂载的辅助函数。

```js
// /src/core/instance/render
export function renderMixin(Vue) {
  Vue.prototype.$nextTick = function(fn) {
    // 绑定上下文为 Vue 实例
    return nextTick(fn, this)
  }
}

// 使用的时候，只需要传入回调即可
new Vue({
  mounted() {
    this.$nextTick(() => {
      console.log('callback executed')
    })
  }
})
```

\$nextTick 的本质是，把传入的回调推到当前微任务队列中（queueMicroTask），使其在当前任务队列 DOM 渲染（宏任务）完毕之后执行。它使用一些 HACK 技巧来模拟 queueMicroTask API。

```js
// 执行所有回调
function flushCallbacks() {
  /* ... */
}
// timerFunc 用来存储 hackedQueueMicroTask API
let timerFunc
// 如果运行环境支持 Promise，则使用 Promise.then
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}
// 否则回退到 MutationObserver API（它的回调也会添加到当前微任务队列）
else if (
  !isIE &&
  typeof MutationObserver !== 'undefined' &&
  (isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]')
) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
}
// 否则回退到 setImmediate（其回调被添加到当前宏任务队列）
else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
}
// 最次的情况则选择 setTimeout
else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

为什么会优先选择 setImmediate 而不是 setTimeout 呢？因为根据 HTML 规范，setTimeout 嵌套层数超过 5 级时，其回调的延迟会被限制为至少 4ms，而 setImmediate 则不受约束。

有一段时期的 Vue，暴露了 withMacroTask，可将一些回调强制存放至当前宏任务队列。但是由于宏任务有各种无法规避的问题，此方案被废弃了。源注释是这么说的：

```js
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// Also, using (macro) tasks in event handler would cause some weird behaviors,
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
```

## 阅读更多

- [为什么 setTimeout 有最小时延 4ms](https://mp.weixin.qq.com/s/71039rWm9W15IsrMOaGwZQ)
