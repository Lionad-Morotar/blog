# 类型体操（Type Gymnastics）

[TOC]

## 语法关键字

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

## 字面量

TS 中有五种字面量，分别是数字、布尔值、元组、字符串和对象。其使用方法和 JS 类似。

```ts
type test_bool = true
type test_num = 1
type test_string = `a_${test_num}`
type test_tupple = ['a', 'b']
type test_object = { a: 'a' }
```

#### 如何判断 never？

```ts
type Test<T> = T extends never ? true : false
type test = Test<never> // never !!!

// Right Version 1
type IsNever<T> = (T extends never ? true : false) extends true ? true : false

// Right Version 2
type IsNever<T extends any> = [T] extends [never] ? true : false
```

见：[TypeScript 中的 never 类型具体有什么用？](https://www.zhihu.com/question/354601204)、[what is "extends never" used for?](https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for)

#### 如何合并对象？

使用 Required，传入对象的相交的值。

```ts
Required<{ a: 'a' } & { b: 'b' }> // { a: 'a', b: 'b' }
```

见：[TypeScript conditional types - filter out readonly properties / pick only required properties](https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir)

## 语句结构

在入门一门语言时，基础的语法篇都离不开选择（ifelse）、循环（loop）、函数三大篇。学完这几个基础结构之后就可以写一些简单的逻辑啦。我们说 TypeScript 的类型系统很强，说的是他也能实现选择、循环、运算和函数这几种功能。

### 函数

其实函数最简单。函数的调用就发生在我们定义新类型的时候，此时 TypeScript 会自动计算出相应定义是否合规及其返回结果。泛型中传递的参数则可看作函数传参。

```ts
type test1<T> = T | string
type test2 = test1<number>
```

### 选择

选择对应 TS 中的 extends。用来判断某种范围是否是另一种范围的子集（更严谨的说法是判断某种类型是否可以分配给另一种类型）。这里的范围可以是某种值，也可以是某种类型。所以我们可以看到 1 extends number 或 number extends number | string 这种写法。既然是判断范围而不是直接判断值是否相等，所以才会通过结合三元运算返回 true 或 false 来达到返回某种值的功能。

```ts
type test = 1 extends 1 ? (/* other logic */) : (/* other logic */)
```

### 循环

TS 类型系统中的循环需要使用递归来实现，姑且可以把它们看成一个东西。循环的闭包可以用递归调用时传递的参数替代。

```ts
type For<n extends number, res extends string = ''> = n extends 0 ? res : For<n-1, res + 'x'>
```

嘿嘿，眼尖的同学可能看出来了，这其实是字符串和数字的乘法。不过，这个 n-1 在这里会报错！至于怎么解决报错，我们将在下一小节详细讨论。

## 基本运算

### 比较运算

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

### 加减乘除

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
type CreateTupple<n extends number, T extends any[] = []> =
  T['length'] extends n ? T : CreateTupple<n, [...T, any]>

type Add1<n extends number> = [...CreateTupple<n>, any]['length']
type Minus1<n extends number> =
  CreateTupple<n> extends [...infer Pre, infer Last] ? Pre['length'] : never;

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

## 工具

- [常用类型推导](/articles/source-code/ts/utility-types.html)
- [类型训练](/articles/source-code/ts/type-challenges.html)

- [typepark](https://github.com/kgtkr/typepark)
- [tsafe](https://github.com/garronej/tsafe)
- [type-fest](https://github.com/sindresorhus/type-fest)
- [Todash](https://hannq.github.io/todash/)

### 阅读更多

* [TypeScript 类型体操指北](https://zhuanlan.zhihu.com/p/452657140)：最棒的入门文章。
* [深入理解 TypeScript 高级用法](https://zhuanlan.zhihu.com/p/136254808)：相关 TypeScript 类型编程的经验性的理解，用于入门。
* [TS 类型体操：图解一个复杂高级类型](https://mp.weixin.qq.com/s?__biz=Mzg3OTYzMDkzMg==&mid=2247488220&idx=1&sn=b675fc51709580dddfd92b5d00b4dc82&chksm=cf00dde7f87754f1ae22492fe30de137dbe8a03bf9cfe4df371b10380efdc40d5f01b3ee219d&token=276884438&lang=zh_CN#rd)
* [使用 TypeScript 类型系统实现的贪吃蛇](https://www.typescriptlang.org/zh/play?ts=4.5.0-beta&ssl=3&ssc=4&pln=3&pc=28#code/FAegVGwARlj+8oClcoBUCeAHApgZQMYCcBLdAFykG8fQaPVBvn0H2-QPO1AG50BC3QKljBgFUHGw6SGKQDjtA8EaAX6MBwZoCx-nlAC0UQFgJgcfjAd-KBOUyjYSAQ3wkA4poC2mKM0BDyoAdTQKbmgAH1A05pDAQAxSZUQDTegADlAVHIXABPKBTRSE7QDfTDk5mQAV1QHALJz4XV0AYuW9zf0ABI0BIc0B9jMBLJwjIwBh-wGV9UPZABiVs5iDATAVALHlAf1TAck08wDc9QAp1QGg5d0ByPUAvxUYOz2yY2DjASDkk-0B56y7mQAqlQB15BygAdUBABgBBFewVgBEoQDAlQGolQGO5QAsIqEAoORXAM90VtpXAZ+UhqClZQAJ8yMAag0A7WxaqKAAxACMLn+ADkLoBT80A0O5TTrMQDcroAjdKGIGAJAwxm2mAAZpoAK4AGxI-wA9iSACYAZygAF4oABtemAgA0UAADABdVn0gCsrM53IAHPyORyANxojFQLG4wkkbAAO00AGtjHSAN7QKAAC0wmnJAC4GWyRRKoFAAEYU1BGxkmqCArnG1kAJid9PtAGZRRKAL4S9FYKD6IzAukabR6QyYAA8Wpl+KJipVmGZ8ZxieJZKpafN9K15oARNtC7nzVBi6WCxWS2Wi7Xq5W6zWq+WW82m43sK3y4Xux3+12e0XB22+8OK2sJ4Wpx3Z42p1qOcAAHwBqVA2nB6OAj3iyVB-4urchzC7x3rw+ek87+luy-Gf4AFhvofp3ofAJ5r7P9Kf+8DR8ADYf13HkAI3AB2UD6SAiDD0FGDIPgx8AE4YMFFCAUBNkYNQrCgTDbc3xwgjAWPOlT3PC9QBAKAADpGIPYwABlNEpYktzYjiAEkSEwAwYyotdgFE2ioEpEk8XwXBMGYqAAFEDFIVAt0LQBeDcAS-3C0-ZNVQACT1ck1PUwAWXZ0+S9MwAAha0TMAU-2LMAgFszUwA+DcALV2LPkgAFElKUIEhCBJBUt3pBU8QMC1MHwVkIqimKsKsrdNXNXV9SNPyAqCkKzUta1Mv8wLgoVel939eTSQpak6Sy4qQrKiV5NBTAAA8SFBSLovwONzXBNr+IVKkoHi7qy2QKABswIbqVGmKyrC5cVy3ZB6ULAlpoAcxIbVCw5Sb2um4bBS1AB+RT8HwEl8C1I1VvWradr2g7BuG0EzoZRj6OQEU1o2hVtt25dzSNFr2s6hKetBbkvp+9kORE5yfPwTAADcIe63qoH6w6ZpGrqYvGl6jtmgn8AWukytXFa-seoHibx97zXOiaprx+lNAVVBWS+wgFWxGKoGs4Hy3O6zaYBp6RZBi6rpumXkbRjGYpjaHnQYxjkAR3TtUIbESBjVnceGznUDK5a6SN17qXpbFCHwDijVNnnGO0TbKSNPmBfwKAACV9vO32oFtLC-PQQ2GZNrnzZWyObd5-nBbWVlTYDqA1mDhksIAVQVbBdf1iO2ajs2nQUi2GQUl3vtDvFKW1IvjepU2ytZHiK-pWG26w7iSD4gTG+tqAW4R2Pi-j12udZL3BYAWTT2fM4VNGYs-f57d4-jBKtknh+j0fLb3OOoFRklCGM87l9RwW7r3JrnPBOlC00QsoAAHwrC1X4-wtcG-ityT-0LJgIB2IgGbSAbtd+FZCBOSlDxSktlySoBjNZY+Vk1pWmQXtVkPlj51RygqCu4sHqS3puPdkH1cQEkpHJGWaCKH0h8tXVOH0SD4DxHQzODCm4MmdhreiM8fYAGERbnWEegpUqpMHWj2tWc6CCkEoOEbglc1YjRXxirdEaK98D3ylL7I6MUWJ81jFqAAmsfOasUtTYEkSmNa6VAFci1DwoeGDCxYNQDgrU-x8FFUIWWAAGlYsmW42TUzpCEihJ1mYMiCaycx+0KHYHkeoKRmBDL6nUVARR1pUHcgSVAJJy0KHsM4WkqySicn0iKUk4+-w0lVXJDkpSKltG1MSck3hqS4kAAMAAk6orJZPJL6IZhihrGNMTGcxrJsCsmsqyf4rIwYdTJjGIJK4Vy+j6dovJyCCnxK6aU3h5SuHnUGcMjJSjxnqkmeSaZy9ZnzMWcs1ZA1lY9S2TsvZMtOnFO6UPRp-ShnNLuQ8p5sY5nqDeQCD54MNk-N2doq5bT0QQqMfgExzyYULKFu87GnykXbN2fooMuhMAkBxbGZUFdlTH2foWD6ESZYMooZ45lcTATaPZbw3+XKoDnRdLyxlgCPqelFRykBH0nxSv5WAj6PJ5VD0LBAj6QEVW70LLtD6kEtV40LLAj6sSl66PJcYPA00zHmlGfY6ROqjI+PNEo+1mAZHYJceaPxFDmmUkiVAVKDIGV82xhyI0kLsUzMpdSmZdLWSjMWdaZZe4RIVXkpGmMdiUkZOWQ07MlIK5WuedgRxTqnSls8bIp0-wRLyVniSa+2wSQAHcFRZrdRXINTjbSVqcXtPcCL1mQyzWW-UA7HQrn3OaLxRpc75z1gbMOo6q2epXPMsdzi00WqgA26+2dw7Zp6RkrtWoe0Mj7eWwdUBFbow2Ze8dHImQI2nflZBc684FyXSSQ9HrvEIw3Y6x927RLOT3ZgFiOIDZHvcSelKZ6jK2lvV8ld-an2cnXeoTdE6fRalnVAedX6YzLsrV4vamGH1br9Du8DvtCCbW1NBzt8G0qIYZGslDlGB0YcA2h59r78OEcXcRn9K6yMAaw0BqjwB03OX+PgaMHac0pjzb6gtFdM34trTutYuBCExgzhQjiRAAbzOY3SQz-KliCvOuBg9Wa1Ey0s6q7sH1wPNrbQ57RzntWLjieByDhdsCOczj5w1JY3ONswHRhj0GQsaPNaBqUugrotqU8elTN6K54IoQQkqH0g1tnPVx19bZ8M+Trg3Uj1bVF5XNL6bRmi9FJaDNgPEuBZKUkpDGH1vC8shVZDvPG-WiFbl60PZAbCOFcKNNQ2hO6Iw6FPFjGDu8rJlnG7vP1ZZdOEOpEZ9hfNNoUyzhthTRh9u8JHotANu2SqUgloDZ6FDWVCpvZVnr53MCUmWV9rNyztneb0yVHrG8+5bwM8DkKhb5mnNgymD68nowPdIU9oFu9XtxMW1GIwkP9PrwduDged3ocUcwys9QRGScKhhwyJHuOtNTpCzLNrHXvvdZK8ssH-dBK1rh7vc5lStBLcU9WNsKXW145BwTzexOoc07J6yXuPOxPVu2c2NsC7C61o1+WLXBtqcw7F+WCr9dPvI9+4pxnzPyw26NNj5bxvzTU9B4TlXhvFdO-hV7-XUvSe6-NKbhu9PvuW4ZwDm35p4s6Ovs1oAA)
* [用类型系统做的 TicTacToe](https://juejin.cn/post/7025619077158666270)
* [使用 TypeScript 类型体操实现一个简易版扫雷游戏](https://zhuanlan.zhihu.com/p/429165133)
* [用 TypeScript 类型运算实现一个中国象棋程序](https://zhuanlan.zhihu.com/p/426966480)
* [TypeScript 类型体操天花板，用类型运算写一个 Lisp 解释器](https://zhuanlan.zhihu.com/p/427309936)
* [TypeScript 类型体操通关秘籍](https://juejin.cn/book/7047524421182947366)
