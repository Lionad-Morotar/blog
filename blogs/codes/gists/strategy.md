# strategy

单例模式的本质是分离算法的实现和算法的调用

```js
const methods = {
  a () {
    console.log(1)
  },
  b () {
    console.log(2)
  }
}

function useMethods (fn) {
  fn.apply(this, arguments)
}

useMethods(methods.a)
```