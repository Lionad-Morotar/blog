---
title: GitHub Flow
description: GitHub Flow 是一种基于 PR 的轻量级 Git 工作流，由 GitHub 团队提出。
---

## Quick Questions

#### GitHub Flow 是什么？

GitHub Flow 是一种基于 PR 的轻量级 Git 工作流，由 GitHub 联合创始人 Scott Chacon 于 2011 年提出。核心原则只有一条：**`main` 分支上的任何内容都随时可部署。** 在此工作流中，所有功能开发都在独立的 feature 分支上进行，通过 Pull Request 完成审查后合并回 `main`，合并即部署。

#### GitHub Flow 怎么运作？

1. 从 `main` 创建描述性命名的功能分支
2. 在功能分支上提交并推送更改
3. 创建 Pull Request，邀请团队成员审查
4. 根据审查反馈继续迭代，PR 会自动更新
5. PR 获批并通过所有检查后，合并到 `main`
6. 合并后立即删除功能分支

没有 `develop`、`release`、`hotfix` 等辅助分支，所有工作都围绕 `main` + 功能分支展开。

#### GitHub Flow 和 Gitflow 有什么区别？

| 维度 | Gitflow | GitHub Flow |
|---|---|---|
| 长期分支 | `master` + `develop` | 仅 `main` |
| 辅助分支 | `feature`、`release`、`hotfix` | 仅功能分支 |
| 发布方式 | 手动合并到 `master` 并打版本标签 | 合并即部署 |
| 适用场景 | 需要多版本维护的桌面 / 移动应用 | 频繁部署的 Web 应用、SaaS |

Gitflow 作者 Vincent Driessen 在 2020 年补充说明中提到：类似 Web 应用这种不需要经常回滚的场景，使用更简单的 GitHub Flow 可能更合适。

#### GitHub Flow 有什么局限性？

- **不适合多版本维护**：没有 release 分支，难以同时维护 v1.x 和 v2.x
- **PR 可能成为瓶颈**：审查延迟导致分支存活时间变长，合并冲突风险增大
- **不适合库（Library）开发**：库依赖版本号管理，需要显式的版本发布流程
- **缺乏显式热修复机制**：紧急修复和普通功能走相同流程

#### GitHub Flow 和主干开发（Trunk-Based Development）的关系？

两者都追求持续部署和短反馈循环。主要区别在于未完成功能的隔离方式：GitHub Flow 用功能分支，主干开发用 Feature Flag。有观点认为 GitHub Flow 本质上是主干开发的一种宽松变体。

## 相关资源

* [GitHub Flow - GitHub 官方文档](https://docs.github.com/en/get-started/using-github/github-flow)
* [Scott Chacon 原始博文（已归档）](http://scottchacon.com/2011/08/31/github-flow.html)
* [Please Stop Recommending Git Flow](https://georgestocker.com/2020/03/04/please-stop-recommending-git-flow/)
* [Gitflow 作者 2020 年补充说明](https://nvie.com/posts/a-successful-git-branching-model/)
