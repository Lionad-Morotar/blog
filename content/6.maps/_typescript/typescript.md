---
title: TypeScript
description: TypeScript 的核心概念、高级类型、应用实践和工程化经验，包含类型体操、项目配置等内容的完整指南。
---

## Roadmap

#### GPT 4.1 眼中的 TypeScript 路线图？

<!-- https://www.maxai.co/share?id=c5897b7769097a529e65e0085012b90f6de188431ff8cda8ecfb1a1a -->

**入门阶段**

* TypeScript 与 JavaScript 的区别与优势
* tsconfig.json 基本配置
* 基础类型（number、string、boolean、array、tuple、enum、any、unknown、void、null、undefined、never等）
* 接口（interface）与类型别名（type）
* 函数类型、可选参数、默认参数、剩余参数
* 类（class）与继承
* 模块化与 import/export
* 基本类型推断与断言

**进阶阶段**

* 高级类型（联合类型、交叉类型、字面量类型、映射类型）
* 泛型（泛型函数、泛型接口、泛型类、泛型约束、默认泛型参数）
* 条件类型与 infer 用法
* 类型守卫、类型收窄、用户自定义类型保护
* 内置工具类型（Partial、Pick、Record、ReturnType、Parameters、Awaited等）
* 模块声明与第三方库类型声明（DefinitelyTyped @types/*, d.ts 文件）
* 类型兼容性/协变与逆变
* 装饰器（Decorator）

**高级阶段**

* 类型体操（复杂条件类型、多层 infer、类型递归、模板字面量类型）
* 自定义类型工具（封装复用型工具类型、类型运算优化）
* 项目架构层面的类型设计（如事件系统、插件系统、依赖注入等的类型安全实现方式）
* 利用类型系统实现 DSL（领域特定语言）
* 大型团队/库的 tsconfig 管理与类型隔离
* 与 Babel、Webpack、ESLint 等构建工具联动，类型在工具链中的协作
* 与前端框架深度结合（如 React 的高级类型、Vue 的类型推导、Svelte）
* 参与和贡献 TypeScript 生态（如 PR DefinitelyTyped、参与类型相关 RFC）

## 模块系统

#### 模块解析如何工作？

TS 的模块解析语法上完全兼容 ESM，解析规则大体基于 NodeJS 的模块解析规则。基于 NodeJS 解析规则的前提是配置了 moduleResolution: node，当然，其他选项基本上不会用到。

略过 NodeJS 模块解析规则，TS 的文件名匹配过程如下：

1. 判断是否是 TS 文件，是则匹配完成。
2. 判断是否是文件夹，是且找到该文件夹下的 index.ts 文件，则匹配完成。
3. 判断是否是文件夹，是且找到该文件夹下的 package.json 文件，则继续 4、5。
4. 如果 moduleResolution 配置 node16 或 nodenext，则优先匹配 package.json 的 exports 字段。
5. 其次匹配 package.json 中的 types、main、module 字段。

#### 如何修改全局命名空间下的类型？

在项目特定目录创建的 global.d.ts 文件会自动加载并合并到全局模块中。而在文件模块中，也可以使用 declare global 来声明全局模块。

```ts
declare global {
  interface String {
    endsWith(suffix: string): boolean;
  }
}
```

#### 如何保留有副作用的导入？

当模块设置了 sideEffects false 时，TS 和编译工具会认为该模块没有副作用，并可能将部分代码摇树优化掉。使用以下写法可以强制保留副作用模块的导入：

```ts
// method 1
import './foo'
import './bar'
// method 2
require('./foo')
require('./bar')
// method 3
import foo = require('./foo')
import bar = require('./bar')
const ensureImport: any = foo || bar
```

#### 为什么不推荐使用 namespace？

namespace 主要用于将代码分块，会被编译成如下代码。而既然 ES Module 已经能做好这件事，随着 ES 标准逐渐流行，也就不再需要 namespace 这种多余的抽象了。

```ts
// 编译前
namespace Utility {}
// 编译后
(function (Utility) {
})(Utility || Utility = {});
```

#### 为什么 TS 支持导入 CSS 文件？

语法上 TS 没有限制能导入什么类型的文件，而 TS 编译器本身不会去解析 CSS 文件的内容，只要你写了 import "./index.css"，TS 编译器会尝试类型检查。如果没有合适的类型声明，会报错。所以一般仍然需要声明文件的类型，通常是通过 `declare module "*.css"` 来声明 CSS 模块。

## 类型系统

#### 全局类型声明是如何运作的？

全局类型声明即 @types 类型包。默认情况下，TypeScript 会自动包含所有在 node_modules/@types 文件夹下能找到的类型声明包。但如果明确设置了 compilerOptions.types，只有列表中指定的类型声明包会被包含进来，其他的都不会自动包含。

#### 类型接口应该如何使用？

类型接口应用于面向对象编程中对可继承或可扩展对象、类、函数接口的设计，而类型别名适用于此外几乎所有场景。

在实际应用中，常使用到类型接口声明合并的功能，比如：

```ts
interface Window { foo: number; }
interface Window { bar: string; }
// Window 等同于 { foo: number; bar: string }
```

#### 枚举类型是怎么编译的？

一个简单的编译示例，两段代码分别是枚举类型源码和编译结果。这种值和字面量双向映射的特性，也意味着很好地通过运行时实现了类型和值的统一。但如果声明枚举时指定了字面量（如下代码中的“Unknown”），则编译结果会变成名字到值的单向映射。

```ts
enum Tristate {
  False = 5,
  True,
  Unknown = "Unknown"
}
```

```js
var Tristate;
(function (Tristate) {
    Tristate[Tristate["False"] = 5] = "False";
    Tristate[Tristate["True"] = 6] = "True";
    Tristate["Unknown"] = "Unknown";
})(Tristate || (Tristate = {}));
```

通过上面的例子，能发现从可变行为而言，枚举和数字类型是互相兼容的。但需要严格区分类型检测行为和运行时行为，比如以下代码有类型错误，但运行结果为 true：

```ts
enum Status {
  Ready,
  Waiting
}
enum Color {
  Red,
  Blue,
  Green
}
const [myStatus, myColor] = [Status.Ready, Color.Red]
//@ts-expect-error
console.log(myStatus === myColor) // -> true
```

#### 如何定义可函数重载的类型？

```ts
type LongHandAllowsOverloadDeclarations = {
  (a: number): number;
  (a: string): string;
}
```

#### 泛型是什么？

泛型是一种允许编写代码时不指定具体的数据类型，而是在使用时再传入具体的类型的技术。设计泛型的关键目的是给类实例、类方法、函数参数、函数返回值等成员提供有意义的约束。

在代码中，简单泛型通常按照惯例用 T、U、V 等单字母表示，如：

```ts
function identity<T extends string>(arg: T): T {
  return arg;
}
```

#### 裸类型是什么？

裸类型在带入运算时会自动展开，非裸类型则不会。

```js
type WrapNaked<T> = T extends any ? { o: T } : never
type WrapUnNaked<T> = { o: T } extends any ? { o: T } : never

type Foo = WrapNaked<string | number | boolean>
// { o: string } | { o: number } | { o: boolean }

type Bar = WrapUnNaked<string | number | boolean>
// { o: string | number | boolean }
```

#### Enums VS Literal Unions

* Georges Haidar 提到枚举相比字面量联合 [支持 TSDoc 的 Deprecated 声明](https://blog.disintegrator.dev/posts/ode-to-typescript-enums/)

## 高级类型

#### 什么是新鲜性检查（Freshness）？

当使用对象字面量传参或赋值时，TS 会额外检查是否有未声明的（多余的）属性。如果想要跳过这种检查，可以使用变量中转。

```ts
interface Person {
  name: string
}
const printPerson = (p: Person) => console.log(p.name)
//@ts-expect-error
printPerson({ name: 'Alice', age: 18 })
//@ts-expect-error
const p1: Person = { name: 'Alice', age: 18 }
const p2 = { name: 'Alice', age: 18 }
// ok
printPerson(p2)
```

#### Iterable 和 Array 是什么关系？

实现了 Symbol.iterator 接口的对象都视为是 Iterable 的对象，所以 Array、Map、Set、String、Int32Array 等都是 Iterable 的。

见：[Iterators and Generators](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterables)

#### TS 泛型对比 C++ 模版元编程

C++ 的模板机制支持更底层的类型参数化，且是编译时的计算。例举几个 C++ 模版能做到而 TS 类型系统做不到的特性：

* 编译期计算：编译期递归计算斐波那契数，最终把结果作为常量用在代码中

```cpp
template <int N>
struct Fib {
    static constexpr int value = Fib<N-1>::value + Fib<N-2>::value;
};
template <>
struct Fib<1> { static constexpr int value = 1; };
template <>
struct Fib<0> { static constexpr int value = 0; };

constexpr int f10 = Fib<10>::value; // 编译期常量 = 55
```

* 模板特化：可以为特定类型提供不同的实现

```cpp
// 1. 通用模板
template<typename T>
void process(T val) { /* 通用实现 */ }
// 2. 针对 int 优化
template<>
void process<int>(int val) { /* 针对 int 的高效实现 */ }
```

#### 内部工具类型推导？

* [工具类型](/source-code/_ts/utility-types)

#### 什么是类型体操？

TypeScript 的类型系统是图灵完备的，这意味着能用 JavaScript 解决的问题，用 TypeScript 的类型系统同样能解决，只是实现方式不一样。尽管完成某种“实现”的方式可能非常复杂，但人们就像玩玩具一样喜欢玩它，或是把它看作某种脑力运动。充满技巧，有乐趣，复杂，又花里胡哨，所以是体操咯。

* [类型体操](/maps/_typescript/type-gymnastics)
* [体操训练](/source-code/_ts/type-challenges)

#### 什么是图灵完备？

图灵完备通常指一门编程语言，这意味着这门语言能完成所有图灵机能做的工作。图灵机简单来说，是一个带有无限长度纸带的机器，纸带上有规律组成的 0 和 1，而图灵机通过读写纸带，就可以模拟任何可以实现的计算。

见：[什么是图灵完备](https://www.bilibili.com/video/BV18L4y15786/)，[什么是图灵完备](https://www.zhihu.com/question/20115374)

## 经验

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

#### [“TypeScript 不值得！”前端框架 Svelte 作者宣布重构代码，反向迁移到 JavaScript 引争议](https://mp.weixin.qq.com/s?src=11&timestamp=1685334730&ver=4557&signature=YHLVy3Pb0b4pKL4-x5Qn7MHu71CQCnJfE04W3iJTm1pQ0X-LgQ6kLfW9TMnfXmTHvmM1YN-xRsFsuAlSKCePE-Goat-MdhOzQqvIVcMl6kPLpJ10vTrrRmwQRZljDCoD&new=1)

2023 年 5 月 9 日，Svelte 团队发布 TS to JSDoc Conversion 的 PR，讨论点在 JSDoc 对类型开发的友好程度不如 TS。作者 Rich Harris 表示原因比较复杂。

![原因](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20230529124336.png)

<q>团队在 Sveltekit 中尝试这么做并取得了良好效果，所以想在  Svelte 4.0 也这么做。</q>

<q>这就没必要了，因为在构建应用程序的过程中，大家无论如何都需要构建的步骤。应用开发的重点在于优化代码、控制它的体量，并把一切都捆绑起来。但如果是想构建一个库，那我强烈建议改用 JSDoc。</q>

如果是构建应用程序，没必要转向 JSDoc。

对 Svelte 而言，框架本身没有放弃类型安全；对开发者而言，能降低贡献门槛；对用户而言，代码直接指向源码方便调试，也助于能减小代码体积。

## 项目配置

#### [compilerOptions.isolatedModules](https://www.typescriptlang.org/tsconfig#isolatedModules)

许多编译工具如 Babel 不支持在“一个系统层面”角度理解类型。所以需要开启 isolatedModules。开启后，TS 会将每一个 TS 文件都视为独立的 Module，这需要项目使用 ES Module 语法，但同时，TS 会带来更严格的类型检测支持。

在 vite-based 项目中，这个选项应该且默认打开。

#### [reference](https://www.typescriptlang.org/docs/handbook/project-references.html)

项目引用允许将 TypeScript 程序构建成更小的部分，以缩短构建时间，在组件之间实施逻辑分离，并以新的、更好的方式组织您的代码。

```json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  },
  "references": [
    { "path": "../other-project" }
  ]
}
```

#### 编译配置示例？

完整的编译配置文档见：[TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig)

```json
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'es3', 'es5', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext' 或 'latest'
    "module": "commonjs",                  // 决定输出的模块类型: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 sourcemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```

