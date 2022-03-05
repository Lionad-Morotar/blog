# 💫 JS 幻术 | 完全 delete 指南

## 前言

能心中有数的指出以下问题的答案，这篇文章就可以跳过不看了：

```js
/*问题一 */
window.one = 1
console.log(window.one) // ???
delete window.one
console.log(window.one) // ???

/*问题二 */
var two = 1
console.log(window.two) // ???
delete window.two
console.log(window.two) // ???

/*问题三 */
console.log(delete 0)

/*问题四 */
var a = { test: 1 }
var b = Object.create(a)
b.test = 'new val'
delete b.test
console.log(b.test) // ???
delete b.test
console.log(b.test) // ???
```

## 为什么 delete 0 返回 true ？

其实，这需要划分为多个步骤：

1. 因为 delete 的作用是“删除对象的某个属性”，所以 delete 0，隐式等于删除全局对象如 window 上的属性
2. 0 是数字，而属性名只能为字符串，所以 delete 0 被隐式转换为 delete window['0'][^return-value]
3. 根据“当属性被删除或不存在则返回 true，属性删除失败或仍存在则返回 false”的原则，delete window['0'] 返回 true

第二步的“隐式转换”是什么意思呢？请看以下代码：

```js
const a = {}
const b = 0

a[b] = 'test'

console.log(a['0']) // -> 'test'
```

可以发现，a[b] 中的 b 隐式转换为了字符串。

不过，很遗憾，尽管 JS 中确实存在隐式转换这么一说，但是以上关于 delete 的解释是**完全错误的**。稍加深入探索，你就会发现，对于控制台直接运行 delete window['0'] 的结果，和上述推断正好相反。此外，delete eval("window['0']") 的结果则更是会让人不可思议。

想要知道 delete 运算符实际是怎么运作的，我们必须回归 [JS 规范](http://www.ecma-international.org/ecma-262/6.0/index.html)。不过 JS 规范太长了，也许我们<del>应该从 MDN 开始</del>可以从最简单的问题二开始，逐步前进。

## 陷入泥泞

为什么可以直接删除 window 对象上的某个属性，但是不能删除某个声明的变量呢？用代码来说就是：

```js
window.haha = 1
delete window.haha // true

var haha = 1
delete window.haha // false
```

参考 MDN 中 delete 运算符文档[^return-value]可以知道：“非严格模式下，删除一个不可配置的属性会返回 false”。那么由这点定义，我们可以猜测，使用 var 关键字声明得到的绑定在 window 对象上的变量是“不可配置的”。可以在控制台通过以下代码检测一下我们的猜想是否正确：

```js
window.udkjs = 1
Object.getOwnPropertyDescriptor(window, 'udkjs')
// -> {value: 1, writable: true, enumerable: true, configurable: true}
delete udkjs
// -> true

var udkjs = 2
Object.getOwnPropertyDescriptor(window, 'udkjs')
// -> {value: 2, writable: true, enumerable: true, configurable: true}
delete udkjs
// -> false
```

## 阅读更多

如果深入探索，你会发现以下奇怪的现象，不过由于其原理超出了本文讨论的范围，我们留到下篇再介绍吧~

```js
var alert = function(s) {
  console.log(s)
}
delete alert
// -> ???
```

```js
function newFn() {}
window.newFn = 'ahahaha'
delete window.newFn
// -> ???
console.log(window.newFn)
// -> ???
```

- [Understanding delete](http://perfectionkills.com/understanding-delete/)

[^return-value]: 参考 MDN 的 delete 运算符的[描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete#%E8%BF%94%E5%9B%9E%E5%80%BC)
