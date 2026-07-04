# Agent Skills

> Skill 是一种能力，作为 Agent 和工具之间的胶水层，帮助 Agent 理解工具以及有控制上下文等优点。

## Tour

- [Claude Skills](https://code.claude.com/docs/zh-CN/skills)
- [Agent Skills](https://github.com/agentskills/agentskills)：Anthropic 维护的开放格式，用于给 AI 代理添加新功能和专业知识。包含技能规范、文档和参考 SDK，支持编写一次、到处使用的指令文件夹。

## Domain

- [如何编写 Skills](/maps/_ai/skills/create-a-skill.md)
- [Skill 蒸馏的边界与精度阶梯](/maps/_ai/skills/skill-distillation) — 从 ACT-R 双记忆模型与 Polanyi 默会知识看 Skill 能蒸馏几分之几
- [D2C 实践](/maps/_ai/skills/d2c)：基于 AWS Kiro + MCP + Skills 的智能 Design-to-Code 架构
- [SkillOpt：把 Agent Skill 当神经网络训练](/maps/_ai/skills/skillopt.md) — 微软开源的 Skill 文档自优化框架

## Ecosystem

Skills.homes 是由 ToQuery 创建的 AI Agent Skills 发现、安装和创建平台，为 Claude Code、Eloquent 以及其他兼容 MCP 的 Agent 提供可复用的能力扩展。

不同于单一工具或框架，Skills.homes 充当 Skills 生态的聚合入口 —— 开发者可以在这里发现社区维护的现成能力，也可以创建并分享自己的 Skills。

- **发现 Skills**：浏览精选的社区 Skills，涵盖代码审查、PR 创建、性能优化等场景
- **安装集成**：通过 `npx skills` 快速安装到本地项目
- **创建指南**：提供完整的 Skill 开发规范和最佳实践

见：[Skills.homes](https://skills.homes/zh-CN)

- **Perplexity 的 Skill 工程实践**：Perplexity Computer 的 Agent Skills 系统采用三层渐进式加载（Index / Load / Runtime），description 作为路由触发器而非文档，并通过 gotcha 飞轮机制持续维护 Skill 质量。见 [Designing, Refining, and Maintaining Agent Skills at Perplexity](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity)<sup>

[1](#user-content-fn-1)

</sup>

## 跨提供商发现机制

Agent Skills 是一个开放标准（[agentskills.io](https://agentskills.io/specification)），定义了可复用的 AI 代理能力包格式。所有主流 AI coding tool 提供商都已采纳该标准，但在 frontmatter 字段支持、目录发现机制、调用语法和扩展行为上存在显著差异。

**跨提供商目录兼容矩阵**：

<table>
<thead>
  <tr>
    <th>
      提供商
    </th>
    
    <th align="center">
      <code>
        .claude/skills/
      </code>
    </th>
    
    <th align="center">
      <code>
        .agents/skills/
      </code>
    </th>
    
    <th align="center">
      <code>
        .<provider>/skills/
      </code>
    </th>
    
    <th align="center">
      向上扫描
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Claude Code
    </td>
    
    <td align="center">
      原生
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      原生
    </td>
    
    <td align="center">
      否
    </td>
  </tr>
  
  <tr>
    <td>
      Cursor
    </td>
    
    <td align="center">
      兼容
    </td>
    
    <td align="center">
      兼容
    </td>
    
    <td align="center">
      原生
    </td>
    
    <td align="center">
      否
    </td>
  </tr>
  
  <tr>
    <td>
      Copilot
    </td>
    
    <td align="center">
      兼容
    </td>
    
    <td align="center">
      兼容
    </td>
    
    <td align="center">
      原生
    </td>
    
    <td align="center">
      否
    </td>
  </tr>
  
  <tr>
    <td>
      Codex CLI
    </td>
    
    <td align="center">
      兼容
    </td>
    
    <td align="center">
      原生
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      <strong>
        是
      </strong>
    </td>
  </tr>
  
  <tr>
    <td>
      OpenCode
    </td>
    
    <td align="center">
      兼容
    </td>
    
    <td align="center">
      兼容
    </td>
    
    <td align="center">
      原生
    </td>
    
    <td align="center">
      是
    </td>
  </tr>
  
  <tr>
    <td>
      Pi
    </td>
    
    <td align="center">
      兼容
    </td>
    
    <td align="center">
      兼容
    </td>
    
    <td align="center">
      原生
    </td>
    
    <td align="center">
      <strong>
        是
      </strong>
    </td>
  </tr>
  
  <tr>
    <td>
      Gemini CLI
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      兼容
    </td>
    
    <td align="center">
      原生
    </td>
    
    <td align="center">
      否
    </td>
  </tr>
  
  <tr>
    <td>
      Rovo Dev
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      兼容
    </td>
    
    <td align="center">
      原生
    </td>
    
    <td align="center">
      否
    </td>
  </tr>
  
  <tr>
    <td>
      Kiro
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      原生
    </td>
    
    <td align="center">
      否
    </td>
  </tr>
  
  <tr>
    <td>
      Trae
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      原生
    </td>
    
    <td align="center">
      否
    </td>
  </tr>
</tbody>
</table>

**关键发现**：

1. **跨提供商发现已成常态** — Cursor、Copilot、OpenCode、Pi 等都会读取 `.claude/skills/` 和 `.agents/skills/`，
意味着为 Claude Code 编写的 Skill 可在多个平台复用
2. **Claude Code 拥有最丰富的扩展字段**（12 个 provider-specific 字段），远超其他提供商
3. **Codex CLI 和 OpenCode 支持向上扫描** — 从 CWD 向上扫描到 repo root，monorepo 友好
4. **Pi 支持 package.json 声明和 CLI --skill 参数** — 最灵活的发现机制

见：[Provider Skills Differences](/Users/lionad/Github/Run/impeccable/docs/research/provider-skills-differences.md) —
10 家提供商详细对比

## 提供商实现差异

### Frontmatter 字段分歧

标准规范定义 5 个核心字段（`name`、`description`、`license`、`compatibility`、`metadata`），但各提供商扩展程度差异巨大：

<table>
<thead>
  <tr>
    <th>
      扩展字段
    </th>
    
    <th align="center">
      Claude Code
    </th>
    
    <th align="center">
      Copilot
    </th>
    
    <th align="center">
      OpenCode
    </th>
    
    <th align="center">
      其他
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        user-invocable
      </code>
    </td>
    
    <td align="center">
      Yes
    </td>
    
    <td align="center">
      Yes
    </td>
    
    <td align="center">
      Yes
    </td>
    
    <td align="center">
      -
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        argument-hint
      </code>
    </td>
    
    <td align="center">
      Yes
    </td>
    
    <td align="center">
      Yes
    </td>
    
    <td align="center">
      Yes
    </td>
    
    <td align="center">
      -
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        disable-model-invocation
      </code>
    </td>
    
    <td align="center">
      Yes
    </td>
    
    <td align="center">
      Yes
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      Pi, Cursor
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        model
      </code>
      
       / <code>
        effort
      </code>
      
       / <code>
        context
      </code>
    </td>
    
    <td align="center">
      Yes
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      -
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        agent
      </code>
      
       / <code>
        hooks
      </code>
      
       / <code>
        paths
      </code>
    </td>
    
    <td align="center">
      Yes
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      -
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        shell
      </code>
    </td>
    
    <td align="center">
      Yes
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      -
    </td>
    
    <td align="center">
      -
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        allowed-tools
      </code>
    </td>
    
    <td align="center">
      空格分隔
    </td>
    
    <td align="center">
      空格分隔
    </td>
    
    <td align="center">
      空格分隔
    </td>
    
    <td align="center">
      Rovo Dev: <strong>
        YAML 列表
      </strong>
    </td>
  </tr>
</tbody>
</table>

### 调用语法差异

<table>
<thead>
  <tr>
    <th>
      提供商
    </th>
    
    <th>
      前缀
    </th>
    
    <th>
      示例
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Claude Code / Copilot / Kiro / OpenCode / Rovo / Trae
    </td>
    
    <td>
      <code>
        /
      </code>
    </td>
    
    <td>
      <code>
        /audit
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Pi
    </td>
    
    <td>
      <code>
        /skill:
      </code>
    </td>
    
    <td>
      <code>
        /skill:audit
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Codex CLI
    </td>
    
    <td>
      <code>
        $
      </code>
    </td>
    
    <td>
      <code>
        $audit
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Cursor / Gemini
    </td>
    
    <td>
      自动匹配
    </td>
    
    <td>
      Agent 根据 description 判断
    </td>
  </tr>
</tbody>
</table>

### 独有能力

<table>
<thead>
  <tr>
    <th>
      能力
    </th>
    
    <th>
      提供商
    </th>
    
    <th>
      说明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      SKILL.md 变量替换
    </td>
    
    <td>
      Claude Code
    </td>
    
    <td>
      <code>
        $ARGUMENTS
      </code>
      
      , <code>
        $0-$N
      </code>
      
      , <code>
        ${CLAUDE_*}
      </code>
      
      , <code>
        !`cmd`
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      独立命令系统
    </td>
    
    <td>
      Gemini CLI
    </td>
    
    <td>
      <code>
        .gemini/commands/*.toml
      </code>
      
      ，TOML 格式
    </td>
  </tr>
  
  <tr>
    <td>
      侧车扩展文件
    </td>
    
    <td>
      Codex CLI
    </td>
    
    <td>
      <code>
        agents/openai.yaml
      </code>
      
       — UI 元数据、MCP 依赖
    </td>
  </tr>
  
  <tr>
    <td>
      权限模型
    </td>
    
    <td>
      OpenCode
    </td>
    
    <td>
      allow/deny/ask 三级，支持通配符
    </td>
  </tr>
  
  <tr>
    <td>
      热替换
    </td>
    
    <td>
      Pi
    </td>
    
    <td>
      运行时修改技能文件即时生效
    </td>
  </tr>
  
  <tr>
    <td>
      用户确认激活
    </td>
    
    <td>
      Gemini CLI
    </td>
    
    <td>
      每次激活需 UI 确认弹窗
    </td>
  </tr>
  
  <tr>
    <td>
      扩展注册点
    </td>
    
    <td>
      VS Code Copilot
    </td>
    
    <td>
      <code>
        package.json
      </code>
      
       <code>
        contributes.chatSkills
      </code>
    </td>
  </tr>
</tbody>
</table>

见：[HARNESSES.md](https://github.com/anthropics/harnesses.md) — Claude Code Skills 完整字段说明

## CLI

`skills` 是由 Vercel Labs 维护的 CLI 工具，用于管理 AI Agent 的 Skills，支持 35+ 种 Agent。

#### 核心命令？

<table>
<thead>
  <tr>
    <th>
      命令
    </th>
    
    <th>
      作用
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        npx skills add <source>
      </code>
    </td>
    
    <td>
      安装 Skill
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        npx skills list
      </code>
      
       / <code>
        ls
      </code>
    </td>
    
    <td>
      列出已安装的 Skills
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        npx skills find [query]
      </code>
    </td>
    
    <td>
      搜索 Skills
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        npx skills remove
      </code>
      
       / <code>
        rm
      </code>
    </td>
    
    <td>
      移除 Skills
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        npx skills check
      </code>
    </td>
    
    <td>
      检查更新
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        npx skills update
      </code>
    </td>
    
    <td>
      更新所有 Skills
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        npx skills init [name]
      </code>
    </td>
    
    <td>
      创建 SKILL.md 模板
    </td>
  </tr>
</tbody>
</table>

#### 安装源的格式？

```bash
# GitHub shorthand
npx skills add vercel-labs/agent-skills

# 完整 GitHub URL
npx skills add https://github.com/vercel-labs/agent-skills

# 子目录路径
npx skills add https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines

# 本地路径
npx skills add ./my-local-skills
```

#### 常用选项？

<table>
<thead>
  <tr>
    <th>
      选项
    </th>
    
    <th>
      说明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        -g, --global
      </code>
    </td>
    
    <td>
      安装到用户目录（全局）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        -a, --agent <agents...>
      </code>
    </td>
    
    <td>
      指定目标 Agent（如 <code>
        claude-code
      </code>
      
      , <code>
        codex
      </code>
      
      ）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        -s, --skill <skills...>
      </code>
    </td>
    
    <td>
      安装特定 Skills（<code>
        '*'
      </code>
      
       表示全部）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        -l, --list
      </code>
    </td>
    
    <td>
      仅列出可用 Skills
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        -y, --yes
      </code>
    </td>
    
    <td>
      跳过确认提示
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --all
      </code>
    </td>
    
    <td>
      安装所有 Skills 到所有 Agents
    </td>
  </tr>
</tbody>
</table>

#### 使用示例？

```bash
# 列出仓库中的 Skills
npx skills add vercel-labs/agent-skills --list

# 安装特定 Skills 到特定 Agent
npx skills add vercel-labs/agent-skills --skill frontend-design -a claude-code

# 全局安装并跳过确认
npx skills add vercel-labs/agent-skills --skill frontend-design -g -y

# CI/CD 友好方式
npx skills add vercel-labs/agent-skills --skill frontend-design -g -a claude-code -y
```

见：[skills - npm](https://www.npmjs.com/package/skills)

## Gists

VSCode 有 Skill 的校验。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260124134051380.png)

<section className="footnotes" dataFootnotes="">

## Footnotes

1. [Designing, Refining, and Maintaining Agent Skills at Perplexity](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity): Perplexity 研究团队公开的生产级 Skill 工程指南。 [↩](#user-content-fnref-1)

</section>
