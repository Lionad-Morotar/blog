# ECMAScript Standard

## 资料

一些极其有用的前置参考资料，有助于甄别与理解规范里各种概念，不至于被绕晕。

* [<i>How to Read the ECMAScript Specification</i>](https://timothygu.me/es-howto/)，这个资料简要介绍了一些阅读规范时需要知悉且有助于你理解规范的前置概念并予例说明，比如说抽象操作（abstract operation）、内部槽以及内部方法（internal slots & internal methods）、完成记录（Completion Record）、变异对象（exotic objects）。
* [<i>Understanding ECMAScript</i>](https://v8.dev/blog/tags/understanding-ecmascript)，V8 团队写的 ECMAScript 阅读指南文章系列，一共四篇，很有参考价值。
* [《ECMAScript 阅读指南》](https://juejin.cn/post/6944587399418609701)，<i>Understanding ECMAScript</i> 的翻译版本。
* [<i>What is the difference between JavaScript and ECMAScript?</i>](https://stackoverflow.com/questions/912479/what-is-the-difference-between-javascript-and-ecmascript)

### 快速入门

#### 对象的本质

常常能听到这种观点：“对象的本质就是实现了规范所要求的内部插槽的结构”。配合这张图，能更深刻地认识该观点。

![对象的本质](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/timothygu.me_es-howto_object-uml.svg.png)

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

## Introduction

时间线：

* 1995：Brendan Eich 开发出了 JavaScript。
* 1996：ECMAScript 语言规范的开发工作开始了。
* 1997：第一版规范在六月被采纳。
* 1998：第二版规范以获得 ISO 体系认证，和第一版没有实质区别。
* 1999：第三版规范带来了正则、try/catch 等内容。
* 2009：第五版规范带来了严格模式、属性访问器、JSON对象等内容。
* 2011：第五点一版本规范被采纳。
* 2015：第六版规范带来了模块、类、词法作用域、Unicode 支持等内容。
* 2016：...

## Scope

规范对语言的具体描述是一种“通用编程语言（general-purpose programming language）”，并不是指代语言性质，如“脚本语言”，或是具体实现，如“JavaScript”。有不少其它语言也完整实现了规范，如微软早期的 JScript 和用于 Flash 的 ActionScript。从这个角度来看，JavaScript 应该看作 ECMAScript 的一种方言。

如果从历史的角度来看，ECAMAScript 和 JavaScript 的关系会发生变化。JavaScript 是网景公司在宣发时使用的名称，这个语言一开始叫做 Mocha，而后又叫做 LiveScript。微软在 IE 中也做了一种实现，但由于版权问题卡喉咙，不能叫做 JavaScript，所以改为了 JScript。在网景公司没落前，他们起草了 ECMAScript 标准，用来规划 JavaScript 的发展路线。尽管网景没了，但规范则一直在更新，比如被人们熟知的 ES6，指代 ECMAScript 2015 6th Edition。ECMAScript 和 JavaScript 也就不仅仅应当被理解成标准和实现，它们还属于共生共荣的关系。

## Conformance

Conformance，一致性，指能说自己实现了 ECMAScript 规范（以下简称规范）的语言必须满足特定标准（或规范），包括：

* 规范描述：类型系统、值、对象、属性、函数、语法以及语义（types, values, objects, properties, functions, and program syntax and semantics）。
* 编码标准：最新的 Unicode 标准以及 USC 标准（lastest version of the Unicode Standard and ISO/IEC 10646）。
* ECMA-402：ECMAScript 的国际化接口标准（Intl）。
* 可选规范（NORMATIVE OPTIONAL）：可选规范要么全部不实现，要么全部都实现。目前在文档中只找到相关 WeakRef.prototype.constructor 初始值必须为 %WeakRef% 的可选规范。

规范允许某些实现了规范的具体语言可以提供超出规范描述的内容，包括类型、值、对象...语法或是保留字的实现。同时，也禁止了某些实现。这个是很后面的内容，稍后再看。

然后 implementation-defined 这个不知道是啥，以后再看。

## Normative References

列举了几个相关的规范：

* ISO/IEC 10646：这个刚才提到过，UCS 规范。
* ECMA-402：国际化接口规范（Intl）。
* ECMA-404：JSON 规范。

## Overview

这个章节大致介绍了以下 ECMAScript 的背景知识。非规范性质的。

脚本语言是设计给包括非职业开发人员使用的语言，通常寄生于特定系统，依赖系统（宿主）提高的设施（如函数）以完善语言功能，使用终端进行操作，以便人员操控程序或自动化流程。规范原本想设计一款 Web 脚本语言，用于客户端以响应用户在界面上的操作，使 Web 页面能够执行逻辑。但随着越来越广泛的使用，功能逐渐完善，ECMAScript 演变成为了通用程序语言。

脚本语言是没有必要拥有主程序入口的（no need for a main program）。

## Specification Types and Language Types

为什么要区分语言类型和规范类型呢？顾名思义，语言类型是 JavaScript 所使用的一种类型系统，包含比如 Null、Undefined、Object 等类型，但由于 JavaScript 需要由其它引擎实现，也就是说规范所描述的算法逻辑中携带的基本类型不是 JavaScript 语言中的基本类型，而更可能是诸如 C++ 中的数据类型。