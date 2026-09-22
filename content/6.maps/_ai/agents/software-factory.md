---
title: 软件工厂（Software Factory）
description: 从事件出发协同多个 Agent 的结构化工程流程范式：定义与边界、注入攻击面、失败即体检、隔离 subagent 与标签状态机
---

#### 软件工厂：从事件出发协同多个 Agent 的结构化工程流程

Software Factory（软件工厂）是 2026 年 9 月收敛出定义的一种工程范式：系统从事件（issue 打开、新评论、告警触发）启动工作，
用结构化工程流程组织多个 agent，agent 读写 spec、issue、PR 这类工件，人只在关键决策点做批准。它比 coding agent
（用模型与工具完成单次任务的 agent harness）和 cloud agent（跑在托管远端算力上的 coding agent）高一层——
价值不在单个 agent 多强，而在流程可预测、发现可共享、人能在正确位置介入。

它解决的问题：bug 修复中真正耗人力的不是写修复，而是复现、诊断、验证；且 AI 时代提交 issue 近乎免费，阅读成本正在压垮开源维护者。
代表案例是 Cloudflare Astro 的 bug-fixing 工厂：复现 → 诊断（加临时日志、重建、重跑、删日志）→ 验证（对照测试/注释/文档判断是否真 bug）
→ 修复 → 预览发布请 reporter 验收，全程跑在 GitHub Actions 上。运行数月后 open issue 从 200+ 降到约 30，未 auto-close 冷票、
未宣布 issue bankruptcy；Vercel 的 ai-sdk-factory 四周内产出 25-35% 的合并 PR；Uber 把它做成公司级平台。
Astro 的引擎已泛化为开源框架 Flue（withastro/flue），工作流本身抽成 withastro/triagebot-action。

边界判断：值得上工厂的是标准化流程有收益的工作（生产告警处置、CI 修复、triage、第 21 个长得像前 20 个的 CRUD）；
头脑风暴、目标未定的新功能不值得走固定阶段，工程师与 agent 交互式 loop 更好。采纳前提与团队规模无关，取决于三点：
团队已是重度 agent 用户（MCP、skills、凭据就绪）、偏好结构与流程、有人推动落地。

见：[Why bug fixing is the least important part of a bug-fixing software factory](https://igoro.com/archive/bug-fixing-software-factory/)、
[Software Factories in September 2026](https://igoro.com/archive/software-factories/)、
[Cloudflare: How we built a software factory](https://blog.cloudflare.com/astro-issue-triage/)

#### 工厂的注入攻击面藏在复现环节

bug-fixing 工厂意味着让持有写权限令牌的 agent 在 CI runner 上 clone 并运行 reporter 提交的不可信代码，攻击载荷有两条通道：
issue 正文是 prompt injection，复现仓库代码是 execution injection。这不是假想——2026 年 CSA 报告过 Claude Code GitHub Action
的权限绕过（CVSS 7.8，GitHub App actor 被无条件信任，外部攻击者无需写权限即可注入 prompt 触发仓库沦陷）；
PromptPwnd 系列展示了 agent 化 GitHub Actions 被诱导外泄 secrets。triagebot-action 把 read-token 用内置低权限 GITHUB_TOKEN、
write-token 用独立 bot 令牌分离，只是缓解的一角；真正的设计题是「agent 能看到的凭证 ≤ 它被授权的动作」，
且 issue 文本永远是未信输入。评估任何现成工厂方案时先问这条边界。

见：[CSA: Claude Code GitHub Action prompt injection](https://labs.cloudsecurityalliance.org/research/csa-research-note-claude-code-github-action-prompt-injection/)、
[Aikido: PromptPwnd](https://www.aikido.dev/blog/promptpwnd-github-actions-ai-agents)

#### Agent 修不好 bug 是代码库体检指标

Cloudflare 的 triage bot 把「agent 找不到正确解」当作代码库缺陷信号，指向三类根因：不透明抽象（读不出组件边界，人也读不出）、
缺失文档（关键代码段没有解释实现动机的注释）、测试覆盖不足。实例：HMR 系列 bug 中 bot 反复试图删除一个 if 条件——
删了能修好当前 bug 但在别处引入回归（该条件无测试保护）；补一条解释该条件逻辑的注释后，bot 停止误改。
这使注释、测试与模块边界同时是给 agent 的护栏，「agent 可读性」成为代码库的新质量维度；
评估工厂效果时，失败率分布比成功率更能说明该库的结构质量，修好一次 bot 失败也顺手改善了人类开发者的上手体验。

见：[Cloudflare: How we built a software factory](https://blog.cloudflare.com/astro-issue-triage/)

#### 隔离 subagent 防的是「强行制造 bug」

LLM 有任务完成偏置：给它「复现+诊断+修复」一条龙指令，即使行为其实是 by design，它也倾向硬造一个修复来交差。
Astro 的对策是每个阶段用隔离 subagent，并把推理与允许的动作分离——诊断 agent 没有改代码的权限，
验证阶段的存在就是为了在修之前先审「这到底是不是 bug」。阶段间交接用 report.md 文件而非共享上下文窗口，
前阶段的结论以「可审计工件」而非既成事实进入后阶段，防止幻觉顺着上下文传染；机器人最后把 report.md 编译成 GitHub 评论供人审查。
搭多 agent 流水线时若只拆步骤不拆权限与工件，等于没拆。

见：[Cloudflare: How we built a software factory](https://blog.cloudflare.com/astro-issue-triage/)、
[Software Factories in September 2026](https://igoro.com/archive/software-factories/)

#### 标签状态机：工厂把 GitHub 当数据库

Astro 的流水线在 issue 标签迁移（`triage: needs triage` / `needs reproduction` / `fix pending` / `fix verified` 等）之外
自持零状态：崩溃或重跑时，agent 回读 issue 的全部历史评论推断「走到哪了、接下来干什么」。这种寄生状态机有两个收益——
工厂没有第二处真相源，也不需要 workflow 引擎的持久化运维；状态可读性极好，任何人打开 issue 就是审计现场，
这是团队特意选 GitHub Actions 内透明运行的原因。它还顺带定义了人机协作接口：reporter 用 pkg.pr.new 发布的 preview 验证修复，
确认后才自动开 PR。想复刻工厂，先画标签→动作迁移表再写 agent，顺序反了就会滑回「一长串 prompt」。

见：[Cloudflare: How we built a software factory](https://blog.cloudflare.com/astro-issue-triage/)
