# ECMAScript Standard

[TOC]

## 资料

一些极其有用的前置参考资料，有助于甄别与理解规范里各种概念，不至于被绕晕。

* [<i>How to Read the ECMAScript Specification</i>](https://timothygu.me/es-howto/)，这个资料简要介绍了一些阅读规范时需要知悉且有助于你理解规范的前置概念并予例说明，比如说抽象操作、内部槽以及内部方法、完成记录、变异对象等。
* [<i>Understanding ECMAScript</i>](https://v8.dev/blog/tags/understanding-ecmascript)，V8 团队写的 ECMAScript 阅读指南文章系列，一共四篇，很有参考价值。
* [《ECMAScript 阅读指南》](https://juejin.cn/post/6944587399418609701)，<i>Understanding ECMAScript</i> 的翻译版本。
* [<i>What is the difference between JavaScript and ECMAScript?</i>](https://stackoverflow.com/questions/912479/what-is-the-difference-between-javascript-and-ecmascript)

### 快速入门

#### 问号和感叹号简写标记

```Let val be ! Foo()``` 等同于：

```js
1. Let val be Foo().
2. Assert: val is not an abrupt completion.
3. Set val to val.[[Value]].
```

```Return ? Foo()``` 等同于：

```js
1. Let temp be Foo().
2. If temp is an abrupt completion, return temp.
3. Set temp to temp.[[Value]].
4. Return NormalCompletion(temp).
```

## 规范综述

### 语言组成

常常能听到：“对象的本质就是实现了规范所要求的内部插槽的结构”，其实该观点源于这张图：

![[对象的本质](https://timothygu.me/es-howto/)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/timothygu.me_es-howto_object-uml.svg.png)

ECMAScript 是一种基于对象的基本语言，其基础设置主要依赖宿主提供的对象。基于此概念，可以把 ECMAScript 程序看作一组相互通讯的对象集合。按照规范，对象的精确描述其实应该是：“一个具有零或多个被属性描述符决定的属性的集合[^object-definition]”。对象的属性能持有其它值，包括规范定义的原始值：Undefined、Null、Boolean、Number、BigInt、String、Symbol 和 Object。这里说的 Object 还包括可执行对象，callable object，也就是函数。而由对象内属性持有的函数，叫做方法。

[^object-definition]: 定义见 [ Terms and Definitions - object](https://262.ecma-international.org/12.0/#sec-terms-and-definitions-object)

按照上图，规范定义了包括全局对象、Object、Function 等对象以及操作这些对象所需要用到的操作符。除此之外，还定义了用于组织程序的模块，以及行文所需要用到的静态语法。组织方式如下：

* 章节 5 定义了规范所使用的符号约定。
* 章节 6 至章节 10 定义了语言的运行环境。
* 章节 11 至章节 17 定义了包括语法、语义在内的所有语言功能。
* 章节 18 至章节 28 定义了语言依赖的标准库。
* 章节 29 描述了支持 SharedArrayBuffer 以及 Atomics 对象方法访问的内存一致性模型。

### 语言风格

ECMAScript 基于对象，这和 C++、Java 不同的本质区别在于创建对象的方式以及属性共享思路的不同：ECMAScript 支持多种方式创建对象：构造器、字面量或 Object.create，而属性共享则是使用原型。使用原型意味着尽管 ECMAScript 支持类继承，但是是通过原型继承隐式实现的：每一个构造器函数都有一个原型属性，属性名为 prototype。以该构造器创建的实例会携带一个隐式的指向其构造器的原型的引用（称为实例的原型）。而构造器函数也是一个对象实例，所以也会有对应的原型。ECMAScript 依赖这条由对象原型组成的链条式的关系，即原型链，来共享属性。而在经典面向对象语言中，总的来说，属性（也就是状态）是直接挂载在实例上的，只有方法挂载在类上，这也就意味着类继承只约束了继承结构和对象的行为，没有约束对象的状态。此外，由于 ECMAScript 支持动态重写对象，这使得你可以在运行时去创建一个动态的继承结构。

ECMAScript 被故意地设计成类 Java 的语法，这是历史原因。另一方面，其语法被考虑设计成尽可能简单的。规范对语言的具体描述是一种“通用编程语言”，并不是指代语言性质，如“脚本语言”，或是具体实现，如“JavaScript”。有不少其它语言也完整实现了规范，如微软早期的 JScript 和用于 Flash 的 ActionScript。从这个角度来看，JavaScript 应该看作 ECMAScript 的一种方言。

如果从历史的角度来看，ECAMAScript 和 JavaScript 的关系会发生变化。JavaScript 是网景公司在宣发时使用的名称，这个语言一开始叫做 Mocha，而后又叫做 LiveScript。微软在 IE 中也做了一种实现，但由于版权问题卡喉咙，不能叫做 JavaScript，所以改为了 JScript。在网景公司没落前，他们起草了 ECMAScript 标准，用来规划 JavaScript 的发展路线。尽管网景没了，但规范则一直在更新，比如被人们熟知的 ES6，指代 ECMAScript 2015 6th Edition。ECMAScript 和 JavaScript 也就不仅仅应当被理解成标准和实现，它们还属于共生共荣的关系。

### 宿主系统

脚本语言是设计给包括非职业开发人员使用的语言，没有必要拥有主程序入口。所以脚本语言通常寄生于特定系统，依赖宿主提供的设施以完善语言功能，使用终端进行操作，以便人员操控程序或自动化流程。规范原本想设计一款 Web 脚本语言，用于客户端以响应用户在界面上的操作，使 Web 页面能够执行逻辑。但随着越来越广泛的使用，功能逐渐完善，ECMAScript 演变成为了通用程序语言。

每一个支持 ECMAScript 的浏览器或者服务器端都拥有一个对应的宿主系统用于执行脚本。宿主系统的实现需要按照规范，不过规范对某些特征只描述了特定行为而没有给出具体算法。这些具体算法通常会由其它规范来实现，比如说 HTML 规范中定义的宏任务和微任务或 Math.exp 这种特定算法。总而言之，只要宿主系统和规范是一致的（见[一致性](#一致性)）并实现了特定的行为如 Host Hooks、Host-defined Fileds、Host-defined Objects、Running Jobs、Internal Methods of Exotic Objects 和 Built-in Objects and Methods，就算是一个完整的 ECMAScript 宿主系统，就能正确地和规范进行交互。

### 一致性

一致性是指，实现了 ECMAScript 规范（以下简称规范）的语言必须满足以下标准：

* 规范描述：类型系统、值、对象、属性、函数、语法、语义、严格模式[^strict-mode]。
* 编码标准：最新的 Unicode 标准以及 USC 标准。
* ECMA-402：ECMAScript 的国际化接口标准，即 Intl 相关规范。
* 可选规范：可选规范要么全部不实现，要么全部都实现。目前在文档中只找到相关 WeakRef.prototype.constructor 初始值必须为 %WeakRef% 的可选规范。

[^strict-mode]: 必须支持严格模式和非严格模式，并且能在一个符合程序中同时运行严格模式和非严格模式的代码，见 [The Strict Variant of ECMAScript](https://262.ecma-international.org/12.0/#sec-strict-variant-of-ecmascript)。

规范允许某些实现了规范的具体语言可以提供超出规范描述的内容，包括类型、值、对象...语法或是保留字的实现。

另外，以下规范和 ECMAScript 相关，但不要求 ECMAScript 的宿主系统实现：

* ISO/IEC 10646：UCS 规范。
* ECMA-402：国际化接口规范。
* ECMA-404：JSON 规范。

## 规范类型和语言类型

为什么要区分语言类型和规范类型呢？顾名思义，语言类型是 JavaScript 所使用的一种类型系统，包含比如 Null、Undefined、Object 等类型，但由于 JavaScript 需要由其它引擎实现，也就是说规范所描述的算法逻辑中携带的基本类型不是 JavaScript 语言中的基本类型，而更可能是诸如 C++ 中的数据类型。

## 其它

### 词汇表

术语表及本文中相关中英翻译的集合。

| Source | Chinese | Meaning |
|---|---|---|
| attribute | 属性 | 用来定义属性特性的内部值，比方说 [[Writable]] |
| arbitrary-precision | 任意精度的 | 略 |
| built-in function | 内置对象 | 作为函数的内置对象 |
| built-in method | 内置方法 | 作为方法的内置函数 |
| built-in object | 内置对象 | 由规范定义（定义了具体实现）的对象 |
| conformance | 一致性 | 见[一致性](#一致性) |
| constructor | 构造函数 | 用于创建和初始化对象用的函数 |
| general-purpose programming language | 通用编程语言 | 被设计为可在各个应用领域使用的语言，见 [General-purpose programming language](https://en.wikipedia.org/wiki/Special:Search/General-purpose_programming_language) |
| host-defined | 宿主实现 | 同 implementation-defined |
| implementation-approximated | 近似实现 | 规范依赖某些外部实现，而在规范内假设这种实现是“完美的” |
| implementation-defined | 定义实现 | 规范依赖某些外部实现，外部实现的行为需要与规范描述的一致 |
| inherited property | 继承属性 | 对象内由原型继承的来的属性 |
| method | 方法 | 作为属性值的函数 |
| module | 模块 | 略 |
| NaN | NaN | [IEEE 754-2019](https://ieeexplore.ieee.org/document/8766229) 标准定义的“不是一个数字”的数值 |
| normative optional | 可选规范 | 略 |
| null value | 空值 | 表示对象的值的某种刻意缺失 |
| ordinary object | 普通对象 | 实现了所有基本内部槽的默认功能的对象 |
| own property | 自有属性 | 作为该对象拥有的而不是通过原型继承获得的属性就叫该对象的自有属性 |
| primitive value | 原始值 | 不可再分的数据，Undefined, Null, Boolean, Number, BigInt, Symbol, String 中的一种 |
| property | 属性 | 组成对象的基本部分，包含键和对应的值 |
| prototype | 原型 | 见[语言风格](#语言风格) |
| standard object | 标准对象 | 行为（语义）和规范一致的对象 |
| undefined value | 未定义值 | 表示变量初始化成功但未赋值 |
