---
title: lockfile
description: lockfile 是一种用于记录依赖的版本信息的文件
---

#### 为什么用了 lockfile 还是不能保证环境统一？

因为 npm install 时可能会根据 Semver 自动更新依赖的版本。Semver 被设计用来解决模块不同版本的兼容性问题，但是并不完美，因为在实际的代码开发中，所有代码更改都没用绝对的 no breaking change 一说。也就是说，尽管是小版本改动，也可能带来问题。

#### lockfile vs shrinkwrap？

npm 的 lockfile 设计用于开发环境锁定依赖版本，而 shrinkwrap 包含依赖树的版本记录，所以更适合用于生产环境。

相关：[为什么我不使用 shrinkwrap（lock）](https://zhuanlan.zhihu.com/p/22934066)
