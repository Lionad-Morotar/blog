# 复杂度评估报告

**Version:** 1.0
**Last Updated:** 2026-02-24
**Applies to:** Maps 知识库重构项目 (Phase 01-18)

---

## 概述

本文档提供所有领域的文件数量、结构特征和复杂度分类，为 18 阶段迁移计划提供数据支撑。

**评估方法：**
- 统计每个 `_` 前缀目录下的 Markdown 文件数量
- 统计总行数（代码+内容）
- 统计子目录数量
- 根据文件数量划分复杂度等级

---

## 汇总统计

| 指标 | 数值 |
|------|------|
| 总领域数 | 62 |
| 简单领域 (1 文件) | 21 |
| 中等领域 (2-10 文件) | 33 |
| 复杂领域 (10+ 文件) | 7 |
| 空领域 (0 文件) | 1 |
| 总文件数 | 322 |
| 平均每领域文件数 | 5.2 |

---

## 简单领域 (1 文件)

**定义：** 仅包含 1 个 Markdown 文件的领域

**分配批次：** Phases 2-5 (每批次 4-5 个领域)

| 领域 | 文件数 | 行数 | 阶段 | 批次 | 备注 |
|------|--------|------|------|------|------|
| _apps | 1 | 25 | 2 | Simple 1 | VPN 应用 |
| _blogs | 1 | 117 | 2 | Simple 1 | 博客相关 |
| _cli | 1 | 50 | 2 | Simple 1 | CLI 工具 |
| _communication | 1 | 12 | 2 | Simple 1 | 沟通技巧 |
| _company | 1 | 10 | 2 | Simple 1 | 公司注册 |
| _game | 1 | 48 | 3 | Simple 2 | 游戏行业 |
| _games | 1 | 43 | 3 | Simple 2 | 逃离塔克夫 |
| _go | 1 | 30 | 3 | Simple 2 | Go 语言 |
| _manage | 1 | 50 | 3 | Simple 2 | 项目管理 |
| _markdown | 1 | 28 | 4 | Simple 3 | Markdown |
| _medicine | 1 | 24 | 4 | Simple 3 | 医疗知识 |
| _oop | 1 | 62 | 4 | Simple 3 | 面向对象 |
| _php | 1 | 12 | 4 | Simple 3 | PHP 语言 |
| _react-native | 1 | 9 | 5 | Simple 4 | React Native |
| _refactor | 1 | 17 | 5 | Simple 4 | 重构 |
| _regex | 1 | 121 | 5 | Simple 4 | 正则表达式 |
| _seo | 1 | 59 | 5 | Simple 4 | SEO |
| _web-pages | 1 | 26 | 5 | Simple 4 | Web 页面 |
| _windows | 1 | 136 | 5 | Simple 4 | Windows |
| _web-app | 1 | 10 | 5 | Simple 4 | Web 应用 |
| _photography | 1 | 27 | 5 | Simple 4 | 摄影 |

**小计：** 21 个领域，21 个文件

---

## 中等领域 (2-10 文件)

**定义：** 包含 2-10 个 Markdown 文件的领域

**分配批次：** Phases 6-10 (每批次 4 个领域)

