# ECMAScript Language Specification

## 执行上下文

JS 中有三种不同的代码，全局代码（Global Code）、函数代码（Function Code）和求值代码（Eval Code）。

无论哪一种类型的代码的执行，引擎总是提供了一个执行上下文（Execution Context）用来保存代码执行时相关的信息。

执行上下文由以下几个部分组成：

- 变量对象（Variable Object）：用来保存变量声明，比如通过 var a 声明的 a 变量，就会作为变量对象上的一个 a 属性保存下来。

## 阅读更多

- [JS 规范中的 IsValidSimpleAssignmentTarget](https://zhuanlan.zhihu.com/p/27875462)
- [What is a “primary expression”?](https://stackoverflow.com/questions/15675427/what-is-a-primary-expression)
