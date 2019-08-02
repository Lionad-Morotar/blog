# 对象深拷贝

更健壮的代码还应该考虑更多种类型的 `type`, 同时处理环形对象情况

```js
function cloneObject (source) {
  let target = {}

  for (key in source) {
    if (source.hasOwnProperty(key)) {
      let itemType = Object.prototype.toString.call(source[key]).slice(8, -1)
      switch (itemType) {
        case 'Object':
          target[key] = cloneObject(source[key])
        break
        case 'Array':
          let temp = []
          for (let i = 0; i < source[key].length; i++) {
            temp.push(source[key][i])
          }
          target[key] = temp
        break
        default:
          target[key] = source[key]
      }
    }
  }

  return target
}
```