---
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_fe-framework/ui-frameworks/index.md
  - content/6.maps/_fe-framework/ui-frameworks/vue.md
  - content/6.maps/_fe-framework/ui-frameworks/react.md
  - content/6.maps/_fe-framework/ui-frameworks/angular.md
  - content/6.maps/_fe-framework/ui-frameworks/vue-reactive.md
autonomous: true
---

# Plan 13-P01: 重构 UI 框架子领域

## Objective

将现有的 `ui/` 目录重构为 `ui-frameworks/` 子领域，建立清晰的四层认知结构：子领域入口 → 主题文件 → 知识点。

## Current State

```
ui/
├── react.md
├── angular.md
└── vue/
    ├── vue.md
    └── reactive.md
```

## Target State

```
ui-frameworks/
├── index.md                    # 子领域入口
├── vue.md                      # Vue 主题（合并 vue/vue.md + 核心内容）
├── vue-reactive.md             # Vue 响应式主题（原 vue/reactive.md）
├── react.md                    # React 主题
└── angular.md                  # Angular 主题
```

## Tasks

### Task 1: 创建 ui-frameworks 目录结构

```xml
<task>
  <id>13-P01-T1</id>
  <description>创建 ui-frameworks 子目录</description>
  <command>mkdir -p content/6.maps/_fe-framework/ui-frameworks</command>
</task>
```

### Task 2: 创建子领域入口文件

```xml
<task>
  <id>13-P01-T2</id>
  <description>创建 ui-frameworks/index.md 入口文件</description>
  <file>content/6.maps/_fe-framework/ui-frameworks/index.md</file>
  <template>
---
title: UI 框架
description: 主流前端 UI 框架，包括 Vue、React、Angular 等组件化开发工具。
---

# UI 框架

前端 UI 框架提供了组件化的开发模式，帮助开发者构建复杂的用户界面。

## 子领域导航

- [Vue](vue) - 渐进式 JavaScript 框架
- [React](react) - 用于构建用户界面的 JavaScript 库
- [Angular](angular) - 完整的平台级框架

## 核心概念

#### 组件化架构

现代 UI 框架都基于组件化思想，将 UI 拆分为独立、可复用的单元。

#### 响应式数据绑定

框架自动追踪数据变化并更新 DOM，无需手动操作。

#### 虚拟 DOM

通过内存中的虚拟 DOM 树，最小化实际 DOM 操作，提升性能。
  </template>
</task>
```

### Task 3: 迁移 Vue 相关文件

```xml
<task>
  <id>13-P01-T3</id>
  <description>迁移并合并 Vue 文件</description>
  <steps>
    1. 读取 content/6.maps/_fe-framework/ui/vue/vue.md 内容
    2. 读取 content/6.maps/_fe-framework/ui/vue/reactive.md 内容
    3. 创建 content/6.maps/_fe-framework/ui-frameworks/vue.md
       - 保留原 vue.md 的主要内容
       - 添加 frontmatter: title, description
    4. 创建 content/6.maps/_fe-framework/ui-frameworks/vue-reactive.md
       - 迁移 reactive.md 内容
       - 更新链接和引用
  </steps>
</task>
```

### Task 4: 迁移 React 文件

```xml
<task>
  <id>13-P01-T4</id>
  <description>迁移 React 文件</description>
  <steps>
    1. 读取 content/6.maps/_fe-framework/ui/react.md
    2. 创建 content/6.maps/_fe-framework/ui-frameworks/react.md
    3. 更新文件路径引用
    4. 添加适当的 frontmatter
  </steps>
</task>
```

### Task 5: 迁移 Angular 文件

```xml
<task>
  <id>13-P01-T5</id>
  <description>迁移 Angular 文件</description>
  <steps>
    1. 读取 content/6.maps/_fe-framework/ui/angular.md
    2. 创建 content/6.maps/_fe-framework/ui-frameworks/angular.md
    3. 更新文件路径引用
    4. 添加适当的 frontmatter
  </steps>
</task>
```

### Task 6: 删除旧目录

```xml
<task>
  <id>13-P01-T6</id>
  <description>删除旧的 ui/ 目录</description>
  <command>rm -rf content/6.maps/_fe-framework/ui</command>
  <note>在确认所有文件成功迁移后执行</note>
</task>
```

## Verification

- [ ] ui-frameworks/ 目录存在且包含 5 个文件
- [ ] index.md 包含正确的子领域导航
- [ ] vue.md、react.md、angular.md 内容完整
- [ ] vue-reactive.md 成功迁移
- [ ] 旧 ui/ 目录已删除

## Must-Haves (Goal-Backward Verification)

基于 Phase 13 目标 "Restructure _fe-framework domain"：

1. UI 框架子领域必须有清晰的入口文件
2. 每个框架（Vue/React/Angular）作为独立主题存在
3. 知识点以四级标题形式保留在主题文件中
4. 文件路径符合 Nuxt Content 路由规范