## 应用

#### 如何从 JavaScript 项目迁移到 TypeScript？

见：[Migrating from JavaScript @TypeScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)

#### 如何使用 DefinitelyTyped？

DefinitelyTyped 是一个社区驱动的 TypeScript 类型定义仓库，提供了大量第三方库的类型定义文件。几乎排名前 90% 的旧 JavaScript 库的声明文件存在于这个仓库。安装也非常简单，以 lodash 为例：

```bash
npm install --save-dev @types/lodash
```

#### 省略参数结合 Rest 参数的一个误用？

以下代码为例，调用函数 c 这种写法存在类型错误。

```ts
const c = (() => {}) as any as {
  (foo: string, bar?: number, ...others: string[]): number;
}
//@ts-expect-error
c('123', '23')
```

除非改成重载类型：

```ts
const c = (() => {}) as any as {
  (foo: string, bar?: number, ...others: string[]): number;
  (foo: string, ...others: string[]): number;
}
```

#### 如何校验递归类型？

可以借助类型保护函数校验递归类型，以下代码为例：

```ts
type Nested = { value: number } | { nested: Nested }

function isNested(obj: any): obj is { nested: Nested } {
  return obj && typeof obj === 'object' && 'nested' in obj
}
function getValue(obj: Nested): number {
  if ('value' in obj) {
    return obj.value
  }
  if (isNested(obj)) {
    return getValue(obj.nested)
  }
  throw new Error('Invalid structure')
}
```

