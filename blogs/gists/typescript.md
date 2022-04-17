# TypeScript

[TOC]

## 类型体操

TypeScript 的类型系统是图灵完备的，这意味着能用 JavaScript 解决的问题，用 TypeScript 的类型系统同样能解决，只是实现方式不一样。

### 语法关键字

做操之前，需要了解 TypeScript 的关键字的用法，这样才能看懂其语句的基本模式。

keyof 关键字用于获取类型的键的集合。

```ts
type test1 = keyof { a: 'a', b: 'b' } // 'a' | 'b'
type test2 = { [P in test1]: 'a' } // { a: 'a', b: 'a' }
```

extends 用于判断某种类型能否赋给另一种类型，在业务中用作接口的扩充或类型约束，但在类型体操中常结合三元表达式，返回特定的值。

```ts
type test1 = 1 extends 1 ? true : false; // true
```

infer 用于推断，有点模式匹配的意思，常结合三元表达式返回推断得到的值。比如在内置类型 ReturnType 中，infer 用于匹配函数的返回值 P。获取返回值后再通过三元表达式把 P 回传出去。

```ts
type GetReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer P ? P : never
type test1 = GetReturnType<() => string | number> // string | number
```

展开运算（...）和 JS 很像，可以用来构造新的元组或是在函数中收集参数使用。因为 TS 的类型系统中不能直接做数字运算，所以相关数字的造作很大程度依赖元组的操作，所以展开运算在元组中大有作用。

```ts
type test1 = ['a', 'b', 'c']
type test2 = [...test1, 'd'] // ['a', 'b', 'c', 'd']
```

### 字面量

TS 中有四种字面量，分别是数字、元组、字符串和对象。其使用方法和 JS 类似。

```ts
type test_num = 1
type test_string = `a_${test_num}`
type test_tuple = ['a', 'b']
type test_object = { a: 'a' }
```

### 语句结构

在入门一门语言时，基础的语法篇都离不开选择（ifelse）、循环（loop）、函数三大篇。学完这几个基础结构之后就可以写一些简单的逻辑啦。我们说 TypeScript 的类型系统很强，说的是他也能实现选择、循环、运算和函数这几种功能。

#### 函数

其实函数最简单。函数的调用就发生在我们定义新类型的时候，此时 TypeScript 会自动计算出相应定义是否合规及其返回结果。泛型中传递的参数则可看作函数传参。

```ts
type test1<T> = T | string
type test2 = test1<number>
```

#### 选择

选择对应 TS 中的 extends。用来判断某种范围是否是另一种范围的子集（更严谨的说法是判断某种类型是否可以分配给另一种类型）。这里的范围可以是某种值，也可以是某种类型。所以我们可以看到 1 extends number 或 number extends number | string 这种写法。既然是判断范围而不是直接判断值是否相等，所以才会通过结合三元运算返回 true 或 false 来达到返回某种值的功能。

```ts
type test = 1 extends 1 ? (/* other logic */) : (/* other logic */)
```

#### 循环

TS 类型系统中的循环需要使用递归来实现，姑且可以把它们看成一个东西。循环的闭包可以用递归调用时传递的参数替代。

```ts
type For<n extends number, res extends string = ''> = n extends 0 ? res : For<n-1, res + 'x'>
```

嘿嘿，眼尖的同学可能看出来了，这其实是字符串和数字的乘法。不过，这个 n-1 在这里会报错！至于怎么解决报错，我们将在下一小节详细讨论。

### 基本运算

#### 比较运算

比较运算好像有点类似 extends 奥。某些情况下，两者的确是“等价”的。

```ts
type test2 = [] extends {} ? true : false; // true
type test3 = {} extends [] ? true : false; // false
type test4 = 'a' extends string ? true : false; // true
type test5 = never extends any ? true : false; // true
```

以下用 Equals 实现了一个更接近等号语义的函数。如果仅包含类型 T 的元组可以分配给仅包含类型 S 的元组，并且这两个元组即使位置互换，分配运算也能成立，那么说明这两个类型相等。对付常见的类型，这个函数就足够了。给 Euqals 传入字符串字面量、数字或是类型，他都能有效返回。

```ts
type Equals<T, S> =
	[T] extends [S]
    ? ([S] extends [T] ? true : false)
    : false
```

