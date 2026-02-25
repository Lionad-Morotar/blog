# 四层认知结构判断标准

**Version:** 1.0
**Last Updated:** 2026-02-24
**Applies to:** Maps 知识库重构项目 (Phase 01-18)

---

## 概述

本文档定义了四层认知结构（Domain → Subdomain → Topic → Knowledge Point）的分类判断标准，为所有 46 个领域的重构工作提供一致的决策依据。

**核心原则：**
1. 按认知范围分层，而非按文件大小机械分割
2. 优先保持阅读连续性，避免过度碎片化
3. 子领域统一使用目录形式，保持结构一致性
4. 知识点保持为四级标题，不拆分为独立文件

---

## 领域 (Domain)

### 定义与范围

领域是知识库的最高层级分类，对应 `0.index.md` 中定义的 20+ 个顶层分类（如前端、工程、数据库、商业等）。

### 判断标准

| 标准 | 说明 |
|------|------|
| 分类来源 | 必须存在于 `0.index.md` 的导航结构中 |
| 命名规范 | 以 `_` 为前缀的目录名（如 `_frontend`） |
| 物理形式 | 独立目录，位于 `content/6.maps/` 下 |
| 入口文件 | 必须包含 `{domain}.md` 或 `0.index.md` 作为领域入口 |

### 领域列表示例

根据 `0.index.md`，当前领域包括：

- **前端**: `_frontend`, `_fe-framework`, `_typescript`
- **工程**: `_workflow`, `_programming`, `_devops`
- **Web**: `_web`, `_cross-platform`
- **数据库**: `_database`
- **AI**: `_ai`, `_machine-learning`
- **商业**: `_business`, `_industry`, `_product`
- **编程语言**: `_go`, `_php`, `_cpp`, `_markdown`, `_regex`
- ...等 46 个领域

### 验证方法

```bash
# 检查目录是否在 0.index.md 中引用
grep "_domain-name" content/6.maps/0.index.md
```

---

## 子领域 (Subdomain)

### 定义与范围

子领域是领域下的专业细分方向，构成领域与主题之间的中间层。例如 `_frontend` 领域下的 `css`、`javascript`、`html` 等。

### 判断标准

| 标准 | 说明 |
|------|------|
| 认知独立性 | 构成独立的学习单元，有明确的知识边界 |
| 统一形式 | **统一使用目录形式**，不按内容量区分文件或目录 |
| 物理形式 | 子目录，位于领域目录下（如 `_frontend/css/`） |
| 入口文件 | 必须包含 `0.index.md` 或 `{subdomain}.md` |

### 决策树

```
内容属于哪个领域？
  ↓
是否构成独立学习单元？（有明确知识边界、可独立学习）
  ↓ 是
创建子领域目录
  ↓
子领域命名使用小写、短横线连接
```

### 入口文件要求

子领域目录必须包含以下之一作为入口：

1. **`0.index.md`** - 子领域导航文件，包含主题列表和概述
2. **`{subdomain}.md`** - 子领域内容文件（适用于内容较少的子领域）

**推荐结构：**
```
_subdomain/
├── 0.index.md          # 子领域入口（推荐）
├── topic-a.md          # 主题文件
├── topic-b.md          # 主题文件
└── topic-c/            # 嵌套子领域（如需要）
    └── 0.index.md
```

### 示例

**示例 1: CSS 子领域（已符合标准）**
```
_frontend/              # 领域
└── css/                # 子领域（目录）
    ├── 0.index.md      # 子领域入口
    ├── layers.md       # 主题
    ├── bem.md          # 主题
    └── sass.md         # 主题
```

**示例 2: Go 领域（简单结构）**
```
_go/                    # 领域
└── go.md               # 领域入口（同时也是唯一主题）
```

---

## 主题 (Topic)

### 定义与范围

主题是具体的讨论范围，对应一个独立的 Markdown 文件。主题是读者查找信息时的主要定位单元。

### 判断标准

| 标准 | 说明 |
|------|------|
| **优先原则** | **优先按照讨论范围界定**，而非文件大小 |
| 扩展潜力 | 主题有独立扩展潜力（语义上独立）→ 拆分为单独文件 |
| 行数阈值 | 内容超过 **150+ 行** 时建议拆分 |
| 物理形式 | 单个 Markdown 文件（`.md`） |
| 标题层级 | 文件内使用 H1 (`#`) 作为主题标题 |

### 决策树