#### 只读索引签名是什么意思？

当使用只读索引签名去约定一个对象的类型时，只能向该对象添加新属性，而不能修改或删除这些属性。

```ts
interface Foo {
  readonly [x: number]: number
}
const foo: Foo = { 0: 123, 2: 345 }
//@ts-expect-error
foo[0] = 456
//@ts-expect-error
delete foo[0]
```

#### 如何给数组同时设置数字索引类型和字符串索引类型？

同时设置需要保证：number 索引返回的类型必须是 string 索引返回类型的子类型。比如，以下代码是正确的。

```ts
type Foo = {
  [index: number]: { b: string }
  [index: string]: { a?: string, b: string }
}
```

#### 应当如何正确使用 never？

never 是一种底层类型，表示永远不会有值的类型。它通常用于函数永远不会返回的情况，比如抛出异常或无限循环。具体代码中，常使用 never 手动收缩类型，来达到类型保护的效果。

```ts
type Shape = 
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
// 当新增一种 Shape 时，由于 getArea 中没有处理这种情况，
// 会抛类型错误，但不会影响运行时
//| { kind: 'new'; side: number }

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.side ** 2
    default:
      const _never: never = shape
      return _never
  }
}
```

上述风格的写法也可以应用到代码的 if-else 分支中，确保所有可能的分支都被处理。

#### 如何通过名义化类型解决结构化类型自动兼容问题？

名义化类型是指通过某种方式将类型的结构与其名称绑定在一起，从而使得两个结构相同但名称不同的类型不再兼容。

```ts
interface UserIdBrand { readonly __brand: "UserId" }
type UserId = string & UserIdBrand

interface ProductIdBrand { readonly __brand: "ProductId" }
type ProductId = string & ProductIdBrand

declare const userId: UserId
declare const productId: ProductId
getUserPosts(userId)      // OK
getUserPosts(productId)   // Type Error! 不能传 ProductId
```

## 推荐阅读

* [TypeScript Deep Dive](https://jkchao.github.io/typescript-book-chinese/)
* [详解 TypeScript 里的 This](https://zhuanlan.zhihu.com/p/104565681)
* [In typescript, why is `[boolean, string?]` different from `[boolean, string] | [boolean]`?](https://stackoverflow.com/questions/69635559/in-typescript-why-is-boolean-string-different-from-boolean-string/69653332#69653332)
* [TypeScript error: "Type 'number' is not assignable to type '0 | 1 | 2' ". Why am I getting this error?](https://stackoverflow.com/questions/56346520/typescript-error-type-number-is-not-assignable-to-type-0-1-2-why-am)
