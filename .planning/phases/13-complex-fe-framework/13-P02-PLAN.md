---
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_fe-framework/component-solutions/index.md
  - content/6.maps/_fe-framework/component-solutions/web-components.md
  - content/6.maps/_fe-framework/component-solutions/micro-frontend.md
  - content/6.maps/_fe-framework/meta-frameworks/index.md
  - content/6.maps/_fe-framework/meta-frameworks/nuxt.md
  - content/6.maps/_fe-framework/meta-frameworks/nuxt-security.md
autonomous: true
---

# Plan 13-P02: 重构组件方案和元框架子领域

## Objective

将 `web-components.md`、`micro-fe/` 和 `nuxt/` 重构为两个子领域：
1. `component-solutions/` - 组件化方案（Web Components + 微前端）
2. `meta-frameworks/` - 元框架（Nuxt 及其生态）

## Current State

```
_fe-framework/
├── web-components.md                   # 根级文件
├── micro-fe/
│   └── index.md                        # 微前端内容
└── nuxt/
    ├── nuxt.md                         # Nuxt 入口
    └── module/
        └── nuxt-security.md            # 安全模块
```

## Target State

```
_fe-framework/
├── component-solutions/
│   ├── index.md                        # 子领域入口
│   ├── web-components.md               # 从根级移动
│   └── micro-frontend.md               # 从 micro-fe/index.md 重命名
└── meta-frameworks/
    ├── index.md                        # 子领域入口
    ├── nuxt.md                         # 从 nuxt/ 移动
    └── nuxt-security.md                # 从 nuxt/module/ 扁平化移动
```

## Tasks

### Task 1: 创建 component-solutions 子领域

```xml
<task>
  <id>13-P02-T1</id>
  <description>创建 component-solutions 目录结构</description>
  <command>mkdir -p content/6.maps/_fe-framework/component-solutions</command>
</task>
```

### Task 2: 创建 component-solutions 入口

```xml
<task>
  <id>13-P02-T2</id>
  <description>创建组件方案子领域入口</description>
  <file>content/6.maps/_fe-framework/component-solutions/index.md</file>
  <template>
---
title: 组件方案
description: 前端组件化解决方案，包括 Web Components 标准和微前端架构。
---

# 组件方案

现代前端开发中，组件化是构建可维护、可复用 UI 的核心策略。

## 子领域导航

- [Web Components](web-components) - 原生组件化标准
- [微前端](micro-frontend) - 大型应用的架构方案

## 核心概念

#### Web Components

浏览器原生支持的组件化标准，包含 Custom Elements、Shadow DOM 和 HTML Templates。

#### 微前端

将大型前端应用拆分为独立部署、独立运行的子应用，实现团队自治和技术栈无关。
  </template>
</task>
```

### Task 3: 迁移 Web Components

```xml
<task>
  <id>13-P02-T3</id>
  <description>迁移 Web Components 文件</description>
  <steps>
    1. 读取 content/6.maps/_fe-framework/web-components.md
    2. 创建 content/6.maps/_fe-framework/component-solutions/web-components.md
    3. 确保 frontmatter 完整
    4. 更新任何内部链接
  </steps>
</task>
```

### Task 4: 迁移微前端内容

```xml
<task>
  <id>13-P02-T4</id>
  <description>迁移微前端文件</description>
  <steps>
    1. 读取 content/6.maps/_fe-framework/micro-fe/index.md
    2. 创建 content/6.maps/_fe-framework/component-solutions/micro-frontend.md
    3. 更新 frontmatter（如果有）
    4. 保留所有内容完整性
  </steps>
</task>
```

### Task 5: 创建 meta-frameworks 子领域

```xml
<task>
  <id>13-P02-T5</id>
  <description>创建 meta-frameworks 目录结构</description>
  <command>mkdir -p content/6.maps/_fe-framework/meta-frameworks</command>
</task>
```

### Task 6: 创建 meta-frameworks 入口

```xml
<task>
  <id>13-P02-T6</id>
  <description>创建元框架子领域入口</description>
  <file>content/6.maps/_fe-framework/meta-frameworks/index.md</file>
  <template>
---
title: 元框架
description: 基于 UI 框架的全栈开发框架，提供 SSR、SSG、路由等开箱即用功能。
---

# 元框架

元框架（Meta Frameworks）在 UI 框架之上构建，提供全栈开发能力。

## 子领域导航

- [Nuxt](nuxt) - 基于 Vue 的全栈框架
- [Nuxt Security](nuxt-security) - Nuxt 安全模块

## 核心特性

#### 服务端渲染 (SSR)

在服务器端渲染页面，提升首屏性能和 SEO。

#### 静态站点生成 (SSG)

构建时预渲染页面，适合内容型网站。

#### 文件系统路由

基于文件目录结构自动生成路由配置。

#### 自动导入

组件、组合式函数等自动发现和导入。
  </template>
</task>
```

### Task 7: 迁移 Nuxt 文件

```xml
<task>
  <id>13-P02-T7</id>
  <description>迁移 Nuxt 相关文件</description>
  <steps>
    1. 读取 content/6.maps/_fe-framework/nuxt/nuxt.md
    2. 创建 content/6.maps/_fe-framework/meta-frameworks/nuxt.md
    3. 读取 content/6.maps/_fe-framework/nuxt/module/nuxt-security.md
    4. 创建 content/6.maps/_fe-framework/meta-frameworks/nuxt-security.md
    5. 更新文件中的链接引用
  </steps>
</task>
```

### Task 8: 清理旧目录

```xml
<task>
  <id>13-P02-T8</id>
  <description>删除旧目录</description>
  <commands>
    rm -f content/6.maps/_fe-framework/web-components.md
    rm -rf content/6.maps/_fe-framework/micro-fe
    rm -rf content/6.maps/_fe-framework/nuxt
  </commands>
</task>
```

## Verification

- [ ] component-solutions/ 包含 3 个文件（index, web-components, micro-frontend）
- [ ] meta-frameworks/ 包含 3 个文件（index, nuxt, nuxt-security）
- [ ] 两个子领域都有清晰的入口文件
- [ ] 旧 web-components.md、micro-fe/、nuxt/ 已删除

## Must-Haves

1. 组件方案子领域包含 Web Components 和微前端两个主题
2. 元框架子领域包含 Nuxt 及其安全模块
3. 目录结构扁平化，避免不必要的嵌套
4. 所有内容完整保留
