# Git

[TOC]

## 常见用法

### 提交相关

#### 多行提交

提交指令比较常用，添加到暂存区后，就 commit -m 填写一些信息直接提交了。不过鲜有人知道 commit -m 是可以换行的！

```bash
# 添加所有文件到暂存区
git add .
# 输入第一行信息时，只要结尾不用引号，就不会中断输入
git commit -m 'feat: brief message

detailed message'
```

#### 修改提交信息

如果你写错了提交信息还一不小心手滑给提交了！你当然可以假装没看到；但如果你想撤销这个提交信息的话，有两种方法。

第一种，撤销整个提交。

```bash
# 撤销上一个提交，把所有修改都放到暂存区中（也就是还原回 git add . 后的状态）
git reset --soft HEAD~
# 再次提交
git commit -m <message>
```

如果只是修改提交信息，不需要修改文件的话，下面这种方法会快一些：

```bash
# 把上个提交的提交信息修正为 <message>
git commit --amend -m <message>
```

#### 提交回退

相比写错了提交信息，我们常碰到一种更可怕的情况：搞砸了一切，并且想删除本地所有内容重新拉代码了！

哎等等，先别删代码，你可以使用 reset 功能将本地分支强制回退到特定提交记录。

```bash
# 撤销上一个提交（并丢弃所有修改）
git reset --hard
# 把分支还原到某个提交（并丢弃所有修改）
git reset --hard <hashname>
# 把分支还原设为远端的某个提交（并丢弃本地所有修改）
git reset --hard <repo-name>/<branch-name>
```

reset --hard 三管齐下，包治百病。

#### 提交压缩

处女座常使用提交压缩指令，因为他们想保持一个干净的提交记录（开个玩笑别打我）。

假设你连续提交了多个功能为 xxx commit，尔后又想把这几个 commit 压缩为一个提交，有两种常见方法。

第一种，使用软撤销功能（reset --soft）

```bash
# 把近 <number> 次提交撤销（所有修改回退到暂存区）
git reset --soft HEAD~<number>
# 重新提交
git commit -m <message>
```

第二种，使用 rebase 指令。

```bash
# 修改近 <number> 次提交
git rebase -i HEAD~<number>
```

使用 rebase 后会进入类似以下界面，在此界面可以对最近的一些提交进行重新排序、修改提交信息、压缩提交等等操作。

![rebase -i](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210615022038.png)

#### 草稿功能

如果你写代码时突然来了一个紧急线上 bug 要处理，而手头的改动又没写完，不适合直接提交，你有两种选择：

第一种，先提交，一会儿回来再压缩提交处理一下。

第二种，将手头的功能存为草稿。

```bash
# 将所有改动保存到本分支下名为 <stash-description> 的草稿中（加上 -u 参数后，文件的新增或删除操作也能一并存为草稿）
git stash save -u <stash-description>
```

然后哼哧哼哧改为 bug 之后，你只需要回到相关分支，并应用相应的草稿就可以回到初始状态了。

```bash
# 使用 list 指令查看有哪些草稿
git stash list
# 应用某草稿
git stash pop <stash-hash>
```

#### 忽略及保留

对前端来说 .gitignore 文件非常常见了。一般新启项目的第一件事就是忽略 node_modules（或者从旧项目中 copy 一份 .gitignore 文件到新项目），不然 npm install 时，git 会爆炸！

```bash
# 会忽略 node_modules 及其子目录
node_modules
```

由于 Git 无法追踪空目录，所以为了保留某个空目录以维持项目文件结构，经常把一个名称为 .gitkeep 的文件放到目录中。.gitkeep 名称只是一个约定，你也可以把它重命名为任何你喜欢的名字比如 .keep。总之，看到 .gitkeep 就知道项目作者想保留 .gitkeep 所在的文件夹，哪怕它是空的。

此外，介绍两个非常实用的开发技巧。

NodeJS 的依赖出问题时，我们经常要删除 node_modules 并重新 npm install。

可以把 node_modules_old 也添加到 .gitignore 文件中，并且在文件浏览器中把 node_modules 重命名为 node_modules_old，这样就可以一边删除 node_modules_old 一遍安装新的依赖了。如果是 Windows 电脑，删除 node_modules 时可以按住 Shift + Delete 使用永久删除（不会放入回收站），这样删除的速度贼快！

另一个小技巧是相关代码安全。

使用 OSS 或者其它依赖时，经常需要使用到个人密钥文件甚至是账号名或密码。尽管许多外部的平台在创建账号时会指定账号权限，但直接把密码写在代码中本身就是十分不负责任的行为！更好的做法是把密钥放在 private/key.json 文件中，并在 .gitignore 中忽略 private 文件夹。这样就算你的线上代码库遭黑客攻击而泄密，密钥和密码也是安全的啦。

#### 文件历史

如果你想查看某个 commit 相比另外一个 commit 更新了啥，可以用 diff 指令。

```bash
git diff <hash-1> <hash-2>
```

不过，还是推荐用可视化工具来比较文件，比如装一个 [VSCode Git History 插件](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)，就可以可以让文件比较效率翻数倍不止。

![VSCode Git History](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210615005622.png)

一般只有在学习源码时才会用到比较提交记录这种方式查看代码。业务开发时更常用的是查看某一行是谁写的（这样就不会出现看到垃圾代码发火时发现代码是自己写的这种尴尬场景了）。

```bash
# 查看从 <line-start> 到 <line-end> 的代码的提交信息，包含作者、commit hash 以及 commit message 等
git blame -L <line-start>,<line-end> <filename>
```

