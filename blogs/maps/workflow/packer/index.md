# 打包工具

[TOC]

## Webpack

* [Webpack]('/maps/workflow/packer/webpack.html')

## Unbuild

#### unbuild 的 stub 模式是什么意思？

unbuild 的 stub 模式意味着只需要启动一个文件监听进程，就可以监听不同项目的代码的改变并触发对应项目的重新构建。可以配合 Monorepo 使用。为了达到这一效果，unbuild 使用 jiti 库，后者通过 Node Require Hook，将 TS 或 ESM 文件作为输入，以在运行时无缝支持 TS 及 ESM 文件的读取。

## Rome

Rome 致力于统一前端开发工具链。

> Rome is not only linter, but also a compiler, bundler, test runner, and more, for JavaScript, TypeScript, HTML, JSON, Markdown, and CSS.

来源：[Introducing Rome](https://rome.tools/blog/2020/08/08/introducing-rome/)