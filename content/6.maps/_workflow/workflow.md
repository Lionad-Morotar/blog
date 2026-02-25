---
title: 前端工程化
description: 前端工程化工作流的核心工具链，包括包管理器、构建工具、代码规范、Monorepo 管理等
---

## 子领域导航

### 工程化理论

* [前端工程化](/maps/_workflow/engineering/fe-engineering) - 软件工程与前端工程化实践

### 包管理

* [包管理器](/maps/_workflow/package-manager/package-manager) - npm、pnpm 等工具

### 构建工具

* [构建工具](/maps/_workflow/build-tools/build-tools) - Vite、Webpack、Rspack

### 代码规范

* [代码规范](/maps/_workflow/linter/linter) - ESLint、代码风格

### Monorepo

* [Monorepo](/maps/_workflow/monorepo/monorepo) - 多包仓库管理

### 编译器

* [编译器](/maps/_workflow/compiler/compiler) - Babel、SWC、esbuild

## 2026 年标准工具栈

#### 为什么 2026 年推荐 pnpm？

* **磁盘效率**：content-addressable 存储，多个项目共享同一依赖实例
* **安装速度**：比 npm 快 2-3 倍，比 yarn 快 1.5-2 倍
* **严格依赖**：默认非扁平化 node_modules，避免幽灵依赖问题
* **Workspace 支持**：原生支持 Monorepo workspaces，与 Turborepo 配合良好
* **生态兼容**：完全兼容 npm 生态，可直接替换 npm/yarn

#### Vite vs Rspack：如何选择？

* **Vite 适用场景**：
  - 新项目启动，追求极致开发体验
  - 中小型项目，构建速度优势明显
  - 需要快速的 HMR（热模块替换）
  - 框架无关，支持 Vue/React/Svelte 等

* **Rspack 适用场景**：
  - 大型遗留 Webpack 项目迁移
  - 需要兼容大量 Webpack loader/plugin
  - 对构建性能有要求但无法完全重构
  - 团队熟悉 Webpack 配置体系

* **决策建议**：新项目首选 Vite，存量 Webpack 项目评估 Rspack 迁移

#### ESLint 9.x Flat Config 迁移指南

* **配置格式变化**：从 `.eslintrc.*` 迁移到 `eslint.config.js`（flat config）
* **显式配置**：所有配置必须显式导入，不再有默认继承
* **插件简化**：无需 `extends`，直接导入配置对象
* **迁移步骤**：
  1. 升级 ESLint 到 9.x
  2. 创建 `eslint.config.js` 替换旧配置
  3. 显式导入所有需要的插件和配置
  4. 逐步测试确保规则生效

#### Turborepo 远程缓存配置

* **Vercel 托管**：`npx turbo login` 登录后自动启用
* **环境变量**：CI/CD 中设置 `TURBO_TOKEN` 和 `TURBO_TEAM`
* **自托管选项**：使用 `@turbo/remote` 搭建私有缓存服务器
* **收益**：团队共享构建缓存，CI 时间减少 50-80%
