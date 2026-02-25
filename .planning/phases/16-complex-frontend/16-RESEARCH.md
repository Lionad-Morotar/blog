# Phase 16: Complex - Frontend 研究

## 领域结构分析

### 当前文件分布（29 个文件）

```
_frontend/
├── css/                          # 11 个文件
│   ├── 0.css-mind-map.md
│   ├── 0.index.md
│   ├── bem.md
│   ├── inverted-triangle-css.md
│   ├── layers.md
│   ├── new-features-2025.md
│   ├── sass.md
│   ├── snapshot-2024.md
│   ├── sprite-animation.md
│   └── tailwind/
│       └── index.md
├── html/                         # 4 个文件
│   ├── 0.html-mind-map.md
│   ├── 0.index.md
│   ├── emmet.md
│   └── href-value-possibilities.md
├── javascript/                   # 4 个文件
│   ├── 0.javascript-mind-map.md
│   ├── promise.md
│   ├── symbol.md
│   └── task-slice.md
├── w3c/                          # 9 个文件
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
│   ├── screen/
│   │   └── multi-screen-window-acement.md
│   └── security/
│       └── subresource-integrity.md
├── javascript.md                 # JS 子领域入口
└── text-highlight.md             # 独立文件
```

### 子领域识别

根据现有结构，可以识别出以下子领域：

1. **css/** - CSS 技术（11 文件）
   - 已有良好的内部结构（0.index.md, mind-map, 各类 CSS 技术）
   - 包含 tailwind/ 子目录

2. **html/** - HTML 技术（4 文件）
   - 有 0.index.md 和 mind-map
   - 内容相对简单

3. **javascript/** - JavaScript 技术（5 文件包含根目录入口）
   - 根目录有 javascript.md 作为入口
   - javascript/ 子目录包含具体技术文件

4. **w3c/** - W3C 标准与提案（9 文件）
   - 已有内部结构：css/, es/, reports/, screen/, security/
   - 这是标准/规范相关内容的集合

### 迁移策略

#### 模式选择

参考之前复杂领域的处理方式（_person, _workflow, _fe-framework）：

1. **保持现有子目录结构** - css/, html/, javascript/, w3c/ 已经是良好的子领域划分
2. **创建子领域入口文件** - 为每个子领域创建 {name}.md 入口文件
3. **更新 0.index.md** - 添加子领域导航
4. **创建领域入口** - 创建 frontend.md 作为 _frontend 的主入口

#### 具体方案

**子领域 1: CSS (`css/`)**
- 已有 0.index.md，但需要评估是否需要改为 css.md
- 11 个文件，包含技术文档和 tailwind 子目录
- 迁移：保持目录结构，创建 css.md 作为子领域入口

**子领域 2: HTML (`html/`)**
- 已有 0.index.md
- 4 个文件
- 迁移：保持目录结构，创建 html.md 作为子领域入口

**子领域 3: JavaScript (`javascript/` 和根目录)**
- 根目录已有 javascript.md 作为入口
- 4 个文件在子目录中
- 迁移：将 javascript/ 子目录内容保持，javascript.md 可能需要更新

**子领域 4: W3C 标准 (`w3c/`)**
- 已有 0.index.md
- 9 个文件，包含多个子目录
- 迁移：保持目录结构，可能需要创建 w3c.md 作为标准/提案的入口

#### 跨域链接考虑

需要检查是否有其他领域链接到 _frontend 的文件：
- _fe-framework 可能与 _frontend 有交叉链接
- 需要更新所有内部链接

### 批次划分建议

考虑到文件数量和复杂度：

**Plan 01**: CSS 子领域
- 创建 css.md 子领域入口
- 更新 css/0.index.md（如有必要）
- 迁移 tailwind/（如需要调整）

**Plan 02**: HTML 子领域
- 创建 html.md 子领域入口
- 更新 html/0.index.md

**Plan 03**: JavaScript 子领域
- 评估 javascript.md 是否需要迁移到子目录
- 创建/更新 javascript/ 子领域结构

**Plan 04**: W3C 子领域
- 创建 w3c.md 入口
- 整理 w3c/ 内部结构

**Plan 05**: 领域入口和交叉链接
- 创建 frontend.md 领域入口
- 更新根 0.index.md
- 修复跨域链接

### 与 _fe-framework 的关系

_fe-framework（Phase 13 已完成）与 _frontend 的关系：
- _fe-framework 关注前端框架（React, Vue, Angular 等）
- _frontend 关注基础技术（HTML, CSS, JS, W3C 标准）
- 两者之间可能有交叉引用，需要验证链接

## 技术决策

1. **保持子目录不变** - 现有结构已经是良好的子领域划分
2. **子领域入口模式** - 每个子领域创建 {subdomain}.md 文件
3. **original_path 记录** - 为所有迁移的文件添加 frontmatter
4. **0.index.md 保留** - 保留现有的 0.index.md 作为 A-Z 索引，添加子领域导航
