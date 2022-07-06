# 🎫 常用类型判断方法的优势及缺陷

[TOC]

## 常用判断方法

类型判断，在 JavaScript 中是一个很经典的问题了。围绕类型判断，有几种常见的解决方法，下是最常用的三种：

- typeof
- instanceof
- Object.prototype.toString.call

我将在此文中根据这几种方法在 ECMAScript 规范下的描述及我们开发时的实际情况，聊聊这几种方法的优劣势所在。

## typeof

当我还是一个 JS 萌新的时候，我就爱上了 typeof 运算符，因为它的作用正如其名，非常好理解。
利用 typeof 我们可以轻松判断常见的基础类型，如 Number、String、Boolean 等。

ECMAScript 文档中有对 typeof 这样描述：

$\it{UnaryExpression} \quad: \quad \bf{typeof} \quad \it{UnaryExpression}$

1. Let val be the result of evaluating UnaryExpression.
2. If _Type(val)_ is Reference, then
   - If _IsUnresolvableReference(val)_ is true, return **"undefined"**.
3. Let val be _GetValue(val)_.
4. _ReturnIfAbrupt(val)_.
5. Return a String according to Table Below.

简单来说，就是先判断是不是引用未知，是则返回 'undefined'，不然就根据下表找值。

|                             类型                             |                                                   返回                                                   |
| :----------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
|                          Undefined                           |                                               "undefined"                                                |
|                             Null                             |                                                 "object"                                                 |
|                           Boolean                            |                                                "boolean"                                                 |
|                            Number                            |                                                 "number"                                                 |
|                            String                            |                                                 "string"                                                 |
|      Object (ordinary and does not implement [[Call]])       |                                                 "object"                                                 |
|   Object (standard exotic and does not implement [[Call]])   |                                                 "object"                                                 |
|                 Object (implements [[Call]])                 |                                                "function"                                                |
| Object (non-standard exotic and does not implement [[Call]]) | Implementation-defined. Must not be "undefined", "boolean", "function", "number", "symbol", or "string". |

这里我们详细说说两点：

1. 判断内置对象
2. typeof null === 'object'

### 判断内置对象

Function 作为内置对象，为什么 `typeof (function a(){})` 的值不为“object”呢？

其实上面那张表有相应线索，倒数第二条，这是一个特殊判定，“如果对象实现了内部方法[[Call]]” 或 “是 `Callable` 对象”，那么返回值为“function”。

用 typeof 判断对象太麻烦了，一点儿也不实在。一般情况下，我们会用等下介绍的 Object.prototype.toString 去判断内置对象。

### typeof null

null 是用来标记“期待指向”的，不是 Object 类型，所以 typeof null === 'object' 是一个程序错误。
这要追溯到第一版 JavaScript。这版 JS 的实现中，值是存储在 32 位单位中，其中端序最小的 3 位，用来表示值的类型，如下：

- 000：Object
- 001：Int
- 010：Double
- 100：String
- 110：Boolean

此外，还有两种特殊值：

- **undefined** (JSVAL_VOID): $-2^{32}$
- **null** (JSVAL_NULL): 用全为 0 的机器码表示的 NULL 指针（或，一个指向 0 的 Object 类型的值）

也就是说，对程序而言，typeof null 判断类型是根据前三位 0 取得的“object”。这是一个历史遗留问题，有人提出过修复方案，但是怕影响历史遗留代码，修复便被否决了。

## instanceof

内置 instanceof 运算符是用来检测构造函数的 prototype 属性是否存在于某个实例对象的原型链。
用代码解释要更直观一些：

```js
function Car(make, model, year) {
  this.make = make
  this.model = model
  this.year = year
}
const auto = new Car('Honda', 'Accord', 1998)

// true
console.log((auto.__proto__ === Car.prototype) === auto instanceof Car)
```

我们直接看看规范是怎么定义 instanceof 运算符的：

**InstanceofOperator(O, C)**

1. If _Type(C)_ is not Object, throw a **TypeError** exception.
2. Let _instOfHandler_ be _GetMethod(C,@@hasInstance)_.
3. _ReturnIfAbrupt(instOfHandler)_.
4. If instOfHandler is not **undefined**, then
   - Return _ToBoolean(Call(instOfHandler, C, «O»))_.
5. If _IsCallable(C)_ is **false**, throw a **TypeError** exception.
6. Return _OrdinaryHasInstance(C, O)_.

第一条，如果 C 的类型不是对象，那么会抛出类型错误，重现如下：

```js
;[] instanceof 1
```

::: danger
VM1008:1 Uncaught TypeError: Right-hand side of 'instanceof' is not an object
:::

第二至第四条，判断 C 是否有内置的 hasInstance 实现，即 Symbol.hasInstance，如果有，则调用此方法。
也就是说，对复杂类型，我们可以通过 Symbol，自定义 instanceof 运算符的实现，用下列代码举例：

```js
class Lionad {
  static [Symbol.hasInstance](obj) {
    return obj && obj.isCute
  }
}

console.log({} instanceof Lionad) // false
console.log({ isCute: true } instanceof Lionad) // true
```

这之后，第五条，如果 C 非 Callable 对象（还记得我们在 typeof 提到的内部方法[[call]]吗，Callable 对象即实现了[[call]]内部方法的对象，比如说某个函数），抛出类型错误，重现如下：

```js
;[] instanceof []
```

::: danger
VM684:1 Uncaught TypeError: Right-hand side of 'instanceof' is not callable
:::

最后，返回调用内置 instanceof 实现的结果。

不过，需要强调的是，instanceof 也有缺陷存在，主要体现在两个方面：

