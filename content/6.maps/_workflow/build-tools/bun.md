---
title: Bun
description: Bun 构建工具与运行时知识，聚焦字节码缓存（Bytecode Caching）的原理、用法与取舍
---

## 字节码缓存（Bytecode Caching）

#### Bun 字节码缓存的用法与产物

Bun 的 bundler 提供 `--bytecode` 标志，把 JS 解析与字节码编译前置到构建期，
换取运行期启动加速。构建产物是成对文件：`index.js`（打包后的源码）与
`index.jsc`（字节码缓存），运行时执行 `bun ./dist/index.js` 自动检测并加载同名 `.jsc` 文件。

ESM 与 CommonJS 支持不对称：CommonJS 无需 `--compile`；ESM 必须配合
`--compile` 生成独立可执行文件，因为 Bun 需把模块元数据（import/export
信息）嵌入二进制，引擎运行期才能完全跳过解析。字节码可与
`--minify --sourcemap` 组合：`--minify` 先缩小代码再生成字节码（代码少则
字节码少），`--sourcemap` 保留指向原始源码的错误定位。

调试可用 `BUN_JSC_verboseDiskCache=1` 验证缓存是否命中，成功输出
`[Disk cache] cache hit for sourceCode`。builtin 模块的 JS 不做字节码缓存，
出现多次 cache miss 属正常现象。

见：[Bytecode Caching | Bun Docs](https://bun.com/docs/bundler/bytecode)

#### 字节码缓存的原理：unlinked 与 linked bytecode

JavaScript 引擎执行源码要经过解析（parse）→ 字节码编译 → 执行三步，
每次运行都重复前两步。`.jsc` 缓存的是 unlinked bytecode：指令流、常量池、
标识符表与控制流信息，不含指向运行时对象的指针、JIT 机器码、profiling
数据与调用链接信息，因此不可变、可被多次执行共享。运行时 Bun 把它链接成
linked bytecode，逐次补充调用链接信息、类型 profiling 与 JIT 编译状态，每次
运行重新生成——昂贵的解析编译只做一次，热路径优化仍由真实执行模式驱动。

`.jsc` 加载时做双重校验：头部 cache version 是 JavaScriptCore 框架版本的
哈希；SourceCodeKey 包含源码哈希、源码长度与编译 flags（strict mode、
script/module、eval 上下文等），同一源码在不同 flags 下编译出不同字节码。
字节码不内嵌源码，`.js` 与 `.jsc` 必须同时部署，脱离 `.js` 的 `.jsc` 无法使用。

见：[Bytecode Caching | Bun Docs](https://bun.com/docs/bundler/bytecode)

#### 字节码缓存与惰性解析

现代引擎用惰性解析（lazy parsing）控制启动开销：函数首次被调用时才解析，
因此解析工作不是一次性的启动成本，而是散布在整个应用生命周期，随不同
代码路径的执行持续发生。字节码缓存构建期预编译全部函数——包括永远不会
被调用的惰性解析函数——把解析一次性前置到构建时间。这解释了字节码缓存
的收益为何不只体现在启动那一刻。

见：[Bytecode Caching | Bun Docs](https://bun.com/docs/bundler/bytecode)

#### 字节码缓存的版本兼容与架构可移植性

字节码跨 Bun 版本不兼容：JavaScriptCore 的字节码格式随版本演进（opcode
增减、元数据结构变化），升级 Bun 后旧 `.jsc` 因 cache version 哈希不匹配被
静默拒绝，回退解析 `.js` 源码——应用照常运行，只是优化被跳过，属
fail-open 设计。工程上应把字节码生成纳入 CI/CD 构建流程，不把 `.jsc` 提交
进 git，升级 Bun 后重新生成。

字节码跨架构可移植：构建于 macOS ARM64 可部署到 Linux x64 或 AWS Lambda
ARM64，架构相关优化发生在运行期 JIT 编译，不落进缓存字节码。字节码也不
是混淆手段：它不隐藏源码，伴随的 `.js` 文件完整可读。

见：[Bytecode Caching | Bun Docs](https://bun.com/docs/bundler/bytecode)

#### 字节码的体积代价与缓解

`.jsc` 通常比 `.js` 大 2-8x，体积来源：一行压缩 JS 可编译成数十条指令；
常量池全量存储字面量与属性名；每个函数（哪怕一行）都带完整元数据（寄存器
分配、code features 位掩码、parse mode、异常处理器、表达式位置表）；
profiling 数据结构即使为空也预分配；控制流目标（jump targets、switch
tables、异常边界）预计算。

缓解手段：gzip/brotli 对字节码压缩率可达 60-70%；先 `--minify` 再生成
字节码——短标识符缩小标识符表、死代码消除减少指令量、常量折叠减少常量池
条目。代价与收益对等：2-4x 体积换 2-4x 启动加速，对 CLI 分发通常值得，对
长驻服务器影响更小。

见：[Bytecode Caching | Bun Docs](https://bun.com/docs/bundler/bytecode)

#### 字节码缓存的适用场景

收益随代码量增长：小型 CLI（<100KB）启动快 1.5-2x，中大型应用（>5MB）
快 2.5-4x。适合三类场景：频繁调用的 CLI 工具（linter、formatter、git
hooks，如 tsc/prettier/eslint 型工具，启动时间即用户体验）；构建脚本、
测试运行器等开发期执行数百上千次的工具，单次省下的毫秒随调用次数复利；
分发给他人的独立可执行文件，单文件分发便利，启动速度比体积更被感知。
应跳过：一次性脚本、只运行一次的代码、开发构建、体积受限环境。生产 CLI
与 serverless 部署用 `--bytecode --minify --sourcemap` 组合，性能与可调试
性兼得。

见：[Bytecode Caching | Bun Docs](https://bun.com/docs/bundler/bytecode)
