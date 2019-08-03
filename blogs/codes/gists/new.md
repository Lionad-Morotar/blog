# new

老生常谈的话题了, 直接展示代码:

```js
function _new (constructor, ...args) {
  if (! (constructor instanceof Function)) {
    throw new Error('constructor must be an function')
  }

  const newObj = Object.create(constructor.prototype)
  const res = constructor.apply(newObj, args)
  return res instanceof Object ? res : newObj
}
```