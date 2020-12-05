# Git

## Commit

业界有许多成熟的 Git Commit Message 规范（以下简称为 CM），比如：

* [Udacity Git Commit Message Style](https://udacity.github.io/git-styleguide/)
* [Angular Commit Guide](http://arah.in/6cbH)
* [LeanCloud Commit Guide](https://open.leancloud.cn/git-commit-message/)

稍微了解可以发现，CM 规范都是围绕“如何使提交具有意义”展开讨论。

**为什么要使代码提交有意义？**

CM 是项目工程化实践中基础内容之一，这里列出原因，但不展开详细讨论：

1. **方便使用 Git 管理代码及追溯文件**。使提交内容更利于理解，方便使用版本管理工具快速切换特定版本文件，或是从提交历史中追溯代码变更原因。
2. **有利于工程化实践**。使用约定有利于维护团队现有的及将来可能继续推进的其它工程化实践，如通过特定的 Commit 跳过线下环境无意义的项目打包与自动测试、通过机器人提醒团队成员重要功能的变更等。
3. 就**美观性**而言，也没有理由拒绝使用约定。尤其是当你整理 OKR 内容，打开 Git Commit Log，想回忆起点什么线索来的时候。

![Inline Git Commit Log ](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20201127180816.png)
	
以下，我们在 LeanCloud CM Guide 的基础上，整理一份尽量简单，且能记录代码提交意义的约定。

【主要格式】

```
提交类型：变动内容，简短描述，50 个字符

提交描述，可选，72 字符内，说明该提交的原因，或是提交的副作用。与第一行之间存在空行

注释及其它，可选
```

【简单示例】

```
fix: 更改 VuePress 版本，修复布局错乱问题

https://github.com/vuejs/vuepress/issues/1321
```

上面这个示例是一种“修复类型（fix）”示例，其描述链接了一个 Github Issue。

【类型说明】

类型有多种可能，以下几种是必须遵守的约定：
* fix：错误修复
* feat：新功能
* chore：其它修改，如项目配置变动，构建任务变动
* doc：注释或文档
* format：代码改动（仅代码样式变更，如换行、分号）
* css：前端界面样式变更

此外，还有一些类型可供参考及选用：
* refactor：代码重构
* perf：代码重构（仅性能改进）
* test：与测试相关的改动

原则来说，依据不同项目，CM 规范可以做适当调整。以上只展现了一种通用的基础约定，具体项目可以在此基础上自行增添规则。如我的个人博客项目 CM 中，有一种“blogs”类型专门用作记录博客文字内容的修改。

特殊标记

特殊标记用作标注注意事项，如“BREAKING”、“close”标记的使用。特殊标记通常与项目工程化实践中其它工具配合使用，如用于关闭 Gitlab Issues，后续有需要再展开约定。

完整示例

```
feat: 大盘中国地图增加地图下钻功能

引入中国的省市映射文件，以通过选取的省找到省下所有城市内的店铺。

BREAKING: 下钻功能导致了地图缩放时错位的问题，所以暂时禁用了地图的拖拽能力
```



## 场景

#### 忽略特定提交

三种方法：

1. gitignore
  
设置好 `.gitignore` 文件后，所有匹配的文件都不会被继续追踪（已经追踪的不会被影响，除非先把它删掉）。

2. update-index

```js
git update-index --skip-worktree -- filename.js
```

3. git filter
