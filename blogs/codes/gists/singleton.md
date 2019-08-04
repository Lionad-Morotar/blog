# singleton

## 1

JS 中的单例模式十分简单就能实现, 因为 JS 中 `对象` 就是全局内的 `独一无二` 的值.

## 2

可以通过闭包持久化一个变量, 来达到单例模式的效果.

```js
function getInstance (fn) {
  let instance = null

  return function () {
    return instance || (instance = fn.apply(this, arguments))
  }
}
```