---
title: Compiler
description: 编译器原理与实践，重点介绍 Babel 等前端编译工具的工作原理和使用方法。
original_path: "/_workflow/compiler.md"
---

## Babel

#### babel 是什么？工作原理是怎样的？

Babel 主要的作用是转换与编译，能够将新标准中前沿的代码技术转换为相同（或类似）功能的代码，使其能够在旧的浏览器中运行。babel 使用 Babylon（Babel-parser） 将代码解析为 AST，使用 babel-traverse 维护 AST 的状态，做一些源码级别的转换，最后使用 babel-generator 读取 AST 并生成代码。

## 现代编译工具

#### SWC 相比 Babel 的性能优势

* **Rust 实现**：SWC 使用 Rust 编写，编译为原生代码，无 JavaScript 运行时开销
* **并行处理**：SWC 利用多核 CPU 并行处理文件，Babel 单线程执行
* **速度提升**：大型项目构建速度可提升 10-20 倍
* **兼容性**：SWC 支持 Babel 的大部分插件生态，可作为 drop-in 替代

#### esbuild 的 Go 实现带来的构建速度提升

* **Go 语言优势**：esbuild 使用 Go 编写，编译为单个静态二进制文件，启动极快
* **极致性能**：比 Webpack 快 10-100 倍，比 Babel 快 10-30 倍
* **内置功能**：TypeScript、JSX、代码压缩等原生支持，无需额外 loader
* **局限性**：插件生态不如 Webpack 丰富，复杂场景可能需要配合其他工具

#### 什么时候还需要 Babel？

* **复杂转换需求**：需要自定义 AST 转换逻辑时，Babel 的插件生态更丰富
* **遗留项目**：已有大量 Babel 配置和插件，迁移成本较高
* **特定插件依赖**：某些特定场景只有 Babel 插件支持
* **调试需求**：Babel 的转换过程更易理解和调试

## 资源

* [Resources for Amateur Compiler Writers](https://c9x.me/compile/bib/)
* [SWC 官方文档](https://swc.rs/)
* [esbuild 官方文档](https://esbuild.github.io/)
