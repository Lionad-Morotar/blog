---
title: tsgolint
description: OXC 生态的类型感知 lint 引擎，以 typescript-go 为底座为 Oxlint 提供 TypeScript 语义分析能力
---

#### tsgolint 以 typescript-go 为底座实现类型感知 lint

tsgolint 是 Oxlint 的类型感知（type-aware）lint 后端，用 Go 编写，直接运行在微软官方的 TypeScript 编译器 Go 移植版
typescript-go（TypeScript 7，代号 Project Corsa）之上，因此类型推导行为与 TypeScript 官方完全一致。项目 fork 自
typescript-eslint/tsgolint，现由 oxc-project 维护。规则覆盖对齐 typescript-eslint 类型感知规则的 59/61（仅缺
naming-convention、prefer-destructuring），典型规则如 no-floating-promises 可捕获未处理的 Promise 拒绝。
性能上对比 ESLint + typescript-eslint 在大仓库快 20-40 倍（vscode 仓库 167.8s → 4.89s，约 34x）。
使用时要求 TypeScript 7.0+，TS 6.0 已废弃的 tsconfig 选项（如 baseUrl）不再支持。

见：[oxc-project/tsgolint](https://github.com/oxc-project/tsgolint)

#### Rust 语法层与 Go 语义层分离的双层 lint 架构

OXC 的类型感知 lint 采用职责分离的双层设计：Oxlint（Rust）负责文件遍历、忽略逻辑、配置解析、语法类规则与报告输出，
保持"即开即用"的速度；tsgolint（Go）只在 --type-aware 开启时介入，构建 TypeScript program 并执行语义规则，
把结构化诊断回传给 Oxlint。这一架构的关键决策是不在 Rust 里重写类型系统（那是数年工程量），而是直接复用微软官方
typescript-go——规则逻辑对着官方 type checker API 编写，语义兼容由微软背书。对比两条竞争路线：
typescript-eslint 把 TS 编译器嵌入 JS linter，承受 AST 转换、单线程与高内存开销；Biome 自研类型推断，
不追求全量 TS 语义兼容。tsgolint 的规则策略是先对齐存量标准（59/61）而非自创新规则，让团队以最小迁移成本
从 ESLint 切换。

见：[Oxlint Type-Aware Linting 官方文档](https://oxc.rs/docs/guide/usage/linter/type-aware)

#### oxlint --type-aware 与 Vite+ 的类型感知集成

tsgolint 不作为独立 CLI 使用，而是集成进 Oxlint：安装 oxlint-tsgolint 包后以 oxlint --type-aware 启用语义规则，
追加 --type-check 可顺带输出 typescript-go 的类型错误，一条命令替代 CI 中 tsc --noEmit + eslint 两步。
在 Vite+（VoidZero 统一工具链）中，vp lint 基于 Oxlint 构建，vp check 一把完成 format + lint + type-check
（Oxfmt + Oxlint + tsgolint/tsgo）；类型感知通过 vite.config.ts 的 lint 配置块开启：

```ts
export default defineConfig({
  lint: { options: { typeAware: true, typeCheck: true } },
})
```

monorepo 中使用类型感知 lint 需先构建被依赖包以生成 .d.ts；若性能异常，可用 OXC_LOG=debug 定位
是否因 tsconfig include 过宽把 node_modules、构建产物拉进了 program。

见：[Vite+ Lint 文档](https://viteplus.dev/guide/lint)
