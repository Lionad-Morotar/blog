---
title: 集成开发环境（IDE）
description: 集成开发环境（IDE）是一种软件应用程序，用于提供开发人员在一个环境中编写、测试和调试代码的功能。它通常包括代码编辑器、调试器、构建工具和其他辅助功能。
tags: ["vscode", "trae"]
---

## Trae

部分插件迁移后不能正常创建配置文件，手动迁移后能正常使用，比如 `fredjeck.fav` 插件。

```bash
cp "/Users/username/Library/Application Support/Code - Insiders/User/globalStorage/fredjeck.fav/favorites.json" "/Users/username/Library/Application Support/Trae/User/globalStorage/fredjeck.fav/favorites.json"
```

## VSCode

#### 如何使大纲视图默认只显示一级？

在稍微大点的文件里，由于大纲视图总是展开得非常深，所以几乎不可读。如果可以设置大纲默认的折叠层数就好了！

很可惜没有这种设置，不过可以更改 `outline.collapseItems` 为默认折叠状态。设置完之后，大纲会默认展示第一层变量声明的内容，这样 Vue SFC Setup 里的变量、函数、生命周期之类的东西全都会展示出来。

见：[<i>Outline view: collapsed by default (introduce optional setting?)</i>](https://github.com/microsoft/vscode/issues/53262)

#### 不能聚焦到文件树视图了？

因为电脑是 OLED 屏，长时间在固定位置显示图标容易烧屏，所以今天小改了一下 VSCode 的界面结构。把文件视图挪到右边侧边栏里面后发现使用 `Ctrl + Shift + E` 按键不能聚焦到文件树视图了。

检查发现是 `workbench.views.services.sidebar` 里新增加了一个实例，估计是这次改动界面结构导致的。重新设置一下快捷键就好了。

![不能聚焦到文件树视图了的解决方法](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20240208183255.png)

#### 不能在文件树自动聚焦到当前文件了？

虽然打开了 `autoReveal` 选项，但是还是不能自动聚焦到当前文件了，不清楚是不是 bug。不过文件树视图右上角有个小刷新按钮，点下刷新就好了。

![refresh button on files view](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20240208194710.png)

## 插件开发

* [插件开发](/maps/_ide/vscode/vscode-plugin-development)
