# 节流

节流指无论 n 秒内有多少事件被触发, 都只执行一次函数

使用场景如: resize, scroll

## polyfill

```js
function throttle (fn, time = 1000) {
  let canRun = true

  return function () {
    if (!canRun) return null 

    canRun = false
    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    })
  }
}
```