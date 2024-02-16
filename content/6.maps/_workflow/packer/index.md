# 打包工具

## Vite

* [Vite](/maps/_workflow/packer/vite)

## tsup

#### tsup 是什么？

tsup 是一个基于 ESBuild、SWC 的小型大宝漆，允许用户使用非常简单的配置项来编译 TS 项目生成目标代码。

默认支持 NodeJS 生态相关文件如 .cjs、.esm、.json，有多入口、类型生成、编译格式（cjs、esm、iife）、编译目标（浏览器等）、代码切分、支持 hashbang、watch、压缩等能力。运行命令行或代码调用，一个典型的使用案例是：`tsup src/index.ts --format cjs,esm --dts`

见：[publish-esm-and-cjs#tsup | antfu](https://antfu.me/posts/publish-esm-and-cjs#tsup)、[tsup document](https://tsup.egoist.dev/)

## Rollup

对比了一下 Rollup 和 Rspack（Webpack）在输出体积上的差异：

* `@cx/definition` minified，rollup 42kb，webpack 60kb

## Webpack

* [Webpack](/maps/_workflow/packer/webpack)

## Rspack

* [Rspack](/maps/_packer/rspack)

## Unbuild

#### unbuild 的 stub 模式是什么意思？

stub 即插桩。unbuild 的插桩模式意味着只需要启动一个文件监听进程，就可以监听不同项目的代码的改变并触发对应项目的重新构建。配合 Monorepo 使用，修改某个包不需要触发重新构建，达到类似热更新的效果。

见：[还在用 rollup 打包库？试试 unbuild 吧 | markthree](https://juejin.cn/post/7203968787325992997)、[publish-esm-and-cjs#stubbing | antfu](https://antfu.me/posts/publish-esm-and-cjs#stubbing)

## Rome

Rome 致力于统一前端开发工具链。

> Rome is not only linter, but also a compiler, bundler, test runner, and more, for JavaScript, TypeScript, HTML, JSON, Markdown, and CSS.

见：[Introducing Rome](https://rome.tools/blog/2020/08/08/introducing-rome/)

现在应该叫 Biome 了，他们团队同时赢得了 Prettier 十万美金奖项。
