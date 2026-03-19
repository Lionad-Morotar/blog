---
title: 软件供应链安全
description: 开源软件生态中的传递性信任问题与供应链攻击防范
---

#### 传递性信任问题

开源生态建立在维护者之间的传递性信任之上：一个 800 个传递依赖的包之所以能工作，
是因为链上每个维护者都合理选择和维护了自己的依赖。
但现有工具（npm audit、Dependabot）只能扫描已知漏洞，无法验证维护者的安全实践。

你信任你的维护者，你的维护者信任他们的维护者，但他们是否信任他们维护者的维护者？

#### 供应链攻击案例

* **event-stream 事件**：原维护者将项目交给新人，后者添加恶意依赖
* **xz backdoor**：共同维护者潜伏两年后在构建系统中植入混淆代码
* **codecov bash uploader**：CI 工具被攻击，数千项目受影响

#### 信任边界的局限

Trusted Publishing 和 vendoring 都只是移动了信任边界，而非消除信任需求。
大公司的受控构建仍然依赖编译器、操作系统和硬件——
在某处你总会停止验证，开始信任。

见：[Transitive Trust | Andrew Nesbitt](https://nesbitt.io/2026/03/02/transitive-trust.html)

#### 依赖策略配置的碎片化困境

供应链描述标准（SBOM/CycloneDX/SPDX/OSV）已相当成熟，但**策略规则**（允许哪些许可证、忽略哪些 CVE、封禁哪些包）却处于"各自为政"状态。
调研显示约 40 种工具各有独立配置格式：TOML、YAML、JSON、XML、Kotlin Script、Rego、Web UI 等。
同一概念——如"封禁 GPL-3.0"或"忽略 CVE-2024-XXXX 到 2025-06-01"——在不同工具中词汇、结构、字段名完全不同。
这导致组织使用多个扫描器时必须维护多份平行的忽略列表，既无法同步也难以审计。

见：[The Fragmented World of Dependency Policy](https://nesbitt.io/2026/03/19/the-fragmented-world-of-dependency-policy.html)
