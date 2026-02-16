# 快速参考卡片

本文档供执行时快速查阅，无需完整阅读。

---

## 快速决策表

| 用户关键词 | 推荐模式 | 核心模块 | 时间 |
|-----------|---------|---------|------|
| "看看" / "靠谱吗" / "怎么样" | 快速筛选 | verify-sources | 3-5分钟 |
| "深度分析" / "综述" / "尽职调查" | 深度分析 | V → C → U → E | 30-50分钟 |
| "怎么做" / "落地" / "方案" | 行动导向 | U → A | 20-30分钟 |
| "汇报" / "PPT" / "高管" | 汇报准备 | expert-insights + multi-audience | 20分钟 |
| "研究" / "探索" / "不了解" | 研究探索 | 全模块 + reAct | 50分钟+ |

---

## 依赖关系速查

**必须先执行（强依赖）**：
```
expert-insights ← verify-sources / weakness-scanner
construct-framework ← expert-insights
implementation-blueprint ← expert-insights / construct-framework
```

**建议先执行（弱依赖）**：
```
find-contradictions ← 多份资料存在
uncover-assumptions ← weakness-scanner
expert-questions ← construct-framework
```

**独立模块（随时可执行）**：
- build-timeline
- multi-audience-translation

---

## 可并行模块

**推荐并行组合**：

| 组合 | 适用场景 | 整合方式 |
|-----|---------|---------|
| build-timeline + expert-insights | 有时间信息的深度分析 | 时间线作为洞见背景 |
| weakness-scanner + uncover-assumptions | 批判组同时执行 | 合并为一份批判报告 |
| verify-sources 多份资料 | 快速筛选多份资料 | 每份独立评估后对比 |

**并行执行策略**：
1. 确认模块间无依赖
2. 同时读取各模块reference
3. 并行执行分析
4. 统一格式整合输出

---

## 检查点设置

**必须设置检查点**：
- 验证组完成后（决定是否继续）
- 批判组完成后（决定是否使用资料）
- 30分钟以上流程每15分钟

**检查点话术模板**：
```
"当前已完成 [模块]，发现：
- [关键发现1]
- [关键发现2]

是否继续 [下一步]？选项：
1. 继续执行
2. 调整方向（说明新方向）
3. 结束分析"
```

---

## 模块选择速查

### 验证组 (V)
- **verify-sources**：来源可靠性未知时
- **find-contradictions**：2份以上资料时

### 批判组 (C)
- **weakness-scanner**：资料用于重要决策时
- **uncover-assumptions**：资料做出预测/建议时

### 理解组 (U)
- **build-timeline**：历史发展、技术演进
- **expert-insights**：提炼核心价值
- **construct-framework**：系统化零散概念

### 延伸组 (E)
- **expert-questions**：研究起点、发现空白

### 应用组 (A)
- **implementation-blueprint**：转化为行动计划
- **multi-audience-translation**：向不同人汇报

---

## 时间分配参考

**快速筛选**（5分钟）：
- verify-sources: 60%
- find-contradictions: 40%

**深度分析**（40分钟）：
- 验证组: 10%
- 批判组: 25%
- 理解组: 50%（expert-insights 30%, framework 20%）
- 延伸组: 15%

**行动导向**（25分钟）：
- expert-insights: 20%
- construct-framework: 20%
- implementation-blueprint: 60%

---

## 常见组合

| 目标 | 模块组合 | 检查点 |
|-----|---------|--------|
| 判断可信度 | verify-sources | 无 |
| 写文献综述 | find-contradictions → timeline → insights → framework | 2个 |
| 投资尽调 | verify → weakness → assumptions → insights → questions | 3个 |
| 产品策略 | insights → framework → implementation | 1个 |
| 管理层汇报 | insights → multi-audience | 1个 |

---

## reAct 触发条件

**立即触发**：
- expert-questions 生成 Tier 1 问题
- 用户说"我去找资料"

**循环执行**：
1. 保留上一轮 framework、insights
2. 新资料聚焦相关问题
3. 增量更新而非重写