| 领域 | 文件数 | 行数 | 子目录 | 阶段 | 批次 | 备注 |
|------|--------|------|--------|------|------|------|
| _architecture | 3 | 1,244 | 2 | 6 | Medium 1 | 架构设计 |
| _biology | 3 | 99 | 0 | 6 | Medium 1 | 生物/注意力 |
| _blog | 2 | 169 | 0 | 6 | Medium 1 | 博客 |
| _business | 3 | 336 | 0 | 6 | Medium 1 | 商业分析 |
| _cloud-native | 6 | 356 | 2 | 7 | Medium 2 | 云原生 |
| _computer | 7 | 459 | 2 | 7 | Medium 2 | 计算机基础 |
| _cpp | 4 | 467 | 0 | 7 | Medium 2 | C++ |
| _cross-platform | 3 | 949 | 0 | 7 | Medium 2 | 跨端开发 |
| _docs | 4 | 73 | 2 | 8 | Medium 3 | 文档管理 |
| _hardware | 2 | 64 | 0 | 8 | Medium 3 | 硬件 |
| _hire | 3 | 1,097 | 3 | 8 | Medium 3 | 招聘/面试 |
| _ide | 3 | 297 | 1 | 8 | Medium 3 | IDE |
| _industry | 3 | 353 | 0 | 9 | Medium 4 | 行业分析 |
| _interview | 3 | 766 | 1 | 9 | Medium 4 | 面试技巧 |
| _linux | 2 | 243 | 1 | 9 | Medium 4 | Linux |
| _machine-learning | 3 | 171 | 1 | 9 | Medium 4 | 机器学习 |
| _management | 5 | 753 | 2 | 10 | Medium 5 | 管理 |
| _policy | 2 | 139 | 0 | 10 | Medium 5 | 政策 |
| _product | 7 | 1,275 | 1 | 10 | Medium 5 | 产品 |
| _products | 4 | 397 | 0 | 10 | Medium 5 | 产品案例 |
| _programming | 8 | 630 | 1 | 10 | Medium 5 | 编程 |
| _render | 2 | 90 | 0 | 10 | Medium 5 | 渲染 |
| _science | 7 | 288 | 0 | 10 | Medium 5 | 科学 |
| _server | 2 | 618 | 2 | 10 | Medium 5 | 服务端 |
| _software | 5 | 306 | 0 | 10 | Medium 5 | 软件工程 |
| _source-code | 2 | 21 | 2 | 10 | Medium 5 | 源码阅读 |
| _system | 3 | 190 | 1 | 10 | Medium 5 | 操作系统 |
| _test | 5 | 191 | 3 | 10 | Medium 5 | 测试 |
| _threads | 3 | 171 | 0 | 10 | Medium 5 | 日常记录 |
| _typescript | 2 | 824 | 0 | 10 | Medium 5 | TypeScript |
| _ui | 7 | 490 | 1 | 10 | Medium 5 | UI 设计 |
| _visual | 3 | 175 | 1 | 10 | Medium 5 | 可视化 |
| _web | 10 | 941 | 2 | 10 | Medium 5 | Web 技术 |

**小计：** 33 个领域，154 个文件

---

## 复杂领域 (10+ 文件)

**定义：** 包含超过 10 个 Markdown 文件的领域

**分配批次：** Phases 11-17 (每个领域单独一个批次)

| 领域 | 文件数 | 行数 | 子目录 | 阶段 | 备注 |
|------|--------|------|--------|------|------|
| _ai | 70 | 11,316 | 18 | 17 | AI 工具与概念，需要子领域拆分 |
| _frontend | 29 | 3,085 | 10 | 16 | 前端技术，已有良好结构 |
| _person | 19 | 687 | 0 | 15 | 人物传记，需要特殊组织 |
| _fe-framework | 14 | 1,617 | 9 | 13 | 前端框架 |
| _workflow | 14 | 1,100 | 3 | 14 | 工程化工作流 |
| _database | 12 | 749 | 7 | 11 | 数据库 |
| _devops | 12 | 1,270 | 1 | 12 | DevOps |

**小计：** 7 个领域，170 个文件

---

## 空领域

| 领域 | 文件数 | 状态 | 处理建议 |
|------|--------|------|----------|
| _cross-domain | 0 | 空目录 | 待填充或删除 |

---

## 结构特征分析

### 复杂领域详细分析

#### _ai (70 文件, 11,316 行)