1. 判断的依据是原型链
2. 跨宿主运算

### 依据原型链

使用 instanceof 运算符判断对象字面量，会出现另人诧异的结果，见下代码：

```js
console.log(
  'hello world' instanceof String, // false
  new String('asdf') instanceof String, // true
  {} instanceof Object, // true
  [] instanceof Object, // true
  Object.create(null) instanceof Object // false
)
```

题外话，上面几行代码还隐式说明了这些问题：

- 对于对象字面量 `{}` 有 `({}).__proto__ === Object.prototype`

### 跨宿主运算

关于跨宿主运算，可以尝试以下代码重现:

```js
const iframe = document.createElement('iframe')
document.body.appendChild(iframe)
xArray = window.frames[window.frames.length - 1].Array
const xArr = new xArray(1, 2, 3)

console.log(xArr instanceof xArray) // true
console.log(xArr instanceof Array) // false
```

因为 iframe 中的数组实例不是父窗口的 Array 的实例，所以在 xArr 的原型链上是找不到 Array 的，所以结果为 false。

## Object.prototype.toString.call

一般来说，在业务代码中，我们使用 typeof 和 instanceof 运算符判断变量的类型就足够了。虽然这两种方法都有缺陷，但是我们记住这些常见的容易混淆的地方，避免使用就可以。
下面要介绍的是一种更精确的方法，一般会用在工具函数或者类库中，如：

```js
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}
isArray([]) // true
```

那么 Object.prototype.toString 到底能分辨几种类型呢？查阅 ES6 规范文档，可以得到其实现，如下：

1. If the **this** value is **undefined**, return **"[object Undefined]"**.
2. If the **this** value is **null**, return **"[object Null]"**.
3. Let O be _ToObject(this value)_.
4. Let isArray be _IsArray(O)_.
5. _ReturnIfAbrupt(isArray)_.
6. If isArray is true, let builtinTag be **"Array"**.
7. Else, if O is an exotic String object, let builtinTag be **"String"**.
8. Else, if O has an [[ParameterMap]] internal slot, let builtinTag be **"Arguments"**.
9. Else, if O has a [[Call]] internal method, let builtinTag be **"Function"**.
10. Else, if O has an [[ErrorData]] internal slot, let builtinTag be **"Error"**.
11. Else, if O has a [[BooleanData]] internal slot, let builtinTag be **"Boolean"**.
12. Else, if O has a [[NumberData]] internal slot, let builtinTag be **"Number"**.
13. Else, if O has a [[DateValue]] internal slot, let builtinTag be **"Date"**.
14. Else, if O has a [[RegExpMatcher]] internal slot, let builtinTag be **"RegExp"**.
15. Else, let builtinTag be **"Object"**.
16. Let tag be _Get(O, @@toStringTag)_.
17. _ReturnIfAbrupt(tag)_.
18. If _Type(tag)_ is not String, let tag be builtinTag.
19. Return the String that is the result of concatenating **"[object "**, tag, and **"]"**.

细数下来，Object.prototype.toString 不仅可以区分 Object、Function、Date、RegExp 等常见对象，它还能区分 Error、Arguments 等，见下代码：

```js
;(function() {
  console.log(
    typeof arguments, // 'object'
    Object.prototype.toString.call(arguments) // '[object Arguments]'
  )
})()
```

### 如何扩展

可以通过 Symbol.toStringTag 对已有对象的内置标签进行修改。这样就可以不需要通过构造函数的方法来分辨程序中不同种类的新对象。如下代码：

```js
var a = {}
a[Symbol.toStringTag] = '1234'
Object.prototype.toString.call(a)
// >>> "[object 1234]"
```

### 缺陷所在

JS 中的对象，按照执行环境来划分可以分为内置对象（Build-In Object）和宿主对象（Host Object），如 Window、History 就是执行环境（浏览器）提供的对象。
缺陷呢，往往就存在于规范中没有被定义的行为。
比如，Window 对象的 Symbol.toString 是浏览器定义的行为，而且往往不同浏览器，实现还不一样。

```js
Window.toString()
// [object Window] ?
// [object Object] ?
// [object DOMWindow] ?
// [object global] ? (这个尤其为叛徒，第一个字母居然是小写的)
```

**(￣ ▽ ￣)" 害。**

## 最后

想不到吧，JS 类型判断这个问题居然没有完美的解法，每种解法都有缺陷。

那么我们平常写代码到底用哪种呢？

虽然我刚才提到“业务代码可以使用 typeof 或 instanceof，库和工具函数等需要更精准的情况则用 Object.prototype.toString”，但是，这并不是绝对的。
我们仔细思考一下这三种方法的本质：

- typeof 根据最小三位字节判断变量类型
- instanceof 根据原型链判断
- Object.prototype.toString 主要是根据对象的内置标签（Build-In Tag）判断

那么熟记这三条规则，写代码时就能游刃有余了。

感谢看到结尾，如有错误请务必指正，十分感谢。如果喜欢请点赞、投币、关注三连吧！我是 Lionad，爱你萌！

## 阅读更多

- [《JavaScript 框架设计》](https://book.douban.com/subject/27133542/)
- [JavaScript 的 typeof 的用途](https://justjavac.com/javascript/2012/12/23/what-is-javascripts-typeof-operator-used-for.html)
- [The history of “typeof null”](https://2ality.com/2013/10/typeof-null.html)
- [ECMAScript® 2015 Language Specification](http://www.ecma-international.org/ecma-262/6.0/#sec-typeof-operator)
- [instanceof 和 typeof 原理](https://juejin.im/post/5b0b9b9051882515773ae714)
