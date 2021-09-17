# JavaScript 诡计

## 运行时语法错误

以下案例能证明 JS 存在“动态作用域”以及“运行时语法错误（Syntax Error）”：

```js
;(function() {
  let x = 1
  eval('var x = 2')
  return x
})()
```

## 对象字面量 Setter/Getter

想定义属性的 Setter/Getter，不用成天写 Object.defineProperties 这么麻烦的东西，只需要代码简单如下就行：

```js
const name = 'b'
const a = {
  get [name]() {
    return 'b'
  }
}

a.b // >>> 'b'
```

## 标记模版字面量

和模板字符串类似，只是前面带一个处理函数的标记，如：

```js
function highlight(strings, ...values) {
  let result = ''
  strings.map((str, i) => {
    result += str
    if (values[i]) {
      result += `yes~${values[i]}`
    }
  })
  return result
}
const firstName = 'Lionad'
const lastName = 'RedOne'

highlight`${firstName} ${lastName}`

// >>> yes~Lionad yes~RedOne
```

## Void 运算符

在一些库或开源函数非常喜欢使用 Void 运算符来返回 Undefined，如：

```js
void 0 // 其实 void 后接任何表达式，都会返回 undefined
```

主要作用是用来生成“纯正的” Undefined，因为在某些旧浏览器中，Undefined 能被重新赋值。总的来说，实践意义不是很大。

## 判断 `-0`

`-0` 并不是一个特殊的值，但是在代码中出现时往往会伴随着各种问号操作，如：

```js
;(-1 * -0 ===
  -0 - // -> true
    0) ===
  0 // -> true
'' + -0 // -> '0'
```

但是有方法能甄别出它来，如下：

```js
1 / -0 === -Infinity // -> true
```

```js
Object.is(+0, -0) // -> false
```
