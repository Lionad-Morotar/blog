---
title: 代码规范
description: 代码质量检查工具与风格规范，涵盖 ESLint、Prettier 等工具的配置与最佳实践
---

## 主题

* [ESLint](/maps/_workflow/linter/eslint)
* [Code Style](/maps/_workflow/linter/code-style) - 代码风格与格式规范

## ESLint 9.x Flat Config

#### 如何迁移到 Flat Config？

见：[配置迁移指南@eslint](https://zh-hans.eslint.org/docs/latest/use/configure/migration-guide)

#### 为什么推荐使用 @antfu/eslint-config？

@antfu/eslint-config 是 Anthony Fu 维护的一套现代化 ESLint 共享配置，专为 Flat Config 设计，集成了 TypeScript、Vue、React 等生态的最佳实践，开箱即用。

## 代码格式化策略

#### 为什么 antfu 不使用 Prettier？

Prettier 的自动换行策略使代码 diff 变得难以阅读，并且没有选项可以用来关闭 print-width 配置的换行策略。尽管可以通过 ESLint 来纠正 Prettier 的行为，但是这麻烦且降低了性能。所以 antfu 的策略是使用自己配置的整套 ESLint 规则共享包。

见：[为什么我不使用 Prettier | antfu](https://antfu.me/posts/why-not-prettier-zh)

#### ESLint-only 方案的优势

使用纯 ESLint 进行代码格式化的优势包括：
- 统一的配置入口，减少工具链复杂度
- 更好的性能（无需在 ESLint 和 Prettier 之间来回传递）
- 更灵活的规则定制能力
- 更好的编辑器集成体验
