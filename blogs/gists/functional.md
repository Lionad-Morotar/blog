# JS 函数式编程

[TOC]

## 函数式是什么

如何通过列表 $[1、2、3]$ 得到列表 $[2、4、6]$？

```js
// 命令式
let data = [1,2,3]
for (let i = 0; i < data.length; i++) {
  data[i] = data[i] * 2
}
// >>> [2,4,6]

// 函数式
[1,2,3].map(x => x * 2) 
// >>> [2,4,6]
```

与命令式编程关心问题解决的步骤不同，函数式关注数据的映射。你需要提供函数，使数据映射成想要的结果。对，就是这么简单。我们使数据通过函数 $x => x * 2$ 逐个映射成为两倍大小的另一个数，组合并返回了一个的新列表。

## 解决什么问题

函数式能解决什么问题？要问这个问题，我们不妨从日常开发入手。

我们写代码总会使用变量去保存数据，这些变量便是我们所熟知的“状态”。日常开发中，我们总是本着“封装变化”的思路，以模块、组件、类等不同的形式去操作这些状态。在小型程序中，状态和状态之间可能是独立的，一个状态变化并不会引起其它状态的改变。而大型程序中的状态往往纵横交错，形成一个复杂的“状态网”，一个状态发生变化后可能引发蝴蝶效应。为了更好的统筹变化，尤其是状态的变化，设计模式应运而生。

设计模式的初心非常简单，它总结了一些常见场景下的通用代码，这样一来，熟悉设计模式的开发们只需面向接口、封装变化，就可以写出易于理解、可复用的代码。

但这一套建立在“面向对象”的基础上。使用面向对象编程，意味着你需要将问题拆解为多组类或对象，将程序的状态和行为区别对待，通过操纵不同行为，努力维护状态的变化网络。

考虑设计一个弹框组件。你可能想到，首先用变量 $String::type$ 保存弹框的使用场景，$type$ 允许从消息（$message$）、提示（$tip$）、警告（$warn$）、错误（$error$）任选一项。之后，再用变量 $Boolean::interact$ 保存弹框是否需要用户主动确认。

![警告](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200905004514.png)

喂等等... 此时你发现，依据 $type$ 的不同，界面需要显示不同的交互类型。对于提示弹框，界面上只需要“确认按钮”；对于警告弹框，界面上还需要“忽略”按钮。

这就是由状态引起的状态的变化。编程时，你必须考虑所有状态的临界值，仔细确认其影响范围，并用额外的代码去响应这些影响。当然，我们这个小小的弹框组件只引入了两个状态；现实世界的软件可比这要复杂多了，那才是“状态地狱”！

所以函数式解决要什么问题？无非就是**减少甚至消除程序中的状态**，这样一来，由状态变化带来的影响自然就小了。这并不是说函数式就是面向对象的死对头。尽管他们的目标及手段都相抵触，但是两者之间无绝对的分界线，一切在你。

## 函数式的基石

一些人会认为认为使用函数式编程思想去创建复杂界面是极其困难的行为，但实际上，JS 的许多类库，都是某种程度上的面向对象与函数式的混合产物。

业界则一般认为函数式编程是实用性的典范。我们来看一段非常有意思的函数式排序代码[^排序代码来源]，第一次看到这种代码可能会有些不适，但只有耐下性子你才能获得其中的乐趣，这需要你仔细阅读。

