---
title: Agents
description: 笔记系统智能体档案，记录知识管理规范与系统结构
---

## 笔记系统结构

本笔记系统采用三级分类结构，位于 `content/6.maps/` 目录下：

```
content/6.maps/
├── _ai/              # AI 技术与应用
├── _architecture/    # 架构设计
├── _computer/        # 计算机基础
├── _communication/   # 沟通协作
├── _database/        # 数据库
├── _devops/          # DevOps
├── _fe-framework/    # 前端框架
├── _frontend/        # 前端技术
├── _person/          # 人物笔记
├── _server/          # 服务端
├── _source-code/     # 源码阅读
├── _web/             # Web 技术
├── _web-app/         # Web 应用
├── _workflow/        # 工作流
└── Agents.md         # 本文件
```

## 文件格式规范

### Frontmatter 格式

```yaml
---
title: [标题]
description: [简介]
---
```

### 知识点格式

- 使用 `####` 四级标题作为知识点标题
- 内容简洁，保留关键信息
- 包含来源链接（简单常识性概念除外）

```markdown
#### [知识点标题]

[内容描述]

见：[链接标题](链接地址)
```

### 人物笔记格式

```yaml
---
title: [姓名]
description: [身份/职业]
---

#### 简介？

[简介内容]

#### 主要贡献/观点？

[要点]

见：[链接](URL)
```

## 智能体引用

本文件供 distill-and-archive 技能引用，用于指导知识点归档的目录选择和格式规范。

- **分类路径**：`content/6.maps/_<category>/<topic>.md`
- **索引文件**：`index.md` 或 `0.index.md`
- **新增分类**：新建 `_<category>` 目录并在 Agents.md 中更新