**当前结构：**
```
_ai/
├── 0.index.md
├── ai.md (129 lines, AIGC 主文件)
├── agents/ (5 files)
│   ├── agents.md
│   ├── a2a.md
│   ├── a2ui.md
│   ├── toxic-flow-analysis.md
│   └── goose/
│       ├── goose-brief.md (462 lines)
│       ├── goose-brief.cn.md (315 lines)
│       └── prompts.md (4505 lines - 最大文件)
├── architectures.md (108 lines)
├── benchmark/ (3 files)
├── data-processing.md
├── distributed.md
├── emerging.md
├── framework/ (1 file)
├── image/ (2 files)
├── inference.md
├── llm/ (7 files)
│   ├── llm.md
│   ├── embeddings.md
│   ├── slm.md
│   ├── structured-output.md
│   ├── llm-as-a-judge.md (257 lines)
│   └── datadog/
├── mcp/ (1 file)
│   └── native-api-to-mcp.md (211 lines)
├── prompt/ (2 files)
│   ├── context-engineering.md (196 lines)
│   └── team-based-instructions.md
├── rag/
├── recommendation/
├── safety/
├── skills/ (1 file)
│   └── create-a-skill.md (1405 lines - 第二大文件)
├── tools/ (3 files)
│   ├── copilot.md
│   └── browser-automation.md (152 lines)
├── training/ (2 files)
│   └── topology-aware-scheduling.md (201 lines)
├── vibe/ (2 files)
│   ├── complacency.md (217 lines)
│   └── agents-md.md
└── workflow/ (2 files)
    ├── sdd.md (137 lines)
    └── agentic-engineering.md
```

**文件大小分布：**
| 大小范围 | 文件数 | 占比 |
|----------|--------|------|
| >1000 lines | 2 | 3% |
| 200-1000 lines | 8 | 11% |
| 100-200 lines | 10 | 14% |
| <100 lines | 50 | 72% |

**特征：**
- 18 个子目录，结构最复杂
- 2 个超大文件（prompts.md 4505 行, create-a-skill.md 1405 行）
- 内容涵盖：Agents、LLM、Tools、Training、Workflow 等多个维度
- 大部分文件（72%）小于 100 行