```
内容块是否构成独立讨论范围？
  ↓ 是
是否有扩展潜力？（语义独立、未来可能增加内容）
  ├─ 是 → 拆分为独立主题文件
  ↓ 否
内容是否超过 150 行？
  ├─ 是 → 拆分为独立主题文件
  ↓ 否
保持为子领域入口文件的一部分
```

### 拆分 vs 保持的示例

**应该拆分为独立主题的情况：**

| 文件路径 | 行数 | 决策 | 理由 |
|----------|------|------|------|
| `_business/business-analysis.md` | 302 | 保持独立 | 已超过 150 行，商业分析是独立主题 |
| `_frontend/css/new-features-2025.md` | 471 | 保持独立 | 内容量大，CSS 新特性是独立主题 |
| `_frontend/css/0.css-mind-map.md` | 809 | 保持独立 | 内容量大，思维导图是独立主题 |

**应该保持为子领域入口一部分的情况：**

| 文件路径 | 行数 | 决策 | 理由 |
|----------|------|------|------|
| `_go/go.md` | 30 | 保持现状 | 内容少，作为领域入口即可 |
| `_php/php.md` | 13 | 保持现状 | 内容少，作为领域入口即可 |
| `_frontend/css/layers.md` | 23 | 保持现状 | 内容少，但作为独立主题存在（已有结构） |

### 主题文件结构

```markdown
---
title: 主题标题
description: 主题描述（可选）
---

# 主题标题

## 子分类/章节

### 潜在子主题

#### 知识点（观点、案例、洞见）

内容...
```

---

## 知识点 (Knowledge Point)

### 定义与范围

知识点是原子化的思考性内容，包括观点、案例、洞见等。知识点**不拆分为独立文件**，保持为四级标题以维持阅读连续性。

### 判断标准

| 标准 | 说明 |
|------|------|
| 内容类型 | 观点、案例、洞见等**思考性内容** |
| 非事实描述 | 不是纯粹的事实罗列或定义说明 |
| 物理形式 | 四级标题 (`#### 知识点标题`) |
| 禁止拆分 | **不得拆分为独立文件** |

### 决策树

```
内容是事实性描述还是思考性洞见？
  ├─ 思考性洞见（观点、案例、分析）→ 四级标题（知识点）
  ↓ 否
是否构成新的讨论范围？
  ├─ 是 → 考虑提升为三级标题或独立主题
  ↓ 否
保持为正文内容
```

### 正确示例（知识点作为 H4）

**来源: `_business/business-analysis.md`**

```markdown
## 模型

#### 什么是非共识机会？

非共识机会是指那些在当时尚未被广泛认可或理解，但经过深入分析和独特视角发现的潜在机会或创新点...

#### 什么是三级火箭理论？

三级火箭理论通过不同层级的业务协同，逐级放大势能，最终形成商业闭环...
```

**来源: `_business/business-analysis.md`**

```markdown
## 案例分析

#### 为什么第一性原理备受马斯克推崇？

以前会以为第一性原理是某种还原主义，但后来才发现它在特定项目才能发挥作用...

#### 左晖创办的链家如何实现商业模式创新？

过去，房产经纪人的平均从业时间只有 6 个月...
```

### 反模式（不要这样做）

| 错误做法 | 问题 | 正确做法 |
|----------|------|----------|
| 将每个知识点拆分为独立文件 | 过度碎片化，破坏阅读连续性 | 保持为 H4 标题 |
| 使用 H3 作为知识点 | 混淆层级，H3 应留给子主题 | 使用 H4 表示知识点 |
| 将事实定义作为知识点 | 知识点应是思考性内容 | 事实定义作为正文或 H3 |

---

## 标题层级指南

### 各层级用途

| 层级 | 语法 | 用途 | 示例 |
|------|------|------|------|
| H1 | `#` | 文件/主题标题 | `# CSS Layers` |
| H2 | `##` | 主题子分类/章节 | `## 模型`, `## 分析框架` |
| H3 | `###` | 潜在子主题（需评估） | `### 价值链分析` |
| H4 | `####` | 知识点（观点、案例、洞见） | `#### 什么是非共识机会？` |

### 三级标题处理原则

现有文档中的三级标题需要**逐一评估**：

```
现有 H3 标题
  ↓
是否构成独立讨论范围？
  ├─ 是 → 提升为独立主题文件
  ↓ 否
是否适合作为知识点？
  ├─ 是 → 降级为 H4
  ↓ 否
保持为 H3（子主题）
```

