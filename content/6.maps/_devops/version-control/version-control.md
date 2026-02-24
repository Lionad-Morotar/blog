---
title: 版本控制
description: 版本控制是一种记录文件内容变化，以便将来查阅特定版本修订情况的系统，包括 Git、版本号管理、工作流等
original_path: content/6.maps/_devops/git.md (primary source), content/6.maps/_devops/version-control.md (merged)
---

## 主题

* [Dorothy](./dorothy) - Git Commit Message 约定
* [Gitflow](./gitflow) - Git 分支工作流程
* [Pre-commit Hook](./pre-commit-hook) - 预提交钩子与代码检查
* [语义化版本](./semantic-versioning) - 版本号管理与 Semver

## 简介

#### Git 的优势？

其关键字是"分支策略"以及"变化追踪"，前者保证了在不同大小的团队中，代码的变化都可以相对保持独立，并可以通过合并策略融合变化；后者保证了变化都会被记录下来，使变化可管理。

见：[What is version control](https://www.atlassian.com/git/tutorials/what-is-version-control)

#### 使用 Git 时数据流是怎样的？

Git 有工作区、索引、本地仓库和远端仓库几个概念。在各个数据中心，可以使用咱词条、提交、推送、拉取、rebase、fetch、checkout 等方法对数据进行操作。

![Git Data Transport Commands](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210615024010.png)

## 配置相关

#### 如何解决下载超时问题？

```bash
# 仅当20秒内下载速度低于 1000 字节时，才会中断下载
git config --global http.lowSpeedLimit 1000
git config --global http.lowSpeedTime 20
```

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
git config --global https.proxy <your-proxy-url>
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

```bash
git branch --set-upstream-to=origin/branch-1 branch-2
```

#### 如何切换至 zdiff3？

```bash
git config --global merge.conflictStyle zdiff3
```

zdiff3 即 zealous 3-way-diff，见：[Better Git Conflicts with zdiff3](https://www.ductile.systems/zdiff3/)

## 工程化实践

#### 提交规范有什么用？

业界有许多成熟的 Git Commit Message 规范，主要目的是使"代码提交变得有意义"，这样一来，方便成员协作，有利于工程化实践以及提高美观度。

![方便协作：Inline Git Commit Log](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20201127180816.png)

#### 一个简单的提交规范示例？

我的提交规范：[Dorothy](./dorothy)

## Quick Questions

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

#### 如何忽略冲突快速合并？

```bash
git merge dev --strategy-option theirs
```

#### 如何忽略特定提交？

1. gitignore

设置好 `.gitignore` 文件后，所有匹配的文件都不会被继续追踪（已经追踪的不会被影响，除非先把它删掉）。

2. update-index

```bash
git update-index --skip-worktree filename.js
git update-index --assume-unchanged package.json
```

3. git filter

4. rm

```bash
git rm --cached file1
git rm -r --cached <folder-name>
```

#### 如何本地同步代码？

将 diff 文件输出，之后就可使用 apply 指令应用更改。

```bash
git diff > diff.patch
git apply diff.patch
```

#### 如何跳过钩子？

```bash
git commit --no-verify -am 'bad commit message'
```

## Git Worktree

#### 什么是 Git Worktree？

想象你正在家里厨房做饭（当前分支 `feature/login`），突然有人敲门说"外面水管爆了需要紧急修理"（紧急 bug）。

**传统做法**：把锅里的菜随便盖起来（stash），关掉燃气（停服务器），去修水管（切换分支到 `fix/pipe`）。修完回来，菜的火候忘了、锅要重新热、心情也乱了。

**Worktree 做法**：你有一个分身，他在隔壁房间修水管，你在厨房继续做饭。两个房间完全独立，互不打扰。

Git Worktree 让你在同一仓库中同时检出多个分支到不同目录，每个目录都是完整独立的工作区。

#### Worktree 的核心用法

```bash
# 创建新 worktree（基于当前分支创建新分支）
git worktree add ../project-bugfix -b fix/payment-bug

# 或基于已有分支创建 worktree
git worktree add ../project-feature feature/auth

# 查看所有 worktree
git worktree list

# 删除 worktree
git worktree remove ../project-bugfix
```

#### 为什么需要 Worktree？

**场景 1：并行开发**
- 主 worktree：开发新功能（feature/auth）
- 第二个 worktree：修复线上 bug（fix/payment-bug）
- 第三个 worktree：代码审查（review/team-pr）

**场景 2：长生命周期任务**
- 有一个需要跑几小时的测试/脚本
- 不想在这个目录里干等，可以去另一个 worktree 做其他事

**场景 3：上下文隔离**
- 每个 worktree 有独立的 IDE 窗口、终端、环境变量
- 切换任务不需要重建开发环境

#### 和 stash 的区别

| 方式 | 优点 | 缺点 |
|------|------|------|
| Stash | 简单、快速 | 容易忘记 stash 了什么、切换后环境要重建 |
| Worktree | 完全隔离、状态持久 | 占用更多磁盘空间 |

#### 注意事项

- 同一个分支不能同时在多个 worktree 中检出
- Worktree 之间共享 `.git` 目录（节省空间）
- 删除 worktree 不会删除对应分支

见：[Git Worktree 官方文档](https://git-scm.com/docs/git-worktree)

#### Git 平台生态的碎片化陷阱

各 Git 平台通过仓库根目录下的点文件夹（.github/、.gitlab/ 等）扩展功能，
但这种"平台特定配置"机制导致跨平台可移植性成为幻觉。

**回退链的不对称性**：Gitea/Forgejo 可读取 .github/ 作为 fallback，
但 GitLab 和 Bitbucket 仅识别自身文件夹——这种"单向兼容"制造了
"配置可移植"的假象，实际多平台部署时需要重复配置。

见：[Forge-Specific Repository Folders - Andrew Nesbitt](https://nesbitt.io/2026/02/22/forge-specific-repository-folders.html)

## Common Issues

#### Git 为什么不会被文件重命名愚弄？

Git 通过计算文件内容的哈希（SHA-1 或 SHA-256）来唯一标识文件，而不是依赖文件名。

尽管可以使用 git mv oldname newname 指令来重命名，但就算不这么做，Git 也会根据内容相似性检测识别重命名。

#### 怎么记住 HTTPs 账号密码？

```bash
# 先执行再重试
git config --global credential.helper store
```

#### SSH 链接超时问题怎么解决？

可以使用以下指令来测试是否是 ssh 连接超时：

```bash
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

再次输入测试指令，会提示是否记录指纹，选择"yes"就好。

#### Reference Broken 问题？

好像是因为断电，我本地或者线上的仓库记录坏掉了，无法拉或推送代码。按照以下 Issue 设置后也没能解决。

见：[Reference Broken](https://github.com/desktop/desktop/issues/3838)

## 语义化版本

#### 语义化版本是什么？

语义化版本（Semantic Version）是一种版本号码标记方法，它要求版本号由"主版本号。次版本号。修订号"组成，分别代表不兼容的 API 改动、向下兼容的功能性改动或新增、向下兼容的问题修正。

见：[语义化版本 @semver.org](https://semver.org/lang/zh-CN/)

#### 语义化版本解决了什么问题？

Semver 被设计用来解决依赖地狱的问题，常用于定义了公共 API 的项目，因为其各个版本号的意义都和 API 的变动挂钩。但 Semver 从某种意义上来说过于理想化，主要因为实际开发中代码变动没用绝对意义上的 no breaking change 这么一说。bug 和 breaking change 的界限本身就很模糊，所以实际上，任何改动都可能带来意料之外的 breaking change。

许多项目并不遵循 Semver，如 TS 的开发者声称，其 minor 版本可能引入 Breaking Change，见：[TypeScript should follow semantic versioning @GitHub](https://github.com/microsoft/TypeScript/issues/14116)。

#### 如何解决版本号膨胀问题？

在单仓多包项目中，如果遵循语义化版本，那么版本同步会使版本号迅速膨胀。一个好的方案是现在其他项目使用 0.x 版本号开发，等 API 稳定后再合并到单仓中升级成为 1.0.0 版本。

见：[The Case for Monorepos](https://medium.com/netscape/the-case-for-monorepos-907c1361708a)
