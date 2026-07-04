# 多智能体构建模式与实践指南

> 四类智能体构建关注点、框架选择决策矩阵、生产环境最佳实践

## 框架选择建议

#### 按需求选择

- **创意性讨论** → AutoGen
- **明确工程节点** → DeepAgents
- **标准业务流程、团队快速上手** → CrewAI
- **Web3/区块链应用** → ElizaOS
- **快速原型/教育目的** → OpenAI Swarm
- **企业级生产部署** → AgentScope / LangGraph
- **长周期有状态任务** → LangGraph

#### 新手入门建议

新手想快速体验多智能体协作，建议从 CrewAI 入手（简单、文档友好）。复杂生产环境需权衡 AutoGen 的灵活性与 DeepAgents 的工程化稳健性。

## 四类智能体构建关注点

<table>
<thead>
  <tr>
    <th>
      智能体类型
    </th>
    
    <th>
      核心挑战
    </th>
    
    <th>
      推荐架构和模式
    </th>
    
    <th>
      关键考量
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <strong>
        金融智能体
      </strong>
    </td>
    
    <td>
      数据准确性、计算可靠性、合规性
    </td>
    
    <td>
      <strong>
        CrewAI
      </strong>
      
       / <strong>
        DeepAgents
      </strong>
      
       + <strong>
        Prompt Chaining（提示链）
      </strong>
    </td>
    
    <td>
      • 需要精确的外部 API 集成<br />
      
      • 计算逻辑必须可审计、可回测<br />
      
      • 数据存储需要严格的版本控制<br />
      
      • 风险评估需要明确的规则引擎
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        个人助理智能体
      </strong>
    </td>
    
    <td>
      上下文连续性、跨应用集成、隐私安全
    </td>
    
    <td>
      <strong>
        单智能体优先
      </strong>
      
       / <strong>
        OpenAI Agents SDK
      </strong>
      
       + <strong>
        Routing（路由）
      </strong>
    </td>
    
    <td>
      • 日历/邮件等内部数据源的权限管理<br />
      
      • 长周期任务的状态持久化<br />
      
      • 用户偏好的记忆与学习<br />
      
      • 多模态交互
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        客户服务智能体
      </strong>
    </td>
    
    <td>
      意图理解、升级机制、情感处理
    </td>
    
    <td>
      <strong>
        AutoGen
      </strong>
      
       / <strong>
        OpenAI Agents SDK
      </strong>
      
       + <strong>
        Orchestrator-workers（编排器-工作者）
      </strong>
    </td>
    
    <td>
      • 高度模糊的用户请求需要多轮澄清<br />
      
      • 需要灵活的发言者切换<br />
      
      • 人工升级时上下文的无损传递<br />
      
      • 情感识别与安抚策略
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        深度研究智能体
      </strong>
    </td>
    
    <td>
      信息覆盖度、来源可信度、报告质量
    </td>
    
    <td>
      <strong>
        Anthropic Orchestrator-Worker
      </strong>
      
       + <strong>
        Parallelization（并行化）
      </strong>
      
       / <strong>
        Evaluator-optimizer（评估-优化）
      </strong>
    </td>
    
    <td>
      • 并行搜索策略（先广后深）<br />
      
      • 子智能体的关注点分离<br />
      
      • 交叉验证与矛盾识别<br />
      
      • 引用准确性与可追溯性
    </td>
  </tr>
</tbody>
</table>

## 框架详细对比

### 设计哲学差异