---

## 决策树汇总

### 决策树 1: 内容应该放在哪一层？

```
内容分类决策
│
├─ 是否对应 0.index.md 顶层分类？
│  └─ 是 → 领域 (Domain) → _domain/ 目录
│
├─ 是否构成独立学习单元？
│  └─ 是 → 子领域 (Subdomain) → _domain/subdomain/ 目录
│
├─ 是否超过 150 行或有扩展潜力？
│  └─ 是 → 主题 (Topic) → .md 文件
│
└─ 是思考性内容（观点/案例/洞见）？
   └─ 是 → 知识点 (Knowledge Point) → #### H4 标题
```

### 决策树 2: H3 标题是否应该提升？

```
现有 H3 标题评估
│
├─ 内容行数 > 150 行？
│  └─ 是 → 提升为独立主题文件
│
├─ 有明确扩展潜力？
│  └─ 是 → 提升为独立主题文件
│
├─ 是思考性内容（观点/案例/洞见）？
│  └─ 是 → 降级为 H4（知识点）
│
└─ 以上都不是？
   └─ 保持为 H3（子主题）
```

---

## 边界情况处理

### 边界 1: 内容恰好 150 行

**处理原则：** 优先按讨论范围判断

- 如果内容语义完整、无扩展需求 → 保持现状
- 如果内容有明显分段、未来可能扩展 → 拆分

### 边界 2: 子领域 vs 主题的模糊地带

**处理原则：** 看内容独立性

- 如果能独立学习、有明确知识边界 → 子领域（目录）
- 如果是具体技术点、工具介绍 → 主题（文件）

**示例：**
- `css/` → 子领域（CSS 是一个完整的学习领域）
- `layers.md` → 主题（CSS Layer 是一个具体技术点）

### 边界 3: 知识点拆分的边界

**处理原则：** 默认不拆分，特殊情况由执行者判断

Claude 在重构过程中有权根据以下因素决定例外：
- 知识点内容过长（>50 行）
- 知识点需要跨主题引用
- 知识点本身构成完整案例

### 边界 4: 现有结构的处理

**处理原则：** 已有良好结构的保持不动

如 `_frontend/css/` 已有良好结构：
- 保持 `css/` 作为子领域目录
- 保持各主题文件不变
- 仅优化内部标题层级

---

## 示例库

### 简单领域示例: `_go` (Phase 2-01 迁移后)

**迁移前结构：**
```
_go/
└── go.md (30 lines)
```

**迁移后结构：**
```
_go/
├── go.md (394 bytes)           # 领域入口
└── go/
    └── go.md (32 lines)        # 子领域内容
```

**分析：**
- 领域：`_go`（符合 0.index.md 分类）
- 子领域：`go/`（统一使用目录形式，即使内容较少）
- 主题：`go/go.md`（唯一主题，保留 original_path）
- 知识点：无（内容为资源链接列表）

**迁移模式：**
- 原文件内容移至子领域目录
- 创建领域入口文件，包含子领域导航
- 子领域文件保留 `original_path: content/6.maps/_go/go.md`

---

### 简单领域示例: `_markdown` (Phase 2-01 迁移后)

**迁移前结构：**
```
_markdown/
└── markdown.md (30 lines)
```

**迁移后结构：**
```
_markdown/
├── markdown.md (355 bytes)     # 领域入口
└── markdown/
    └── markdown.md (30 lines)  # 子领域内容
```

**分析：**
- 领域：`_markdown`（符合 0.index.md 分类）
- 子领域：`markdown/`（统一使用目录形式）
- 主题：`markdown/markdown.md`（唯一主题）
- 知识点：1个（`#### Markdown Inline Style`）

---

### 简单领域示例: `_php` (Phase 2-01 迁移后)

**迁移前结构：**
```
_php/
└── php.md (13 lines)
```

**迁移后结构：**
```
_php/
├── php.md (311 bytes)          # 领域入口
└── php/
    └── php.md (13 lines)       # 子领域内容
```

**分析：**
- 领域：`_php`（符合 0.index.md 分类）
- 子领域：`php/`（统一使用目录形式）
- 主题：`php/php.md`（唯一主题）
- 知识点：无（内容为版本管理命令）

---

### 简单领域示例: `_regex` (Phase 2-03 迁移后)

**迁移前结构：**
```
_regex/
└── regex.md (121 lines)
```

