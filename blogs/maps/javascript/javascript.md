# JavaScript Mind Map

[TOC]

## ECMA 规范

TODO，[JavaScript 核心原理解析](https://time.geekbang.org/column/article/164312)

#### 语言类型和规范类型的关系是怎么样的？

规范定义了 Null、Undefined、Object、String、Symbol、Number、BigInt、Boolean 总计[共 8 种语言类型](https://262.ecma-international.org/12.0/#sec-ecmascript-language-types)。规范类型是为了更好的表述语言类型而存在的，比如有 List、Record、Completion、Environment Record 等。

#### 简单介绍一下原型和原型链机制？

每一个对象都会有一个[内部属性 proto](https://262.ecma-international.org/12.0/#sec-object.prototype.__proto__) 指向它的原型，用来实现属性继承。如果访问对象的某个属性，在对象内部找不到，则会去原型上找。内部属性 proto 将 JS 中的对象依次连接起来，这种链式的关系就称作原型链。

#### 原型，构造函数之间有什么联系？

通过构造函数使用 new 运算符可以新建一个实例。实例的内部属性 proto 指向构造函数的原型，实例的构造器属性和构造函数原型的构造器属性，都指回构造函数。
![Ctor，Instance and Prototype](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200703192140.png?type=draw)

#### 执行上下文是什么？

执行上下文（Execution Contexts）是执行环境用来追踪代码运行情况的一种机制，具体是代码执行环境维护了 FILO 结构的执行栈来追踪执行上下文。有三种具体的执行上下文：全局执行上下文、函数执行上下文、Eval 执行上下文。每当代码运行，新的 EC 创建并便推入栈，它就作为运行时执行上下文使用（running EC 或 active function object）。

EC 保存了代码解析状态，比如 Generator EC 是可以暂停以及在栈中切换的。EC 也保存了 词法环境环境和变量环境组件，方便用来找标识符应用或者变量绑定。

见：[Execution Contexts](https://262.ecma-international.org/12.0/#sec-execution-contexts)

#### 暂时性死区是怎么形成的？

暂时性死区和词法环境机制有关。执行上下文被创建时，会初始化词法环境和变量环境组件。当解析到 let、const 之类的声明时，引擎会将变量添加到词法环境组件的环境记录器里，但不进行值的关联，规范规定了若在执行到声明语句前读取此变量需要报错。

#### this 绑定机制有哪些？

1. 在全局执行上下文中，this 的值为全局对象。见：[InitializeHostDefinedRealm](https://tc39.es/ecma262/#sec-initializehostdefinedrealm)
2. 在函数执行上下文，this 取决于函数如何被调用。如果被引用对象调用，那么指向引用对象，要么指向全局对象或为 undefined（严格模式）；
3. 箭头函数没有 this 值，其 this 值取决于它的外部的词法作用域中的 this。
4. Eval 执行上下文中，取决于 Eval 如何被调用。如果被直接调用，那么指向当前词法环境的 this，如果被间接调用，那么指向全局对象。
5. Fn.call 和 fn.apply 会绑定第一个参数，并使用 ToObject 进行转换，除非传入的是 Null 或 Undefined，此时则为全局对象，除非是严格模式。
6. 调用构造器时 this 指向内部新创建的实例。

#### fn.call(1) 和 fn.apply(1) 会报错吗？

Function.prototype.call 以及 Function.prototype.apply 绑定的 this 指可以不是对象，但是会被转换成对象再作为 this 值使用，见：[OrdinaryCallBindThis](https://tc39.es/ecma262/#sec-ordinarycallbindthis)。

```js
function toString() {
  console.log(this.toString())
}
toString.bind('a')() // 'a'
```

#### 简单概括一下闭包机制？

闭包是一种特殊的作用域。一般来说，当代码中的某个函数执行完毕后，会销毁掉他的执行上下文及其中的词法环境、变量环境，但如果以函数作为返回值时而此函数的此法环境、变量环境保留了对原函数标识符或变量绑定的引用，那这就叫闭包，此时尽管原函数执行完毕，但某些引用仍有效。

#### ES6 Promise 和 A+ 规范的关系是什么？

ES6 Promise 是 Promise/A+ 的一种实现。

#### 相等关系运算符的隐式转换规则是？

1. 若左右操作数类型相等，返回对两者进行严格相等运算的结果
2. 两操作数都为 Null 或 Undefined，返回 True
3. 任一操作数为 String，另一操作数为 Number，String 转 Number 后继续比较
4. 任一操作数为 Boolean，则转 Number 后继续比较
5. 任一操作数为 Object，另一操作数为 String、Number 或 Symbol，取 Object 原始值继续比较 
6. 返回 False

#### void 操作符存在的意义什么是？

void 用来产生纯正的 undefined 值，来避免在某些老旧的浏览器中 undefined 作为一个可修改的标识符可能被篡改的问题。

见：[Void Operator](https://tc39.es/ecma262/#sec-void-operator)

## ECMA EVAL

#### 填空缺部分 `const obj = { /* ____ */ b: 2, a: 3 }` 控制台的输出为 `{ a: 3, b: 2 }`？

填写带任意值的 a 属性都可以，如 `a: 1,`，因为如果后定义的属性与先定义的属性冲突，则会替换掉先定义属性的值，但是值顺序不变。

#### 为什么 0.1 + 0.2 !== 0.3 ？

ECMAScript 使用 IEEE-754 双精度浮点数表示数字，数字由阶符、阶码和尾数三个域共同组成内存中的 64 位。有些数字不能被这种形式精确表示，所以 0.1 和 0.2 在实际计算时是使用一个近似的值。

见：[JS 中的数值](/gists/interview-prepare/number-in-js.html)

### Promise

[Promise](/maps/javascript/promise.html)

#### new (a.b.bind(c)) 中的 this 指向是什么？

new 绑定的 this 优先级要大于显示绑定 call、bind，所以 this 值是 a.b 函数作为构造器调用时系统创建的实例对象。

```js
const a = { b () { console.log(this) } }
const c = {}

new (a.b.bind(c))
```

#### new、点号和函数调用的优先级是怎么样的？

点号的优先级最高，其次是带参数列表的 new 调用，然后是函数调用，最后是无参数列表的 new 调用。

#### Function.__proto__ 是什么？

Function.__proto__ == Function.prototype，因为 Function 的构造函数是他本身，这是一个特例。

#### 一题能搞懂原型和原型链么？

```js
function Person(name) {}
const p = new Person()

console.log(p.__proto__)
console.log(p.__proto__.__proto__)
console.log(p.__proto__.__proto__.__proto__)
console.log(p.__proto__.__proto__.__proto__.__proto__)
console.log(p.__proto__.__proto__.__proto__.__proto__.__proto__)
console.log(p.constructor)
console.log(p.prototype)
console.log(Person.constructor)
console.log(Person.prototype)
console.log(Person.prototype.constructor)
console.log(Person.prototype.__proto__)
console.log(Person.__proto__)
console.log(Person.__proto__.__proto__)
console.log(Function.__proto__)
console.log(Object.__proto__)
console.log(Object.prototype.__proto__)
```

#### 存在运行时语法错误吗？

```js
;(function() {
  let x = 1
  console.log(x)
  eval('var x = 2')
  return x
})()
```

## 手写代码

#### 手写 instanceof 函数？

instanceof 运算符先通过检测类的 Symbol.hasInstance 来判断对象是否是类实例，如果没有相应方法则是构造器的原型在不在对象的原型链上。

```js
// @see https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/instanceof.js
function _instanceof (val, fn) {
  const hasInstance = fn[Symbol.hasInstance]
  if (hasInstance) {
    return fn[Symbol.hasInstance](val)
  }
  const proto = fn.prototype
  while ((val = Object.getPrototypeOf(val))) {
    if (val === proto) {
      return true
    }
  }
  return false
}
```

见：[Instanceof Operator](https://tc39.es/ecma262/#sec-instanceofoperator)

#### 手写 new 函数？

```js
function _new(constructor, ...params) {
  if (!constructor || typeof constructor !== 'function' || !constructor.prototype) {
    throw new Error('Constructor type error')
  }
  const context = Object.create(constructor.prototype)
  const result = constructor.apply(context, params)
  const ret = result && typeof result === 'object' ? result : context
  ret.constructor = constructor
  return ret
}
```

#### 标记模版字面量怎么使用？

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

// -> yes~Lionad yes~RedOne
```

#### 手写 Object.create 函数？

```js
function create (proto, properties) {
    let instance = {}
    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(instance, proto)
    } else if (({}).__proto__) {
        instance.__proto__ = proto
    } else {
        const fn = function () {}
        fn.prototype = proto
        instance = new fn()
    }
    if (properties) {
      Object.defineProperties(instance, properties)
    }
    return instance
}
```

见：[Object.create](https://tc39.es/ecma262/#sec-object.create)

#### 手写 bind、apply、call 函数？

核心思路就是改变 this 指向，所以核心实现是 a.fn() 这种形式。call 和 apply 唯一的区别就在于 Call 参数数量不固定，而 apply 第二个是数组参数并作为 arguments 列表传递下去。一个好记的方法是：call 是打电话，电话号码有 5 位数的，有 8 位数的也有 11 位数的，不固定，即传参数量不固定。

见 [手写 bind](https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/bind.js)、[手写 call](https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/call.js)、[手写 apply](https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/apply.js)

#### 手写柯里化函数？

核心原理是利用了 function 的 length 属性拿到参数表的长度。

```js
const curry = (fn, ...args) => {
  if (args.length >= fn.length) {
    return fn.apply(null, args)
  } else {
    const newFn = (...extraArgs) => curry(fn, ...args, ...extraArgs)
    Object.defineProperty(newFn, 'length', { value: fn.length - args.length })
    return newFn
  }
}
```

#### 手写 Promise 函数？

Promise 本质上是一个状态只能向 fulfilled 或 rejected 变动的状态机。Promise Polyfill 的核心是内部使用一个回调数组来保存 then 方法回传的新 Promise；延迟运行可以使用 queueMicrotask 或者下位替代 process.nextTick 来实现。

题外话，process.nextTick 的优先级要比 Promise 的高。

见：[Promise.polyfill.js](https://github.com/Lionad-Morotar/read-source-code/tree/master/polyfill/promise)

#### 手写 Generator 函数？

```js
const generator = function (fn) {
  /* your implemention */
}
const testGen = generator(function test () {
  generator.yield('a')
  generator.yield('b')
})
const iterator = testGen()
iterator.next() // { value: 'a'，done:false }
iterator.next() // { value: 'b'，done:false }
iterator.next() // { value: undefined，done:true }
```

TODO ...

见：[TODO，深入理解 Generators](http://www.alloyteam.com/2016/02/generators-in-depth/)

#### 手写 XHR 请求？

尽管 XHR 是老掉牙的东西了，但是面试依旧有人问，就很离谱。

```js
const xhr = new XMLHttpRequest()
xhr.open('GET', 'www.baidu.com', true)
xhr.onreadystatechange = function () {
  if (this.readyState !== 4) return
  if (this.status === 200) {
    console.log(this.response)
  }
}
xhr.onerror = function () {
  console.log(this.statusText)
}
xhr.responseType = 'json'
xhr.setRequestHeader('accept', 'application/json')
xhr.send()
xhr.abort()
```

#### 手写实现深拷贝函数？

```js
function cloneDeep (obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  if (obj instanceof Array) {
    return obj.map(cloneDeep)
  }
  return Object.entries(obj).reduce((h, [k, v]) => {
    h[k] = cloneDeep(v)
    return h
  }, {})
}
```

#### 将列表数据转树？

```js
function toTree (data) {
  data = data || []
  const map = {}
  const roots = []
  source.map(x => map[x.id] = x)
  source.map(x => {
    if (map[x.pid]) {
      map[x.pid].children = map[x.pid].children || []
      map[x.pid].children.push(x)
    } else {
      roots.push(x)
    }
  })
  return roots
}
```

## 语言应用

#### 实现继承有哪些方法？

使用原型链创建子类型时，不能给父类传递参数进行个性化定制，且修改原型带来的影响面非常广。

使用 Constructor Stealing 技术能实现经典继承，不过有些缺陷，所以在 ES6 Class 未普及前一般会使用组合继承或者圣杯模式（寄生式组合继承）。如果是写 ES6 的话，直接用 extends 就好了。

```js
function Parent() {
  /* ... */
}
Parent.prototype.hello = function hello() {}

function Child() {
  // Constructor Stealing
  Parent.call(this)
}
Child.prototype = new Parent()
Child.prototype.world = function world() {}
```

```js
const inherit = function(child, parent) {
  const F = function() {}
  F.prototype = parent.prototype
  // 圣杯模式比起组合继承来说，
  // 能避免 new Parent 的性能消耗和可能带来的副作用
  child.prototype = new F()
  child.prototype.constructor = child
}
```

#### 怎么做变量类型判断？

一般用 typeof，不过要提防 typeof null 的问题；用 instanceof 的话要注意有个跨 iFrame 的 bug；库代码可以用 Object.prototype.toString 方法，但是要注意 Symbol.toString 和 window.toString 是未定义的。

见：[常用类型判断方法的优势及缺陷](/articles/fold/2020-5/type-check.html)

Extra，直接用原型的 constructor 属性判断也可以，只是不推荐使用。

#### 模块化的发展历程大致是怎样的？

模块化主要解决了命名空间冲突和代码抽象的问题。一开始大家都用 IIFE 来隔离代码，随着技术发展，演化出了三种模块规范：CommonJS、UMD（AMD/CMD）、ESM（ES6 Module）。

CommonJS 最早叫 ServerJS，在 NodeJS 环境下取得了不错的效果。进一步推广是分裂出 CommonJS 和 AMD 规范。
UMD 规范则是 CommonJS 和 AMD 规范的统一，以实现代码可在浏览器和 NodeJS 中运行。
常用的是 ES6 Module，因为它是“语言标准定义的模块”。

见：[JS 模块化简史](/articles/fold/2020-5/js-module-history.html)。

#### UMD 模式代码在 Window 上挂属性不生效问题？

```js
global['el-icon'] = {}
// ...
window['el-icon'] // => undefined
```

#### Require 和 Import 的不同之处？

- Require 是同步导入（DFS），Import 是异步导入（BFS）
- Require 是动态导入，Import 会被提升
- Require 是值拷贝，Import 指向内存地址

#### 隐式转换？

[隐式转换](/gists/interview-prepare/corceion.html)

#### 有哪些提高代码性能的办法？

经典算法、设计模式、缓存、Web Worker、任务切片、任务队列、池化技术、WebAssembly...

#### 如何解决拷贝时的循环引用问题？

用一个缓存对象来记录拷贝时碰到的对象，如果缓存对象中已经有了该对象，就说明有循环引用问题。

```js
const cache = []
function check(key, value) {
  if (typeof value === 'object' && value !== null) {
    if (cache.includes(value)) return /* or throw error */
    cache.push(value)
  }
  return value
}
```

#### 节流和防抖的区别是什么？

节流意味着在某段时间内的多次调用只有一次有效。适用于 mousemove 等场景。

```js
// 获取当前浏览器的刷新频率
const frameDelta = getFrameTime()
// frameDelta * 2 是指以刷新频率一半的速率执行回调
function throttle(fn, time = frameDelta * 2) {
  let running = false
  return function (...args) {
    !running && setTimeout(() => {
      running = true
      fn.bind(this)(...args)
      running = false
    }, time)
  }
}
```

防抖在节流的基础上，每次函数被调用时都会重置计时器。适用于搜索时弹出建议等场景。

```js
function debounce(fn, time = 100) {
  let tick = null
  return function (...args) {
    tick && window.clearTimeout(tick)
    tick = setTimeout(() => {
        fn.bind(this)(...args)
        tick = null
    })
  }
}
```

#### 设计一个可以取消请求的请求函数？

取消请求常用于大文件传输等情况。XHR 可以使用 [XMLHttpRequest.abort](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort) 接口取消，Fetch 可以用 [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController) 取消。

喜闻乐见：[Axios 也可以使用 AbortController](https://axios-http.com/zh/docs/cancellation)

#### Aync Await 的代码执行顺序是怎么样的？

可以把 async 函数看成 Promise。await x 的 x 也是 Promise，await x 以及这行之后的语句被塞到了 then 方法中执行。x 可以当作 Promise，就算是普通值，也会被转换为 Promise.resolve(x) 这种形式。当 x 是 Promise 时，如果没有被 resolve，那 await 后面的语句就不会执行。

见：[Async/Await 的宏实现：sweet-async-await](https://github.com/jayphelps/sweet-async-await)

## 框架原理

#### webpack 的基本原理？

webpack 使用 acorn 将 JS 代码转换为 AST，从 AST 中读取到该文件的依赖关系并将所有文件的依赖关系组成一个图结构，输入到 webpack Require Wrapper 函数中。

见：[webpack 基本原理](https://github.com/Lionad-Morotar/read-source-code/tree/master/webpack)