<table>
<thead>
  <tr>
    <th>
      框架
    </th>
    
    <th>
      隐喻
    </th>
    
    <th>
      控制方式
    </th>
    
    <th>
      灵活性
    </th>
    
    <th>
      结构化
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      AutoGen
    </td>
    
    <td>
      圆桌会议
    </td>
    
    <td>
      对话驱动
    </td>
    
    <td>
      高
    </td>
    
    <td>
      低
    </td>
  </tr>
  
  <tr>
    <td>
      DeepAgents
    </td>
    
    <td>
      项目经理+专家
    </td>
    
    <td>
      计划驱动
    </td>
    
    <td>
      低
    </td>
    
    <td>
      高
    </td>
  </tr>
  
  <tr>
    <td>
      CrewAI
    </td>
    
    <td>
      公司部门
    </td>
    
    <td>
      角色驱动
    </td>
    
    <td>
      中
    </td>
    
    <td>
      中
    </td>
  </tr>
  
  <tr>
    <td>
      ElizaOS
    </td>
    
    <td>
      Web3 操作系统
    </td>
    
    <td>
      模块化驱动
    </td>
    
    <td>
      高
    </td>
    
    <td>
      中
    </td>
  </tr>
  
  <tr>
    <td>
      OpenAI Swarm
    </td>
    
    <td>
      极简编排
    </td>
    
    <td>
      交接驱动
    </td>
    
    <td>
      高
    </td>
    
    <td>
      低
    </td>
  </tr>
  
  <tr>
    <td>
      AgentScope
    </td>
    
    <td>
      生产级平台
    </td>
    
    <td>
      能力驱动
    </td>
    
    <td>
      中
    </td>
    
    <td>
      高
    </td>
  </tr>
  
  <tr>
    <td>
      LangGraph
    </td>
    
    <td>
      图编排
    </td>
    
    <td>
      状态驱动
    </td>
    
    <td>
      高
    </td>
    
    <td>
      高
    </td>
  </tr>
</tbody>
</table>

### 技术架构差异

- **AutoGen**：对等网络，所有智能体地位相同，可随时互相交流
- **DeepAgents**：树状层级结构，主智能体下挂子智能体，主从关系明确
- **CrewAI**：有向无环图（DAG），任务流像流水线一样清晰
- **ElizaOS**：模块化插件架构，支持 250+ 模型
- **OpenAI Swarm**：极简函数交接机制
- **AgentScope**：MsgHub 灵活编排，支持 K8s 部署
- **LangGraph**：状态图（StateGraph），支持循环和持久化

### 上下文处理方式

- **AutoGen**：直接共享，智能体可直接将上下文发给另一智能体
- **DeepAgents**：完全隔离，高层目标与底层任务细节分开
- **CrewAI**：链式传递，上一步输出直接变成下一步输入（接力赛模式）
- **ElizaOS**：角色文件定义上下文，Evaluators 提取关键信息
- **OpenAI Swarm**：客户端 Sessions 管理，无内置持久化
- **AgentScope**：MsgHub 灵活路由，支持记忆管理
- **LangGraph**：状态管理器持久化，支持检查点恢复

## 生产环境最佳实践

### 状态持久化与错误恢复

智能体可能运行很长时间，需要 durable execution 和从错误点恢复的能力，而非从头重启。

### 调试与可观测性

智能体决策是动态的、非确定性的，需要完整的生产追踪（Tracing）来诊断失败原因。

### 部署策略

- **彩虹部署（Rainbow Deployment）**：避免更新代码破坏运行中的智能体，通过逐渐将流量从旧版本转移到新版本
- **异步执行**：当前主智能体同步等待子智能体完成，异步执行将带来额外并行性但增加协调复杂度

### 长对话的上下文管理

当对话跨越数百轮时，智能体需要：

- 总结已完成的工作阶段
- 将关键信息存储到外部记忆
- 在接近上下文限制时生成具有干净上下文的新子智能体

#### 生成器-评估器分离模式

受 GAN 启发，将生成任务与评估任务分配给不同 Agent 可有效解决自评估偏差。当模型被要求评价自己产出时，往往自信地给予好评——即便质量平庸。分离后，评估器能以更批判性视角审视生成器产出。

该模式在主观质量评估（如前端设计）和可验证正确性任务（如代码开发）中均有效。Anthropic 的实现中，评估器使用 Playwright MCP 直接与页面交互，基于设计质量、原创性、工艺、功能性四项标准评分，驱动多轮迭代优化。

见：[Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)：Anthropic Labs 团队关于长时应用开发的 Harness 设计实践

#### Sprint Contract 协商机制

在生成器与评估器协作前，双方先协商"完成"的具体定义，形成 Sprint Contract。这一机制弥合了用户故事与可测试实现之间的天然鸿沟——将模糊的产品描述转化为明确的验收标准。

合约内容通常包括：功能范围、测试用例、质量阈值。生成器在 Sprint 内自评后提交给评估器，评估器基于 Playwright 实测结果判定通过或返回修改。Anthropic 的 DAW 项目案例显示，
三轮迭代中 QA 环节持续捕获真实缺陷（如"时间轴上 clip 无法拖拽"），证明合约机制的有效性。

见：[Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)：Anthropic Labs 团队关于长时应用开发的 Harness 设计实践