**迁移后结构：**
```
_regex/
├── regex.md (373 bytes)        # 领域入口
└── regex/
    └── regex.md (123 lines)    # 子领域内容
```

**分析：**
- 领域：`_regex`（符合 0.index.md 分类）
- 子领域：`regex/`（统一使用目录形式）
- 主题：`regex/regex.md`（唯一主题，内容较丰富）
- 知识点：多个（正则优化思路、实践思路等）

**特殊处理：**
- 内容包含符号速查表、常用正则、进阶思考等多个 H2 章节
- 保留 `original_path: /maps/_regex/regex`（URL 格式）

---

### 简单领域示例: `_seo` (Phase 2-03 迁移后)

**迁移前结构：**
```
_seo/
└── seo.md (59 lines)
```

**迁移后结构：**
```
_seo/
├── seo.md (416 bytes)          # 领域入口
└── seo/
    └── seo.md (61 lines)       # 子领域内容
```

**分析：**
- 领域：`_seo`（符合 0.index.md 分类）
- 子领域：`seo/`（统一使用目录形式）
- 主题：`seo/seo.md`（唯一主题）
- 知识点：多个（SEO 专家、禁止抓取、谷歌搜索新手指南等）

**特殊处理：**
- 内容包含实践建议和阅读资源
- 保留 `original_path: /maps/_seo/seo`（URL 格式）

### 中等领域示例: `_business`

**结构：**
```
_business/
├── business-analysis.md (302 lines)
├── business-examples.md (13 lines)
└── venture-capital.md (21 lines)
```

**分析：**
- 领域：`_business`（符合 0.index.md 分类）
- 无子领域（文件少，可直接放在领域下）
- 主题：
  - `business-analysis.md` - 商业分析（大主题，302 行）
  - `business-examples.md` - 商业案例（小主题，13 行）
  - `venture-capital.md` - 风险投资（小主题，21 行）
- 知识点：`business-analysis.md` 中的多个 H4

**知识点示例（business-analysis.md）：**
```markdown
#### 什么是非共识机会？
非共识机会是指那些在当时尚未被广泛认可或理解...

#### 什么是三级火箭理论？
三级火箭理论通过不同层级的业务协同...

#### AI 创业"护城河矩阵"：评估 LLM 应用层生存能力
基于 Google Cloud VP Darren Mowry 的观察...
```

### 复杂领域示例: `_frontend/css`

**结构：**
```
_frontend/
└── css/                          # 子领域
    ├── 0.index.md (28 lines)     # 子领域入口
    ├── 0.css-mind-map.md (809 lines)
    ├── bem.md (71 lines)
    ├── inverted-triangle-css.md (37 lines)
    ├── layers.md (23 lines)
    ├── new-features-2025.md (471 lines)
    ├── sass.md (21 lines)
    ├── snapshot-2024.md (89 lines)
    ├── sprite-animation.md (50 lines)
    └── tailwind/                 # 嵌套子领域
        └── ...
```

**分析：**
- 领域：`_frontend`（前端）
- 子领域：`css/`（CSS 是前端的子领域）
- 主题：
  - `0.css-mind-map.md` - CSS 思维导图（大主题，809 行）
  - `new-features-2025.md` - CSS 新特性（大主题，471 行）
  - `snapshot-2024.md` - CSS 快照（中等主题，89 行）
  - `bem.md`, `sass.md`, `layers.md` 等（小主题）
- 知识点：各主题文件内的 H4 标题

---

## 重构检查清单

### 领域级别检查

- [ ] 目录名以 `_` 开头
- [ ] 存在于 `0.index.md` 导航中
- [ ] 包含领域入口文件（`{domain}.md` 或 `0.index.md`）

### 子领域级别检查

- [ ] 统一使用目录形式
- [ ] 包含子领域入口文件（`0.index.md` 或 `{subdomain}.md`）
- [ ] 命名使用小写、短横线连接

### 主题级别检查

- [ ] 文件名使用小写、短横线连接
- [ ] 文件内使用 H1 作为主题标题
- [ ] 超过 150 行或有扩展潜力的内容已拆分为独立文件

### 知识点级别检查

- [ ] 知识点使用 H4 标题（`####`）
- [ ] 知识点内容为思考性内容（观点、案例、洞见）
- [ ] 知识点未拆分为独立文件

### 标题层级检查

- [ ] H1: 文件标题
- [ ] H2: 主题子分类/章节
- [ ] H3: 子主题（已评估是否提升）
- [ ] H4: 知识点

---

## 附录: 文件命名规范

