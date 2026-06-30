---
title: pnpm
description: pnpm 包管理器的虚拟存储、符号链接结构与常见陷阱
---

#### `cp -r` 会静默摧毁 pnpm 的依赖解析

pnpm 不把依赖平铺到根目录，而是在 `.pnpm` 下为每个包建立 virtual store，再用符号链接把直接依赖挂到每个包的 `node_modules` 下。
`cp -r` 默认解引用符号链接，会把这些链接变成普通目录或文件的副本。
结构被破坏后，某个包可能找不到自己的 transitive dependency；如果多个 major 版本的同一个包同时出现在依赖树里，
被复制后的扁平结构还可能让包解析到不兼容的版本，例如从 `.pnpm/node_modules` 下拿到错误的 `entities` 版本。
迁移项目目录时应使用 `cp -a`、`rsync -a` 或 `git clone`；如果已经出错，最干净的修复是删除 `node_modules` 重新 `pnpm install`。

仓库若以符号链接形式跟踪某个文件（模式 `120000`），复制操作把它变成普通文件后，`git status` 会显示 `T`（type changed）。
看到 `T` 就应该意识到文件系统层面的元数据已被破坏，而不只是内容被修改。
对于文档类 symlink，这类破坏不会立刻影响构建；但对于 `node_modules` 里的海量 symlink，同样的破坏会直接导致依赖解析失败。

见：[cc-flow-browser-ext 修复提交](https://github.com/Lionad-Morotar/csee/commit/c670919)
