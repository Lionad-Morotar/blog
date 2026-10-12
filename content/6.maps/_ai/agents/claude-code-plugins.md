---
title: Claude Code 插件
description: claude-code-mermaid 案例深潜：MessageDisplay 屏显层契约、流式会合状态机与 wasm 渲染工程决策
---

## Brief

claude-code-mermaid 是一个 Claude Code 插件，把回复里的 mermaid 围栏在屏幕上替换为 Unicode 盒线字符画，
全程离线（Node ≥ 18、零 npm 依赖，核心是 162KB 的 wasm）。与最易混淆的浏览器预览类 MCP 相比，它出字符画
而非真图，换取零依赖零网络；只支持 flowchart、sequence、state、class、er 五类图。渲染器出处链：Grok CLI
（xai-org/grok-build）的 Rust 终端渲染器经 Simon Willison 编译为 wasm，插件再分发并包上流式显示层。

#### MessageDisplay 是 Claude Code 唯一只作用于屏显层的 hook 事件

Claude Code 约有 35 个 hook 事件，几乎全部作用于执行流（拦截工具调用、注入上下文、裁决权限），只有
MessageDisplay 作用于显示层：它把回复流按「新完成的行」分批交给插件进程，插件输出 `displayContent`
即可替换屏幕上的这一批文本，省略输出则原文直通。它的权力边界被刻意收窄：无 decision control，不能阻断
消息，`systemMessage` 与 `continue` 被直接丢弃，transcript 存储与模型所见始终保持原文。由此形成三层分离：
屏幕显示可被任意改写，存储与模型上下文不可触碰，模型永远校验不了自己「画」出的渲染效果。

见：[Claude Code hooks 文档](https://code.claude.com/docs/en/hooks)

#### claude-code-mermaid 的流式会合：扣住、落盘、原样吐回

回复流式到达，每批增量文本触发一个全新 node 进程，单个进程凑不齐完整围栏。插件用状态机三层化解：开着的
mermaid 围栏整块扣住不发，用户看到的是延迟到齐的整幅图；中间状态落盘 `/tmp` 下以「会话 ID-消息 ID」命名
的文件，围栏关闭或 final 即删，普通消息不留痕迹；final 时围栏还开着就把攒下的原文原样吐回，宁可显示源码
也不丢内容。成本控制是配套的：hook 不写 stdout 即原文直通，每批先做围栏特征正则预检，不命中则连状态文件
都不读不写，绝大多数批次零磁盘成本。任何「改流式显示」的插件都要重解这道跨进程会合题，这份实现是现成参考。

见：[gecm0/claude-code-mermaid](https://github.com/gecm0/claude-code-mermaid)

#### wasm 渲染失败不报错，探测靠嗅探 class="t"

grok-mermaid.wasm 对不支持的类型和语法错误从不返回错误码，而是把原始源码画进 ASCII 边框当正常 HTML 返回，
框的 header 是全部输出中唯一带 `class="t"` 的 span，插件用 `includes('class="t"')` 判断失败。宽度归因用
对比法：限宽渲染命中特征时用不限宽重渲一次，两次都失败才归因类型或语法错误，仅限宽失败归因为超出终端宽度。
这套探测依赖渲染器输出格式这一未成契约的内部细节，上游 grok-build 一升级就可能静默失效；也正因部分语法
错误被渲染器静默忽略，渲染结果只是预览而非语法校验。

见：[claude-code-mermaid.mjs](https://github.com/gecm0/claude-code-mermaid/blob/main/scripts/claude-code-mermaid.mjs)

#### panic=abort 让每张图重新实例化整个 wasm

162KB 的 wasm 每画一张图都要重新 `new WebAssembly.Module` 加 `Instance`，连编译产物都不缓存。根源在上游
构建用了 panic=abort：Rust panic 直接 trap，trap 过的实例整个报废不可恢复；与其维护实例池再检测中毒状态，
不如每图新建实例，把崩溃爆炸半径隔离在单张图内，catch 后降级为一行 `renderer crashed`。这是用可预测开销
买故障隔离的典型决策，批量渲染的性能预算要按每图一次完整编译估算。

见：[claude-code-mermaid.mjs](https://github.com/gecm0/claude-code-mermaid/blob/main/scripts/claude-code-mermaid.mjs)

#### /tmp 状态文件的防符号链接组合拳

多用户机器上，他人可预建状态目录里的符号链接指向任意文件，而 hook 每条消息流都会执行一次写入，等于以用户
完整权限定时写一个可被劫持的路径。插件防御分三层：lstatSync 检查目录本身（不跟随链接，是链接直接拒绝）、
stat.uid 必须等于当前 uid（防他人预建目录）、每次写入前 chmodSync 重申 0700 与 0600（防宽权限目录抢先
就位）；文件名先经字符白名单消毒防路径穿越，读状态失败走删除兜底而非带病续跑。单用户 Mac 上是过度防御，
共享服务器与 CI 上是必需品，任何往共享临时目录写跨进程状态的 hook 都该抄这套组合拳。

见：[claude-code-mermaid.mjs](https://github.com/gecm0/claude-code-mermaid/blob/main/scripts/claude-code-mermaid.mjs)
