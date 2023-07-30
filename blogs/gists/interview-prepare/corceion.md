# 隐式类型转换

[TOC]

能回答出以下表达式的结果并指出具体原理，就不用继续看了。

1. 1 + 1 + '2'
2. ('b' + 'a' + + 'a' + 'a').toLowerCase()
3. 1 === [[[1]]]
4. ([] == []) === ([] == ![])
5. !!((a = [0]) && [0] && (a == true))
6. 1 <= NaN || 1 >= NaN

## 快速查阅

* 不同类型转数字：

```js
[null, Symbol(''), String(' '), [], {}, ()=>{}, undefined]
    .map(x => {
        try { console.log(+x) }
        catch (err) {  console.log(err.message) }
    })

// >>> VM:2 0
// >>> VM:3 Cannot convert a Symbol value to a number
// >>> 2VM:2 0
// >>> 3VM:2 NaN
```

稍稍要注意的是，字符串和数组的转换规则比较迷，：

```js
['', ' ', '123', '1a']
    .map(x => {
        try { console.log(+x) }
        catch (err) {  console.log(err.message) }
    })

// >>> 2VM:3 0
// >>> VM:3 123
// >>> VM:3 NaN

[[[[]]], [undefined], [[[1]]], ['1'], [1,2], ['1','2']]
    .map(x => {
        try { console.log(+x) }
        catch (err) {  console.log(err.message) }
    })

// >>> 2VM:3 0
// >>> 2VM:3 1
// >>> 2VM:3 NaN
```

* 不同类型转字符串：

```js
[null, Symbol(''), 123, [], {}, ()=>{}, undefined]
    .map(x => {
        try { console.log(''+x) }
        catch (err) {  console.log(err.message) }
    })

// >>> VM:3 'null'
// >>> VM:4 'Cannot convert a Symbol value to a string'
// >>> VM:3 '123'
// >>> VM:3 ''
// >>> VM:3 '[object Object]'
// >>> VM:3 '()=>{}'
// >>> VM:3 'undefined'
```

* 不同类型转布尔值：

```js
[null, undefined].map(x => !!x)
// [false, false]

[Symbol(''), String(''), Number(), {}, ()=>{}].map(x => !!x)
// [true, false, false, true, true]

[0, NaN].map(x => !!x)
// [false, false]
```

## 隐式转换概览

JS 是弱类型语言，一般而言，不同类型数据之间可以互相转换。强制转换可以调用 ToNumber、ToString 等函数实现。此外，在以下规则会发生隐式转换。

* 加减法（A + B），转换规则比较复杂，见下一小节
* 一元操作符，如 `+A`，相当于 ToNumber
* 乘性运算符，乘除法和取模运算，相当于 ToNumber
* 布尔操作符，与或非，相当于 Boolean
* 关系运算符，如等号和小于号，见下一小节

## 运算规则

运算涉及到 NaN 时，按照以下规则进行返回：

* 运算操作符，返回 NaN，如 `1 + NaN` 为 NaN
* 关系操作符，返回 False，如 `1 > NaN === 1 < NaN // true`

### 加法规则

加法形如 A + B，简单而言会经历以下步骤（省略报错步骤）：

1. 计算左侧表达式并通过 ValueOf 取值为 Lval
2. 计算右侧表达式并通过 ValueOf 取值为 Rval
3. 通过 ToPrimitive 取 Lval 原始值 Lprim
4. 通过 ToPrimitive 取 Rval 原始值 Rprim
5. 只要 Lprim 或 Rprim 任一是 String 类型，那么分别应用 ToString 取值，返回两值字符串相加的结果
6. 分别应用 ToNumber 取值，返回两值之和

注意，加法规则和关系运算的规则不同的地方就是第5条，前者左右值任一为 String 就会代入运算，是“或”逻辑，而后者必须是“且”。

从加法规则可以发现，如果运算对象没有 ValueOf 接口（或者 ValueOf 仍返回对象），那么隐式转换会发生在 ToPrimitive 相关步骤。

### ToPrimitive

ToPrimitive 负责将值转换为原始值。简单来说，除了 Object 类型调用 ToPrimitive 时，会隐式调用 ValueOf 和 ToString 之外，其它基础类型的 ToPrimitive 操作都会返回自身。

伪算法参考以下步骤：

1. 如果定义了 Symbol.ToPrimitive 则调用取得返回值并返回（结果类型为 Object 则抛类型错误）
2. 根据 PreferredType 的值取 hint（'default' | 'string' | 'number'）
3. 调用 OrdinaryToPrimitive 传入 hint，调用时，hint 若为 'default' 则会传入 'number'
    1. hint === 'string'，分别调用 ToString、ValueOf 取值并返回（结果类型为 Object 则抛类型错误）
    2. hint === 'number'，分别调用 ValueOf、ToString 取值并返回（结果类型为 Object 则抛类型错误）
    3. 抛类型错误

PreferredType 用来表明想转换到哪种原始值类型，比数组索引中的值偏好 'number'，对象属性中的值偏好 'string'。（对比 `[1,2,3][val]` 和 `{}[val]`）

### 关系运算

#### 严格相等运算

严格相等运算符不会产生隐式转换。它的规则比较简单，它始终会判断两个值的类型和与值本身是否都相等。唯一要注意的是，尽管正零和负零被认为是不同的值，但也是严格相等的。

#### 抽象相等运算

move to: js mind map

#### 抽象关系运算

1. 以 ToPrimitive 携参数 hint Number 计算两个操作数的原始值
2. 两个值都为 String，则逐个字符对应的 Unicode 索引的大小
3. 使用 ToNumber 转换两个值，继续比较
4. 任一值为 NaN，返回 False
5. 任一值为正零，另一值为负零，返回 False
6. 返回比较两个值的结果

## 阅读更多

* [规范中的 ToPrimitive 抽象操作](https://segmentfault.com/a/1190000016325587)
* [Static Semantics meaning?](https://stackoverflow.com/questions/40430578/static-semantics-meaning)