**潜在子领域分组：**
1. **agents/** - AI Agents 相关
2. **tools/** - AI 工具使用（Copilot 等）
3. **llm/** - 大语言模型技术
4. **prompt/** - 提示工程
5. **training/** - 模型训练
6. **workflow/** - AI 工作流
7. **skills/** - AI 技能/能力
8. **vibe/** - Vibe Coding 相关

**迁移复杂度：** 高
**关键决策：**
- 如何划分子领域边界
- prompts.md 是否需要拆分
- skills/ 和 tools/ 是否合并

---

#### _frontend (29 文件, 3,085 行)

**当前结构：**
```
_frontend/
├── css/                    # 9 files, 子领域结构完善
│   ├── 0.index.md
│   ├── 0.css-mind-map.md (809 lines - 最大文件)
│   ├── new-features-2025.md (471 lines)
│   ├── snapshot-2024.md (89 lines)
│   ├── bem.md (71 lines)
│   ├── layers.md (23 lines)
│   ├── sass.md (21 lines)
│   ├── inverted-triangle-css.md
│   ├── sprite-animation.md
│   └── tailwind/
│       └── index.md
├── html/                   # 4 files
│   ├── 0.index.md
│   ├── 0.html-mind-map.md (97 lines)
│   ├── emmet.md
│   └── href-value-possibilities.md
├── javascript/             # 4 files
│   ├── 0.javascript-mind-map.md (502 lines)
│   ├── promise.md (185 lines)
│   ├── symbol.md (106 lines)
│   └── task-slice.md
├── w3c/                    # 8 files
│   ├── 0.index.md
│   ├── css/
│   │   ├── color-module.md
│   │   ├── conditional-rule-module.md
│   │   └── scrollbars-styling-module.md
│   ├── es/
│   │   ├── proposal-defer-import-eval.md
│   │   └── proposal-regexp-v-flag.md
│   ├── reports/
│   │   └── ai-web-impact.md
│   └── screen/
│       └── multi-screen-window-lacement.md
├── javascript.md           # 根级文件
└── text-highlight.md (95 lines)
```

**文件大小分布：**
| 大小范围 | 文件数 | 占比 |
|----------|--------|------|
| 400-1000 lines | 3 | 10% |
| 100-400 lines | 4 | 14% |
| <100 lines | 22 | 76% |

**特征：**
- 10 个子目录，已有良好的子领域组织
- CSS 子领域结构最为完善（9 文件，包含 tailwind/ 嵌套）
- W3C 标准单独组织
- 大部分内容已按技术栈分类（css/, javascript/, html/）

**已有子领域：**
1. **css/** - CSS 技术（最完善）
2. **html/** - HTML 技术
3. **javascript/** - JavaScript 技术
4. **w3c/** - W3C 标准规范
5. **tailwind/** - Tailwind CSS（嵌套在 css/ 下）

**迁移复杂度：** 低
**关键决策：**
- 保持现有子领域结构
- 0.css-mind-map.md 重命名为 css-mind-map.md（去掉数字前缀）
- 优化各主题文件的标题层级

---

#### _person (19 文件, 687 行)

**当前结构：**
```
_person/
├── 0.index.md (87 lines)
├── armstrong.md (210 lines - 最大文件)
├── andrej-karpathy.md (36 lines)
├── antonio-egas-moniz.md (20 lines)
├── aristotle.md (22 lines)
├── beltracchi.md (16 lines)
├── claudius-ptolemaeus.md (15 lines)
├── eratosthenes.md (17 lines)
├── evan-schwartz.md (23 lines)
├── gary-marcus.md (38 lines)
├── henry-molaison.md (20 lines)
├── hippocrates.md (20 lines)
├── jiang-zi-ya.md (20 lines)
├── jim-jones.md (12 lines)
├── john-michell.md (10 lines)
├── mikolaj-kopernik.md (13 lines)
├── peter-steinberger.md (35 lines)
├── richard-stallman.md (40 lines)
└── shunyu-yao.md (33 lines)
```

**文件大小分布：**
| 大小范围 | 文件数 | 占比 |
|----------|--------|------|
| >100 lines | 1 | 5% |
| 30-100 lines | 5 | 26% |
| <30 lines | 13 | 69% |

**人物列表（按领域分类建议）：**
| 领域 | 人物 |
|------|------|
| **科技/AI** | andrej-karpathy, gary-marcus, shunyu-yao, peter-steinberger, evan-schwartz |
| **计算机/开源** | richard-stallman, armstrong |
| **科学/医学** | antonio-egas-moniz, henry-molaison, hippocrates |
| **哲学/历史** | aristotle, jiang-zi-ya, claudius-ptolemaeus |
| **艺术/其他** | beltracchi, jim-jones |
| **天文/地理** | eratosthenes, john-michell, mikolaj-kopernik |

**特征：**
- 无子目录，所有文件平铺
- 18 个人物传记 + 1 个索引
- 大部分文件（69%）小于 30 行，内容较简短
- armstrong.md 最大（210 行），可能是尼尔·阿姆斯特朗

**潜在子领域分组：**
1. **tech/** - 科技领域人物
2. **science/** - 科学/医学领域人物
3. **philosophy/** - 哲学/历史领域人物
4. **others/** - 其他领域人物

**替代方案（按时代）：**
1. **ancient/** - 古代（亚里士多德、托勒密等）
2. **modern/** - 近现代
3. **contemporary/** - 当代

**迁移复杂度：** 中
**关键决策：**
- 人物分组方式（按领域 vs 按时代）
- 简短传记是否需要合并
- 是否保持平铺结构（19 文件不算太多）

---

#### _fe-framework (14 文件, 1,617 行)

**当前结构：**
```
_fe-framework/
├── 0.index.md
├── fe-framework.md
├── react/
├── vue/
├── angular/
└── ...
```

**特征：**
- 9 个子目录，按框架组织
- 每个框架有自己的目录
- 结构相对清晰

**迁移复杂度：** 低
**关键决策：** 保持现有框架分类

---

#### _workflow (14 文件, 1,100 行)

**当前结构：**
```
_workflow/
├── 0.index.md
├── fe-engineering.md
├── monorepo/
├── package-manager/
├── packer/
└── ...
```

**特征：**
- 3 个子目录，部分按工具类型组织
- 前端工程化相关内容
- 需要整理为一致的子领域结构

**迁移复杂度：** 中
**关键决策：** 子领域命名和边界

---

#### _database (12 文件, 749 行)

**当前结构：**
```
_database/
├── 0.index.md
├── redis.md
├── sql/
├── datalake/
├── graphql.md
└── ...
```

**特征：**
- 7 个子目录
- 包含多种数据库类型和查询语言
- 需要按数据库类型组织

**迁移复杂度：** 中
**关键决策：** SQL vs NoSQL 分类

---

#### _devops (12 文件, 1,270 行)

**当前结构：**
```
_devops/
├── 0.index.md
├── devops.md
├── version-control/
└── ...
```

**特征：**
- 1 个子目录
- DevOps 实践和工具
- 内容相对集中

**迁移复杂度：** 低
**关键决策：** CI/CD 是否独立子领域

---

## 按领域迁移笔记

### 简单领域迁移方法

所有简单领域（1 文件）采用相同迁移模式：

1. **检查文件内容类型**
   - 资源链接列表（如 _go/go.md）→ 保持为领域入口
   - 内容文章 → 提升为主题文件

2. **标准化文件命名**
   - 重命名为 `{domain}.md`（去掉 `_` 前缀）
   - 或保持原文件名，添加为子领域

3. **更新 frontmatter**
   - 添加 title、description
   - 保持原有内容

### 中等领域迁移方法

1. **分析现有文件关系**
   - 识别自然分组
   - 判断是否需要子领域

2. **创建子领域（如需要）**
   - 2-5 个文件：可能不需要子领域
   - 6-10 个文件：考虑按主题分组

3. **文件重组**
   - 将相关文件移入子领域目录
   - 创建 0.index.md 作为子领域入口

### 复杂领域迁移策略

| 领域 | 策略 | 关键动作 | 预计工作量 |
|------|------|----------|------------|
| _ai | 重组 | 按现有子目录重组为子领域，优化超大文件 | 高（3-5 天） |
| _frontend | 优化 | 保持结构，优化标题层级，重命名数字前缀文件 | 中（2-3 天） |
| _person | 决策 | 确定分组方案，可能保持平铺 | 低（1-2 天） |
| _fe-framework | 保持 | 框架分类清晰，保持现有结构 | 低（1-2 天） |
| _workflow | 重组 | 统一子领域命名，明确边界 | 中（2-3 天） |
| _database | 重组 | 按数据库类型重组 | 中（2-3 天） |
| _devops | 优化 | 保持结构，添加缺失子领域 | 低（1-2 天） |

### 特殊处理标记

| 领域 | 特殊标记 | 处理方式 |
|------|----------|----------|
| _ai | 超大文件 | prompts.md (4505 行) 需要评估是否拆分 |
| _frontend | 数字前缀 | 0.css-mind-map.md 等需要重命名 |
| _cross-domain | 空目录 | 待填充内容或删除 |
| _person | 内容简短 | 69% 文件小于 30 行，考虑合并或保持 |

---

## 风险评估

| 领域 | 风险等级 | 原因 | 缓解措施 |
|------|----------|------|----------|
| _ai | 高 | 70 文件，需要子领域拆分 | 提前分析内容，设计子领域结构 |
| _person | 中 | 传记内容组织方式不确定 | 研究人物分类方案 |
| _frontend | 低 | 已有良好结构 | 保持现有组织 |
| _fe-framework | 低 | 框架分类清晰 | 保持现有组织 |
| _workflow | 中 | 工程化概念边界模糊 | 明确子领域定义 |
| _database | 中 | 多种数据库类型 | 按类型分类 |
| _devops | 低 | 内容集中 | 标准迁移流程 |

---

## Taxonomy 应用说明

参考 [taxonomy-criteria.md](./taxonomy-criteria.md) 的四层结构：

### 需要子领域决策的领域

1. **_ai**: 需要拆分为 tools/, concepts/, applications/ 等子领域
2. **_person**: 需要决定人物分组方式（领域/时代）
3. **_workflow**: 需要统一子领域命名

### 已有良好结构的领域

1. **_frontend/css/**: 保持现有结构
2. **_fe-framework/**: 框架目录结构良好

### 需要主题级别决策的领域

1. **_business**: business-analysis.md (302 行) 保持独立主题
2. **_hire**: 多文件可能需要重组

---

## 与 ROADMAP.md 的差异

| 项目 | ROADMAP.md | 实际评估 | 差异 |
|------|------------|----------|------|
| 总领域数 | 46 | 62 | +16 |
| 简单领域 | 19 | 21 | +2 |
| 中等领域 | 19 | 33 | +14 |
| 复杂领域 | 7 | 7 | 0 |
| 总文件数 | 325 | 322 | -3 |

**说明：**
- ROADMAP.md 中的 46 可能是主要领域的估算
- 实际有 62 个 `_` 前缀目录（包含一些未在导航中列出的）
- 空领域 _cross-domain 需要处理
- 文件总数基本一致（322 vs 325）

---

## 批次汇总

| 批次 | 阶段 | 领域数 | 文件数 | 风险等级 |
|------|------|--------|--------|----------|
| Simple 1 | 2 | 5 | 5 | 低 |
| Simple 2 | 3 | 5 | 5 | 低 |
| Simple 3 | 4 | 4 | 4 | 低 |
| Simple 4 | 5 | 7 | 7 | 低 |
| Medium 1 | 6 | 4 | 14 | 低 |
| Medium 2 | 7 | 4 | 20 | 低 |
| Medium 3 | 8 | 4 | 12 | 低 |
| Medium 4 | 9 | 4 | 11 | 低 |
| Medium 5 | 10 | 17 | 97 | 中 |
| Complex: Database | 11 | 1 | 12 | 中 |
| Complex: DevOps | 12 | 1 | 12 | 低 |
| Complex: FE Framework | 13 | 1 | 14 | 低 |
| Complex: Workflow | 14 | 1 | 14 | 中 |
| Complex: Person | 15 | 1 | 19 | 中 |
| Complex: Frontend | 16 | 1 | 29 | 低 |
| Complex: AI | 17 | 1 | 70 | 高 |
| Validation | 18 | - | - | - |

---

## 阶段准备度检查清单

### 简单批次 (Phases 2-5)

**目标：** 完成 21 个简单领域的迁移，建立标准迁移模式

- [x] 复杂度评估完成
- [ ] taxonomy-criteria.md 最终确认
- [ ] link-audit.md 完成
- [ ] 从简单领域选择模式示例
- [ ] 链接更新流程在 1 个领域测试
- [ ] 验证简单领域迁移脚本
- [ ] 建立领域入口文件模板

**Phase 2 就绪条件：**
- [ ] 选择 5 个简单领域作为第一批（_apps, _blogs, _cli, _communication, _company）
- [ ] 确认每个领域的内容类型
- [ ] 准备迁移脚本和检查清单

### 中等批次 (Phases 6-10)

**目标：** 完成 33 个中等领域的迁移，验证子领域决策流程

- [ ] 简单批次模式验证
- [ ] 子领域决策标准测试
- [ ] 文件转目录阈值确认
- [ ] 中等领域分组策略确定
- [ ] 子领域命名规范确认

**Phase 6 就绪条件：**
- [ ] 分析 _architecture, _biology, _blog, _business 的文件关系
- [ ] 确定是否需要创建子领域
- [ ] 准备子领域入口模板

### 复杂领域 (Phases 11-17)

**目标：** 完成 7 个复杂领域的迁移，处理特殊结构

- [ ] 中等批次模式稳定
- [ ] 领域内容分析完成
- [ ] 子领域结构设计
- [ ] 超大文件处理方案
- [ ] 复杂领域迁移手册

**Phase 11 (_database) 就绪条件：**
- [ ] 完成数据库类型分类方案
- [ ] 确定 SQL vs NoSQL 子领域边界
- [ ] 准备重组脚本

**Phase 17 (_ai) 就绪条件：**
- [ ] 完成 18 个子目录的内容分析
- [ ] 确定子领域合并方案
- [ ] 超大文件拆分决策
- [ ] 准备详细迁移计划

---

## 领域准备度状态

| 领域 | 复杂度 | 阶段 | 文件数 | 就绪 | 阻塞项 |
|------|--------|------|--------|------|--------|
| _apps | 简单 | 2 | 1 | 是 | 无 |
| _blogs | 简单 | 2 | 1 | 是 | 无 |
| _cli | 简单 | 2 | 1 | 是 | 无 |
| _communication | 简单 | 2 | 1 | 是 | 无 |
| _company | 简单 | 2 | 1 | 是 | 无 |
| _game | 简单 | 3 | 1 | 是 | 无 |
| _games | 简单 | 3 | 1 | 是 | 无 |
| _go | 简单 | 3 | 1 | 是 | 无 |
| _manage | 简单 | 3 | 1 | 是 | 无 |
| _markdown | 简单 | 4 | 1 | 是 | 无 |
| _medicine | 简单 | 4 | 1 | 是 | 无 |
| _oop | 简单 | 4 | 1 | 是 | 无 |
| _php | 简单 | 4 | 1 | 是 | 无 |
| _react-native | 简单 | 5 | 1 | 是 | 无 |
| _refactor | 简单 | 5 | 1 | 是 | 无 |
| _regex | 简单 | 5 | 1 | 是 | 无 |
| _seo | 简单 | 5 | 1 | 是 | 无 |
| _web-pages | 简单 | 5 | 1 | 是 | 无 |
| _windows | 简单 | 5 | 1 | 是 | 无 |
| _web-app | 简单 | 5 | 1 | 是 | 无 |
| _photography | 简单 | 5 | 1 | 是 | 无 |
| _architecture | 中等 | 6 | 3 | 是 | 无 |
| _biology | 中等 | 6 | 3 | 是 | 无 |
| _blog | 中等 | 6 | 2 | 是 | 无 |
| _business | 中等 | 6 | 3 | 是 | 无 |
| _cloud-native | 中等 | 7 | 6 | 是 | 无 |
| _computer | 中等 | 7 | 7 | 是 | 无 |
| _cpp | 中等 | 7 | 4 | 是 | 无 |
| _cross-platform | 中等 | 7 | 3 | 是 | 无 |
| _docs | 中等 | 8 | 4 | 是 | 无 |
| _hardware | 中等 | 8 | 2 | 是 | 无 |
| _hire | 中等 | 8 | 3 | 是 | 无 |
| _ide | 中等 | 8 | 3 | 是 | 无 |
| _industry | 中等 | 9 | 3 | 是 | 无 |
| _interview | 中等 | 9 | 3 | 是 | 无 |
| _linux | 中等 | 9 | 2 | 是 | 无 |
| _machine-learning | 中等 | 9 | 3 | 是 | 无 |
| _management | 中等 | 10 | 5 | 是 | 无 |
| _policy | 中等 | 10 | 2 | 是 | 无 |
| _product | 中等 | 10 | 7 | 是 | 无 |
| _products | 中等 | 10 | 4 | 是 | 无 |
| _programming | 中等 | 10 | 8 | 是 | 无 |
| _render | 中等 | 10 | 2 | 是 | 无 |
| _science | 中等 | 10 | 7 | 是 | 无 |
| _server | 中等 | 10 | 2 | 是 | 无 |
| _software | 中等 | 10 | 5 | 是 | 无 |
| _source-code | 中等 | 10 | 2 | 是 | 无 |
| _system | 中等 | 10 | 3 | 是 | 无 |
| _test | 中等 | 10 | 5 | 是 | 无 |
| _threads | 中等 | 10 | 3 | 是 | 无 |
| _typescript | 中等 | 10 | 2 | 是 | 无 |
| _ui | 中等 | 10 | 7 | 是 | 无 |
| _visual | 中等 | 10 | 3 | 是 | 无 |
| _web | 中等 | 10 | 10 | 是 | 无 |
| _database | 复杂 | 11 | 12 | 否 | 子领域设计待完成 |
| _devops | 复杂 | 12 | 12 | 否 | 子领域设计待完成 |
| _fe-framework | 复杂 | 13 | 14 | 否 | 子领域设计待完成 |
| _workflow | 复杂 | 14 | 14 | 否 | 子领域设计待完成 |
| _person | 复杂 | 15 | 19 | 否 | 人物分类方案待确定 |
| _frontend | 复杂 | 16 | 29 | 否 | 子领域优化待完成 |
| _ai | 复杂 | 17 | 70 | 否 | 子领域拆分方案待设计 |

---

## 迁移序列依赖

### 存在交叉链接的领域

需要分析以下领域之间的链接关系：

| 领域 A | 领域 B | 关系类型 | 建议处理 |
|--------|--------|----------|----------|
| _frontend | _fe-framework | 技术-框架 | _frontend 先迁移，_fe-framework 参考其结构 |
| _workflow | _devops | 工程化-运维 | 可并行，注意统一术语 |
| _web | _cross-platform | Web-跨端 | _web 先迁移，为跨端提供基础 |
| _product | _business | 产品-商业 | 可并行，注意链接更新 |
| _ai | _machine-learning | AI-ML | _machine-learning 先迁移（简单），_ai 参考 |
| _programming | _software | 编程-软件工程 | 可并行 |
| _server | _cloud-native | 服务端-云原生 | _server 先迁移 |
| _typescript | _frontend | 语言-前端 | 可并行 |

### 关键路径分析

**关键路径（必须按顺序）：**
```
_simple_batch_1 → _simple_batch_2 → ... → _complex_ai
```

**可并行路径：**
1. **前端技术线：** _frontend, _fe-framework, _typescript, _ui
2. **工程线：** _workflow, _devops, _programming, _software
3. **基础设施线：** _server, _cloud-native, _database, _system
4. **业务线：** _product, _business, _industry, _management

### 建议迁移顺序

**同批次内可并行：**
- 简单批次内领域相互独立（21 个领域可任意顺序）
- 中等批次内领域相互独立（33 个领域可任意顺序）

**跨批次依赖：**
- Phase 6 (_architecture) 可在 Phase 16 (_frontend) 之前完成
- Phase 11-17 按复杂度递增顺序执行

**优先迁移领域（建立模式）：**
1. **_go** - 最简单，1 文件，30 行
2. **_markdown** - 1 文件，标准格式
3. **_regex** - 1 文件，121 行，有内容
4. **_frontend/css** - 已有良好结构，作为子领域示例

**延后迁移领域（依赖其他）：**
1. **_ai** - 最后迁移（Phase 17），依赖所有其他模式稳定
2. **_cross-domain** - 待填充内容后再决定

---

## 附录：文件命名规范验证

### 符合规范的领域

所有领域目录均使用 `_` 前缀 + 小写短横线命名。

### 需要关注的文件

| 领域 | 文件 | 问题 | 建议 |
|------|------|------|------|
| _frontend | 0.css-mind-map.md | 以数字开头 | 重命名为 css-mind-map.md |
| _frontend/css | 0.index.md | 以数字开头 | 这是入口文件规范，保持 |

---

*本文档为 Maps 知识库重构项目提供复杂度评估数据，所有 Phase 2-18 的重构工作应参考此文档的评估结果。*
