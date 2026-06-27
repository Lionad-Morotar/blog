# Avi Chawla (Daily Dose of DS) 写作风格拆解

## 一、核心结构：六段式叙事弧线

### 1. 反直觉钩子（Counterintuitive Hook）

用一句违背常识的话开篇，制造认知冲突。

> "A Smarter Claude Model Burns More Tokens, Not Fewer!"

- **效果**：读者的预期被瞬间打破，被迫继续阅读
- **公式**：[常识性结论] -> [反转] -> [不是...而是...]
- **变体**：可以去掉"Not"结构，直接给出一个看似荒谬的结论

### 2. 数据冲击（Data Shock）

钩子之后立刻给出具体数字，不给读者"缓过来"的时间。

> "And it's not a minor 3-5% difference. But 54% higher token usage."

- **技巧**：先用否定排除"小打小闹"的可能（3-5%），再抛出惊人数字（54%）
- **公式**：否定小数字 -> But + 大数字 + 后果
- **注意**：不要解释数字来源，先砸数字，解释后面再说

### 3. 原因反转（Cause Inversion）

立即反转读者对原因的默认假设。

> "The reason has nothing to do with the model itself. Instead,
it has to do with what the agent needs to know before it can start building."

- **技巧**：否定最明显的解释，然后揭示真正的原因
- **公式**：The reason has nothing to do with [显而易见的原因]. Instead, [真正的原因].
- **目的**：让读者意识到"我也被误导了"

### 4. 问题铺陈（Problem Stacking）

快速罗列读者能感同身受的具体问题，不加修饰。

> "Most backends don't hand over this info cleanly."
> "For instance, with Supabase, asking for OAuth setup via MCP returns the entire auth docs..."

- **结构**：总括句（一句话指出问题）-> 具体例句（一个场景说明）-> 后果（一句话点明代价）
- **节奏**：总->例->果，三个短句构成一组，循环2-3组

### 5. 认知悖论（Cognitive Paradox）

指出一个更深层的矛盾——为什么更好的方案反而更差。

> "A better model does not have a magical way to skip these gaps. In fact, it tries even harder to fill them,
which means more discovery queries, more reasoning, and more retries."

- **公式**：A better [X] does not have a magical way to [做读者期望的事]. In fact, [相反的行为], which means [负面后果].
- **效果**：让读者恍然大悟——原来问题的根源在这里

### 6. 方案展示 + 对比验证（Solution + Contrast）

提出替代方案，用对比数据说话。

> "Supabase: consumed 10.4M tokens / needed 10 manual interventions"
> "InsForge: consumed 3.7M tokens / completed without any errors"

- **技巧**：不要用"better than"，直接列出两栏数据，读者自己对比
- **公式**：[旧方案]：[代价1] / [代价2] -> [新方案]：[代价1] / [代价2]
- **结尾**：不要夸耀新方案，而是指出"这不是Supabase-specific的问题"，把问题泛化，显得客观

---

## 二、段落节奏：单句成段

### 黄金法则

**几乎每句话都是独立段落。** 极少数例外：并列的数据点可以用同一个 bullet list。

### 对比示例

**原文风格（厚段落）：**
> When you're building a full-stack app with a backend, the agent must understand the entire backend architecture, including what tables exist, what RLS policies are configured, which storage buckets are available, which authentication providers are set up, and what edge functions have been deployed. Most backends don't provide this information in a clean, structured way, which forces the agent to make multiple discovery calls.

**Avi风格（单句成段）：**
> When you're building a full-stack app, CC must understand the entire backend, like:
> - what tables already exist
> - what RLS policies are active
> - what storage buckets are available
> - which auth providers are configured
> - and what edge functions are deployed
> Most backends don't hand over this info cleanly.

**差异分析**：
- 长句拆短：把长从句拆成 bullet list
- 去除连接：删除"which forces"、"including"等过渡结构
- 口语化：用"CC"而不是"the agent"，用"hand over"而不是"provide"

---

## 三、词汇策略

### 1. 极简动词

| 避免 | 使用 |
|------|------|
| utilize | use |
| facilitate | help |
| demonstrate | show |
| approximately | ~ |
| significantly | 直接给数字 |

### 2. 强势否定

用否定的形式排除错误答案，而不是正面陈述正确答案。

> "The reason has nothing to do with..."
> "This isn't a Supabase-specific problem."

### 3. 加粗策略

加粗用来标记**关键数据**、**核心结论**和**方案名称**，不是全文乱标。

**必须加粗的内容：**
- 钩子中的核心数字和对比数据（如 **54% higher**、**30k Star**）
- 解决方案的品牌/产品名（如 **Project River**、**Supabase**）
- 反转句中的关键结论（如 **时间维度上的贡献分布**）
- 对比验证中的关键指标

**不要加粗的内容：**
- 普通描述性文字
- 过渡性语句
- 已知的常识

### 4. 避免过渡语

删除所有以下词汇：
- "Furthermore"
- "Moreover"
- "In addition"
- "As a result"
- "Therefore"
- "Consequently"

直接写下一句，读者会自己理解逻辑关系。

---

## 四、中文适配要点

### 英文原文 -> 中文重写时的注意事项

1. **破折号替代**：英文用换行分隔句子，中文可以用——或独立短句
2. **「」引号**：中文技术写作中，用直角引号包裹关键术语更显专业
3. **数字格式**：保留阿拉伯数字，中文语境下数字更醒目
4. **语气词**：中文可以适度加入"老实说"、"实际上"等口语词，增强对话感
5. **段落长度**：中文单句成段可能会显得过碎，可以允许1-2句/段，但要保持节奏感

### 中文改写示例

**原文：**
> 当需要在几个开源项目之间做选择（技术选型，评估引入依赖），你大概会去看 GitHub Star 数、最后提交的时间、Issues 积压情况。这些数据有用，比如 Star 直接和知名度绑定，但因为此类指标没有和时间挂钩，所以不够直观。

**Avi风格改写：**
> GitHub Star 数、最后提交时间、Issues 积压——这些指标有用，但有一个致命缺陷。
> 它们没有和时间挂钩。
> 一个 30k Star 的项目可能已经两年没人维护了。一个 5k Star 的项目可能正处在最活跃的开发周期。
> 你需要的是**时间维度上的贡献分布**，而不是一个静态快照。

---

## 五、风格自检清单

重写完成后，逐条检查：

- [ ] 开头是否有反直觉论点？
- [ ] 前3段内是否出现具体数据？
- [ ] 是否有"The reason has nothing to do with..."式的反转？
- [ ] 段落平均长度是否<=2句话？
- [ ] 是否删除了所有过渡语（Furthermore/Moreover等）？
- [ ] 是否有具体场景/例子说明问题？
- [ ] 是否用对比数据（而非形容词）证明观点？
- [ ] 结尾是否把问题泛化，而不是局限于某个产品？

