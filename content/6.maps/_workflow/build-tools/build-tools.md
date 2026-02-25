---
title: 构建工具
description: 前端构建工具全景图，涵盖 Vite、Webpack、Rspack 等主流工具的特性对比和使用说明
---

## 主题

* [Vite](/maps/_workflow/build-tools/vite)
* [Webpack](/maps/_workflow/build-tools/webpack)
* [Rspack](/maps/_workflow/build-tools/rspack)

## 工具对比

#### Vite vs Webpack: 什么时候选择哪个？

Vite 适合现代浏览器优先的项目，利用原生 ESM 实现极速的 HMR 和构建速度。Webpack 适合需要复杂构建流程、大量自定义配置或需要兼容旧版浏览器的项目。

#### Rspack 的 Webpack 兼容性如何实现？

Rspack 基于 Rust 重写，旨在提供与 Webpack 兼容的 API 和配置，同时大幅提升构建性能。它支持大部分 Webpack 的 Loader 和 Plugin 生态。

#### tsup 适合什么场景？

tsup 是一个基于 ESBuild、SWC 的小型打包器，适合需要快速编译 TypeScript 库的场景。默认支持 .cjs、.esm、.json，有多入口、类型生成、编译格式（cjs、esm、iife）、编译目标、代码切分、watch、压缩等能力。

见：[publish-esm-and-cjs#tsup | antfu](https://antfu.me/posts/publish-esm-and-cjs#tsup)、[tsup document](https://tsup.egoist.dev/)

#### Rollup 的输出体积优势

对比 Rollup 和 Rspack（Webpack）在输出体积上的差异：

* `@cx/definition` minified，rollup 42kb，webpack 60kb

## 新兴工具

#### Unbuild 的 stub 模式是什么？

stub 即插桩。unbuild 的插桩模式意味着只需要启动一个文件监听进程，就可以监听不同项目的代码的改变并触发对应项目的重新构建。配合 Monorepo 使用，修改某个包不需要触发重新构建，达到类似热更新的效果。

见：[还在用 rollup 打包库？试试 unbuild 吧 | markthree](https://juejin.cn/post/7203968787325992997)、[publish-esm-and-cjs#stubbing | antfu](https://antfu.me/posts/publish-esm-and-cjs#stubbing)

#### Rome/Biome 的统一工具链愿景

Rome 致力于统一前端开发工具链，不仅是 Linter，还包括 Compiler、Bundler、Test Runner 等。现在应该叫 Biome 了，他们团队同时赢得了 Prettier 十万美金奖项。

见：[Introducing Rome](https://rome.tools/blog/2020/08/08/introducing-rome/)