想讨论更复杂的相等判断见：[type level equal operator](https://github.com/microsoft/TypeScript/issues/27024)。

#### 加减乘除

和 JS 不一样的是，除了比较运算的其它运算（加减乘除等）在 TS 类型系统中是件难事儿，因为入参不同，实现也不同。需要分情况讨论。

元组是 TS 类型系统的基础，其基本运算可以概括为 Push、Pop、UnShift、Shift。分别是在尾部新增一项、去除尾部一项、在头部新增意向、去除头部一项。加法和减法分别对应 Push、UnShift 和 Pop、Shift。见下代码，在这种元组加法的实现中，灵活使用展开运算符，构造出一个新数组。减法的实现则依赖使用 infer 自动推断。

```ts
type raw = ['a', 'b', 'c']

type Push<T extends any[], Item> = [...T, Item]
type test_Push = Push<raw, 'd'> // ['a','b','c','d']

type UnShift<T extends any[], Item> = [Item, ...T]
type test_UnShift = UnShift<raw, '0'> // ['0','a','b','c']

type Pop<T extends any[]> = T extends [...infer Pre, infer Last] ? [...Pre] : never
type test_Pop = Pop<raw> // ['a','b']

type Shift<T extends any[]> = T extends [infer First, ...infer Rest] ? [...Rest] : never
type test_Shift = Shift<raw> // ['b','c']
```

由于在 TS 的类型系统中数字字面量不能直接应用加法减法等运算符，所以数字的计算要依靠其它数据结构实现。以下是一个加法减法的快速实现，通过递归执行元组的 Push、Pop 等操作，来改变元组的长度，并将其长度作为最终的计算结果返回。需要说明的是，这个实现和文中其它实现一样，仅作为实现示意，其中有许多问题，不能用于生产环境。

```ts
type CreateTuple<n extends number, T extends any[] = []> =
  T['length'] extends n ? T : CreateTuple<n, [...T, any]>

type Add1<n extends number> = [...CreateTuple<n>, any]['length']
type Minus1<n extends number> =
  CreateTuple<n> extends [...infer Pre, infer Last] ? Pre['length'] : never;

type test1 = Add1<5> // 6
type test2 = Minus1<5> // 4
```

字符的加法也就是使用模板字符串创建一个新字符串，`${A}${B}`，减法则对应 JavaScript 中的 Replace 函数的语义。见下代码，在 Replace 的实现中，使用模式匹配推断出 Old 之前的字符子串 Front 与之后的字符子串 End。推断成功，则返回一个新字符串，否则返回原字符串。

```ts
type raw = 'Lionad is lion'

type Replace<Str extends string, Old extends string, New extends string> =
  Str extends `${infer Front}${Old}${infer End}`
    ? `${Front}${New}${End}`
    : Str

// Lionad is not lion
type test1 = Replace<raw, 'is', 'is not'>
```

字符串与数字的乘法的实现也很简单。利用数字减法和递归，不断的给初始为空字符串的字符串加上原始字符串就行了。

```ts
type raw = 'Lionad '

type Multiple<str extends string, n extends number, res extends string = ''> =
  n extends 0
    ? res
    : Multiple<str, Minus1<n>, `${res}${str}`>

type test1 = Multiple<raw, 3> // Lionad Lionad Lionad
```

字符串与数字的乘方甚至只要改一个入参就能实现。

```ts
type raw = 'x'

type Power<str extends string, n extends number> =
  n extends 0
    ? str
    : Power<`${str}${str}`, Minus1<n>>

type test1 = Power<raw, 3> // xxxxxxxx（2 ** 3 === 8）
```

字符串与数字的除法要稍微复杂一些，需要对结果做一些基本的检验。做一些基本的检验。xxxx 除 x 得 4 很好理解，如果 xxxxy 除 x 那么就是非标操作了，需要返回 never。

```ts
type Divide<
  raw extends string,
  dividend extends string,
  calc extends string = raw,
  res extends number = 0
> =
  calc extends `${dividend}${infer tails}`
    ? (Divide<raw, dividend, tails, Add1<res>>)
    : (tails extends '' 
      ? (calc extends '' ? res : never)
      : never)

type test1 = Divide<'xxxx', 'x'> // 4
type test2 = Divide<'xxxxy', 'x'> // never
```

相信读懂这个 Divide 函数之后，数字的乘法除法你也可以轻松理解啦。

```ts
type CreateStr<n extends number, res extends string = ''> =
  n extends 0 ? res : CreateStr<Minus1<n>, `${res}x`>

type DivedeNum<
  n extends number,
  dividend extends number
> =
  dividend extends 0
    ? never
    : Divide<CreateStr<n>, CreateStr<dividend>>

type res = DivedeNum<88, 8> // 11
```

```ts
type GetStrLen<xs extends string, tmp extends string = '', res extends number = 0> =
  xs extends tmp ? res : GetStrLen<xs, `${tmp}x`, Add1<res>>

type Multiple<str extends string, n extends number, res extends string = ''> =
  n extends 0
    ? res
    : Multiple<str, Minus1<n>, `${res}${str}`>

type MultipleNum<n1 extends number, n2 extends number > = Divide<Multiple<CreateStr<n1>, n2>, 'x'>

type res = MultipleNum<6, 8> // 48
```

以上介绍了元组、字符串和数字的运算

- [常用类型推导](/articles/source-code/ts/utility-types.html)

#### 阅读更多

* [深入理解 TypeScript 高级用法](https://zhuanlan.zhihu.com/p/136254808)：相关 TypeScript 类型编程的经验性的理解，用于入门。

## 奇怪的问题

##### 如何理解 Interface 和 Type 的异同

Interface 和 Type 分别指“接口”和“类型”，即面向对象编程中字面意义上的接口或类型。

可以由前提条件逐步推导：

* 1. 变量实际指向一块内存；
* 2. 这块内存有着特定的大小和结构，因为其物理地址必须是有序的；
* 3. 所以，变量只能有一种类型；
* 4. 函数是一种变量，它有某种特定的类型；
* 5. 在面向对象编程中，对象需要和其它对象进行通讯，此时它必须实现了某种功能；
* 6. 对象实现了某功能也即它实现了某种接口；
* 7. 函数作为对象的一种，可以实现接口；
* 8. 函数可以同时实现多种功能，也即对应多种接口的实现；

在 TypeScript 中，实现多种接口这个特性有多种实现的办法，一个典型的用法是：同名接口自动合并。比如，如果要给 Windows 对象挂一个新属性，可以声明一个带这个新属性的 Window 接口，这个新接口会与 TypeScript 内置的 Window 接口合并成一个。见下代码。

```js
declare interface Window {
  propertyA: string;
}
```
