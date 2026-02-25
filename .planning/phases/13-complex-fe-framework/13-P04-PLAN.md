---
wave: 3
depends_on:
  - 13-P01
  - 13-P02
  - 13-P03
files_modified:
  - content/6.maps/_fe-framework/fe-framework.md
  - content/6.maps/0.index.md
autonomous: true
---

# Plan 13-P04: 更新领域入口和跨域链接

## Objective

1. 重构 `fe-framework.md` 为清晰的领域入口文件（纯导航 + 提取的知识点）
2. 更新 `0.index.md` 中的领域导航链接
3. 检查并修复其他可能受影响的链接

## Current State

`fe-framework.md` 目前是一个混合文件，既包含导航又包含大量内容。

## Target State

`fe-framework.md` 应成为：
1. 简洁的领域入口（导航为主）
2. 保留有价值的知识点作为四级标题
3. 更新所有内部链接指向新路径

## Tasks

### Task 1: 提取并整理知识点

```xml
<task>
  <id>13-P04-T1</id>
  <description>提取 fe-framework.md 中的知识点</description>
  <steps>
    从现有 fe-framework.md 中提取以下内容作为知识点：

    1. #### Sharing State with Islands Architecture
       - Astro 的 Islands 架构中状态管理思路
       - nanostores 及各大框架内置方案

    2. #### 模板语言 vs JSX 之争
       - 模板语言演化成"内部平台"的问题
       - 编译型框架的崛起（Svelte、SolidJS）
       - 2025-2026 年满意度数据对比
       - 场景化选择建议
  </steps>
</task>
```

### Task 2: 重构领域入口文件

```xml
<task>
  <id>13-P04-T2</id>
  <description>重写 fe-framework.md 为领域入口</description>
  <file>content/6.maps/_fe-framework/fe-framework.md</file>
  <template>
---
title: 前端框架
description: 前端开发各阶段的工具集合，包括 UI 框架、元框架、组件方案、动画库等。
---

# 前端框架

前端框架是在前端开发不同阶段，用以简化开发的工具集合。它们提供了一种组织代码的方式，使得开发者可以专注于业务逻辑，而不是底层的技术细节。

## 子领域导航

### UI 框架
- [Vue](/maps/_fe-framework/ui-frameworks/vue)
- [React](/maps/_fe-framework/ui-frameworks/react)
- [Angular](/maps/_fe-framework/ui-frameworks/angular)
- [Vue 响应式](/maps/_fe-framework/ui-frameworks/vue-reactive)

### 元框架
- [Nuxt](/maps/_fe-framework/meta-frameworks/nuxt)
- [Nuxt Security](/maps/_fe-framework/meta-frameworks/nuxt-security)

### 组件方案
- [Web Components](/maps/_fe-framework/component-solutions/web-components)
- [微前端](/maps/_fe-framework/component-solutions/micro-frontend)

### 动画与交互
- [Blockies Animation](/maps/_fe-framework/motion/blockies-animation)
- [Lottie](/maps/_fe-framework/motion/lottie)

### 类型系统
- [Utility Types](/maps/_fe-framework/type-system/utility-types)
- [Zod](/maps/_fe-framework/type-system/zod)

### 资源管理
- [Iconify](/maps/_fe-framework/assets/iconify)

## 知识点

#### Sharing State with Islands Architecture

MAXI FERREIRA 阐述的在岛模式组件中管理状态的思路也可以用于低代码场景。

> We have several options for choosing a store. Astro recommends the nanostores library...

#### 模板语言为何终将变成糟糕的编程语言？

许多框架坚持使用模板语言而非将 HTML/CSS 融入 JavaScript...

#### 编译型框架的崛起是否推翻了模板语言批评？

2025-2026 年的数据显示：Svelte 开发者满意度达 92%，SolidJS 达 90%...
  </template>
</task>
```

### Task 3: 更新 0.index.md 中的链接

```xml
<task>
  <id>13-P04-T3</id>
  <description>更新 0.index.md 中的 _fe-framework 链接</description>
  <steps>
    1. 读取 content/6.maps/0.index.md
    2. 查找所有指向 _fe-framework 的链接
    3. 更新为新的路径结构：
       - /maps/_fe-framework/ui/* → /maps/_fe-framework/ui-frameworks/*
       - /maps/_fe-framework/micro-fe → /maps/_fe-framework/component-solutions/micro-frontend
       - /maps/_fe-framework/nuxt/* → /maps/_fe-framework/meta-frameworks/*
       - 等等
  </steps>
</task>
```

### Task 4: 检查其他领域的引用

```xml
<task>
  <id>13-P04-T4</id>
  <description>检查其他领域对 _fe-framework 的引用</description>
  <command>grep -r "_fe-framework" content/6.maps/ --include="*.md" | grep -v "^Binary" | head -30</command>
  <note>记录需要更新的链接，在后续任务中修复</note>
</task>
```

### Task 5: 修复跨域链接

```xml
<task>
  <id>13-P04-T5</id>
  <description>修复发现的跨域链接</description>
  <steps>
    根据 Task 4 的结果，修复以下文件中的链接：
    - 更新所有旧路径为新路径
    - 确保链接有效性
  </steps>
</task>
```

### Task 6: 创建 _dir.yml（可选）

```xml
<task>
  <id>13-P04-T6</id>
  <description>创建 _fe-framework 目录配置</description>
  <file>content/6.maps/_fe-framework/_dir.yml</file>
  <template>
title: 前端框架
icon: lucide:layers
navigation:
  title: 前端框架
  </template>
  <note>为 Nuxt Content 提供目录级别的元数据配置</note>
</task>
```

## Verification

- [ ] fe-framework.md 重构完成，包含清晰的子领域导航
- [ ] 知识点以四级标题形式保留
- [ ] 0.index.md 中的链接已更新
- [ ] 所有跨域链接检查并修复完毕
- [ ] 无死链存在

## Must-Haves

1. fe-framework.md 作为领域入口，导航结构清晰
2. 所有旧路径链接更新为新路径
3. 知识点内容完整保留
4. 0.index.md 正确指向新的子领域结构
5. 无内部死链
