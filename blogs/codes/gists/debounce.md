# 防抖

防抖是指触发事件后, 在 n 秒之后函数将且只能执行一次, 如果此间又触发了事件, 则会重新计算函数执行时间.

使用场景如: 搜索时每当 keyup 事件就会触发即时搜索

## polyfill

```js
function debounce (fn, time = 1000) {
  let timeout = null

  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}
```