[^排序代码来源]: 来源忘辽，也许是这个网址 [http://design-lance.com/tag/sort/](http://design-lance.com/tag/sort/)

```js
/* 基础函数 */
const sort = map => compareFn => (a, b) => compareFn(map(a), map(b))
const flipComparison = fn => (a, b) => -fn(a, b)

const byValue = (a, b) => a - b
const byPrice = sort(e => e.price)(byValue)
const byRating = sort(e => e.rating)(flipComparison(byValue))

// // !important
const sortFlattend = sortFns => (a, b) => 
    sortFns.reduce((sortResult, fn) => sortResult || fn(a,b), 0)

// 先依据价格排序，若价格相等，则依据评分排序
const byPriceThenRating = sortFlattend([byPrice, byRating])

const food = [
    { name: "Suger", price: 1, rating: 3 },
    { name: "Chocolate", price: 3, rating: 4 },
    { name: "Burger", price: 3, rating: 2 },
    { name: "Cola", price: 1, rating: 5 },
    { name: "Pizza", price: 5, rating: 3 },
]

food.sort(byPriceThenRating)

// [{"name": "Cola","price": 1,"rating": 5},
//  {"name": "Suger","price": 1,"rating": 3},
//  {"name": "Chocolate","price": 3,"rating": 4},
//  {"name": "Burger","price": 3,"rating": 2},
//  {"name": "Pizza","price": 5,"rating": 3}]
```

这一切都是建立在几个简单的 JS 核性特征之上。最重要的是“一等函数”概念：

- 函数可以储存在变量中、数组中，甚至是对象的字段中；
- 函数可以作为参数传递，也可以作为返回值返回；
- 函数可以按需创建并调用，可具名也可匿名；

围绕“一等函数”，函数式编程发展出了许多经典的代码模式。如 $Applicative$ 这种编程思想要求给 $A$ 函数提供一个 $B$ 函数作为参数。思想本身很简单，但通过 $Applicative$ 发展出了围绕 $map、reduce、filter$ 等以集合为中心的数据处理思想。正因为通过函数式编程我们能很好的应对数据的变化，而我们在业务代码中总是和对象或数组之类数据结构打交道，所以说函数式是实用性的典范。

## 局部应用

```js
const partial = (fn, ...args) => (...rest) => fn(...args, ...rest)

const adder = (a, b) => a + b

const add5 = partial(adder, 5)
```

## 颗粒化

颗粒化，一般写作“柯里化”。我喜欢写“颗粒化”的原因是它具有**逐步消耗函数参数**这个特性。颗粒化接受一个函数，并返回一个逐步消耗函数参数，参数消耗完时将所有消耗的参数代入原函数执行，最后返回结果的新函数。

方便起见，以下写作“$Currying$”。

最常见的 $Currying$ 用作限制函数接受参数的个数，如许多人知道的，$map$ 函数配合 $parseInt$ 使用时会出现奇奇怪怪的问题：

```js
;[1, 3, 13].map(parseInt)
// >>> [1, NaN, 1]
```

因为 $parseInt$ 能接收多个参数。其第二个参数指代进制，由于并不存在一进制，所以 $parseInt(3,1)$ 结果为 $NaN$；而 $parseInt(13, 2)$ 会尝试将二进制的 $13$ 还原为十进制。按照字典顺序进行转换，它先转换 $1$，再转换 $3$，此时发现 $3$ 不存在二进制数中转换失败，最终仅保留转换 $1$ 的结果 $1$。

函数式给 $parseInt$ 问题提供的解决方案便是提供一个只消耗一个参数的 $Currying$：

```js
function curry(fn) {
  return arg => fn.call(null, arg)
}
;[1, 3, 13].map(curry(parseInt))
// >>> [1, 3, 13]
```

固定参数长度 $Currying$ 是最常见的一种形式：

```js
Function.prototype.curry = function curry(func) {
  func = func || this
  const len = func.length
  function subCurry(...args) {
    return function(...args2) {
      const allArgs = args.concat(args2)
      if (allArgs.length < len) {
        return subCurry(...allArgs)
      } else {
        return func.call(null, ...allArgs)
      }
    }
  }
  return subCurry()
}

var adder = (a, b, c, d) => a + b + c + d
var add = curry(adder)

add(1)(2)(3)()()()()()()()()(1)
// >>> 7
```

无限级 $Currying$ 能无限消耗参数，直到没有参数传入时，才执行原函数：

```js
Function.prototype.curry = function curry(func) {
  func = func || this
  const args = []
  return function subCurry(...args2) {
    if (args2.length !== 0) {
      args.push(...args2)
      return subCurry
    } else {
      args.length = 0
      return func.call(null, ...args)
    }
  }
}

var adder = (...args) => args.reduce((h, c) => h + +c, 0)
var add = curry(adder)

add(0)(1)(2, 3, 4)(0)(0)(10)()
// >>> 10
```

## 递归

递归的最常见的例子便是深拷贝了：

```js
function cloneDeep(obj) {
    const isObject = obj => typeof obj === 'object'
    if (!isObject(obj)) return obj
    const ret = Object.create(obj.__proto__ || null)
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret[key] = cloneDeep(obj[key])
        }
    }
    return ret
}
```

JS 使用栈跟踪函数调用，所以一旦数据量大到超出栈的可负载程度，程序就会发生栈溢出错误。

```js
function recur(n) {
    if (n === 0) console.log(n)
    else recur(n - 1)
}
recur(500000)
// >>> RangeError: Maximum call stack size exceeded
```

在某些引擎中，尾调用函数可以避免栈溢出。我们知道函数在结束时，会出栈，所以只需最后 $return$ 一个新的函数调用，就可以不减少栈容量（如 $return loop(n)$，但注意，$return loop(n) + v$ 不是尾调用）。递归函数若运行在有尾递归优化的引擎中，会被优化为循环，如上面的 recur 等同于：

```js
function recur(n) {
    while (n !== 0) {
        n = n - 1
    }
    console.log(n)
}
recur(5000000)
// >>> 0
```

或者，可以选用“时间换空间”的方式来解决递归问题。我们不在函数中直接返回数据，而是返回闭包，这样一来，返回的数据就会储存在堆中啦。

```js
function recur(n) {
    if (n === 0) console.log(n)
    else return () => recur(n - 1)
}
recur(3)()()()
// >>> 0
```

可以发现，由于调用次数不可枚举。所以我们需要一个“蹦床函数”（$Trampoline$）来解放人力。蹦床函数会持续调用函数及其返回结果，直到返回结果不再是函数。

```js
function trampoline(fn) {
    let res = () => fn()
    while (res instanceof Function) {
        res = res()
    }
    return res
}
trampoline(recur(50000000))
// >>> 0
```

需要注意的是，尽管堆内存很大（比栈大多了），但是仍可能发生溢出现象。蹦床函数不能保证不发生内存溢出。如果你实在需要写一个巨大的数据处理程序，你也许可以从经典算法下手，将递归转化为循环。

## 延迟

有时我们不希望在显示调用函数执行函数前计算任何东西。也就是说，我们提供给源数据一系列转换函数，通过闭包暂时把函数隐藏起来。只有当我们确认转换时，才会传入源素据，依次调用转换函数（$reduce$），并返回结果。

需要强调一下，“延迟”和“异步”是完全两种东西。比如说，$Promise$ 没有推迟执行阶段，它会立即执行内部代码。

```js
function Lazy(arr) {
  this.value = arr
  this.applys = []
}
Lazy.prototype.seq = function seq(fn) {
  this.applys.push(fn)
  return this
}
Lazy.prototype.exec = function exec() {
  console.log(this.applys, this.value)
  const res = this.applys.reduce((data, handler) => handler(data), this.value)
  this.applys.length = 0
  this.value = null
  return res
}

console.time()
var calcNumber = new Lazy([1, 2, 3, 4])
  .seq(arr => arr.map(x => x + 1))
  .seq(arr => arr.map(x => x * 2))
  .seq(arr => {
    const numbers = [...Array(10 * 100000)].map(e => ~~(Math.random() * 1000000))
    const sortNumbers = nums => nums.slice().sort((a, b) => a - b)
    sortNumbers(numbers)
    return arr
  })
console.timeEnd() // >>> default: 0.04296875ms

console.time()
calcNumber.exec()
console.timeEnd() // >>> default: 428.875ms
```

## 函子

一般约定，函子的标志就是具有 map 方法的范畴（函子自身也是范畴）。函子将变形关系应用到范畴中每一个值，将当前范畴转变为另一种范畴。

- of：函子使用 of 方法，生成新的范畴。
- Maybe：简单而言，Maybe 函子的 map 方法中包含了空值检测。
- Either：Either 函子内部包含左值和右值。当右值不存在时，使用左值运算。
- ap：通过 ap 函子可以从不同范畴中取值，以实现链式操作。
- Monad：Monad 总会返回一个单层的函子。

## 阅读更多

- [理解递归、尾调用优化和蹦床函数优化](https://juejin.im/post/6844904029424713735#comment)
- [JavaScript 中的函数式编程](https://github.ahthw.com/natpagle/book/chapter-fourth.html)
- [函数式编程入门教程](http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html)
- [《JS 函数式编程》](https://book.douban.com/subject/26579320/)
