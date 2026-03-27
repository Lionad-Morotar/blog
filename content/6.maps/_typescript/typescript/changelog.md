---
title: TypeScript Changelog
description: TypeScript 版本变更记录与破坏性变更验证
---

## 版本历史

### TypeScript 6.0

**发布日期**: 2025年3月23日 (v6.0.2 稳定版)

**官方来源**:
- [Announcing TypeScript 6.0](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/) - Microsoft 官方发布说明
- [GitHub Releases](https://github.com/microsoft/TypeScript/releases/tag/v6.0.2) - TypeScript 6.0.2 稳定版

**版本定位**: TypeScript 6.x 是最后一个基于 JavaScript 实现的版本，作为过渡到 TypeScript 7.0（基于 Go 的原生实现）的桥梁。

---

#### Breaking Change: types 默认改为 []

| 属性 | 说明 |
|------|------|
| **旧默认值** | 自动包含所有 `@types/*` 包 |
| **新默认值** | `[]`（空数组，不自动包含任何类型） |
| **影响** | 构建性能提升，但依赖自动类型引入的项目会报错 |
| **迁移方案** | 显式设置 `"types": ["node"]` 或 `"types": ["*"]` 恢复旧行为 |

**来源验证**:
> "types now defaults to []. TypeScript will no longer pull in potentially thousands of type declarations at build time. Great for performance, but... if you were relying on it, your project will break!"
> — [Microsoft TypeScript 6.0 Announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)

**技术背景**:
- 此前 TypeScript 会自动加载 `node_modules/@types` 下的所有类型声明
- 这导致大型项目构建时可能需要处理数千个类型声明文件
- 新默认值显著提升构建性能，但要求开发者显式声明所需类型

---

#### Breaking Change: strict 默认改为 true

| 属性 | 说明 |
|------|------|
| **旧默认值** | `false` |
| **新默认值** | `true` |
| **影响** | 所有严格类型检查选项默认启用 |
| **迁移方案** | 显式设置 `"strict": false` 维持旧行为（不推荐） |

**来源验证**:
> "strict is now true by default. Many of you will already be working in strict mode, but if not, get ready for a flood of new type errors unless you explicitly set it to false."
> — [Microsoft TypeScript 6.0 Announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)

**技术背景**:
- `strict: true` 启用所有严格类型检查选项，包括：
  - `noImplicitAny`: 禁止隐式 any 类型
  - `strictNullChecks`: 严格的 null 检查
  - `strictFunctionTypes`: 严格的函数类型检查
  - `strictBindCallApply`: 严格的 bind/call/apply 检查
  - `strictPropertyInitialization`: 严格的属性初始化检查
  - `noImplicitThis`: 禁止隐式 this 类型
  - `alwaysStrict`: 始终使用严格模式

---

#### Breaking Change: moduleResolution node 已弃用

| 属性 | 说明 |
|------|------|
| **旧推荐值** | `node` 或 `node10` |
| **新推荐值** | `nodenext` 或 `bundler` |
| **状态** | 已弃用，TypeScript 7.0 将完全移除 |
| **影响** | 目标环境为 Node 时需更新配置 |

**来源验证**:
> "--moduleResolution node is deprecated. If you're targeting Node, you'll now use --moduleResolution nodenext which reflects how modern versions of Node resolve modules."
> — [Microsoft TypeScript 6.0 Announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)

**详细变更**:
- `moduleResolution: node10`（原 `node`）现已弃用
- 对于 Node.js 项目，应使用 `nodenext`
- 对于打包工具项目，应使用 `bundler`
- 可添加 `"ignoreDeprecations": "6.0"` 临时忽略弃用警告

---

#### Breaking Change: module 默认改为 esnext

| 属性 | 说明 |
|------|------|
| **旧默认值** | 因配置而异 |
| **新默认值** | `esnext` |
| **影响** | CommonJS 项目需显式配置 |
| **迁移方案** | 显式设置 `"module": "commonjs"` |

**来源验证**:
> "module now defaults to esnext. CommonJS projects must now set 'module': 'commonjs' explicitly."
> — [Microsoft TypeScript 6.0 Announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)

**相关弃用**:
- `module: amd` / `umd` / `systemjs` / `none` 均已弃用
- ESM 现已成为通用标准

---

#### Feature: 子路径导入 (Subpath Imports) 支持

| 属性 | 说明 |
|------|------|
| **功能** | 支持 `package.json` 中的 `"imports"` 字段映射 |
| **语法** | `#/` 前缀导入，如 `import utils from '#/utils'` |
| **Node.js 支持** | v25.4+（已向后移植至 LTS） |
| **TypeScript 支持** | 6.0 起原生支持 |

**来源验证**:
> "#/ subpath imports now work. Available in Node since v25.4 (and backported into LTS releases), but now in TypeScript too."
> — [Microsoft TypeScript 6.0 Announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)

**配置示例**:
```json
// package.json
{
  "imports": {
    "#*": "./src/*",
    "#utils/*": "./src/utils/*"
  }
}
```

```ts
// 使用子路径导入
import { helper } from '#/utils/helper';
```

---

#### Breaking Change: rootDir 默认改为 .

| 属性 | 说明 |
|------|------|
| **旧行为** | 从源文件位置自动推断 |
| **新默认值** | `.`（tsconfig.json 所在目录） |
| **影响** | 源文件层级深于 tsconfig.json 的项目需显式配置 |
| **迁移方案** | 显式设置 `"rootDir": "./src"` 或其他适当值 |

**来源验证**:
> "rootDir now defaults to . If you have source files deeper than your tsconfig.json and were relying on TypeScript to infer a common root directory, you now need to explicitly set rootDir."
> — [Microsoft TypeScript 6.0 Announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)

---

#### Breaking Change: esModuleInterop 和 allowSyntheticDefaultImports 限制

| 属性 | 说明 |
|------|------|
| **变更** | `esModuleInterop: false` 和 `allowSyntheticDefaultImports: false` 不再可用 |
| **新行为** | 安全的模块互操作始终启用 |
| **影响** | `import * as express from "express"` 语法不再工作 |
| **迁移方案** | 改用 `import express from "express"` |

**来源验证**:
> "--esModuleInterop false and --allowSyntheticDefaultImports false no longer work. So if you're still using syntax like import * as express from 'express' it won't work, you'd need to use import express from 'express'."
> — [Microsoft TypeScript 6.0 Announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)

**代码迁移示例**:
```ts
// 旧语法（不再支持）
import * as express from "express";

// 新语法（推荐）
import express from "express";
```

---

#### 其他默认配置变更

| 选项 | 旧默认值 | 新默认值 | 说明 |
|------|----------|----------|------|
| `target` | 因配置而异 | `es2025` | 默认使用当前年份的 ES 版本 |
| `noUncheckedSideEffectImports` | `false` | `true` | 更严格的副作用导入检查 |
| `libReplacement` | `true` | `false` | 不再自动替换 lib 文件 |

---

#### 已弃用选项（将于 7.0 移除）

| 选项 | 替代方案 |
|------|----------|
| `target: es5` | 最低目标现为 ES2015 |
| `--downlevelIteration` | 仅影响 ES5 输出，现无需使用 |
| `--baseUrl` | 使用显式的 `paths` 映射 |
| `--moduleResolution classic` | 使用 `nodenext` 或 `bundler` |
| `--alwaysStrict false` | 所有代码默认严格模式 |
| `--outFile` | 使用外部打包工具 |
| `module` 关键字（namespace）| 使用 `namespace` 替代 |
| `asserts`（导入断言）| 使用 `with` 进行导入属性断言 |
| `no-default-lib` 指令 | 使用 `--noLib` 或 `--libReplacement` |

**临时缓解措施**:
```json
{
  "compilerOptions": {
    "ignoreDeprecations": "6.0"
  }
}
```

> 注意：TypeScript 7.0 将不支持任何已弃用的选项。

---

#### 命令行行为变更

**变更**: 当 `tsconfig.json` 存在时，指定命令行文件路径现在会报错。

**迁移方案**: 使用 `--ignoreConfig` 覆盖此行为。

---

### 迁移建议

根据 Microsoft 官方建议，升级 TypeScript 6.0 时，大多数项目需要至少进行以下一项调整：

1. **设置类型声明**:
   ```json
   {
     "compilerOptions": {
       "types": ["node"]
     }
   }
   ```
   或使用 `"types": ["*"]` 恢复旧行为。

2. **设置根目录**（如果依赖之前的自动推断）:
   ```json
   {
     "compilerOptions": {
       "rootDir": "./src"
     }
   }
   ```

3. **临时忽略弃用警告**（不推荐长期使用）:
   ```json
   {
     "compilerOptions": {
       "ignoreDeprecations": "6.0"
     }
   }
   ```

---

### 版本演进路线图

| 版本 | 时间 | 说明 |
|------|------|------|
| TypeScript 6.0 | 2025年3月 | 引入弃用和破坏性变更，最后一个基于 JS 的版本 |
| TypeScript 6.x | 2025-2026 | 维护版本，与 7.0 功能对等 |
| TypeScript 7.0 | 预计2026年 | 基于 Go 的原生实现，10倍性能提升 |

---

## 参考资料

- [TypeScript 6.0 Release Notes](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)
- [TypeScript GitHub Releases](https://github.com/microsoft/TypeScript/releases)
- [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig)
- [TypeScript Roadmap](https://github.com/microsoft/TypeScript/wiki/Roadmap)
