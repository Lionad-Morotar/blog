---
title: Agents
description: 笔记系统智能体档案，记录知识管理规范与系统结构
---

## 四层认知结构

本笔记系统采用 **Domain → Subdomain → Topic → Knowledge Point** 的四层认知结构：

| 层级 | 定义 | 物理形式 | 判断标准 |
|------|------|----------|----------|
| **领域 (Domain)** | 最高层级的知识边界 | `_domain/` 目录 | 存在于 `0.index.md` 导航中，目录以 `_` 开头 |
| **子领域 (Subdomain)** | 领域内的专业分支 | `subdomain/` 子目录或文件 | 构成独立学习单元，有明确知识边界 |
| **主题 (Topic)** | 具体的技术点或概念 | `.md` 文件 | 文件内使用 H1 (`#`) 作为标题 |
| **知识点 (Knowledge Point)** | 原子化的思考性内容 | `####` 四级标题 | 观点、案例、洞见，保持阅读连续性 |

**决策原则：**
- 子领域统一使用目录形式，不按内容量区分
- 主题超过 150 行或有扩展潜力时拆分为独立文件
- 知识点不得拆分为独立文件，保持为四级标题

## 笔记系统结构

核心内容位于 `content/6.maps/` 目录，工具收集位于 `content/7.tools/`：

```
content/
├── 6.maps/                 # 知识地图（主要笔记目录）
│   ├── _ai/               # AI 技术与应用
│   ├── _architecture/     # 架构设计
│   ├── _biology/          # 生物学与生命科学
│   ├── _business/         # 商业分析
│   ├── _cloud-native/     # 云原生技术
│   ├── _communication/    # 沟通协作
│   ├── _computer/         # 计算机基础
│   ├── _cross-platform/   # 跨端开发
│   ├── _database/         # 数据库
│   ├── _devops/           # DevOps
│   ├── _fe-framework/     # 前端框架
│   ├── _frontend/         # 前端技术
│   ├── _game/             # 游戏设计
│   ├── _games/            # 游戏体验
│   ├── _hardware/         # 硬件
│   ├── _hire/             # 招聘与面试
│   ├── _industry/         # 行业研究
│   ├── _interview/        # 面试技巧
│   ├── _linux/            # Linux 系统
│   ├── _management/       # 管理学
│   ├── _medicine/         # 医疗知识
│   ├── _person/           # 人物笔记
│   ├── _politics/         # 政治与政治经济学
│   ├── _product/          # 产品与运营
│   ├── _programming/      # 编程语言与范式
│   ├── _react-native/     # React Native
│   ├── _refactor/         # 重构
│   ├── _render/           # 渲染技术
│   ├── _science/          # 科学
│   ├── _server/           # 服务端
│   ├── _software/         # 软件工程
│   ├── _system/           # 操作系统
│   ├── _test/             # 测试
│   ├── _threads/          # 日常记录
│   ├── _ui/               # UI 设计
│   ├── _web/              # Web 技术
│   ├── _web-app/          # Web 应用
│   ├── _web-pages/        # 网页开发
│   ├── _workflow/         # 工作流
│   ├── _cpp/              # C++
│   ├── _go/               # Go
│   ├── _markdown/         # Markdown
│   ├── _php/              # PHP
│   ├── _regex/            # 正则表达式
│   ├── _typescript/       # TypeScript
│   └── Agents.md          # 本文件
│
├── 7.tools/               # 工具收集
│   └── *.md               # 各类工具链接与介绍
│
└── _books/                # 读书笔记
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

- **知识地图路径**：`content/6.maps/_<domain>/<subdomain>/<topic>.md`
- **工具收集路径**：`content/7.tools/<name>.md`
- **索引文件**：`index.md` 或 `0.index.md`
- **新增分类**：新建 `_<domain>` 目录并在 Agents.md 中更新
- **新增工具**：直接归档到 `content/7.tools/`，并在 `7.tools/0.index.md` 中添加索引

## 规划文档

详细的分类标准和重构规范：

- `.planning/taxonomy-criteria.md` - 四层认知结构判断标准
- `.planning/PROJECT.md` - Maps 知识库重构项目概述
- `.planning/codebase/STRUCTURE.md` - 项目结构文档

## 归档洞察

#### Skills 作为分销渠道的商业洞察

- **技能即分销渠道**：当 Skill 默认使用特定 API 或厂商时，该厂商就被选中，无需销售电话或定价页面
- **第三买方**：技能作者成为新的买方，他们决定 Agent 使用哪些工具
- **定价难题**：技能免费（纯文本），价值在于它路由到的服务
- **垂直领域的持久性**：水平技能（代码审查、调试）会快速商品化，但编码 FDA 提交流程等垂直技能需要领域知识
- **Freemium 的崩溃**：用户可以用 Prompt 快速构建 60% 需求的解决方案，免费层不再构成转化漏斗
- **最佳可用人类标准**：AI 不需要比最好的专家更好，只需要比用户能获得的帮助更好
- **护城河转移**：从"隐藏护城河"到"直接赠送护城河"，真正的价值是领域理解而非代码

见：[I know Kung Fu](https://www.sideband.pub/p/i-know-kung-fu)、
[The Ghost in the Funnel](https://worksonmymachine.ai/p/the-ghost-in-the-funnel)