---
title: Browser AI Automation
description: AI 驱动的浏览器自动化工具对比
original_path: _ai/tools/browser-automation.md
---

浏览器 AI 自动化工具让 AI 能够控制浏览器、执行网页操作、提取数据。以下是主流开源工具的对比。

---

## Opendia

#### 定位？

**Dia / Perplexity Comet 的开源替代品**。通过 MCP 协议将浏览器连接到 AI 模型，让 AI 自动控制浏览器。

#### 核心特点？

- **本地优先**：所有数据本地运行，不上传云端
- **利用现有数字生活**：复用已登录的账号、书签、历史记录、Cookie、扩展（如 MetaMask）
- **反检测**：专门针对 Twitter/X、LinkedIn、Facebook 的自动化检测做了绕过
- **跨浏览器**：支持 Chrome、Firefox、Arc、Edge、Brave、Opera 等

#### 工作流程？

```
AI Model → OpenDia Server → Browser Extension → Your Browser → Any Website
```

#### 使用场景？

- 社交媒体：自动发布推文、总结文章并创建 Twitter thread
- 研究分析：浏览历史记录，找到关于特定主题的文章
- 开发测试：自动填写表单、测试注册流程、截图
- 页面美化：一键切换 dark mode、添加 matrix 雨效果等

见：[OpenDia GitHub](https://github.com/aaronjmars/opendia)

---

## Browser-use

#### 定位？

最流行的 AI 浏览器自动化框架，Python 生态。

#### 核心特点？

- **专注的 LLM**：`ChatBrowserUse()` 专门针对浏览器任务优化，比其他模型快 3-5 倍
- **云服务和本地**：可自托管，也可使用 Browser Use Cloud
- **多 LLM 支持**：OpenAI、Google、本地 Ollama 等
- **Claude Code Skill**：官方提供 Claude Code 集成

#### 快速开始？

```python
from browser_use import Agent, Browser, ChatBrowserUse

browser = Browser()
llm = ChatBrowserUse()
agent = Agent(
    task="Find the number of stars of the browser-use repo",
    llm=llm,
    browser=browser,
)
await agent.run()
```

见：[Browser-use GitHub](https://github.com/browser-use/browser-use)

---

## Stagehand

#### 定位？

AI 时代的浏览器自动化框架，**代码与 AI 的桥梁**。

#### 核心特点？

- **混合模式**：在熟悉页面上写代码，在不熟悉页面上用自然语言
- **自修复**：缓存可重复操作，网站变化时自动调用 AI 修复
- **生产级**：为可靠性和可维护性设计
- **多语言**：TypeScript 和 Python 实现

#### API 设计？

```typescript
// 用 act() 执行单个动作
await stagehand.act("click on the stagehand repo");

// 用 agent() 执行多步任务
const agent = stagehand.agent();
await agent.execute("Get to the latest PR");

// 用 extract() 提取结构化数据
const { author, title } = await stagehand.extract(
  "extract the author and title of the PR",
  z.object({ author: z.string(), title: z.string() })
);
```

见：[Stagehand GitHub](https://github.com/browserbase/stagehand)、[Stagehand 文档](https://docs.stagehand.dev/)

---

## Playwright MCP (Microsoft)

#### 定位？

微软官方的 MCP 浏览器自动化服务器，**结构化数据优先**。

#### 核心特点？

- **无需视觉模型**：使用 Playwright 的可访问性树，而非截图
- **快速轻量**：比基于像素的方案更快
- **确定性**：避免截图方案常见的歧义问题
- **广泛支持**：支持 20+ MCP 客户端（VS Code、Cursor、Claude、Goose 等）

#### 关键差异？

| 特性 | Playwright MCP | 视觉方案 |
|------|---------------|----------|
| 输入方式 | 可访问性树 | 截图 |
| LLM 要求 | 无需视觉模型 | 需要多模态模型 |
| 速度 | 更快 | 较慢 |
| 精确度 | 更高 | 受截图质量影响 |

见：[Playwright MCP GitHub](https://github.com/microsoft/playwright-mcp)

---

## 其他工具

| 工具 | 特点 | 链接 |
|------|------|------|
| **Steel.dev** | 开源浏览器 API，专为 AI 应用设计 | [GitHub](https://github.com/steel-dev/steel-browser) |
| **Nanobrowser** | OpenAI Operator 的开源替代品，浏览器内运行 | [GitHub](https://github.com/nanobrowser/nanobrowser) |
| **HyperAgent** | Playwright + AI，自然语言命令 | [GitHub](https://github.com/hyperbrowserai/HyperAgent) |
| **Browserable** | 开源浏览器自动化库 | [GitHub](https://github.com/browserable/browserable) |

---

## 工具对比总结

| 工具 | 类型 | 核心特点 | 适用场景 |
|------|------|----------|----------|
| **Opendia** | 浏览器扩展 + MCP | 复用现有浏览器会话，反检测，本地优先 | 需要登录态的自动化 |
| **Browser-use** | Python 框架 | 最流行，Cloud 服务，多 LLM 支持 | 生产级浏览器代理 |
| **Stagehand** | TypeScript 框架 | 自然语言 + 代码混合，自修复 | 可靠的自动化流程 |
| **Playwright MCP** | MCP Server | 微软官方，可访问性树，无需视觉模型 | 精确控制，测试场景 |
| **Steel.dev** | 浏览器 API | 开源浏览器 API，为 AI 设计 | 构建 AI 应用和代理 |
| **Nanobrowser** | 浏览器扩展 | OpenAI Operator 的免费替代品 | 浏览器内 AI 自动化 |
