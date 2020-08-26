# JS & 函数式编程

## 函数式编程

函数式编程通过使用函数来将值转换成抽象单元，接着用来构建软件系统。

与面向对象将问题拆解为多组“名词”或对象不同，函数式方法将相同的问题拆解为多组“动词”或函数，同时通过组合其它函数的方式，构成更加抽象的行为。面向对象致力于维护状态变化形成的“变化网”，而函数式系统则努力减少可见的状态变更。不过，尽管他们的目标相对立，但是两者之间无绝对的分界线。

函数式编程是实用性的典范。如 $Applicative$ 编程，要求给 $A$ 函数提供一个 $B$ 函数作为参数，这是一种函数式编程的思想，并触发了 $map、reduce、filter$ 等围绕集合（数组、对象）为中心的数据处理思想。通过应用 $Applicative$ 并组合新函数，我们能处理更复杂的数据。JS 对象是一种简单的关联性数据储存，即使脱离对“原型”的讨论，我们依然能用它构建复杂的抽象，而函数式编程可以帮助我们应对这种抽象。

这一切都是建立在几个简单的 JS 核性特征之上。最重要的是“一等函数”概念：

- 函数可以储存在变量中、数组中，甚至是对象的字段中；
- 函数可以作为参数传递，也可以作为返回值返回；
- 函数可以按需创建并调用，可具名也可匿名；

围绕“一等函数”，函数式编程发展出了许多类似模式概念（类似“设计模式”）。

## 局部应用

```js
const partial = (fn, ...args) => (...rest) => fn(...args, ...rest)

const adder = (a, b) => a + b

const add5 = partial(adder, 5)
```

## Currying

$Currying$ 即柯里化。由于目前我的精简的思源宋字体集少了“柯”这个字，所以下文的“柯里化”暂替换为“$Currying$”。

$Currying$ 接受一个函数，并返回一个逐步消耗函数参数，参数消耗完时将所有消耗的参数代入原函数执行并返回结果的新函数。由此可见，他和闭包紧密结合。

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

无限级 $Currying$ 能无限消耗参数，知道没有参数传入时，才执行原函数：

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

可以发现，由于调用次数不可枚举。所以我们需要一个“蹦床函数”（$Trampoline$），使用循环来解放人力。

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

在调用执行函数之前不会计算任何东西

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
