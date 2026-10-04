---
title: 六边形与洋葱架构
description: 依赖倒置端口收进核心、六边形与洋葱同一原则双画法、可测性利息与假整洁自检、内外不对称本体、洋葱环名谱系澄清、CI 架构测试守门、mock 所有权
---

#### 依赖倒置把接口收进核心，实现赶到外围

经典分层的病根不是层数，是箭头方向：界面、业务、数据访问一路朝下，数据访问认识数据库驱动和表
结构，业务层为传递数据间接认识字段名，最该稳定的业务规则反而最脆弱，换库的震动从最外层传到最里层。
依赖倒置原则（Dependency Inversion Principle, DIP）把箭头倒过来：高层模块不依赖低层模块，两边都依赖
抽象，且抽象由高层自己定义。落到工程上，订单模块不声明「我要某 ORM 的 save」，只声明「我要一个能
保存订单的端口」，端口接口住在业务核心里，MySQL、PostgreSQL 适配器在外围实现它。编译纪律随之清晰：
核心源文件里禁止出现 JDBC、Redis、HTTP 这些名字，实现依赖接口，细节依赖规则，换库换的是外围实现类，
核心一行不动。

见：[The Hexagonal (Ports & Adapters) Architecture](https://alistair.cockburn.us/hexagonal-architecture)

#### 六边形与洋葱是同一依赖原则的两种画法

六边形从外面看端口：应用在内、外部设施在外，每个端口声明核心需要什么，适配器把外部世界翻译成端口
协议；一次下单请求从 HTTP 适配器进来翻译成命令，穿过端口落到核心用例，规则算完走仓储端口出去，
持久化适配器才第一次写出 SQL，核心全程没见过控制器也没见过 SQL。洋葱从剖面看层次：实体、用例、
接口适配器、框架驱动一圈一圈，硬规矩只有一条，源码依赖必须指向圆心，圈数不重要，箭头朝里才重要，
外圈换框架内圈原封不动编译通过。两者不是竞争方案而是同一原则的两种视角，Robert Martin 2012 年的
整洁架构正是把这一族画法整合成四环图，并把六边形与洋葱都列为先辈。

见：[The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

#### 端口的日常利息是可测性，换库只是广告

架构图上最爱写的好处是「随时可以换数据库」，可绝大多数团队五年里一次库都没换过，端口却为此多写了
一层。真正天天发生的是写单测：没有端口，测下单规则就得起数据库、灌数据、清表；有了端口，内存假
适配器三行代码，上百个用例秒级跑完。这正对上 Cockburn 原始意图里写明的一半：应用要能同等地被用户、
程序、自动化测试或批处理脚本驱动，测试从第一天起就是一等驱动方。适用边界同样明确，Palermo 原文就
说不适合小型站点，适合长生命周期、行为复杂的业务应用：后台管理全是增删改查、规则薄，上端口只会
拖慢改字段；下单、计费、库存预占这种规则密、分支多的地方才最值钱。判断看变化来源，变化总从框架和
数据库进来就倒箭头，变化总从产品字段进来先划模块边界。假整洁有四宗罪：实体还挂表注解（圈对了箭头
没倒）、每个类都配接口（端口比业务方法还多）、用例层原样转发（核心里没规则只有跳转）、目录改名但
import 方向不变。自检两下：核心源文件能否脱离框架编译，单测要不要连真实数据库。

见：[The Hexagonal (Ports & Adapters) Architecture](https://alistair.cockburn.us/hexagonal-architecture)

#### 六条边无关紧要，内外不对称才是本体

六边形的「六」没有含义，Cockburn 选这个形状只是为了摆脱一维分层图、给任意数量的端口留画位。他反复
强调要利用的不对称是内与外，不是左与右：左右（主动进入、被动出去）只是实现期的惯例画法，原文名词
是主动端口（primary）与被动端口（secondary），亦称 driving 与 driven，这个区分是使用模式的后果，
原文明确警告不要拿它短路模式本身。按左右画端口的团队容易把「测试」这个驱动方忘掉，而测试替身恰好
有对偶关系：测试驱动器是主动端口的自然适配器，mock 数据库是被动端口的自然适配器，设计端口时把
测试替身一起设计进去，而不是事后补。

见：[The Hexagonal (Ports & Adapters) Architecture](https://alistair.cockburn.us/hexagonal-architecture)

#### 教程里的洋葱四环多数是 Clean Architecture 的环

Palermo 2008 年原版洋葱的中心是领域模型（Domain Model），核心里只有仓储接口这类行为契约，对象保存
的实现类因为耦合具体数据库被赶到边缘，最外圈留给 UI、基础设施和测试这些变化快的东西；Uncle Bob
2012 年的四环则是实体（Entities）、用例（Use Cases）、接口适配器（Interface Adapters）、框架与驱动
（Frameworks & Drivers）。常见教程把「实体、用例、接口适配器、框架」贴上洋葱标签，实际是 Clean 的
环被安到了洋葱头上。读旧文时按环名对号入座：用 Clean 的环名评判 Palermo 的洋葱，会把「没有用例圈」
误判为缺陷，而人家原版核心的重点是领域模型与仓储接口的位置。

见：[The Onion Architecture : part 1](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)

#### 依赖规则不靠编译器自觉，靠 CI 架构测试守门

「编译器帮你守规矩」在 TS/JS 生态是句空话：TypeScript 编译器默认不拦 domain 目录里 import 数据库
驱动，编译照过、类型照通，「核心能否脱离框架编译」仍是一项人工自检。把自检变成门禁的是 CI 里的
架构测试：Java 的 ArchUnit 分析字节码，断言领域包不得依赖基础设施包，违规即构建失败；JS/TS 侧对应
dependency-cruiser 与 eslint-plugin-boundaries。这与其余边界三档防御（目录约定、编译器强制、CI
架构测试）是同一族工具，模块化单体用它们守横向模块边界，这里用来守纵向依赖方向，让架构不漂移。

见：[ArchUnit](https://archunit.org)

#### 只 mock 自己拥有的端口

单测里图省事直接 mock 数据库驱动的连接类型，某天驱动大版本升级改了结果集方法签名，几百个测试同时
变红，不是业务代码坏了，是 mock 的假设碎了，修复成本远大于当初省下的一个适配器。伦敦学派 TDD 的
规则「别 mock 你不拥有的东西」（Don't mock what you don't own，Freeman 与 Pryce《Growing
Object-Oriented Software, Guided by Tests》2009）说的就是这个：只对拥有定义的抽象做替身。六边形
恰好给出「拥有」的边界，核心调用自家端口，假适配器实现自家端口，三方 SDK 被适配器关在门外。这条
原则的边界案例至今有争论，2025 年中社区仍在活跃讨论其适用范围，但「替身只接自己的端口」在六边形
语境下没有争议。

见：[Don't Mock What You Don't Own in 5 Minutes](https://hynek.me/articles/what-to-mock-in-5-mins/)
