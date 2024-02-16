---
title: sass
---

#### 为什么弃用 node-sass？

开发团队工程带宽跟不上了。

印象中 node-sass 要求 C++ 编译环境和 Python 环境，但如果没有统一的镜像，要自己安装的话确实有些麻烦。目前，如果追求编译速度的话，swc 和 lightingcss 应该是不错的工具。

见：[#2952 Mark Node Sass as deprecated](https://github.com/sass/node-sass/issues/2952)、[Node Sass 弃用，以 Dart Sass 代替](https://zhuanlan.zhihu.com/p/269296061)
