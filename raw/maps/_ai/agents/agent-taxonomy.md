# Agent 分类学

> Russell & Norvig 经典智能体分类体系及三个互补分类维度

## Russell & Norvig 提出的五大智能体类型

来自《人工智能：一种现代方法》（AIMA）第 2 章的经典分类体系，按能力递增排列：

### 1. 简单反射智能体（Simple Reflex Agent）

基于当前感知，使用条件-动作规则（Condition-Action Rules）直接响应。无状态设计，不存储历史信息，决策延迟通常在毫秒级。典型示例是自动恒温器：当温度低于设定值时启动加热，达到目标后关闭。

### 2. 基于模型的反射智能体（Model-Based Reflex Agent）

维护内部状态（世界模型），追踪"我在哪里"、"我做过什么"。理解环境自主演化规律和行为作用反馈机制，能够应对部分可观测环境。核心组件包括传感器、内部模型、推理组件和执行器。

### 3. 基于目标的智能体（Goal-Based Agent）

具备未来状态预测能力，通过搜索与规划算法寻找达成目标的最优路径。与模型反射的本质区别在于：从"当前情况下做什么"（reactive）转向"为了达成目标应该做什么"（proactive），能够牺牲短期利益换取长期目标。

### 4. 基于效用的智能体（Utility-Based Agent）

使用效用函数（Utility Function）评估结果优劣，不仅问"能否达成目标"，更问"哪种方式最优"。能够在多目标间进行权衡优化，选择综合评分最高的路径（如同时考虑时间、能耗、安全等维度）。

### 5. 学习型智能体（Learning Agent）

包含四大核心组件：性能元件（基于当前知识选择动作）、评判器（评估表现并提供反馈）、学习元件（根据反馈更新知识库）、问题生成器（建议探索未尝试的动作）。通过观察 → 学习 → 行动 → 反馈 → 适应的循环持续改进性能。

**参考**：

- [AIMA 第 2 章 PDF](https://aima.cs.berkeley.edu/4th-ed/pdfs/newchap02.pdf)
- [AIMA 伪代码仓库](https://github.com/aimacode/aima-pseudocode)

---

## 智能体的三个互补分类维度

除了 Russell & Norvig 按能力递增的纵向分类，智能体还可从三个互补的横向维度进行系统性分类，分别对应**决策复杂度**、**决策时序**和**知识形态**：

### 维度一：基于内部决策架构的分类（Decision Architecture）

反映智能体从简单到复杂的演进路径：

<table>
<thead>
  <tr>
    <th>
      类型
    </th>
    
    <th>
      核心特征
    </th>
    
    <th>
      典型示例
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      简单反射型
    </td>
    
    <td>
      基于当前感知直接映射到行动，无记忆
    </td>
    
    <td>
      自动恒温器、简单分拣机器人
    </td>
  </tr>
  
  <tr>
    <td>
      基于模型的反射型
    </td>
    
    <td>
      维护内部世界模型，处理部分可观测环境
    </td>
    
    <td>
      自动驾驶中的障碍物推断
    </td>
  </tr>
  
  <tr>
    <td>
      基于目标型
    </td>
    
    <td>
      具备显式目标表示，能规划行动序列
    </td>
    
    <td>
      GPS 导航、路径规划
    </td>
  </tr>
  
  <tr>
    <td>
      基于效用型
    </td>
    
    <td>
      通过效用函数量化不同状态，进行多目标权衡
    </td>
    
    <td>
      智能推荐、资源调度
    </td>
  </tr>
  
  <tr>
    <td>
      学习型
    </td>
    
    <td>
      能从经验中改进性能，具备自适应能力
    </td>
    
    <td>
      AlphaGo、强化学习智能体
    </td>
  </tr>
</tbody>
</table>

### 维度二：基于时间与反应性的分类（Temporal Reactivity）

揭示智能体设计中**速度**与**最优性**的核心权衡：

<table>
<thead>
  <tr>
    <th>
      类型
    </th>
    
    <th>
      特点
    </th>
    
    <th>
      优势
    </th>
    
    <th>
      代价
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      反应式 (Reactive)
    </td>
    
    <td>
      即时响应，感知-行动直接映射
    </td>
    
    <td>
      速度快、计算开销低
    </td>
    
    <td>
      短视，易陷入局部最优
    </td>
  </tr>
  
  <tr>
    <td>
      规划式 (Deliberative)
    </td>
    
    <td>
      深思熟虑，系统探索未来可能性
    </td>
    
    <td>
      战略性、有远见
    </td>
    
    <td>
      时间和计算成本高
    </td>
  </tr>
  
  <tr>
    <td>
      混合式 (Hybrid)
    </td>
    
    <td>
      结合两者优点，分层或循环架构
    </td>
    
    <td>
      既能快速反应又能长期规划
    </td>
    
    <td>
      架构复杂度高
    </td>
  </tr>
</tbody>
</table>

现代 LLM 智能体通常采用**"思考-行动-观察"循环**，将规划（Reasoning）与反应（Acting & Observing）融为一体。

### 维度三：基于知识表示的分类（Knowledge Representation）

这是 AI 领域持续半个多世纪的范式辩论，关乎智能体"思想"中知识的存储形式：

<table>
<thead>
  <tr>
    <th>
      范式
    </th>
    
    <th>
      核心信念
    </th>
    
    <th>
      比喻
    </th>
    
    <th>
      优势
    </th>
    
    <th>
      缺陷
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      符号主义 (Symbolic AI)
    </td>
    
    <td>
      智能源于对符号的逻辑操作
    </td>
    
    <td>
      "一丝不苟的图书管理员"
    </td>
    
    <td>
      透明、可解释、决策可追溯
    </td>
    
    <td>
      脆弱性、"知识获取瓶颈"
    </td>
  </tr>
  
  <tr>
    <td>
      亚符号主义 (Sub-symbolic AI)
    </td>
    
    <td>
      知识内隐分布在神经网络中
    </td>
    
    <td>
      "牙牙学语的孩童"
    </td>
    
    <td>
      强大的模式识别，对噪声鲁棒
    </td>
    
    <td>
      黑箱、不透明、可能幻觉
    </td>
  </tr>
  
  <tr>
    <td>
      神经符号主义 (Neuro-Symbolic AI)
    </td>
    
    <td>
      融合两者，既能学习又能推理
    </td>
    
    <td>
      卡尼曼"系统1+系统2"
    </td>
    
    <td>
      兼具直觉与逻辑
    </td>
    
    <td>
      实现复杂度高
    </td>
  </tr>
</tbody>
</table>

**Insight**：三个维度相互正交，一个智能体可同时属于多个类别。例如，一个现代 AI 科研助手可能是"基于效用的"（架构维度）+ "混合式"（时间维度）+ "神经符号主义"（知识维度）的组合。LLM 智能体打破了传统分类边界——
其神经网络内核提供亚符号的模式识别（系统1），而通过 Chain-of-Thought 生成结构化推理又实现了符号主义的逻辑能力（系统2）。

**参考**：

- [初识智能体 Part 2：智能体的决策架构与认知模型](https://m.blog.csdn.net/projectfailed/article/details/156515034)
- [大模型智能体（LLM Agent）基础入门](https://blog.csdn.net/sundehui01/article/details/156953170)
