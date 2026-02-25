---
title: Code Style
description: 代码风格与格式规范的最佳实践
original_path: /_workflow/linter/code-style.md
---

#### 软换行无法正确处理结构化文本

软换行（soft-wrapping）依赖编辑器自动换行，但无法正确处理需要语义理解的结构化文本。例如 Markdown 列表换行时需要保持缩进层级，这只有硬换行（hard-wrapping）才能做到。

#### 代码与注释宜采用不同的列宽限制

matklad 的实践建议：代码行宽限制在 100 列（并排显示两个编辑器的物理极限），而注释内容宜限制在 60-70 列。因为代码排版密度低于散文，且缩进会蚕食注释可用空间，较窄的行宽使注释更易阅读。

#### 注释换行应相对于缩进位置计算

matklad 期望的编辑器行为：注释内容在 70 列处换行，但这个限制应相对于注释起始位置而非绝对列数。这样深层嵌套的注释块依然保持舒适的阅读宽度，不会被过度挤压。

见：[Wrapping Code Comments @ matklad](https://matklad.github.io/2026/02/21/wrapping-code-comments.html)
