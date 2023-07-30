# 判断两个变量相等

[TOC]

## 前言

[fast-deep-equal](https://github.com/FormidableLabs/react-fast-compare) 是一个用来深层次判断两个对象是否相等的库。

```js
// result is true
require('fast-deep-equal')(
  {foo: 'bar'},
  {foo: 'bar'}
)
```

说到相等，立马会想到 JS 中的相等运算符（== 以及 ===），但这两个运算符在很多业务场景中不能直接拿来用。假设现在我们在华尔街售卖电脑，有如下电脑的数据结构。

```js
const computerA = {
  cpu: ['11700k'],
  gpu: ['3080'],
  mem: ['32G', '32G'],
}
```

之后，又重新组装了一台配置一样的电脑 B。

```js
const computerB = {
  cpu: ['11700k'],
  gpu: ['3080'],
  mem: ['32G', '32G'],
}
```

我们说 computerA 和 computerB 的配置是一样的，因为两个对象中的值一样。很显然，在这里不能直接使用相等或严格相等运算符去比较 A、B 两台电脑，这时候，fast-deep-equal 就可以派上用场，他会深入对象内部，以确保对象内的值是相等的。

```js
// result is false
computerA == computerB

// result is false
computerA === computerB

// result is true
require('fast-deep-equal')(
  computerA,
  computerB
)
```

根据 fast-deep-equal 提供的 benchmark，它是判断两个变量是否相等的最快的库，underscore 和 lodash 中对应的比较函数的速度分别只有它的 1/3 和 1/7。

```bash
# common tools
fast-deep-equal x 261,950 ops/sec ±0.52% (89 runs sampled)
underscore.isEqual x 74,423 ops/sec ±0.38% (89 runs sampled)
lodash.isEqual x 36,637 ops/sec ±0.72% (90 runs sampled)

# other tools
fast-equals x 230,957 ops/sec ±0.83% (85 runs sampled)
nano-equal x 187,995 ops/sec ±0.53% (88 runs sampled)
shallow-equal-fuzzy x 138,302 ops/sec ±0.49% (90 runs sampled)
deep-equal x 2,310 ops/sec ±0.37% (90 runs sampled)
deep-eql x 35,312 ops/sec ±0.67% (91 runs sampled)
ramda.equals x 12,054 ops/sec ±0.40% (91 runs sampled)
util.isDeepStrictEqual x 46,440 ops/sec ±0.43% (90 runs sampled)
assert.deepStrictEqual x 456 ops/sec ±0.71% (88 runs sampled)
```

判断两个变量是否相等谁都会写，但是能做到在众多库中脱颖而出，才是一流选手。本文将为你解析其速度之快背后的原理。

## 原理

简而言之，fast-deep-equal 通过剪枝策略，跳出运算，减少了不必要的路径，加快了代码执行过程。先简单回顾一下相等运算和严格相等运算，以理解“剪枝”的概念。

**相等运算**时，会根据两操作符的类型，做很多的 if/else 运算，简单概括如下：

1. 如果 x 和 y 的类型一致，返回 x 和 y 严格比较的结果
2. 如果是比较 null 和 undefined，返回 true
3. 如果是比较数字（或大数）和字符串，先将字符串转化为数字（或大数）再重新比较
4. 如果是和布尔值比较，先将布尔值转化为数字再重新比较
5. 如果是比较对象和简单值，那么先将对象转化为原始值再重新比较
6. 如果是比较数字，除非它们的数学意义的值相等，否则返回 false
7. 返回 false

绕晕了有没有！和相等运算一比较，**严格相等运算**就简单太多了：

1. x 和 y 类型不同则返回 false
2. 返回两运算符的值相等的结果（规范意义的值相等，比如字符串相等意味着两字符串长度相等及字符排列相等）

举一个例子，如果是 1n == true，那么会经过大致以下几个步骤：

1. 类型不一致，继续运算
2. 不是比较 null 和 undefined，继续运算
3. 不是比较数字和字符串，继续运算
4. 将 true 转换为 0，重新比较 1n 和 1
5. 类型不一致，继续运算
6. 不是比较 null 和 undefined，继续运算
7. 不是比较数字和字符串，继续运算
8. 不是和布尔值比较，继续运算
9. 不是比较对象和简单值，继续运算
10. 比较 1n 和 1 的数学意义上的值，1 等于 1，返回 true

一个简单的 1n 和 true 的比较，居然花费了数十个步骤。这些步骤还是经过概括后归纳出来的，按照 ECMAScript 规范，实际的比较步骤需要远大于 10 步！换到严格相等，1n === true，只需要一步：

1. 类型不一致，返回 false

严格相等运算较相等运算，在比较 1n 和 true 的类型后，就没有往后再走 if/else 搜索其它策略，而是直接结束运算，获得结果，这就叫做剪枝。常在各类 JS 代码规范中见到“使用严格相等会提高代码性能”的说法，也是因为严格相等运算会在操作符类型不一致时直接返回 false。当然，凡事儿都有代价。正如如果你想比较 1 和 '1' 就没有办法直接去使用严格相等运算，使用剪枝的代价就是剪枝策略本身。代价也常常体现在类库中，比方说，著名的拷贝库 fastest-json-copy 声称自己能比其它类库快数倍的背后，是因为它舍弃了对诸如 Map、Date 或者循环引用对象的拷贝。

## 代码

大致看下 fast-deep-equal 的结构。

```js
function equal(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == 'object' && typeof b == 'object') {
    // ...
  }
  return a!==a && b!==b;
}
```

首先，使用严格相等运算符剪去相同对象比较的情况，大大提高了比较相同对象时的性能。

```js
if (a === b) return true;
```

如果 a、b 是相同的大数组，那么严格运算符将很快给出 true 的答案（$O(1)$复杂度），如果没有这一道卡口，接下来就会逐个比较 a、b 中的每一项（$O(n)$复杂度）。由此也可以反向得出，如果 a、b 不是相等的大对象，那么这一步将会带来一些性能损失。其实，这些损失可以忽略不计，据 benchmark 得出，严格相等运算约每秒能跑 9 亿次[^equalPerf]。

[^equalPerf]: https://codepen.io/Lionad/pen/MWorvjx

接下来，先跳过 a、b 都是对象的情况，直接看函数的返回值部分。

```js
return a!==a && b!==b;
```

只有 a、b 不相等且都不是对象的情况下会来到最终的返回语句。本来可以直接返回 false 的，但这里处理了一个极端情况：如果两数都为 NaN，那么需要返回 true。一个小小的知识点：因为 NaN === NaN 比较的结果为 false，所以 x!==x 可以用来判断 x 是否为 NaN。

接下来，康康 a、b 都是对象时使用的剪枝优化。

```js
if (a && b && typeof a == 'object' && typeof b == 'object') {
  if (a.constructor !== b.constructor) return false;

  var length, i, keys;
  if (Array.isArray(a)) {
    length = a.length;
    if (length != b.length) return false;
    // ...
  }

  if ((a instanceof Map) && (b instanceof Map)) {
    if (a.size !== b.size) return false;
    // ...
  }

  if ((a instanceof Set) && (b instanceof Set)) {
    if (a.size !== b.size) return false;
    // ...
  }

  if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
    length = a.length;
    if (length != b.length) return false;
    // ...
  }

  if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
  
  keys = Object.keys(a);
  length = keys.length;
  if (length !== Object.keys(b).length) return false;

  // ...
}
```

答案一目了然，主要优化有两点。

* **a.constructor !== b.constructor，类型不等时，直接返回 false**
* **a.length !== b.length，长度（容量）不等时，直接返回 false**

妙啊，日常比较其实就是这样的，大部分的比较的值都是不等的，所以数组、Map、Set 和普通对象的比较都很快返回了结果。题外话，下次想在电脑配置上和别人较劲的大兄弟可以先问问别人的电脑里有几张显卡，据我的经验显卡数量越多电脑配置越好。

好了，大的框架搞定了，我们再看看部分细节。

在 Set 类型的比较中，除了容量外，只需要再确认一下 a 中每项是不是在 b 中都有就行了：

1. a、b 容量是否相等
2. a 中所有值 b 中都有

```js
if ((a instanceof Set) && (b instanceof Set)) {
  if (a.size !== b.size) return false;
  for (i of a.entries())
    if (!b.has(i[0])) return false;
  return true;
}
```

不过若是比较 Map 类型，由于语义上而言，Map 中的项是顺序的；Map.entries() 返回的迭代器顺序和 Map 对象的插入顺序一致，所以需要加入额外的步骤来确保值顺序的一致，这点需要注意。

```js
if ((a instanceof Map) && (b instanceof Map)) {
  if (a.size !== b.size) return false;
  for (i of a.entries())
    if (!b.has(i[0])) return false;
  // 判断 a、b 中的值顺序是否一致
  for (i of a.entries())
    if (!equal(i[1], b.get(i[0]))) return false;
  return true;
}
```

此外，在比较普通对象时，要保证 a 的键在 b 中。代码中提前使用 hasOwnProperty 确保 a 中的键是在 b 中而不仅仅只是可访问而已。

```js
keys = Object.keys(a);
for (i = length; i-- !== 0;)
  if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
```

具体代码的解析到这儿就结束了，以下是完整代码。

```js
function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    if ((a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      for (i of a.entries())
        if (!equal(i[1], b.get(i[0]))) return false;
      return true;
    }

    if ((a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;

    // 如果 a、b 对象使用了自定义的 valueOf 或 toString 方法，那么需要使用自定义的这些方法来比较
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
}
```

## 扩展

理论上，这个库已经足够完善了。不过你可以修改 if/else 中的一些细节，以适应自己项目的使用环境。

以下以 [react-fast-compare](https://github.com/FormidableLabs/react-fast-compare) 为例。react-fast-compare 在 fast-deep-equal 这个库的基础上新增了几行逻辑，用来比较 DOM 以及 React 元素。

React 16 兼容 IE9+，但是 IE9+ 浏览器并不保证 Map、Set 等类型的支持，react-fast-compare 对此进行了优化：

```js
var hasMap = typeof Map === 'function';
var hasSet = typeof Set === 'function';
var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView;

function equal(a, b) {
  if (a && b && typeof a == 'object' && typeof b == 'object') {
    
    if (hasMap && (a instanceof Map) && (b instanceof Map)) {
      // ...
    }

    if (hasSet && (a instanceof Set) && (b instanceof Set)) {
      // ...
    }

    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      // ...
    }

  }
}
```

如果是比较 DOM 元素，a、b 两个 DOM 元素一定不相等，返回 false。

```js
const hasElementType = typeof Element !== 'undefined'

function equal(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == 'object' && typeof b == 'object') {

    // 逻辑走到这里说明 a!==b
    if (hasElementType && a instanceof Element) return false
  }
}
```

如果是比较 React 元素（a.$$typeof），那么需要跳过 _owner、__v、__o 属性，防止陷入循环比较。

```js
// custom handling for React/Preact
for (i = length; i-- !== 0;) {

  if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
    // React-specific: avoid traversing React elements' _owner
    // Preact-specific: avoid traversing Preact elements' __v and __o
    //    __v = $_original / $_vnode
    //    __o = $_owner
    // These properties contain circular references and are not needed when
    // comparing the actual elements (and not their owners)
    // .$$typeof and ._store on just reasonable markers of elements
    continue
  }

  // all other properties should be traversed as usual
  if (!equal(a[keys[i]], b[keys[i]])) return false
}
```

## 总结

fast-deep-equal 中的剪枝策略好用且好记，可以背下来作为参考，这里小小的总结一下本文。

* 使用严格比较运算符。比起比较运算符，它严谨，且快。
* 比较两数组变量的内容是否相等时，可以先比较其长度，提高效率。
* 作为基础类库，fast-deep-equal 的兼容性并不是完美的，你可以在它基础上按照自己项目的使用场景进行修改。

## TODO

* [fast-equals](https://github.com/planttheidea/fast-equals)