### 目录命名

- 使用小写字母
- 多词使用短横线连接（kebab-case）
- 领域目录以 `_` 开头
- 示例: `_frontend`, `css`, `fe-framework`

### 文件命名

- 使用小写字母
- 多词使用短横线连接（kebab-case）
- 入口文件使用 `0.index.md` 或 `{name}.md`
- 示例: `business-analysis.md`, `new-features-2025.md`

### 链接格式

- 内部链接使用相对路径: `./topic.md`, `../other/file.md`
- 避免使用绝对路径 `/maps/...`（除非必要）
- 链接到目录时指向入口文件: `./css/0.index.md`

---

## 迁移模式总结 (Phase 2 Simple Batch 1)

### 简单领域迁移模式

**适用条件：**
- 领域内容较少（单个文件，<150 行）
- 无现成子领域结构
- 属于简单复杂度分类

**迁移步骤：**

```
1. 创建子领域目录
   _domain/
   └── domain/              # 新建子领域目录

2. 移动原文件内容
   _domain/
   ├── domain.md            # 原文件（清空，改为入口）
   └── domain/
       └── domain.md        # 原文件内容移至此

3. 更新领域入口文件
   - 添加 YAML frontmatter（title, description, nav_order）
   - 添加领域描述
   - 添加子领域导航链接

4. 保留原始路径信息
   - 在子领域文件 frontmatter 中添加 original_path
   - 格式：original_path: content/6.maps/_domain/domain.md

5. 更新跨领域链接
   - 搜索所有指向 /maps/_domain/domain 的链接
   - 更新为 /maps/_domain/domain/domain
```

### Phase 2-01/02/03 迁移统计

| 领域 | 原文件行数 | 迁移后结构 | 知识点数量 | 特殊处理 |
|------|-----------|-----------|-----------|---------|
| _go | 30 lines | domain.md + domain/domain.md | 0 | 无 |
| _markdown | 30 lines | domain.md + domain/domain.md | 1 | 无 |
| _php | 13 lines | domain.md + domain/domain.md | 0 | 无 |
| _regex | 121 lines | domain.md + domain/domain.md | 多个 | 保留 URL 格式 original_path |
| _seo | 59 lines | domain.md + domain/domain.md | 多个 | 保留 URL 格式 original_path |

### Phase 3-01/02/03/04 迁移统计 (Simple Batch 2)

| 领域 | 原文件行数 | 迁移后结构 | 知识点数量 | 特殊处理 |
|------|-----------|-----------|-----------|---------|
| _react-native | 11 lines | react-native.md + react-native/react-native.md | 0 | 无 |
| _oop | 64 lines | oop.md + oop/oop.md | 多个 | 含跨领域链接到设计模式 |
| _medicine | 26 lines | medicine.md + medicine/medicine.md | 3 | 无 |
| _manage | 52 lines | manage.md + manage/project-management.md | 7 | 原文件名为 project-management.md |
| _games | 45 lines | games.md + games/escape-from-tarkov.md | 4 | 原文件名为 escape-from-tarkov.md |

**Phase 3 迁移模式说明：**

1. **_react-native**: 简单结构，内容以资源链接为主
2. **_oop**: 包含跨领域链接 `[设计模式](/maps/_software/design-patterns)`，展示链接保留模式
3. **_medicine**: 医疗知识类内容，知识点为 H4 标题（消毒剂分类、安全性等）
4. **_manage**: 原文件为 `project-management.md`，迁移后保持文件名不变，展示非对称命名处理
5. **_games**: 原文件为 `escape-from-tarkov.md`，游戏攻略类内容，展示特定主题文件处理

### 链接更新清单

**Phase 2 需要更新的文件：**
- `content/6.maps/0.index.md` - 主导航中的 5 个领域链接
- `content/6.maps/_product/growth.md` - SEO 交叉引用

**Phase 3 需要更新的文件：**
- `content/6.maps/0.index.md` - 更新 2 个链接
  - `/maps/_oop/oop` → `/maps/_oop/oop/oop`
  - `/maps/_medicine/medicine` → `/maps/_medicine/medicine/medicine`

**更新规则：**
- `/maps/_domain/domain` → `/maps/_domain/domain/domain`
- 对于非对称命名（如 `_manage/project-management.md`），链接指向实际文件路径

---

*本文档为 Maps 知识库重构项目的标准参考，所有 Phase 2-18 的重构工作应遵循此文档的决策标准。*
