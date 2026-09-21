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

#### 选择层与失效层：跨包 inputs glob 让缓存一改全崩

受影响面归因有两层：filter 的选择层决定跑哪些任务，任务哈希的失效层决定哪些任务命中缓存，任何一层
耦合都会让增量口径退化成全量。inputs 是 glob 匹配而非目录扫描，任务哈希等于 inputs 匹配到的全部文件
内容哈希：根锚定的跨包 glob（如 `$TURBO_ROOT$/packages/*/src/**`）让每个任务实例的哈希涵盖所有包源码，
改一个包的一个文件，全部任务哈希变化、全部缓存未命中，此时 filter 选得再精确也无济于事。所以包相对
glob 才是 inputs 的默认美德，跨包耦合只能进 globalDependencies 并认清其全局代价。两条补充：git 浅克隆
下区间对比缺历史，所有包一律按变更处理，浅克隆与 affected 口径天然互斥；future flags 的
filterUsingTasks 与 affectedUsingTaskInputs 可把 git 区间过滤改按各任务 inputs 匹配，但根配置、lockfile
与 globalDependencies 变更仍恒选全部任务。

见：[Configuration | Turborepo](https://turborepo.dev/docs/reference/configuration)

#### 构建器隐式读取的文件不进任务哈希

turbo 只对显式声明负责：影响产物但不被 import 语句触达的文件（tsconfig 的 paths/dts 选项、.env、
codegen 配置），与隐式消费的环境变量一样必须手工登记进 inputs/env，否则改了它们不触发重跑，过期产物
被静默回放且不报错。典型如 tsdown/tsc 构建期自动加载 tsconfig.json，漏列它，改 tsconfig 不重构建、
缓存放行过期 dist，直到下游消费才炸。启用新任务的缓存前值得做一次负样本验证：改一个疑似隐式输入的
配置文件，看任务是否真的重跑。

见：[Caching | Turborepo](https://turborepo.dev/docs/crafting-your-repository/caching)

#### 如何配置 Turborepo 远程缓存？

1. 使用 Vercel 托管（推荐）：`npx turbo login` 登录后启用
2. 自托管远程缓存：使用 `@turbo/remote` 包搭建私有缓存服务器
3. CI/CD 集成：设置 `TURBO_TOKEN` 和 `TURBO_TEAM` 环境变量

```bash
# 本地登录并链接团队
turbo login
turbo link
```

#### globalDependencies 是无豁免的全局税

globalDependencies 的文件哈希折进全局哈希，改动即作废所有任务的缓存，设计上不存在任务级 opt-out，
适合被大多数任务真实消费的全局文件（共享测试基座、宽域共享源码）；只被少数任务消费的文件放进去，
缴税成本高过收益。future flag `globalConfiguration` 改变税制：global.inputs 折入任务哈希而非全局哈希，
任务可用否定 glob 对特定全局文件豁免（如 lint 任务排除 tsconfig.json），同一文件从此可按任务差别征税。

见：[Configuration | Turborepo](https://turborepo.dev/docs/reference/configuration)

#### Turbo 2.x 原生 boundaries 可检出幽灵导入与 tag 越界

选型资料常说 Turborepo 没有边界约束能力，要治理模块边界只能自配 ESLint 规则或转投 Nx，这是 1.x 时代的印象。
Turbo 2.x 提供 `turbo boundaries` 命令：在 `turbo.json` 中给包声明 tags 并配置 boundaries 规则后，
它能检出两类违规——导入包目录之外的文件，以及导入未在 package.json 声明的依赖。规则对传递依赖同样生效：
A 引用 B、B 又引用被禁止 tag 的 C 时，A 自身也会报违规。与 Nx 走 ESLint 插件
（enforce-module-boundaries）的路线不同，检查由构建工具自身静态扫描源码 import，不依赖 lint 配置；
覆盖面也相应更窄，不提供 CODEOWNERS 式的写权限隔离。

见：[Boundaries | Turborepo](https://turborepo.dev/docs/reference/boundaries)

#### tags 规则语义随版本漂移，启用前先做负样本验证

boundaries 的 tags 规则至少并存三套语义：2.3 博文的包级 schema（allowDependencyOn/denyDependencyFrom）、
现行文档的根级 schema（boundaries.tags 下 dependencies/dependents 双面向 allow/deny）、以及部分二进制的
实际行为——deny/allow 退化为「带该 tag 的 workspace 是否存在」的存在性检查，对无依赖关系的包大量误报。
高速演进的工具普遍文档超前于二进制，处置不是死等升级：先用默认执法（未声明依赖不可 import）加自定义
深路径规则扛住边界，tags 声明先铺进包级 turbo.json 作零迁移升级路径；启用任何一条规则前，造一个必然
违规的引用做负样本，验证执法真的在执法。

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
