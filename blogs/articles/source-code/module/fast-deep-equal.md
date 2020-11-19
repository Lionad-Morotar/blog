# 判断两个变量相等

根据 fast-deep-equal 提供的 benchmark，它是判断两个变量是否相等的最快的库：

```
fast-deep-equal x 261,950 ops/sec ±0.52% (89 runs sampled)
fast-deep-equal/es6 x 212,991 ops/sec ±0.34% (92 runs sampled)
fast-equals x 230,957 ops/sec ±0.83% (85 runs sampled)
nano-equal x 187,995 ops/sec ±0.53% (88 runs sampled)
shallow-equal-fuzzy x 138,302 ops/sec ±0.49% (90 runs sampled)
underscore.isEqual x 74,423 ops/sec ±0.38% (89 runs sampled)
lodash.isEqual x 36,637 ops/sec ±0.72% (90 runs sampled)
deep-equal x 2,310 ops/sec ±0.37% (90 runs sampled)
deep-eql x 35,312 ops/sec ±0.67% (91 runs sampled)
ramda.equals x 12,054 ops/sec ±0.40% (91 runs sampled)
util.isDeepStrictEqual x 46,440 ops/sec ±0.43% (90 runs sampled)
assert.deepStrictEqual x 456 ops/sec ±0.71% (88 runs sampled)

The fastest is fast-deep-equal
```

## fast-deep-equal

比较两个变量相等（这里说的是深层次相等）的最关键思路是：

* 类型必须相等，否则返回失败

在 fast-deep-equal 的模块源码中还能看到以下一些比较 hack 的思路：

* constructor 不同的对象返回失败
* 长度不同的数组、键长度不同的对象、项长度不同的 Map 和 Set... 直接返回失败

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

## fast-deep-equal extend

如果需要比较其它类型的对象，可以在判断两个对象是否相等的添加额外的 if/else。以下以 react-fast-compare 代码为例：

```js
const hasElementType = typeof Element !== 'undefined'

function equal(a, b) {
  if (a === b) return true

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    // ...

    // START: react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element) return false

    // custom handling for React/Preact
    for (i = length; i-- !== 0;) {

      // 防止陷入循环 JSON 的比较
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

      // 正常比较 React 元素的属性
      // all other properties should be traversed as usual
      if (!equal(a[keys[i]], b[keys[i]])) return false
    }
    // END: react-fast-compare

    // ...
  }

  return a!==a && b!==b;
}
```