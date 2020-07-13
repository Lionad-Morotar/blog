# JS & 函数式编程

范畴论使用函数来表示范畴之间的关系。伴随范畴论的发展，发展出整整一套函数的运算方法，将这些运算方法用计算机实现，就变成了“函数式编程”。

## 函数

### 局部应用

```js
const partial = (fn, ...args) => (...rest) => fn(...args, ...rest)

const adder = (a, b) => a + b

const add5 = partial(adder, 5)
```

### 柯里化

#### 固定长度柯里化

```js
Function.prototype.curry = function curry(func) {
    func = func || this
    const len = func.length
    function subCurry(...args) {
        return function (...args2) {
            const allArgs = args.concat(args2)
            if (allArgs.length < len) {
                return subCurry(...allArgs)
            } else {
                return func.bind(this)(...allArgs)
            }
        }
    }
    return subCurry()
}

var adder = (a,b,c,d) => a+b+c+d
var add = curry(adder)

add(1)(2)(3)()()()()()()()()(1)
// >>> 7
```

#### 无限级柯里化

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
            return func.bind(this)(...args)
        }
    }
}

var adder = (...args) => args.reduce((h, c) => h + +c, 0)
var add = curry(adder)

add(0)(1)(2,3,4)(0)(0)(10)()
// >>> 10
```

### 延迟

#### 延迟执行

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
var calcNumber = new Lazy([1,2,3,4])
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
console.timeEnd()   // >>> default: 428.875ms
```

## 函子

一般约定，函子的标志就是具有 map 方法的范畴（函子自身也是范畴）。函子将变形关系应用到范畴中每一个值，将当前范畴转变为另一种范畴。

### of

函子使用 of 方法，生成新的范畴。

### Maybe

简单而言，Maybe 函子的 map 方法中包含了空值检测。

### Either

Either 函子内部包含左值和右值。当右值不存在时，使用左值运算。

### ap

通过 ap 函子可以从不同范畴中取值，以实现链式操作。

### Monad

Monad 总会返回一个单层的函子。

## 阅读更多

* [JavaScript中的函数式编程](https://github.ahthw.com/natpagle/book/chapter-fourth.html)
* [函数式编程入门教程](http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html)