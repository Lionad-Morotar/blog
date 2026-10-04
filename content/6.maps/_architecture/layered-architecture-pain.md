---
title: 经典分层架构的痛点
description: 三层与 MVC 的病灶因果链、贫血模型的成本账、不变量强制点与 Vertical Slice 替代方案
---

#### 经典分层架构的病灶：规则失去唯一居所

经典三层（UI/BLL/DAL）与 MVC 叠加，落到目录就是 controllers、services、repositories 三层。
它当初解决的是单文件时代改按钮文案误伤折扣算式的问题，在规则很薄的小 CRUD 系统里至今够用。
病灶不在分层结构本身，而在于分层把「数据」和「行为」拆开后，规则失去了唯一合法居所，
之后的一切都是这条裂缝的下游：订单对象只剩字段没有方法（贫血模型）；
折扣规则渗漏到 Controller、Service、SQL 各存一份拷贝，单一真相消失，改一处漏两处；
无处安放的规则全堆进 Service，GodService 涨到没人敢读完，三个目录同时膨胀；
Service 直接 import 驱动，依赖箭头从业务层直插 MySQL，分层图名存实亡；
按技术层切目录把一个功能撕成三片，一次改动跨三个文件夹，架构图上三层整齐、代码里功能破碎。
判断一个项目该不该动架构的标准不是代码量，而是规则有没有开始分叉：
同一条业务规则出现第二份拷贝，病灶就种下了。
2003 年 Martin Fowler 把贫血模型命名为反模式，DDD 确立充血模型正统；
2018 年前后 Jimmy Bogard 推广 Vertical Slice（按功能切目录、拆掉层间门禁），
当下主流共识是按 feature 打包、层退化为切片内部的薄管道，而非消灭分层。

见：[Anemic Domain Model - Martin Fowler](https://martinfowler.com/bliki/AnemicDomainModel.html)

#### 贫血模型是付了领域模型的成本跑事务脚本

Fowler 2003 年原文给的不是审美偏好，是一笔成本收益账：采用领域模型（Domain Model）要付的真实成本
是一整层 O/R 映射（对象与数据库表的转换层），这笔钱只有用对象组织起复杂业务逻辑时才花得值。
贫血模型把行为全部抽进 Service 后，剩下的逻辑组织方式在模式学上叫事务脚本（Transaction Script），
一种更古老、更简单的组织方式，本来就不需要对象和 ORM 映射层。
等于付了领域模型的全部过路费，跑的却是事务脚本的货。
落到决策上：评估要不要把规则搬回对象，先看项目是否真的在为 O/R 映射层付费，
表和对象天然一一对应时，业务多半没复杂到需要为充血付钱。

见：[Anemic Domain Model - Martin Fowler](https://martinfowler.com/bliki/AnemicDomainModel.html)

#### 改一漏二的根因是不变量失去强制执行点

校验写在 Service 里只对「经过 Service 的调用」生效，任何新入口，
新的 Controller、定时任务、消息消费者、数据修复脚本，都是绕过校验的合法通道。
贫血模型下，「库存不足必须拒单」这类不变量（invariant，任何时候都必须为真的业务约束）没有法定的强制执行者，
一条 `UPDATE orders SET discount = 30` 的直改就能产出一批非法订单，每个人都在问「谁忘了改」，
但真正的问题是校验从「结构的保证」退化成了「某些路径的习惯」。
充血模型的答案是把不变量关进对象内部：Order.place() 拒绝非法状态，非法订单根本造不出来。
这也是 DDD 把「对象自己保护不变量」当核心主张的原因，业务逻辑渗漏（改一漏二）只是症状。

见：[Anemic Domain Model - Martin Fowler](https://martinfowler.com/bliki/AnemicDomainModel.html)

#### Service 层的合法边界是薄协调，不是垃圾桶

Evans 在 DDD 里的定义可以直接当评审标准：应用层（Application Layer，即通常的 Service 层）应当保持薄，
只负责协调任务（下单流程要走校验、扣库存、发事件三步），不含业务规则和知识，
也不持有反映业务状态的数据，规则住在领域层。
对照到代码：Service 方法里出现 `if (amount > 100)` 这类业务判断就是越界信号，
正确的问法是「这条规则应该由哪个领域对象来回答」，它属于 Order、属于 PromotionPolicy，
唯独不属于流程编排者。
可操作的检查：把 Service 方法读一遍，删掉所有业务 if 后剩下的只是
「取对象、调对象方法、存回去」，这层就是健康的。

见：[Anemic Domain Model - Martin Fowler](https://martinfowler.com/bliki/AnemicDomainModel.html)

#### Vertical Slice 拆的是层间门禁，不是文件搬家

对「按 feature 切」的常见误解是「把三层文件搬到功能文件夹里」，结果只做了目录搬家，痛点照旧。
Jimmy Bogard 的原始主张更激进：把 n-tier 分层之间的门禁（gate）和屏障（barrier）整个拆掉。
传统三层的铁律是 Controller 只能调 Service、Service 只能调 Repository；
而在 vertical slice 里，一个请求切片内部直接包含 endpoint、校验、handler、持久化的直连调用，
切片之间互不引用、各自演进。他自述用这种方式做了七八年、覆盖各类应用，
「无法想象回到分层的约束里」。
关键区别在耦合方向：分层让所有功能沿同一组纵向管道耦合（改一次签名，40 个文件跟着动），
切片让功能沿横向隔离（每个切片自己决定要不要校验、要不要事务），MediatR 这类库就是配套产物。

见：[Vertical Slice Architecture - Jimmy Bogard](https://www.jimmybogard.com/vertical-slice-architecture/)
