---
title: sass
---

#### 为什么弃用 node-sass？

开发团队工程带宽跟不上了。

印象中 node-sass 要求 C++ 编译环境和 Python 环境，但如果没有统一的镜像，要自己安装的话确实有些麻烦。目前，如果追求编译速度的话，swc 和 lightingcss 应该是不错的工具。

见：[#2952 Mark Node Sass as deprecated](https://github.com/sass/node-sass/issues/2952)、[Node Sass 弃用，以 Dart Sass 代替](https://zhuanlan.zhihu.com/p/269296061)

#### `@import`对比`@use`和`@forward`

相比老的 `@import`，新模块系统引入了 `@use` 和 `@forward` 两个指令。

`@use` 和 `@import` 一样通过 URL 载入一段样式，但是 `@use` 会创建一个私有的命名空间，避免了全局污染，并且保证每个模块只会载入一次，提高了样式性能。

`@forward` 则是将一个模块的所有内容转发到另一个模块，可以在 index.scss 等文件使用，方便组织项目样式代码。

见：[@use @sass-lang](https://sass-lang.com/documentation/at-rules/use)
