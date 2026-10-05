---
title: 微服务
description: 组织扩展标的与 monolith first、数据所有权分水岭、Saga 隔离性反制、可用性乘法与重试风暴、Outbox 至少一次、共享库分布式单体、sidecar-less 网格
---

#### 标的物是组织扩展，不是技术先进

微服务（microservices）把一个应用拆成一组可独立部署的小服务，常被当成性能或工程先进性的选择，
其实标的物是组织扩展：拆出独立部署单元后，各团队按自己的节奏发布、独立扩缩容、故障不再全有全无。
与三个相邻形态的边界要分清：模块化单体在进程内用编译期与架构测试守边界，微服务把边界升格为网络与独立部署；
SOA 靠智能总线（ESB）集中编排，微服务主张智能端点、哑管道（smart endpoints, dumb pipes），
逻辑收进服务本体，管道只负责传输。最坏的形态是分布式单体（distributed monolith）：
进程拆了，但服务间靠链式同步调用、强制版本对齐的共享库与共享数据库耦合，
分布式税全额照交，独立部署的收益一点没拿到。

见：[Microservices](https://microservices.io/patterns/microservices.html)

#### 数据所有权是真假微服务的分水岭

微服务的纪律是每个服务独占自己的数据库（database per service），其他服务不得直连它的表，
只能走它的接口或订阅它的事件。这不是洁癖而是耦合切断点：共享库或共享表让 schema 变更跨服务即时波及，
边界画在架构图上、真实耦合埋在数据里。独立持数据立刻派生两个子问题：跨服务的写一致性交给 Saga；
跨服务的查询不能跨库 join，要么 API 组合（依次调用各服务拼接结果），要么 CQRS（命令查询职责分离，
为查询侧建一份由事件回放维护的独立读模型）。

见：[Database per Service](https://microservices.io/patterns/data/database-per-service.html)

#### Saga 把跨服务事务拆成本地事务加补偿

数据库事务跨不了多个服务的库，跨服务的业务原子性靠 Saga：把业务流程写成一串本地事务，
每步配一个补偿操作（compensating action），中途失败就逆向执行已完成步骤的补偿。
两种协调风格各有代价：编排（orchestration）由中心协调器逐步指挥各服务，流程集中可见，
但协调器易成单点与瓶颈；协同（choreography）靠服务间事件驱动，各服务听到事件自行行动，
松耦合但流程散落各仓，改流程要在多个代码库里找逻辑。

见：[Saga](https://microservices.io/patterns/data/saga.html)

#### Saga 不提供隔离性，补偿写完仍会丢更新

Saga 只保原子性，牺牲了隔离性（isolation）：每个本地事务一提交，中间状态立刻对外可见，
并发的两个 saga 会在对方的中间状态上做决策。典型异常是丢失更新（lost update）：
一个 saga 的补偿操作把另一个 saga 刚写入的值覆盖掉，另有脏读与不可重复读。
Richardson 在《Microservices Patterns》第 4 章给出三种最常用反制手段（countermeasures）：
语义锁（semantic lock），用 PENDING 一类的状态字段标记记录处于未完成事务中，让并发方识别后等待或拒绝；
可交换更新（commutative updates），把写设计成与顺序无关的运算（如金额加减），丢失更新自动消失；
重读验证（reread value），提交前重读一遍确认未被并发改动，脏了就重启 saga。
选型评估时「用了 Saga」只是入场券，真正的工作量在审计哪些流程存在并发重叠的 saga 对、
每个重叠点用哪种反制堵漏。

见：[Microservices Patterns Chapter 4](https://livebook.manning.com/book/microservices-patterns/chapter-4/)

#### 同步调用的可用性按乘法衰减

通信默认倾向异步事件，这条可以从一道算术推出：可用性是乘法不是平均，
3 个 99.9% 可用的服务串成同步链路，端到端只剩约 99.7%，月停机从约 43 分钟涨到约 2 小时，
链路越长衰减越狠。异步事件下发送方发布后不等结果，接收方各自消费，
任何一方短暂不可用都不阻塞整条链，可用性从乘法变回各自独立。
同步调用只留给真正需要即时答案的场景，且必须配超时、熔断、舱壁三件防御
（故障形态的账与三件套在单体拆分时机的「拆分换掉故障形态」条目已记）。

见：[Microservices - Martin Fowler](https://martinfowler.com/articles/microservices.html)

#### 重试层层相乘成重试风暴

下游开始超时后，上游为每个请求重试 3 次，上游的上游又对上游重试 3 次，
两层相乘就是 9 倍、三层 27 倍流量打向已不堪重负的下游，「慢」被直接放大成「死」；
恢复瞬间所有客户端按对齐的间隔同时重发，同步波把刚爬起来的服务二次打死。
防御组合：指数退避加抖动（exponential backoff with jitter），间隔指数拉长并加随机量打散同步波，
出处是 AWS 的 Marc Brooker 2015 年论文；重试预算（retry budget）限制重试请求占总流量的比例
（如不超过 10%），超额直接失败；重试策略只在每个依赖的边界配置一处，绝不层层叠加；
熔断器打开后直接拒绝请求。全部手段的前提是消费端幂等，否则每次重试都是一次新副作用。

见：[How to Fix 'Retry Storm' Issues in Microservices](https://oneuptime.com/blog/post/2026-01-24-retry-storm-microservices/view)

#### Outbox 堵双重写入，投递语义是至少一次

服务在一个事务里写业务表、再调消息队列发事件，进程在两步之间崩溃，库里有数据、消息没出去，
这就是双重写入（dual-write）问题。事务性发件箱（transactional outbox）的解法：
把待发消息当普通行写进同库的 outbox 表，与业务数据同事务提交，再由独立中继（relay）读表投递。
两个语义必须清楚：投递保证是至少一次（at-least-once），崩溃恢复后必然重发，恰好一次是神话，
消费端必须幂等（去重表或幂等键）；中继两种实现各有代价，轮询发布器（polling publisher）定时扫表，
简单但压库且有秒级延迟，CDC（change data capture，读数据库 binlog，典型工具 Debezium）
开销低延迟小但运维重。消息顺序保证只到分区级，跨分区乱序是常态。

见：[Transactional outbox](https://microservices.io/patterns/data/transactional-outbox.html)

#### 共享库对齐契约会把部署退回单体

拆出八个服务，为「复用」把所有 DTO、事件契约、领域枚举抽成一个 common 包，
此后每改一个字段都要全量服务升级依赖、协调同一发布窗口才能保证兼容：
改一个服务必须触碰其他所有服务的部署。这是分布式单体最隐蔽的成因，
因为它在代码评审里看起来是最佳实践（DRY、类型安全）。判定标准只有一条：
改一个服务是否必须触碰其他服务的部署。共享库只允许装与业务无关的技术件
（日志封装、HTTP 客户端、重试工具），服务间契约靠版本化的 API 与 schema
（schema registry、语义化版本的事件契约）解耦。

见：[Shared Database and Shared Library Coupling](https://softwarepatternslexicon.com/microservices-boundaries-and-service-decomposition/anti-patterns/shared-database-library-coupling/)

#### 流量入口收进网关，治理下沉到网格

实例动态上下线后互相寻址靠服务发现（service discovery）；对外流量需要统一入口
做认证、限流与路由，这是 API 网关（API gateway）。再往下一层是服务网格（service mesh）：
把重试、超时、mTLS 加密、流量切分从每个业务的代码里抽出来下沉到基础设施层，
业务代码不再重复实现治理逻辑。当前方向是 sidecar-less：经典网格给每个 Pod 注入一个 sidecar 代理，
资源开销与升级耦合都重；Istio 的 Ambient 模式改用节点级 ztunnel（Rust 实现的 L4 代理）
加按需启用的 waypoint 处理 L7 策略，2024 年末 GA，与 Cilium 一类基于 eBPF 的方案构成同一下沉趋势。

见：[Ambient Mode - Istio](https://istio.io/latest/docs/ambient/)

#### monolith first：小团队、边界未清与基建缺位时不拆

主流建议仍是 monolith first：先做模块化单体，等组织压力真实出现再按信号拆
（信号判据见单体拆分时机的四信号条目）。三类典型反指：小团队（两个披萨以内）拆微服务，
协调成本大于收益；领域边界没摸清就拆，拆错的边界再合并代价极高，
模块化单体的模块边界才是低成本试错场；容器编排与可观测三件套（分布式追踪、集中日志、指标）
没建起来就拆，微服务一个请求跨多个进程，没有 trace ID 贯穿就无法排障，
观测从加分项变成生存必需。行业经历 Prime Video 等回退案例后进入「合适论」阶段：按需拆、拆最小的份。

见：[When not to use microservices: 4 challenges to consider](https://www.techtarget.com/searchapparchitecture/tip/When-not-to-use-microservices-Challenges-to-consider)
