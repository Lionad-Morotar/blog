---
title: CodeTour
description: 使用 VS Code CodeTour 插件为代码库制作交互式导览
---

#### CodeTour marker 需按宿主文件语法选择注释形式

CodeTour 的侵入式 marker 是注释形式，但不同文件格式对注释的语法要求不同。把 `//` 注释插进 TOML、
JSON 或严格 schema 的配置文件会直接破坏构建。

推荐按宿主文件选择 marker 语法：

| 文件类型 | marker 形式 |
|---|---|
| `.ts` / `.rs` / `.css` | `// flow-tour-marker: <id>` |
| `.toml` | `# flow-tour-marker: <id>` |
| `.json` | 使用伪 key `"// flow-tour-marker: <id>": ""`，或把 marker 迁移到相邻的 `.ts`/`.rs` 文件中 |
| 严格 schema 的 JSON | 避免在 JSON 内写 marker，迁移到代码文件 |

另外，保持"一步一 marker"：一个 tour step 只对应一个代码位置，避免 resolver 生成重复 step。

见：[CodeTour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour)
