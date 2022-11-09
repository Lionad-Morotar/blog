# Git Mind Map

[TOC]

## 简介

#### Git 是什么，有什么优势？

Git 是一种版本控制工具，用来追踪代码在开发进程中发生的变化。它的关键字是“分支策略”以及“变化追踪”，前者保证了在不同大小的团队中，代码的变化都可以相对保持独立，并可以通过合并策略融合；后者保证了变化都会被记录下来，使其可管理。

见：[What is version control](https://www.atlassian.com/git/tutorials/what-is-version-control)

#### 使用 Git 时数据流是怎样的？

Git 有工作区、索引、本地仓库和远端仓库几个概念。在各个数据中心，可以使用咱词条、提交、推送、拉取、rebase、fetch、checkout 等方法对数据进行操作。

![Git Data Transport Commands](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210615024010.png)

## 配置相关

#### 如何配置用户名和邮箱？

去掉 --global 参数可以给单个项目进行配置，对某些项目有用。

```bash
git config --global user.name <username>
git config --global user.email <email>
```

#### 如何把 VIM 编辑器换掉？

Git 用 vim 作为默认的文本编辑器，好在可以在配置中进行替换。

```bash
# 在确保 Code.exe 所在目录在环境变量中后，
# 设置 Code 为默认编辑器
git config --global core.editor Code
```

#### 怎么配置代理？

```bash
git config --global http.proxy <your-proxy-url>
```

## 分支操作

#### 如何添加远端仓库？

GitHub 流行从主仓库 fork 代码到自己的域下本地开发，再通过 PR 把代码提交回主仓库的模式。这个时候，远端仓库相关操作就比较有用了。

```bash
# 添加远端仓库
git remote add <repo-name> <repo-url>
# 合并分支到远端仓库
git merge <repo-name> feat-xxx。
```

#### 如何拷贝仓库代码？

```bash
git clone <repo-url> <local-directory-name>
```

#### 怎么初始化项目的子模块？

```bash
# 在项目根目录执行，递归地初始化子模块
git submodule update --init --recursive
```

#### 怎么快速创建新分支？

```bash
# 切换到本地的 main
git checkout main
# 创建并跳转到 feat-xxx 分支（新的 feat-xxx 从当前分支 main 打出）
git checkout -b feat-xxx
# 创建并跳转到 feat-xxx 分支（新的分支从 main 打出）
git checkout -b feat-xxx main
```

#### 如何查看所有分支？

```bash
# 查看所有分支（包括远端分支）
git branch -a
```

#### 如何拣选提交？

```bash
# 从 main 打出一个干净的功能分支 feat-xxx
git checkout -b feat-xxx main
# 查看 dev 分支的提交记录（推荐使用可视化工具）
git log dev
# 拣选一些功能并提交到 feat-xxx
git cherry-pick <commit-hash> <commit-hash>
```

#### 如何关联远程分支？

```js
git branch --set-upstream-to=origin/branch-1 branch-2
```

## 常见功能

#### 草稿功能应该怎么使用？

如果你写代码时突然来了一个紧急线上 bug 要处理，而手头的改动又没写完，不适合直接提交，你可以将手头写好的代码存为草稿。

```bash
# 将所有改动保存到本分支下名为 <stash-description> 的草稿中，
# 加上 -u 参数后，文件的新增或删除操作也能一并存为草稿
git stash save -u <stash-description>
```

哼哧哼哧改为 bug 之后，找到并应用相应的草稿就可以回到初始状态了。

```bash
# 使用 list 指令查看有哪些草稿
git stash list
# 应用某草稿
git stash pop <stash-hash>
```

#### 如何快速拷贝仓库代码？

有两种优化手段：仅拷贝某个分支或者拷贝前 n 次提交记录。

```bash
# 仅拷贝单分支
git clone --single-branch -b <branch-name> <repo-url>
# 下载 <branch-name> 分支前 n 个提交记录
git clone --single-branch -b <branch-name> --depth=<n> git@github.com:vuejs/vue.git
# 下载仓库默认分支前 n 个提交记录
git clone --depth=<n> git@github.com:vuejs/vue.git
```

见：[《Git clone 原理》](https://juejin.cn/post/6969206858179411982)

#### 怎么在命令行提交多行消息？

commit -m 是可以换行的！只要结尾不用引号，就不会中断输入。

```bash
git commit -m 'feat: brief message

detailed message'
```

#### 怎么快速修正上一次提交？

如果涉及到文件的修改，需要使用 reset 重置提交。

```bash
# 撤销上一个提交，把所有修改都放到暂存区中（也就是还原回 git add . 后的状态）
git reset --soft HEAD~
# 再次提交
git commit -m <message>
```

如果只是修改提交信息，用 --amend 指令覆盖就好了。

```bash
# 把上个提交的提交信息修正为 <message>
git commit --amend -m <message>
```

#### reset --hard 有几种模式？

可以撤销 n 次提交，或者还原到具体的哈希标记的提交上，也可以还原为远端的某个提交。

```bash
# 撤销上一个提交（并丢弃所有修改）
git reset --hard
# 把分支还原到某个提交（并丢弃所有修改）
git reset --hard <hashname>
# 把分支还原设为远端的某个提交（并丢弃本地所有修改）
git reset --hard <repo-name>/<branch-name>
```

#### 如何拯救因删除或还原造成丢失的信息？

git reflog 指令可以恢复已经被 reset 或删除的 commit 记录，但是并不保证一定成功，因为 git 有定期清理的策略。

#### 如何清理最近几次提交？

可以使用 reset --soft 或者 rebase。使用 rebase 可以对前几次提交进行重新排序、修改提交消息或者进行压缩提交等操作。

```bash
# 修改近 <number> 次提交
git rebase -i HEAD~<number>
```

![rebase -i](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210615022038.png)


#### 怎么对比文件历史？

推荐使用 [VS Code Git History 插件](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)，如果没条件的话，可以使用命令行。

```bash
# 1
git diff <hash-1> <hash-2>
# 2
git blame -L <line-start>,<line-end> <filename>
```

#### 如何合并两个不相关分支？

```bash
git pull origin master --allow-unrelated-histories
```

#### 如何忽略特定提交？

1. gitignore
  
设置好 `.gitignore` 文件后，所有匹配的文件都不会被继续追踪（已经追踪的不会被影响，除非先把它删掉）。

2. update-index

```js
git update-index --skip-worktree filename.js
git update-index --assume-unchanged package.json
```

3. git filter

4. rm

```js
git rm --cached file1
git rm -r --cached <folder-name>
```

#### 如何本地同步代码？

将 diff 文件输出，之后就可使用 apply 指令应用更改。

```bash
git diff > diff.patch
git apply diff.patch
```

## 工程化实践

#### 提交规范有什么用？

业界有许多成熟的 Git Commit Message 规范，主要目的是使“代码提交变得有意义”，这样一来，方便成员协作，有利于工程化实践以及提高美观度。

![方便协作：Inline Git Commit Log](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20201127180816.png)

#### 一个简单的提交规范示例？

以下在 LeanCloud CM Guide 的基础上，我们整理了一份尽量简单且能记录代码提交意义的约定。

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

上面这个示例是一种“修复类型（fix）”示例，其描述链接了一个 GitHub Issue。

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

特殊标记用作标注注意事项，如“BREAKING”、“close”标记的使用。特殊标记通常与项目工程化实践中其它工具配合使用，如用于关闭 GitLab Issues，后续有需要再展开约定。

完整示例

```
feat: 大盘中国地图增加地图下钻功能

引入中国的省市映射文件，以通过选取的省找到省下所有城市内的店铺。

BREAKING: 下钻功能导致了地图缩放时错位的问题，所以暂时禁用了地图的拖拽能力
```

#### 如何跳过钩子？

```bash
git commit --no-verify -am 'bad commit message'
```

## 常见问题

#### SSH 链接超时问题怎么解决？

可以使用以下指令来测试是否是 ssh 连接超时：

```js
ssh -T git@github.com
```

如果提示超时，则到 ~/.ssh/ 文件夹下创建一个 config 文件，内容如下：

```
Host github.com
User lionad-trident
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile C:\Users\18062\.ssh\id_rsa
Port 443
```

再次输入测试指令，会提示是否记录指纹，选择“yes”就好。

#### Reference Broken 问题？

好像是因为断电，我本地或者线上的仓库记录坏掉了，无法拉或推送代码。按照以下 Issue 设置后也没能解决。

见：[Reference Broken](https://github.com/desktop/desktop/issues/3838)
