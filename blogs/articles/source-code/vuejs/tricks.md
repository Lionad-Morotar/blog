# 源码技巧

[TOC]

#### 如何判断浏览器是否支持事件的 Passive 选项

addEventListener 一般有三个参数，passive 用来放在第三个参数的 passive 属性中，告诉浏览器是否会在事件的回调函数中使用 preventDefault。在浏览器页面滚动时，由于要等待事件的回调函数执行完才能滚动页面，所以可以使用指示 passive 以提高滚动性能。在 VueJS 中，它只是用作一个设置选项，没有实际对应的功能。

以下代码定义了事件的第三个参数 opts 中的 passive 属性的 getter，只要浏览器读取了 passive 属性，就证明它会读取 passive 属性，换句话说，也就是支持 passive。

```js
export let supportsPassive = false
if (inBrowser) {
  try {
    const opts = {}
    Object.defineProperty(opts, 'passive', {
      get() {
        supportsPassive = true
      }
    })
    window.addEventListener('test-passive', null as any, opts)
  } catch (e: any) {}
}
```

#### String.repeat

一般的 String.repeat 的 polyfill 使用递归完成。只要测试能过，用在一般工程中没什么毛病，Vue 中的这个 repeat 函数则有稍许性能提升（也许在《JS 框架设计》里看到过？）。原理是如果 n 是 2 的倍数，则将 str 翻倍，同时 n 减倍，以减少循环次数。

```js
const repeat = (str, n) => {
  let res = ''
  while (n) {
    if (n % 2 === 1) res += str
    if (n > 1) str += str
    n >>= 1
  }
  return res
}
```
