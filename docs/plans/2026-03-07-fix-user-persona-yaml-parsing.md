# UserPersona 组件 YAML 解析修复计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 修复 UserPersona 组件无法解析 YAML 格式内容的问题，使其支持 Markdown 中使用的 `---` 包裹 YAML 语法。

**Architecture:** 修改 `UserPersona.vue` 的 `parseSyntax` 函数，添加对 YAML frontmatter 格式（`---\nkey: value\n---`）的解析能力，同时保持向后兼容原有的自定义语法。

**Tech Stack:** Vue 3, Nuxt Content, js-yaml (可选)

---

## 背景分析

当前问题：
- [UserPersona.vue](app/components/UserPersona.vue:176-188) 的 `parseSyntax` 函数只支持自定义语法：`template persona\nname: xxx`
- 但 Markdown 中使用的是 YAML 格式：
  ```yaml
  ::UserPersona
  ---
  template: persona
  name: xxx
  ---
  ::
  ```
- 解析器无法识别 YAML，导致 `parsedData` 为 `null`，组件不渲染

---

## Task 1: 分析当前解析逻辑并添加 YAML 检测

**Files:**
- Modify: `app/components/UserPersona.vue:176-257`

**Step 1: 添加 YAML 格式检测函数**

在 `parseSyntax` 函数之前添加：

```javascript
// 检测是否为 YAML frontmatter 格式
function isYamlFormat(text) {
  const trimmed = text.trim()
  return trimmed.startsWith('---') && trimmed.includes('\n---')
}

// 简单 YAML 解析（不引入外部库）
function parseSimpleYaml(text) {
  const lines = text.trim().split('\n')
  const result = {}
  let currentKey = null
  let currentArray = null
  let inArray = false

  for (const line of lines) {
    const trimmed = line.trim()

    // 跳过 --- 分隔符
    if (trimmed === '---') continue

    // 跳过空行
    if (!trimmed) {
      if (inArray) {
        inArray = false
        currentArray = null
        currentKey = null
      }
      continue
    }

    // 数组项
    if (trimmed.startsWith('- ')) {
      const item = trimmed.slice(2).trim()
      if (currentArray) {
        currentArray.push(item)
      }
      continue
    }

    // 键值对
    if (trimmed.includes(':')) {
      const colonIndex = trimmed.indexOf(':')
      const key = trimmed.slice(0, colonIndex).trim()
      const value = trimmed.slice(colonIndex + 1).trim()

      // 值为空，开始数组
      if (value === '') {
        currentArray = []
        result[key] = currentArray
        inArray = true
        currentKey = key
      } else {
        result[key] = value.replace(/^["']|["']$/g, '')
        inArray = false
        currentArray = null
      }
    }
  }

  return result
}
```

**Step 2: 修改 parseSyntax 函数入口**

```javascript
// 解析声明式语法
function parseSyntax(text) {
  if (!text) return null

  // 检测 YAML 格式并解析
  if (isYamlFormat(text)) {
    const data = parseSimpleYaml(text)
    if (data.template) {
      return { template: data.template, data }
    }
    return null
  }

  // 原有自定义语法解析逻辑保持不变...
  const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean)
  // ... 其余代码不变
}
```

**Step 3: 测试验证**

运行开发服务器：
```bash
npm run dev
```

访问页面：
```
http://localhost:3002/maps/_ai/agents/peas-coach-example
```

预期结果：UserPersona 卡片正常显示三个用户画像

**Step 4: Commit**

```bash
git add app/components/UserPersona.vue
git commit -m "fix(UserPersona): 支持 YAML frontmatter 格式解析"
```

---

## Task 2: 添加调试日志（可选，用于排查问题）

**Files:**
- Modify: `app/components/UserPersona.vue:176-190`

**Step 1: 添加解析错误日志**

在 `parseSyntax` 函数中添加调试信息：

```javascript
function parseSyntax(text) {
  if (!text) {
    console.warn('[UserPersona] 输入为空')
    return null
  }

  // 检测 YAML 格式
  if (isYamlFormat(text)) {
    console.log('[UserPersona] 检测到 YAML 格式')
    const data = parseSimpleYaml(text)
    console.log('[UserPersona] YAML 解析结果:', data)
    if (data.template) {
      return { template: data.template, data }
    }
    console.warn('[UserPersona] YAML 缺少 template 字段')
    return null
  }

  console.log('[UserPersona] 使用自定义语法解析')
  // ... 原有代码
}
```

**Step 2: Commit**

```bash
git add app/components/UserPersona.vue
git commit -m "chore(UserPersona): 添加解析调试日志"
```

---

## Task 3: 验证所有模板类型正常工作

**Files:**
- Test: 访问包含 UserPersona 的页面

**Step 1: 验证 persona 模板**

检查三个用户画像是否正确渲染：
- 王小雅（减脂焦虑白领）
- 阿杰（数据控极客）
- 李阿姨（术后康复用户）

**Step 2: 检查浏览器控制台**

确认没有解析错误日志。

---

## 备选方案（如果简单 YAML 解析不够健壮）

如果简单解析器无法处理复杂 YAML，考虑：

1. 安装 js-yaml：
   ```bash
   npm install js-yaml
   ```

2. 使用库解析：
   ```javascript
   import YAML from 'js-yaml'

   function parseYaml(text) {
     const content = text.replace(/^---\n/, '').replace(/\n---$/, '')
     return YAML.load(content)
   }
   ```

但优先尝试不引入新依赖的方案。

---

## 测试清单

- [ ] 三个用户画像卡片正常显示
- [ ] 头像、姓名、角色正确渲染
- [ ] 基本信息标签显示正常
- [ ] 目标、痛点、行为特征列表正常
- [ ] 引用语正确显示
- [ ] 控制台无解析错误
