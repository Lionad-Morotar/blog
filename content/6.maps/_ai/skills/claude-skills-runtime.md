---
title: Claude Code 技能运行时机制
description: 技能清单的零和预算、调用后的驻留与压缩重挂载、调用控制字段的决策分野。
---

#### 技能清单是零和预算

Claude Code 把所有技能的 name 与 description 装进常驻每轮上下文的技能清单，预算默认为模型上下文窗口的 1%，
每条 description 与 when_to_use 合计上限 1536 字符。清单超预算时从调用最少的技能开始截断描述，所以新装技能
可能静默挤掉老技能描述里的触发关键词，表现是技能突然不被自动触发，而不是描述写得不好。诊断用 /skill-doctor，
它列出每个技能的清单成本与使用率并标出从未触发的技能；修复选项：移除不用的技能、在 skillOverrides 里把低优先级
技能设为 "name-only"（列名不列描述，腾出预算）、或调高 skillListingBudgetFraction。技能库不是越大越好，
不被调用的技能在清单里是纯负债。

见：[Extend Claude with skills](https://code.claude.com/docs/en/skills)

#### 调用后驻留与压缩重挂载

技能被调用后，渲染出的 SKILL.md 正文作为一条消息进入对话并跨轮驻留，Claude 不会在后续轮次重读文件；
但 allowed-tools 授权只持续到下一条用户消息，之后权限回落到会话设置，再次调用技能才会重新授予。自动压缩时
每个技能重挂最近一次调用内容的前 5000 token，全部技能共享 25000 token 预算并从最近调用者优先填充，一轮会话里
调用了多个技能时，较早的技能可能在压缩后被整个丢掉，需要重新调用。技能看似不再影响行为时，内容通常还在
上下文里，是模型选择了别的路径：先加强 description 与指令的约束力，仍不行时用 hooks 做确定性强制。

见：[Extend Claude with skills](https://code.claude.com/docs/en/skills)

#### 调用控制字段的决策分野

三个 Claude Code 扩展字段回答「谁在什么时候以什么身份运行这个技能」。disable-model-invocation: true 让技能
仅限手动调用，用于有副作用、要控制时序的流程（部署、发消息、发版），模型试图自动执行时会被拦截并引导用户
自己敲 / 命令；user-invocable: false 反向只留模型调用，适合「解释某遗留系统怎么工作」这类背景知识，对用户而言
它不是一个可执行动作；context: fork 把技能送进隔离子代理执行，agent 字段选子代理类型（默认 general-purpose），
子代理看不到对话历史，技能指令必须自足，而后台 fork 的文件编辑落在会话 checkpoints 之外，/rewind 撤不掉，
只能用 git 回退。另外 frontmatter 的 model 与 effort 可按技能覆写会话模型与推理档位，技能结束后还原。
跨平台分发时只使用开放标准的六个字段（name、description、allowed-tools、license、compatibility、metadata），
Claude Code 扩展字段上传 claude.ai 会直接报错而不是被忽略。

见：[Extend Claude with skills](https://code.claude.com/docs/en/skills)
