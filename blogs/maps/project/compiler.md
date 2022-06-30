# Compiler

[TOC]

## Babel

#### Bable 是什么？工作原理是怎样的？

Babel 主要的作用是转换与编译，能够将新标准中前沿的代码技术转换为相同（或类似）功能的代码，使其能够在旧的浏览器中运行。Bable 使用 Babylon（Babel-parser） 将代码解析为 AST，使用 Bable-traverse 维护 AST 的状态，做一些源码级别的转换，最后使用 Bable-generator 读取 AST 并生成代码。
