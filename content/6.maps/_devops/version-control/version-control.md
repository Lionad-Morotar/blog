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
* [Git 常用命令](./git-commands) - 分支操作、提交管理、历史查看等命令速查

## 简介

#### Git 的优势？

其关键字是"分支策略"以及"变化追踪"，前者保证了在不同大小的团队中，代码的变化都可以相对保持独立，并可以通过合并策略融合变化；后者保证了变化都会被记录下来，使变化可管理。

见：[What is version control](https://www.atlassian.com/git/tutorials/what-is-version-control)

#### 使用 Git 时数据流是怎样的？

Git 有工作区、索引、本地仓库和远端仓库几个概念。在各个数据中心，可以使用咱词条、提交、推送、拉取、rebase、fetch、checkout 等方法对数据进行操作。

![Git Data Transport Commands](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210615024010.png)

## 工程化实践

#### 提交规范有什么用？

业界有许多成熟的 Git Commit Message 规范，主要目的是使"代码提交变得有意义"，这样一来，方便成员协作，有利于工程化实践以及提高美观度。

![方便协作：Inline Git Commit Log](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20201127180816.png)

#### 一个简单的提交规范示例？

我的提交规范：[Dorothy](./dorothy)

常用命令速查：[Git 常用命令](./git-commands)

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
