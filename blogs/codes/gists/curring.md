# curring

## 1

第一种解决方案使用了 `arguments.callee`, 这是一种不优雅的解决方案. 

因为 `arguments.callee` 会使解释器作不必要的检查, 不可能实现*内联*和*尾递归*, 再者 `this` 指向可能会出问题. 所以严格模式下 `arguments.callee` 是被禁用的.

```js
function curring (fn) {
  const args = []

  return function () {
    if (arguments.length === 0) {
      return fn.apply(this, args)
    } else {
      args.push(...arguments)
      return arguments.callee
    }
  }
}

var sum = curring(
  function () {
    return Array.prototype.slice.call(arguments).reduce((c, h) => c + h, 0)
  }
)

sum(1)
sum(2)
sum(4)
sum() // 7
```