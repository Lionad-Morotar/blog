---
title: Agents
description: 笔记系统智能体档案，记录知识管理规范与系统结构
---

## 笔记系统结构

本笔记系统采用三级分类结构，核心内容位于 `content/6.maps/` 目录，工具收集位于 `content/7.tools/`：

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

- **知识地图路径**：`content/6.maps/_<category>/<topic>.md`
- **工具收集路径**：`content/7.tools/<name>.md`
- **索引文件**：`index.md` 或 `0.index.md`
- **新增分类**：新建 `_<category>` 目录并在 Agents.md 中更新
- **新增工具**：直接归档到 `content/7.tools/`，并在 `7.tools/0.index.md` 中添加索引