---
wave: 2
depends_on:
  - 13-P01
  - 13-P02
files_modified:
  - content/6.maps/_fe-framework/motion/index.md
  - content/6.maps/_fe-framework/type-system/index.md
  - content/6.maps/_fe-framework/type-system/zod.md
  - content/6.maps/_fe-framework/type-system/utility-types.md
  - content/6.maps/_fe-framework/assets/index.md
autonomous: true
---

# Plan 13-P03: 重构动画、类型系统和资源管理子领域

## Objective

完成剩余子领域的结构化和入口文件创建：
1. `motion/` - 添加子领域入口
2. `type-system/` - 合并 schema 和 types，创建统一入口
3. `assets/` - 添加子领域入口

## Current State

```
_fe-framework/
├── motion/
│   ├── blockies-animation.md
│   └── lottie.md
├── schema/
│   └── zod.md
├── types/
│   └── utility-types.md
└── assets/
    └── iconify.md
```

## Target State

```
_fe-framework/
├── motion/                             # 已有目录，添加入口
│   ├── index.md                        # 新增：子领域入口
│   ├── blockies-animation.md
│   └── lottie.md
├── type-system/                        # 新建：合并 schema + types
│   ├── index.md
│   ├── zod.md                          # 从 schema/ 移动
│   └── utility-types.md                # 从 types/ 移动
└── assets/                             # 已有目录，添加入口
    ├── index.md                        # 新增：子领域入口
    └── iconify.md
```

## Tasks

### Task 1: 创建 motion 子领域入口

```xml
<task>
  <id>13-P03-T1</id>
  <description>创建 motion/index.md 入口文件</description>
  <file>content/6.maps/_fe-framework/motion/index.md</file>
  <template>
---
title: 动画与交互
description: 前端动画库和交互效果解决方案。
---

# 动画与交互

Web 动画技术让界面更具活力和表现力。

## 子领域导航

- [Blockies Animation](blockies-animation) - 区块链头像动画
- [Lottie](lottie) - 跨平台动画解决方案

## 核心概念

#### CSS vs JavaScript 动画

CSS 动画适合简单的过渡效果，JavaScript 动画适合复杂的交互控制。

#### 性能优化

使用 `transform` 和 `opacity` 属性，避免触发重排（reflow）。
  </template>
</task>
```

### Task 2: 创建 type-system 子领域

```xml
<task>
  <id>13-P03-T2</id>
  <description>创建 type-system 目录</description>
  <command>mkdir -p content/6.maps/_fe-framework/type-system</command>
</task>
```

### Task 3: 创建 type-system 入口

```xml
<task>
  <id>13-P03-T3</id>
  <description>创建类型系统子领域入口</description>
  <file>content/6.maps/_fe-framework/type-system/index.md</file>
  <template>
---
title: 类型系统
description: TypeScript 类型工具和 Schema 验证方案。
---

# 类型系统

类型系统为 JavaScript 提供编译时类型检查，提升代码质量和开发体验。

## 子领域导航

- [Utility Types](utility-types) - TypeScript 内置工具类型
- [Zod](zod) - Schema 验证库

## 核心概念

#### 静态类型检查

在编译时发现类型错误，避免运行时异常。

#### Schema 验证

运行时数据校验，确保外部数据符合预期结构。

#### 类型推导

编译器自动推断类型，减少显式类型注解。
  </template>
</task>
```

### Task 4: 迁移类型系统文件

```xml
<task>
  <id>13-P03-T4</id>
  <description>迁移类型系统相关文件</description>
  <steps>
    1. 读取 content/6.maps/_fe-framework/schema/zod.md
    2. 创建 content/6.maps/_fe-framework/type-system/zod.md
    3. 读取 content/6.maps/_fe-framework/types/utility-types.md
    4. 创建 content/6.maps/_fe-framework/type-system/utility-types.md
    5. 确保 frontmatter 完整
  </steps>
</task>
```

### Task 5: 创建 assets 子领域入口

```xml
<task>
  <id>13-P03-T5</id>
  <description>创建 assets/index.md 入口文件</description>
  <file>content/6.maps/_fe-framework/assets/index.md</file>
  <template>
---
title: 资源管理
description: 前端资源（图标、图片、字体等）的管理方案。
---

# 资源管理

前端资源的高效管理和加载优化。

## 子领域导航

- [Iconify](iconify) - 统一图标解决方案

## 核心概念

#### 图标系统

统一的图标使用规范，支持多图标集和按需加载。

#### 资源优化

图片压缩、懒加载、CDN 分发等性能优化策略。
  </template>
</task>
```

### Task 6: 清理旧目录

```xml
<task>
  <id>13-P03-T6</id>
  <description>删除旧目录</description>
  <commands>
    rm -rf content/6.maps/_fe-framework/schema
    rm -rf content/6.maps/_fe-framework/types
  </commands>
</task>
```

## Verification

- [ ] motion/index.md 创建成功
- [ ] type-system/ 目录包含 3 个文件（index, zod, utility-types）
- [ ] assets/index.md 创建成功
- [ ] 旧 schema/ 和 types/ 目录已删除

## Must-Haves

1. motion 子领域有清晰的入口，包含现有两个动画主题
2. type-system 成功合并 schema 和 types 的内容
3. assets 子领域有清晰的入口
4. 所有文件保持原有内容完整性
