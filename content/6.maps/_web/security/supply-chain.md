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
