---
title: GitLab Flow
description: GitLab Flow 是介于 GitHub Flow 和 Gitflow 之间的折中方案，以环境分支和 upstream-first 策略为特色。
---

## Quick Questions

#### GitLab Flow 是什么？

GitLab Flow 是 GitLab 于 2014 年提出的一种 Git 工作流，定位为 GitHub Flow 与 Gitflow 之间的折中方案。它在 GitHub Flow 的简洁性基础上增加了可选的环境分支和发布分支，同时大幅减少了 Gitflow 的分支复杂度。核心原则：**提交只能向下游流动（commits only flow downstream）。**

#### GitLab Flow 怎么运作？

1. 从 `main` 创建功能分支，每个分支对应一个 Issue
2. 完成开发后，通过 Merge Request (MR) 合并回 `main`
3. 合并采用 `--no-ff`（非快进），保留合并提交
4. 从 `main` 逐级合并到下游环境分支（如 `staging` → `production`）
5. Hotfix 先合并入 `main`，再 cherry-pick 到下游（upstream-first）

#### GitLab Flow 的三种子模式？

- **生产分支模式**：维护独立的 `production` 分支，适用于无法每次合并即部署的场景（如 iOS App 需通过审核）
- **环境分支模式**：`main` → `staging` → `pre-production` → `production`，逐级部署测试
- **发布分支模式**：维护 `2-3-stable`、`2-4-stable` 等长期分支，适用于需要支持多版本的对外发布场景

三种子模式可按需选用，不需要全部采用。

#### GitLab Flow 和 GitHub Flow、Gitflow 有什么区别？

| 维度 | Gitflow | GitHub Flow | GitLab Flow |
|---|---|---|---|
| 复杂度 | 高 | 低 | 中 |
| 核心分支 | `master` + `develop` + 辅助分支 | `main` + 功能分支 | `main` + 功能分支 + 可选环境 / 发布分支 |
| 发布策略 | 通过 `release` 分支发布 | 合并即部署 | 通过环境分支或发布分支部署 |
| Hotfix | 专门的 `hotfix` 分支 | 与普通功能相同流程 | 先入 `main`，再 cherry-pick 下游 |
| Issue 集成 | 无 | 无 | MR 自动关联并关闭 Issue |

#### GitLab Flow 有什么局限性？

- **环境分支可能拖慢发布**：多级逐级合并可能降低发布频率
- **不如主干开发极致**：很多团队已转向更激进的 Trunk-Based Development + Feature Flag
- **cherry-pick 带来维护负担**：upstream-first 要求将修复合并到多个下游分支

## 相关资源

* [Introduction to GitLab Flow - 原始文档](https://gitlab.com/gitlab-org/gitlab-foss/-/blob/master/doc/topics/gitlab_flow.md)
* [What is GitLab Flow? - GitLab 官方](https://about.gitlab.com/topics/version-control/what-is-gitlab-flow/)
* [Branching Strategies - GitLab Docs](https://docs.gitlab.com/user/project/repository/branches/strategies/)
* [The problem with Git Flow - GitLab Blog](https://about.gitlab.com/blog/what-is-gitlab-flow/)
