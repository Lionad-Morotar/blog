# 详细场景配置

本文档包含所有预定义场景的详细配置，供SKILL.md中的快速决策引用。

---

## 场景A：快速筛选资料

**触发条件**：
- "我收到3份行业报告，不知道哪个靠谱"
- "帮我看看这份资料可不可信"
- "这几份资料哪个更好"

**选择模块**：`verify-sources` + `find-contradictions`（如有多份）

**工作重心分配**：
| 模块 | 时间占比 | 输出深度 | 说明 |
|-----|---------|---------|------|
| verify-sources | 60% | 简要 | 快速评估来源可靠性 |
| find-contradictions | 40% | 简要 | 只标核心矛盾 |

**执行要点**：
- 不追求全面，快速给出"可/不可信"判断
- 矛盾分析聚焦关键数据冲突
- 最终给出明确采信建议

**检查点**：无，直接输出

---

## 场景B：尽职调查报告

**触发条件**：
- "这家创业公司BP看起来不错，我想投资前深入分析"
- "做一份投资尽调报告"

**选择模块**：`verify-sources` → `weakness-scanner` → `uncover-assumptions` → `expert-insights` → `expert-questions`

**工作重心分配**：
| 模块 | 时间占比 | 输出深度 | 说明 |
|-----|---------|---------|------|
| verify-sources | 10% | 标准 | 确认BP来源和团队背景 |
| weakness-scanner | 25% | 深度 | 扫描财务预测逻辑、市场假设 |
| uncover-assumptions | 25% | 深度 | 识别商业模型隐藏假设 |
| expert-insights | 25% | 深度 | 提炼投资关键判断 |
| expert-questions | 15% | 标准 | 生成尽调追问清单 |

**执行要点**：
- 批判组（weakness + assumptions）是核心，投入50%精力
- 输出直接服务于投资决策（投/不投/再观察）
- expert-questions具体化为尽调问题清单

**检查点**：
- 验证后：确认资料可信度
- 批判后：确认是否继续深入

---

## 场景C：学术论文综述

**触发条件**：
- "我读了5篇AI论文，帮我整理成文献综述"
- "写篇这个领域的综述"

**选择模块**：`find-contradictions` → `build-timeline` → `expert-insights` → `construct-framework` → `expert-questions`

**工作重心分配**：
| 模块 | 时间占比 | 输出深度 | 说明 |
|-----|---------|---------|------|
| find-contradictions | 15% | 标准 | 对比方法差异，而非对错 |
| build-timeline | 15% | 标准 | 构建技术演进脉络 |
| expert-insights | 30% | 深度 | 提炼领域突破点 |
| construct-framework | 30% | 深度 | 构建技术分类框架 |
| expert-questions | 10% | 简要 | 指出研究空白 |

**执行要点**：
- 理解组是核心，投入60%精力
- 专家洞见体现学术价值（挑战了什么范式）
- 框架便于同行理解

**并行执行**：`build-timeline` + `expert-insights` 可同时执行

---

## 场景D：产品策略制定

**触发条件**：
- "竞品分析报告出来了，怎么转化成我们的策略"
- "基于这些资料，出一份产品策略"

**选择模块**：`verify-sources` → `expert-insights` → `construct-framework` → `implementation-blueprint`

**工作重心分配**：
| 模块 | 时间占比 | 输出深度 | 说明 |
|-----|---------|---------|------|
| verify-sources | 10% | 简要 | 快速确认竞品数据可信度 |
| expert-insights | 20% | 标准 | 提炼竞争关键洞察 |
| construct-framework | 20% | 标准 | 构建竞争策略框架 |
| implementation-blueprint | 50% | 深度 | 详细行动路线图 |

**执行要点**：
- 应用组是核心，尤其是implementation-blueprint
- 输出要是可执行的产品Roadmap
- 包含资源需求、里程碑、风险预案

**检查点**：框架完成后确认方向

---

## 场景E：向高管汇报

**触发条件**：
- "帮我准备明天的管理层汇报材料"
- "怎么向老板解释这个"

**选择模块**：`expert-insights` → `multi-audience-translation`

**工作重心分配**：
| 模块 | 时间占比 | 输出深度 | 说明 |
|-----|---------|---------|------|
| expert-insights | 40% | 标准 | 提炼3个核心结论 |
| multi-audience-translation | 60% | 深度 | 重点准备高管版本 |

**执行要点**：
- multi-audience是核心，投入60%精力
- 高管版本要一页纸、结论先行
- 准备3分钟和10分钟两个版本

**检查点**：expert-insights后确认核心结论

---

## 场景F：研究课题探索

**触发条件**：
- "我想研究这个领域，但不知道从哪入手"
- "帮我探索这个研究方向"

**选择模块**：`verify-sources` → `weakness-scanner` → `build-timeline` → `expert-insights` → `construct-framework` → `expert-questions` → [reAct循环]

**工作重心分配**：
| 模块 | 时间占比 | 输出深度 | 说明 |
|-----|---------|---------|------|
| verify-sources | 10% | 标准 | 评估入门资料 |
| weakness-scanner | 15% | 标准 | 了解领域争议点 |
| build-timeline | 10% | 简要 | 把握发展脉络 |
| expert-insights | 25% | 深度 | 识别真正重要的问题 |
| construct-framework | 25% | 深度 | 构建领域认知地图 |
| expert-questions | 15% | 标准 | 生成研究方向 |

**执行要点**：
- 理解组 + 延伸组是核心
- expert-questions作为下一轮研究起点
- 支持reAct循环

**检查点**：每完成一组后询问是否继续深入

---

## 自定义场景指南

如用户需求不匹配上述场景：

1. **识别核心目标**：验证/批判/理解/延伸/应用
2. **选择对应模块组**：见SKILL.md模块分组表
3. **确定依赖关系**：检查前置模块是否已执行
4. **分配时间占比**：核心模块占50%以上
5. **设置检查点**：长流程每15分钟或关键节点暂停