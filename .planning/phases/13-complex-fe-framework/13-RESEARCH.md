# Phase 13: Complex - FE Framework 研究

## 领域结构分析

### 当前文件清单 (14 files)

```
_fe-framework/                          # 领域
├── fe-framework.md                     # 领域入口（需重构）
├── web-components.md                   # 子领域：组件方案
├── assets/
│   └── iconify.md                      # 主题：图标系统
├── micro-fe/
│   └── index.md                        # 子领域：微前端
├── motion/
│   ├── blockies-animation.md           # 主题：动画
│   └── lottie.md                       # 主题：动画
├── nuxt/
│   ├── nuxt.md                         # 子领域入口
│   └── module/
│       └── nuxt-security.md            # 主题：安全模块
├── schema/
│   └── zod.md                          # 主题：Schema验证
├── types/
│   └── utility-types.md                # 主题：类型工具
└── ui/
    ├── react.md                        # 子领域：React
    ├── angular.md                      # 子领域：Angular
    └── vue/
        ├── vue.md                      # 子领域入口？
        └── reactive.md                 # 主题：响应式
```

## 四层认知结构映射

### 领域 (Domain)
- **前端框架** (fe-framework) - 前端开发各阶段的工具集合

### 子领域 (Subdomain) - 6个
1. **UI 框架** (ui/) - Vue, React, Angular 等应用框架
2. **元框架** (meta-framework/) - Nuxt 等全栈框架
3. **组件方案** (component-solutions/) - Web Components, 微前端
4. **动画与交互** (motion/) - Lottie, Blockies 等
5. **类型系统** (type-system/) - TypeScript Utility Types, Zod Schema
6. **资源管理** (assets/) - Iconify 等

### 主题 (Topic) - 各子领域下的具体技术
- UI 框架: Vue, React, Angular
- 元框架: Nuxt (及模块)
- 组件方案: Web Components, Micro Frontend
- 动画: Blockies Animation, Lottie
- 类型系统: Utility Types, Zod
- 资源: Iconify

### 知识点 (Knowledge Point) - 四级标题
- 现有 fe-framework.md 中的观点、评论、最佳实践

## 重构策略

### 1. 子领域入口标准化
每个子领域需要有自己的入口文件，使用 `index.md` 或 `{subdomain}.md` 模式。

### 2. 目录结构规范化

```
_fe-framework/
├── fe-framework.md                     # 领域入口（更新导航）
├── ui-frameworks/                      # 子领域：UI框架
│   ├── index.md                        # 子领域入口
│   ├── vue.md                          # Vue 主题
│   ├── react.md                        # React 主题
│   └── angular.md                      # Angular 主题
├── meta-frameworks/                    # 子领域：元框架
│   ├── index.md
│   ├── nuxt.md                         # Nuxt 主题
│   └── nuxt-security.md                # Nuxt 安全模块
├── component-solutions/                # 子领域：组件方案
│   ├── index.md
│   ├── web-components.md
│   └── micro-frontend.md               # 重命名 micro-fe/index.md
├── motion/                             # 子领域：动画
│   ├── index.md
│   ├── blockies-animation.md
│   └── lottie.md
├── type-system/                        # 子领域：类型系统
│   ├── index.md
│   ├── utility-types.md
│   └── zod.md
└── assets/                             # 子领域：资源
    ├── index.md
    └── iconify.md
```

### 3. 内容迁移映射

| 原路径 | 新路径 | 操作 |
|--------|--------|------|
| `fe-framework.md` | `fe-framework.md` | 更新为纯导航入口 |
| `web-components.md` | `component-solutions/web-components.md` | 移动 |
| `micro-fe/index.md` | `component-solutions/micro-frontend.md` | 移动+重命名 |
| `ui/react.md` | `ui-frameworks/react.md` | 移动 |
| `ui/angular.md` | `ui-frameworks/angular.md` | 移动 |
| `ui/vue/vue.md` | `ui-frameworks/vue.md` | 移动+合并 |
| `ui/vue/reactive.md` | `ui-frameworks/vue-reactive.md` | 移动 |
| `motion/*` | `motion/*` | 创建入口文件 |
| `nuxt/nuxt.md` | `meta-frameworks/nuxt.md` | 移动 |
| `nuxt/module/nuxt-security.md` | `meta-frameworks/nuxt-security.md` | 扁平化移动 |
| `schema/zod.md` | `type-system/zod.md` | 移动 |
| `types/utility-types.md` | `type-system/utility-types.md` | 移动 |
| `assets/iconify.md` | `assets/iconify.md` | 创建入口文件 |

### 4. 链接更新清单
- `fe-framework.md` 中的内部链接需要更新
- `0.index.md` 中的领域导航链接
- 检查其他领域引用 `_fe-framework` 的链接

### 5. 四级标题知识点提取
从 `fe-framework.md` 中提取以下内容作为知识点：
- Sharing State with Islands Architecture
- 模板语言为何终将变成糟糕的编程语言？
- 编译型框架的崛起是否推翻了模板语言批评？

## 执行计划概览

基于上述分析，建议分 4 个 Plan 执行：

1. **P01**: 重构 UI 框架子领域 (ui → ui-frameworks)
2. **P02**: 重构组件方案和元框架子领域 (micro-fe, web-components, nuxt)
3. **P03**: 重构动画、类型系统、资源管理子领域 (motion, schema+types, assets)
4. **P04**: 更新领域入口和跨域链接 (fe-framework.md, 0.index.md)
