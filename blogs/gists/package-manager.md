# Package Manager

[TOC]

## 原理概览

早期 NPM（V1、V2） 使用简单的嵌套模式来管理依赖，这会导致**依赖地狱**问题：依赖层级深可能带来路径过长、占用空间多、安装慢等间接问题。由于同一个依赖可能被多次引入，所以还会带来依赖的**多版本共存**问题。

NPM（V3）开始，使用扁平模式管理依赖，通过重写的依赖寻找逻辑，在安装依赖时向上递归查找是否有同一版本依赖，以便把所有重复依赖提升到 node_modules 一级目录。不过解决了依赖地狱却带来了更多的问题：

* **幽灵依赖**：如果某依赖不是包本身的依赖但是被提升到了一级目录，那么就能在代码中引入。
* **多重依赖**：一个依赖的某版本已经提升了，但不影响其它依赖共同依赖其其它版本，所以还是存在多重依赖的问题。由于 NodeJS 的 require 的缓存规则是按照文件名及路径而不是模块名，此时对依赖进行有副作用的修改会破环单例模式。再者不同版本依赖的 types 可能会冲突。
* **不确定性**：手动安装依赖可能会带来和 npm install 安装后不同的结构。

Yarn（V1） 在 NPM（V3）时发布了，那时就引入了 lockfiles，但是不能完整记录依赖之间的依赖结构，所以相比 NPM（V5）稍有缺陷。NPM（V5）引入的 lockfiles 使用 package-lock.json 将依赖的元信息及结构完整记录在文件中。就算先后安装不同的版本的子依赖也不会导致新的问题，因为你可以把 lockfiles 共享给其他人使用，这样他们 npm install 时就能和你有一套一样的 node_modules。

Semver 被设计用来解决版本兼容性问题，但是事实并不完美，因为它主要用于含公共 API 的项目，且实际开发中所有的修复都没用绝对的 no breaking change 这么一说。所以，实际开发中项目的依赖关系还是该乱套就乱套。

<Frame src="/gists/version-control.html" />

除了 lockfiles，Yarn（V2）还带来一种独特的依赖安装模式：[PnP（Plug'n'Play）](https://yarnpkg.com/features/pnp)，它尝试对依赖管理进行革命性的改革（说好听点就叫开辟新赛道，当然，也意味着脱离了现有生态：<）。我们一直知道，给 NodeJS 应用拖后腿的一直就是 node_modules。其设计非常糟糕，这也就是 NPM 一直发版本迭代改进的原因。无论是安装依赖，还是读取依赖，都面临海量的 IO 操作——这是导致 NodeJS 应用缓慢的根源。

Yarn PnP 模式在项目中一个 .pnp.cjs 文件，用来缓存各模块的及其位置的关系。这样一来，所有项目安装的依赖都可以被统一管理起来，极大减少了安装依赖时 IO 操作。缓存也就意味着让 Yarn 去承担 NodeJS Require 算法的工作，后者不需要一直递归地去寻找模块位置，也就减少了系统调用。

不过，不论 Semver 有没有解决不确定性的问题，node_modules 的天空依然还剩下幽灵依赖和多重依赖两朵乌云。2017 年，PnPm（V1）通过统一依赖管理以及创建系统链接的方法一举拿下了这块阵地。统一管理和 Yarn PnP 是一致的：所有项目所依赖的模块都被统一安装到了磁盘中一个固定的地方。多个项目中相同的依赖，也只会安装一次。不过他比 NPM 和 Yarn 高明的地方在于，项目中的 node_modules 文件夹还是[结构化的](https://www.pnpm.cn/blog/2020/05/27/flat-node-modules-is-not-the-only-way)，见下图。使用硬链接将本项目的依赖链接到统一缓存后，再使用符合链接递归地创造出依赖的依赖，最后使用隐藏的 .pnpm 文件夹模拟出 node_modules 的[层级结构](https://www.pnpm.cn/symlinked-node-modules-structure)以便 NodeJS Require 递归查找依赖。

![Modules Mapping in PnPm](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220317192927.png)

由于项目的依赖入口是项目根目录的 node_modules，所以从项目 node_modules 入手，不能 require 未安装的依赖；项目的直接依赖通过符号链接链接到了 .pnpm 文件夹（也叫做虚拟储存文件夹），而其子依赖的结构是嵌套的，但是通过符号链接指向到 .pnpm 中被提升的位置。由此可见，在解决了依赖地狱问题的基础上，PnPm 还完美解决了幽灵依赖和多重依赖的问题。

可惜链接也不是银弹，它会碰到一些兼容性问题：

* 软链接会导致某些应用出现死循环（IDE、OneDrive）
* 硬链接是同一份文件，不便调试
* 软链接在非 SSD 硬盘上的读写也会有损耗
* .pnpm 维护的结构可能破坏某些插件所依赖的相对路径的加载逻辑

TNPM 想通过一条全新的优化后的赛道，干掉链接，解决所有恼人的问题，然后沉淀出一套方案，供各包管理工具使用。在网络端，使用服务器来生成依赖树，能省大量请求；在 IO 层面，使用 Rust 进行 IO 操作，性能要优于 NodeJS；将 tgz 文件合并写入 tar，节约写入次数；使用 FUSE 文件系统，节省文件解压操作。TNPM 的原理见下图。

![TNPM](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220318001222.png)

TNPM 还在开发中~ 很期待中国能有 TNPM 这样一个顶尖的软件工程打头。天猪在文章中提到，除了代码，业界还应该关注包管理器的规范化，包括标准、测试用例、JS 模块规范等内容。

## 命令速记

设置淘宝源：`npm set registry https://registry.npm.taobao.org`

## 稀奇古怪的问题

* CNPM

`cnpm install` 时不会更新 package-lock.json，有可能导致一些稀奇古怪的问题。如果想更新 package-lock.json 的话，需要删除 node_modules、package-lock.json，再重新 `npm install`。

##### <Link type='h5' source='https://medium.com/@jakubsynowiec/you-should-always-quote-your-globs-in-npm-scripts-621887a2a784' ><i>Why you should always quote your globs in NPM scripts</i></Link>

NPM 在 Linux 平台使用 sh -s 指令运行脚本，在 Windows 上使用 cmd /d /s /c。看起来它是跨平台的，但是其中有一些小的兼容问题。只有 bash-4 才支持星号占位符（**），所以 eslint src/**/*.js 指令在不被识别的系统中，可能会被当成 eslint src/*/*.js 执行而报错。

解决方法就是用引号（并且最好是双引号）将路径包裹起来。尽管这样一来，星号占位符就不会被自动展开了，但是库仍然可以使用诸如 node-glob 等工具处理输入，来达到跨平台的一致性。

## 阅读更多

* [node_modules 困境](https://zhuanlan.zhihu.com/p/137535779)，除了 NodeJS 生态，文章还介绍了 Rust 是如何进行包管理的。
* [关于依赖管理的真相—前端包管理器探究](https://mp.weixin.qq.com/s/t6RZAKb6mXTfXl7XbpZ_vw)，文章对 NodeJS 中各新老包管理器逐个点了名，还简单提及了 Deno 中的包管理。
* [深入浅出 tnpm rapid 模式-如何比 pnpm 快 10 秒](https://zhuanlan.zhihu.com/p/455809528)，大综述。
* [一种秒级安装 npm 的方式](https://www.zhihu.com/zvideo/1467489669319036928)，更详细地介绍了 TNPM Rapid 的工作原理。
* [How does npm handle circular dependency?](https://stackoverflow.com/questions/51868743/how-does-npm-handle-circular-dependency)