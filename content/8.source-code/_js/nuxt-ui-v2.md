---
title: @nuxt/ui v2
---

## 项目结构

#### nuxt-ui 的项目结构是怎样的？

```text
src/
├── runtime/
│   ├── composables/            # 组件用到的钩子函数
│   ├── components/             # 组件源码目录，按照组件类型划分文件夹
│   │   ├── data/               # 组件类型分类文件夹，比如 data 就是和数据相关的组件
│   │   │   ├── table.vue/      # UTable 组件
│   │   │   ├── elements/       # 如 UAlert、UButton 等
│   │   │   │   ├── ...etc/
│   │   │   └── ... etc/
│   │   ├── plugins/            # 组件用到的 Nuxt 插件，如弹窗插件，弹窗需要在 app.vue 注入 div 元素
│   │   ├── utils/              # 工具函数
│   │   ├── types/              # 组件类型
│   │   │   ├── accordion.d.ts/ # 每个组件的类型单独定义
│   │   │   ├── avatar.d.ts/
│   │   │   └── ... etc/
│   │   ├── ui.config.ts/       # 统一管理所有组件的 UI 配置（默认层）
├── colors.ts/                  # 颜色相关工具函数
└── ... etc/                    # 其他
```
