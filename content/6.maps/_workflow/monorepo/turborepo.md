---
title: Turborepo
description: Turborepo 是 Vercel 推出的 Monorepo 构建系统，提供任务管道、本地和远程缓存等功能
---

## 核心特性

#### Pipeline 任务依赖图如何配置？

Turborepo 通过 `turbo.json` 中的 `pipeline` 配置定义任务间的依赖关系。使用 `^` 符号表示依赖包的同名任务必须先完成。

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {}
  }
}
```

#### 本地缓存和远程缓存的区别？

* **本地缓存**：存储在 `node_modules/.cache/turbo`，仅在当前机器可用，适合个人开发
* **远程缓存**：部署在服务器或 Vercel 托管，团队共享缓存结果，CI/CD 也能受益
* **缓存键**：基于文件内容哈希、环境变量、依赖版本计算，确保缓存准确性

#### 如何配置 Turborepo 远程缓存？

1. 使用 Vercel 托管（推荐）：`npx turbo login` 登录后启用
2. 自托管远程缓存：使用 `@turbo/remote` 包搭建私有缓存服务器
3. CI/CD 集成：设置 `TURBO_TOKEN` 和 `TURBO_TEAM` 环境变量

```bash
# 本地登录并链接团队
turbo login
turbo link
```

#### Turbo 2.x 原生 boundaries 可检出幽灵导入与 tag 越界

选型资料常说 Turborepo 没有边界约束能力，要治理模块边界只能自配 ESLint 规则或转投 Nx，这是 1.x 时代的印象。
Turbo 2.x 提供 `turbo boundaries` 命令：在 `turbo.json` 中给包声明 tags 并配置 boundaries 规则后，
它能检出两类违规——导入包目录之外的文件，以及导入未在 package.json 声明的依赖。规则对传递依赖同样生效：
A 引用 B、B 又引用被禁止 tag 的 C 时，A 自身也会报违规。与 Nx 走 ESLint 插件
（enforce-module-boundaries）的路线不同，检查由构建工具自身静态扫描源码 import，不依赖 lint 配置；
覆盖面也相应更窄，不提供 CODEOWNERS 式的写权限隔离。

见：[Boundaries | Turborepo](https://turborepo.dev/docs/reference/boundaries)

## 最佳实践

#### 如何避免幽灵依赖问题？

* 使用 **pnpm** 作为包管理器，其严格的 `node_modules` 结构天然避免幽灵依赖
* 启用 Turborepo 的 `experimentalUI` 和 `strict` 模式
* 在 `package.json` 中显式声明所有直接依赖，不依赖传递依赖

#### pnpm + Turborepo 的组合优势

* **磁盘效率**：pnpm 的 content-addressable 存储节省磁盘空间
* **安装速度**：pnpm 比 npm/yarn 更快的依赖安装
* **严格依赖**：pnpm 的 hoisting 控制避免幽灵依赖
* **Workspace 协议**：pnpm workspaces 与 Turborepo 无缝集成

## 资源

* [Turborepo 官方文档](https://turbo.build/repo/docs)
* [Turborepo 远程缓存指南](https://turbo.build/repo/docs/core-concepts/remote-caching)
* [Monorepo Handbook](https://turbo.build/repo/docs/handbook)
