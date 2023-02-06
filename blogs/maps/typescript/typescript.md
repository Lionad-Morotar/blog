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

## 高级类型

#### Iterable 和 Array 是什么关系？

实现了 Symbol.iterator 接口的对象都视为是 Iterable 的对象，所以 Array、Map、Set、String、Int32Array 等都是 Iterable 的。

见：[Iterators and Generators](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterables)

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

[TODO，详解 TypeScript 里的 This](https://zhuanlan.zhihu.com/p/104565681)

[TODO，In typescript, why is `[boolean, string?]` different from `[boolean, string] | [boolean]`?](https://stackoverflow.com/questions/69635559/in-typescript-why-is-boolean-string-different-from-boolean-string/69653332#69653332)

[TODO，TypeScript error: "Type 'number' is not assignable to type '0 | 1 | 2' ". Why am I getting this error?](https://stackoverflow.com/questions/56346520/typescript-error-type-number-is-not-assignable-to-type-0-1-2-why-am)

## 类型体操

#### 什么是类型体操？

TypeScript 的类型系统是图灵完备的，这意味着能用 JavaScript 解决的问题，用 TypeScript 的类型系统同样能解决，只是实现方式不一样。尽管完成某种“实现”的方式可能非常复杂，但人们就像玩玩具一样喜欢玩它，或是把它看作某种脑力运动。充满技巧，有乐趣，复杂，又花里胡哨，所以是体操咯。

#### 什么是图灵完备？

图灵完备通常指一门编程语言，这意味着这门语言能完成所有图灵机能做的工作。图灵机简单来说，是一个带有无限长度纸带的机器，纸带上有规律组成的 0 和 1，而图灵机通过读写纸带，就可以模拟任何可以实现的计算。

见：[什么是图灵完备 @bili](https://www.bilibili.com/video/BV18L4y15786/)，[TODO，什么是图灵完备 @zhihu](https://www.zhihu.com/question/20115374)

#### Memo

见：[TODO，类型体操](/maps/typescript/type-gymnastics.md)

## 观点

#### [大规模采用 TypeScript 之后的 10 个见解](https://blog.csdn.net/yeluoxiang/article/details/111602386)

<q>尽管 TypeScript Design Goals 明确表示了避免在未来引入更多的运行时特征，但在发展过程中，TS 扩展了一小部分不太适合 TS = JS + Types 这个模型的功能，enum, namespace, parameter properties 以及 experimental decorators 都需要有将他们扩展为运行时代码的语义，而 JavaScript 引擎很可能永远都不会为这些功能提供支持。</q>

彭博社有专门的工具阻止使用这些不良设计，他们希望自己的代码一直和 ES 标准保持统一。

编译器更新其实值得，带来的兼容性只有两点：一是新的类型检查会暴露过去没有发现的错误，二是在同一个生态系统中如果各个项目使用不同版本的编译器，可能产物不通用。

<q>保持一致的 tsconfig 设置是非常重要的，但最终我们放弃了严格模式，选择牺牲灵活性来保持所有项目配置的一致性。</q>

当设计以 tsconfig.a.json 配置编译的代码被配置了 tsconfig.b.json 的工具引用后就可能出问题。

<q>Ambient Modules 特别之处在于，TypeScript 在发表声明时保持对修饰符的引用，从而避免将它们转化为相对路径。</q>

<q>我们的平台会确保在运行时中每个包只有一个版本的存在。我们希望对类型提供一种 “精确且唯一” 的定义，更好的反应运行时环境。</q>

不可能实现。

<q>TypeScript 仍无法知晓它生成的文件中是否存在不安全的导入</q>

因为从某个库的私有包中引入类型是不安全的，这种引入不受库接口的兼容性限制。

<q>有时 TypeScript 会将依赖中的类型内联传递给当前的类型。我们见过一些极端的例子，由于这些重复的类型定义，声明文件的大小从 7KB 膨胀到了 700KB。</q>

如何防止类型内联：

* 使用 interface 代替 type。
* 对输出添加类型注释，显式类型注释可以强制指定引用的行为，防止内联

<q>Type Shaking 有时会效果极为显著。我们曾经遇到过一些包中超过 90% 文件中有超过 90% 的类型定义行是可以去掉的。</q>