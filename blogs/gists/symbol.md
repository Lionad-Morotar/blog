# Symbol

[TOC]

Symbol.toStringTag 会影响 Object.prototype.toString。

```js
const obj = {
  [Symbol.toStringTag]: 'test'
}
console.log(obj.toString()) // [Object test]
```

Symbol.toPrimitive，其接受 hint 指示将对象默认转化为某种类型的原始值，number、string 或是 default（两者皆可）。

```js
const obj = {
  [Symbol.toPrimitive] (hint) {
    if (hint === 'number') {
      return 1
    } else {
      return 'invalid'
    }
  }
}
console.log(String(obj)) // invalid
console.log(+obj) // 1
```

Symbol.hasInstance 会影响 instanceof 运算符的结果。

```js
const obj = {
  [Symbol.hasInstance] (target) {
    return target.creator === 'obj'
  }
}
console.log({ creator: 'obj'} instanceof obj) // true
```

Symbol.unscopables 可以在 with 语句中排除指定属性的暴露。

```js
const fn = new Function()
const constructor = 'something'
with (fn.prototype) {
  console.log(constructor === fn) // true
}
fn.prototype[Symbol.unscopables] = {
  constructor: true
}
with (fn.prototype) {
  console.log(constructor === fn) // false
}
```

Symbol.isConcatSpreadable 影响 Array.prototype.concat 方法，它能定义数组拼接时是否需要展开目标。需要注意的它不会影响展开运算符，后者会被 Symbol.iterator 影响。

```js
const obj = [1,2,3]
obj[Symbol.isConcatSpreadable] = false
console.log([].concat(obj).length) // 1
```

Sybol.iterator 影响扩展运算符、for...of 等各种和迭代相关的逻辑，它指向一个迭代器函数。

```js
const obj = {
  [Symbol.iterator] = function* () {
    yield 1
    yield 2
    yield 3
  }
}
;[...obj] // [1, 2, 3]
```

Symbol.split 可以指示一个对象可用用作 String.prototype.split 接受的分隔符。

```js
const obj = {
  space: ' ',
  [Symbol.split] (str) {
    return str.split(obj.space).reverse()
  }
}
console.log('hello world'.split(obj)) // ['world', 'hello']
```

Symbol.match 指示对象可以作为正则来理解。

```js
const obj = {
  [Symbol.match]: true,
  source: 'abc',
  flags: 'img'
}
console.log(new RegExp(obj)) // /abc/gim
```

Symbol.species 可以影响实例的创建过程。啊，没能理解。

## TODO

* [Metaprogramming in ES6: Symbols and why they're awesome](https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/#symbolspecies)