同理，推荐使用插件。使用 [VSCode Git Lens 插件](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)可以让 blame 的效率翻十倍不止。

![VSCode Git Lens](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210615012000.png)

### 分支操作

#### 创建分支

开发新功能是，通常从稳定的 main 分支打出新分支进行功能开发。

```bash
# 切换到本地的 main
git checkout main
# 创建并跳转到 feat-xxx 分支（新的 feat-xxx 从当前分支 main 打出）
git checkout -b feat-xxx
```

如果只想用一行命令创建并跳转到指定分支，可以使用 checkout 的第二个参数。

```bash
# 创建并跳转到 feat-xxx 分支（新的分支从 main 打出，无论你当前在哪个分支）
git checkout -b feat-xxx main
```

#### 分支查看

git branch 带上 -a 参数，可以查看所有分支（包括远端的分支）。

```bash
git branch -a
```

#### 分支拣选

想象一下假设你有一个非常混乱的 dev 分支，你想从中挑选一些提交并应用到 feat-xxx 分支，这个时候就需要用到分支拣选功能了。

```bash
# 从 main 打出一个干净的功能分支 feat-xxx
git checkout -b feat-xxx main
# 查看 dev 分支的提交记录（推荐使用可视化工具）
git log dev
# 拣选一些功能并提交到 feat-xxx
git cherry-pick <commit-hash> <commit-hash>
```

### 仓库

#### 添加远端

Github 流行一种 PR 的开发方式，也就是从主仓库 fork 一份代码到自己的域下以方便本地开发。提交时先提交到自己的仓库，再通过 Pull Request（请求将分支合并入主仓库）的方式提交到主仓库。也就是说，你不能直接提交到主仓库。

有时，如果别人也 fork 了一份主仓库的代码，并提交了新功能到他自己的分支，你希望合并他的提交，那首先要做的就是在本地添加他的仓库地址。

```bash
git remote add <repo-name> <repo-url>
```

举例，git remote add other git@github.com:other/ali-oss.git，这样你就可以在本地合并他的某个分支了 git merge other feat-xxx。

#### 拷贝代码

最常见的用法是直接拷贝一个仓库地址。这样会在执行命令的目录创建一个名为仓库名的文件夹。

```bash
git clone <repo-url>
```

拷贝代码时可以指定文件夹名称。

```bash
git clone <repo-url> <local-directory-name>
```

业务开发时，我常常碰到多个需求并线开发的场景，平反切分支会导致总要重启开发环境，十分恼人，所以某些情况我再拷贝一份代码到本地。两个 VSCode 各打开一个项目的一个分支，哇哦，感觉好多了~

如果遇上仓库十分大，拷贝要半天，甚至经常超时导致拷贝失败，应该怎么处理呢？

可以试试仅下载单分支：

```bash
# 仅拷贝单分支
git clone --single-branch -b <branch-name> <repo-url>
```

甚至还有更快的方法，仅下载某分支前 n 个提交记录：

```bash
# 下载 <branch-name> 分支前 n 个提交记录
git clone --single-branch -b <branch-name> --depth=<n> git@github.com:vuejs/vue.git
# 下载仓库默认分支前 n 个提交记录（比如对 vue 来说就是 dev 分支）
git clone --depth=<n> git@github.com:vuejs/vue.git
```

### 子模块概念

虽然 Git 子模块（submodule）或子树（subtree）不常用，但是还是要记一下如何初始化子模块，也就是把子模块的代码下载下来，不然开发环境都启动不了。

```bash
# 在项目根目录执行，递归地初始化子模块
git submodule update --init --recursive
```

### 常用设置

#### 用户信息

新电脑安装 Git 后第一件要做的事就是设置用户名和邮箱，这样一来提交记录上也就会出现你的信息了。

```bash
git config --global user.name <username>
git config --global user.email <email>
```

也可以给项目单独设置用户信息——只需要去掉 --global 参数就好了。

#### 编辑器

通常 Git 使用 vim 作为默认的文本编辑器，非常烦人。不过好在它还提供了配置让你自定义编辑器。

```bash
# 设置 VCCode 为默认编辑器
git config --global core.editor Code
```

当然，不要忘了把 VSCode 所在目录添加到环境变量中哈。设置完毕后，类似 rebase -i、commit --amend 之类的文本编辑工作会交由你指定的编辑器处理。

![git rebase -i](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/V05ZM9D4fl.gif)

### 回顾

最后，用图片回顾一下常见的操作。

![Git Data Transport Commands](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210615024010.png)

### 阅读更多

* [《Git cherry-pick 详解》](http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)
* [《Git clone 原理》](https://juejin.cn/post/6969206858179411982)

## 提交规范

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

![Inline Git Commit Log ](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20201127180816.png)
	
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

## 特殊场景

#### 忽略特定提交

三种方法：

1. gitignore
  
设置好 `.gitignore` 文件后，所有匹配的文件都不会被继续追踪（已经追踪的不会被影响，除非先把它删掉）。

2. update-index

```js
git update-index --skip-worktree -- filename.js
```

3. git filter

---

#### 强制合并分支

我想强制合并两个分支，但发现并没有 `force` 参数供 `merge` 时调用：

```bash
git merge --force origin master
```

正确的逻辑是“合并两个不相关分支”：

```bash
git pull origin master --allow-unrelated-histories
```

### 相关网址

* [Reveal.js](https://revealjs.com/code/)
* [Highlight.js](https://highlightjs.org/)
