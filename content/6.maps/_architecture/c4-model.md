---
title: C4 模型
description: 架构可视化的四层抽象焦距、三张补充图、静态结构边界与 model as code 工具生态
---

#### C4 用四层抽象焦距治「一张图混四种粒度」

一张架构图同时塞进人、进程、模块、类四种粒度的盒子，是评审会「看不懂」的根源：箭头没有约定
（是调用、依赖还是部署），同一根线被每个角色脑补出自己的解释。C4 模型（C4 model，Simon Brown 提出）
的做法是对同一套系统按四层抽象分别出图，每层只回答一个问题：Context（系统上下文）画「谁在用、
它挨着谁」，中央一个系统盒子加人与外部系统，箭头写动作（下单、扣款）；Container（容器）画
「有哪些能独立部署运行的部件」（Web 应用、API 进程、数据库、消息队列），箭头必须标协议
（HTTPS、gRPC、SQL、AMQP）；Component（组件）画容器内部模块分工，箭头写方法调用；Code（代码）
画类与接口，只在动手改代码时打开。注意 Container 不是 Docker 容器，是「能独立跑起来」的逻辑
部署单元，这是 C4 最常见的术语误读。缩放要按「人、进程、模块、类」逐级放大，不能跳级；
对老板与产品只讲 Context，团队对齐用 Container 与 Component，类图留在编辑器里。官方立场是
四层不必全画，Context 加 Container 对多数团队已足够，只画加值的层。三个常见坑（一图混四层、
箭头不写协议、拿部署拓扑冒充 Container）的共同根源都是焦距没锁死。

见：[C4 model - Diagrams](https://c4model.com/diagrams)

#### C4 的完整图型是 4 层核心加 3 张补充图

C4 名称来自四张静态结构图，但官方图型全集还包括三张补充图（supporting diagrams）：
System Landscape（系统景观图）是不聚焦特定系统的系统上下文图，把多个系统各自退化为一个盒子画全景；
Dynamic（动态图）给某条用例的调用链标上编号箭头，回答「一次请求按什么顺序走完」；
Deployment（部署图）把容器实例放进部署节点，回答「跑在哪些服务器、Pod 上」。
Deployment 图画的是容器实例与运行环境的映射，不是机柜照片，与「部署拓扑不是 Container 图」
并不矛盾：前者是合法的补充图型，后者的错误在于拿运维视角的拓扑冒充容器层的逻辑结构。

见：[C4 model - Diagrams](https://c4model.com/diagrams)

#### C4 只管静态结构，也不隐含分工流程

官方 FAQ 划了两条常被越过的边界。其一，C4 的射程是软件系统的静态结构：业务流程、工作流、
状态机、领域模型、数据模型都不在覆盖范围，官方明说该用 BPMN、UML 状态图、ER 图等自由补充，
两套图并存不冲突；已在用 UML、ArchiMate、SysML 且运转良好的团队，官方的建议是 stick with it。
适用性上，C4 为自研定制系统设计，嵌入式固件与重度定制产品（SAP、Salesforce 实施）不合适。
其二，「设计流程应该跟着 C4 层级走、不同角色负责不同层的图」（业务分析画 Context、架构师画
Container 之类）被官方点名为常见误解：C4 只是描述系统的抽象层级，不隐含任何交付过程分工，
给不同受众选不同焦距，不等于给不同岗位派画图任务。另外它与 arc42 文档模板可直接映射
（Context and Scope 对 Context 图，Building Block View 三级对 Container、Component、Code）。

见：[C4 model - FAQ](https://c4model.com/faq)

#### 沿革与工具生态：从 diagrams as code 到 model as code

C4 起源于 2006-2009 年 Simon Brown 的架构培训课，2010 年命名四类图（context、containers、
components、classes），2011 年初首次使用「C4」之名，2015-2016 年第四层从 classes 更名 code；
Spotify、Decathlon、Co-op 等有公开案例。工具侧的分水岭是画图（diagramming）与建模（modelling）
之别：画图工具一张图一个文件，模型改了图不会跟；建模工具把架构维护成一个版本化的数据源
（模型即代码，model as code），图只是模型查询出来的视图，可导出 PlantUML、Mermaid、Ilograph
等多种呈现。Structurizr 是这一路线的原生实现（DSL 加渲染），其 Lite 与 DSL 已全开源，
云服务于 2026 年初宣布关闭并发布 vNext；商业侧 IcePanel 体验最佳但不能导出代码，开源侧常用
C4-PlantUML 与 Mermaid 的 C4 支持。规模化上官方建议靠建模工具拆图：数百个组件的系统不要画
一张大图，按业务域或限界上下文（bounded context）拆成多张同层级聚焦小图，每张画一个服务的
最近入站与出站依赖。

见：[C4 model - FAQ](https://c4model.com/faq)
