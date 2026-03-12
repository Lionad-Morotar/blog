---
title: Git 常用命令
description: Git 日常开发中的常用命令速查，包括分支操作、提交管理、历史查看等
---

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

#### `git merge-base` 是什么？

`git merge-base` 用于查找两个或多个分支的**最近共同祖先**（best common ancestor），
即这些分支在历史上最后一次共享的提交点。
这个"分叉点"是理解分支关系的关键。

**常见用法：**

```bash
# 查找两个分支的最近共同祖先
git merge-base master feat/corporate-services

# 查找所有共同祖先（octopus merge 场景）
git merge-base --all master feat/corporate-services

# 配合 git log 查看某个分支独有的提交
git log $(git merge-base master feat/corporate-services)..feat/corporate-services
```

**使用场景：**

1. **了解分支差异范围**：在合并或 rebase 之前，先确认两个分支从何处开始分道扬镳
2. **生成简洁的 changelog**：只查看当前分支相比主分支新增的提交，排除已合并的历史
3. **调试合并冲突**：理解两个分支的共同起点，有助于分析冲突产生的上下文

见：[Git Merge Base 文档](https://git-scm.com/docs/git-merge-base)

#### 如何合并两个不相关分支？

```bash
git pull origin master --allow-unrelated-histories
```

#### 如何忽略冲突快速合并？

```bash
git merge dev --strategy-option theirs
```

#### 什么是 Octopus Merge？

Octopus Merge（章鱼合并）是 Git 中用于一次性合并**三个或更多分支**的特殊合并方式。
与普通两路合并不同，它通过单次合并操作将所有指定分支整合，只产生一个合并提交，从而保持历史记录的简洁。

**基本用法：**

```bash
git merge branch1 branch2 branch3
# 或更多分支
git merge feature/auth feature/payment feature/ui feature/api
```

**为什么使用 Octopus Merge？**

常规的多分支合并会产生多个合并提交，使历史记录变得"嘈杂"。
而 Octopus Merge 将所有分支一次性合并，只产生单个合并提交，历史更简洁。

![常规多分支合并：多个合并提交](https://raw.githubusercontent.com/durgaswaroop/blogimages/master/git_usual_merge.png)
*图片来源：[Git Octopus Merge](https://www.freblogg.com/git-octopus-merge) —— 常规合并逐个合并产生多个合并提交*

![Octopus 合并后：单个合并提交](https://raw.githubusercontent.com/durgaswaroop/blogimages/master/git_post_octopus_merge.png)
*图片来源：[Git Octopus Merge](https://www.freblogg.com/git-octopus-merge) —— Octopus 合并单次操作，历史更简洁*

**注意事项**

1. **合并冲突处理复杂**：多个分支同时合并时，冲突解决难度呈指数级增长
2. **不要过度使用**：Linus Torvalds 曾批评 66 分支的合并为"that's not an octopus, that's a **Cthulhu** merge"
3. **建议上限**：8 路合并已属困难，超过 5-6 个分支应重新考虑合并策略

见：[Git Octopus Merge: A deep dive](https://www.freblogg.com/git-octopus-merge)

## 提交管理

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

#### 如何跳过钩子？

```bash
git commit --no-verify -am 'bad commit message'
```

## 历史与对比

#### 怎么对比文件历史？

推荐使用 [VS Code Git History 插件](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)，如果没条件的话，可以使用命令行。

```bash
# 1
git diff <hash-1> <hash-2>
# 2
git blame -L <line-start>,<line-end> <filename>
```

## 忽略与过滤

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

## 配置

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

#### 怎么配置代理？

```bash
git config --global http.proxy <your-proxy-url>
git config --global https.proxy <your-proxy-url>
```

#### 如何切换至 zdiff3？

```bash
git config --global merge.conflictStyle zdiff3
```

zdiff3 即 zealous 3-way-diff，见：[Better Git Conflicts with zdiff3](https://www.ductile.systems/zdiff3/)

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

## 克隆优化

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
