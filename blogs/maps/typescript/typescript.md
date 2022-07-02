# TypeScript

[TOC]

## 简介

#### 如何理解 Interface 和 Type 的异同

类型（Type）不可以合并，但接口（Interface）可以合并。可以理解为某个函数可以实现多个接口，但是作为变量，它只有一种类型。

#### 裸类型是什么？

TODO，裸类型在带入运算时会自动展开，非裸类型则不会。

```js
type WrapNaked<T> = T extends any ? { o: T } : never
type WrapUnNaked<T> = { o: T } extends any ? { o: T } : never

type Foo = WrapNaked<string | number | boolean>
// { o: string } | { o: number } | { o: boolean }

type Bar = WrapUnNaked<string | number | boolean>
// { o: string | number | boolean }
```

## 应用

#### 怎么给 Window 新增属性？

同名接口会自动合并，所以写一个新的 Window 对象的接口就好了。

```js
declare interface Window {
  propertyA: string;
}
```

### Links

[TODO，伪动态类型](https://www.typescriptlang.org/play?#code/C4TwDgpgBAggjFAvFA3lCAPCBjGAKASgC4oAhBAXwChRIyFk1MdTCT4pqqAbCYKAIbsGqKlHRZcUNvVHjxAJz4BXBQDs588c2ylpBTVsUr1UYAAsAlgGdBt5WoDWagPYB3DQNvwxR6lv9OKi4AehCoAHkAaQAaM3AIFwAzQSgbWDgqASRBKjCoAAFgawBaTEhsYDKFBRcFKAAjHAFla2hsgBMIJMs1CA67KGtgAWBLbHi6H2zkAQA6HXwCPPDouNpElIa023IePkac+cXCKjPz-f4wbmUAc17bRkESAHIBF6CNqAAFG-u1R6TTZQa53B5nJIOSqWFwaW4QNQAHgAKgA+PDXW7WEjIgwoXxKYCqDT4rSY6wxXzaSSIgCq6IECixJFpeKp8kJxKg8KRyIAZPS8KSjOI5mLyZSRaKxYysezxBRlgFfNQuLx+AIAEw5HkYv4PZZao6arKaubkuYCU3GhaSIUNIgvBovRUrQrFMoYCpVCA1Oo-WqQBSgKBOj4dFwQWyufiYGz8WFA0NoIRDYAKXq3ADcnBec1N5u4WLmDUujW1szNOiF2Ed2Bdy3y0SoDTNFuwZy+AFkBI4ICjUTlheScZKJDg6QymdioKySD2+yiBajgmd1YIAMzz3v935ggGD5C60H-ayGjdHDdZDeF4tWgQX2Y36soB1h135Iqlco4H1++rfIGvohmGUARlGUAxhI8ZQImXwvCmJDDBmajZrm+YPre1glmWAgACyXraOA1nWDZus2+FYXMHZAA)

[TODO，详解 Typescript 里的 This](https://zhuanlan.zhihu.com/p/104565681)

[TODO，In typescript, why is `[boolean, string?]` different from `[boolean, string] | [boolean]`?](https://stackoverflow.com/questions/69635559/in-typescript-why-is-boolean-string-different-from-boolean-string/69653332#69653332)

[TODO，TypeScript error: "Type 'number' is not assignable to type '0 | 1 | 2' ". Why am I getting this error?](https://stackoverflow.com/questions/56346520/typescript-error-type-number-is-not-assignable-to-type-0-1-2-why-am)

## 类型体操

#### 什么是类型体操？

TypeScript 的类型系统是图灵完备的，这意味着能用 JavaScript 解决的问题，用 TypeScript 的类型系统同样能解决，只是实现方式不一样。尽管完成某种“实现方式”可能非常复杂，但人们就像玩玩具一样喜欢玩它，或是把它看作某种脑力运动。充满技巧，有乐趣，复杂，又花里胡哨，所以是体操咯。

#### 什么是图灵完备？

图灵完备通常指一门编程语言，这意味着这门语言能完成所有图灵机能做的工作。图灵机简单来说，是一个带有无限长度纸带的机器，纸带上有规律组成的 0 和 1，而图灵机通过读写纸带，就可以模拟任何可以实现的计算。

见：[什么是图灵完备 @bili](https://www.bilibili.com/video/BV18L4y15786/)，[TODO，什么是图灵完备 @zhihu](https://www.zhihu.com/question/20115374)

#### Memo

见：[TODO，类型体操](/maps/typescript/type-gymnastics.md)