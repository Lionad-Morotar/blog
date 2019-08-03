# AOP

AOP 即 Aspect Oriented Programming, 面向切面编程, 本质是在函数之上再进行一层功能的封装, 而这类封装通常十分独立.

比如在小程序项目中, 经常会使用到的将 `Error` 函数进行封装, 执行 `Error` 方法的时候, 自动弹出取消 `loading` 状态, 同时弹出错误信息模态框.

以下是一个 AOP 编程示例:

```js
Function.prototype.prehook = function (fn) {
  const raw = this

  return function () {
    fn.apply(this, arguments)
    return raw.apply(this, arguments)
  }
}

const foo = function () {
  console.log(1)
}

foo = foo.prehook(
  function () {
    console.log(2) 
  }
)
foo()
```

若是使用 ES6 规范下的 Proxy, 能写出更优雅的代码.