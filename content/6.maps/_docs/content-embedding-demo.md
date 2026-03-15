---
title: 内容引用示例
description: 展示如何在 Markdown 中嵌入和引用其他文件内容
created: 2026-03-11
tags: [demo, nuxt-content, markdown]
toc: true
---

## 1. 整文件嵌入（SectionEmbed）

使用 `section-embed` 组件可以将另一个 Markdown 文件的完整内容嵌入到当前文档中：

使用 `./` 开头表示相对于当前文档的目录：

```markdown
::section-embed{src="./shared-config"}
::
```

**效果：**

::section-embed{src="./shared-config"}
::

## 2. 章节提取（SectionExtract）

使用 `section-extract` 组件可以从另一个文件中提取特定章节，而不是整个文件。

### 2.1 按标题文字匹配

通过 `heading` 参数指定要提取的章节标题：

```markdown
::section-extract{from="./api-reference" heading="认证方式"}
::
```

**效果：**

::section-extract{from="./api-reference" heading="认证方式"}
::

### 2.2 按索引位置提取

通过 `index` 参数提取第 N 个指定级别的章节（0-based）：

```markdown
::section-extract{from="./api-reference" level="2" index="1"}
::
```

**效果（提取第 2 个 h2 章节）：**

::section-extract{from="./api-reference" level="2" index="1"}
::

### 2.3 模糊匹配标题

`heading` 支持部分匹配：

```markdown
::section-extract{from="./api-reference" heading="错误码"}
::
```

**效果：**

::section-extract{from="./api-reference" heading="错误码"}
::

## 3. 实际应用场景

### 场景 1：共享配置说明

多个文档需要引用相同的配置参数时，将配置写在单独文件（如 `shared-config.md`），然后在各处嵌入：

- 部署指南 → 嵌入 "部署配置" 章节
- 开发文档 → 嵌入 "环境变量" 章节  
- API 文档 → 嵌入 "站点基础配置" 章节

### 场景 2：API 文档复用

多个项目共用一套 API 时，可以在各自的文档中引用核心 API 文档的特定章节：

```markdown
<!-- 项目 A 的文档，使用相对路径 -->
::section-extract{from="./api-reference" heading="认证方式"}
::

<!-- 项目 B 的文档，使用相对路径 -->
::section-extract{from="./api-reference" heading="错误处理"}
::
```

### 场景 3：更新日志汇总

在年度总结中引用各月的更新记录：

```markdown
# 2026 年更新汇总

## 第一季度
::section-extract{from="./changelog-2026-01" heading="新功能"}
::

## 第二季度
::section-extract{from="./changelog-2026-04" heading="新功能"}
::
```

## 4. 组件参数参考

### SectionEmbed

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | string | **必填** | 源文件路径（相对路径如 `./file`，或相对于 `content/6.maps/` 的根路径） |
| `showTitle` | boolean | `true` | 是否显示源文件标题 |
| `showLink` | boolean | `true` | 是否显示"查看原文"链接 |
| `class` | string | - | 额外 CSS 类名 |

### SectionExtract

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `from` | string | **必填** | 源文件路径（相对路径如 `./file`，或相对于 `content/6.maps/` 的根路径） |
| `heading` | string | - | 按标题文字匹配（优先级高于 index） |
| `level` | number | `2` | 标题层级（h2=2, h3=3...） |
| `index` | number | `0` | 第几个同级标题（0-based） |
| `class` | string | - | 额外 CSS 类名 |

## 5. 注意事项

### 路径规则

- **相对路径**：使用 `./` 开头，相对于当前文档所在目录
- **绝对路径**：直接写路径，相对于 `content/6.maps/` 根目录
- **不要**包含 `.md` 后缀
- **不要**包含前导 `/`

```markdown
<!-- 当前文件: content/6.maps/_docs/content-embedding-demo.md -->
<!-- 目标文件: content/6.maps/_docs/shared-config.md -->

<!-- ✅ 正确 - 相对路径（推荐） -->
::section-embed{src="./shared-config"}

<!-- ✅ 正确 - 相对于 maps 根目录 -->
::section-embed{src="_docs/shared-config"}

<!-- ❌ 错误 - 包含了 .md 后缀 -->
::section-embed{src="./shared-config.md"}

<!-- ❌ 错误 - 包含了前导 / -->
::section-embed{src="/_docs/shared-config"}
```

### 循环引用

避免 A 引用 B，B 又引用 A，这会导致无限循环。

### 热更新

修改源文件后，引用该文件的所有页面会自动更新（开发模式下）。

### 被引用的文件

建议将被引用的文件放在 `_docs/` 或 `_partials/` 目录下，并在 frontmatter 中标注：

```yaml
---
title: 共享配置参考
description: 本文档设计为被其他文档引用
---
```

## 6. 相关资源

- [源文件: shared-config](/maps/_docs/shared-config)
- [源文件: api-reference](/maps/_docs/api-reference)
- [Nuxt Content 官方文档](https://content.nuxt.com/)

*本演示文档创建于 2026-03-11，展示了 Nuxt Content 中内容引用的完整能力。*
