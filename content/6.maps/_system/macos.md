---
title: macOS
description: macOS 系统知识与实践经验
---

#### AWDL 导致 Mac WiFi 速度暴跌

Apple 的 AWDL（Apple Wireless Direct Link）是为 AirDrop、AirPlay 等设计的私有 WiFi 增强协议，但它会严重拖累常规网络性能。实测中，两台 Mac（
Sonoma 桌面端与 Tahoe 笔记本）在同网络下的 WiFi 速度仅有 80-160 Mbps，而 Android 手机却能跑到 1.1 Gbps——更诡异的是，开启 NordVPN 后 Mac 的速度反而恢复正常。

AWDL 的干扰在路由器 5GHz 信道使用 160MHz 带宽并配合 DFS（动态频率选择）时尤为明显。一个有效的缓解方案是将路由器 5GHz 设置改为 80MHz 固定带宽，并锁定信道 44（欧洲地区）或 36（欧洲以外）。
AWDL 本身是系统守护进程，很难彻底永久关闭，因为它会不断自动重启。

见：[Fixing my slow Mac network speeds](https://remysharp.com/2026/03/26/fixing-my-slow-mac-network-speeds)：Remy Sharp 的排查记录

#### Bundle ID 决定 macOS 应用身份与沙盒容器

`CFBundleIdentifier` 是 macOS 应用的全局唯一身份证，LaunchServices 据此区分实例、
分配沙盒容器 `~/Library/Containers/<BundleID>/`、绑定 Keychain Access Group 与推送 token。
单纯 `cp -R` 复制 `.app` 而不改 Bundle ID，系统仍判定为同一应用，双击只会把焦点切到
已运行的原实例（单实例锁），数据也写进同一个容器目录——这是 macOS 应用“复制后不能直接双开”
的根因。只有用 PlistBuddy 改写 `Info.plist` 的 `CFBundleIdentifier`，系统才会为其分配
新容器，数据天然隔离，这套“复制 + 改 ID”组合可推广到任意 macOS App 双开。代价同样真实：
若新 Bundle ID 偏离原值太多（例如原 `com.tencent.xinWeChat` 改成完全不同的前缀），
Keychain Access Group 与推送 token 的前缀匹配会断裂，可能影响登录态持久化或推送；
而非常规 Bundle ID 登录可能触发服务端风控（Mac 端实测封号概率低于 iOS，主号仍慎用）。
保守做法是保留原前缀 `com.tencent.xinWeChat.<suffix>`，兼顾系统识别与前缀兼容性。

见：[MacOS Tahoe 26.5 实现微信双开](https://www.cnblogs.com/BeiJiuGuRen/p/20124145)

#### codesign --deep 已废弃，ad-hoc 签名是 Apple Silicon 的最低门槛

`man codesign` 自 macOS 13.0（Ventura）起将 `--deep` 明确标记为 signing 废弃：它自外向内
递归签名，顺序与正确的 bottom-up（先签 `Contents/Frameworks` 内层再签 `.app` 顶层）相反，
可能导致内层 framework 或 helper 验证失败。Apple 官方推荐改为逐层手动签名或直接去掉 `--deep`。
而 `--sign -`（ad-hoc）在 Apple Silicon 上是“最低门槛签名”——ARM Mac 规定所有可执行文件
必须有签名才能运行，ad-hoc 刚好满足启动条件；但它无法通过 Notarization、不能启用 Hardened
Runtime 的高级能力，Keychain Access Group 的 entitlement 匹配也可能因签名身份变化而断裂，
重新签名后某些依赖签名身份的 Keychain 项（如登录态）可能失效。流行的双开配方
`xattr -rc` + `codesign --force --deep --sign -` 之所以“能用”，是因为本地双开只要求
“能启动 + Gatekeeper 放行”，ad-hoc 恰好足够；若副本出现“应用已损坏”提示，根因往往是
签名未覆盖到内层 mach-o 或扩展属性残留，重跑 `xattr -rc` + 重签即可。

见：[MacOS Tahoe 26.5 实现微信双开](https://www.cnblogs.com/BeiJiuGuRen/p/20124145)

#### App 副本是不可维护的一次性快照

内置更新器（Sparkle 类框架）只更新 `/Applications` 下的主 `.app`，副本既不接收更新、
也不被更新器识别为目标。当主应用大版本升级引入新的签名要求、entitlement 或架构变化时，
旧副本会因签名或架构不匹配而启动失败，表现就是“应用已损坏”。关闭主应用的自动升级只是治标——
根治是接受这一本质：副本是冻结在复制那一刻的快照，不是“第二个会自动维护的应用”。大版本后
正确做法是删除旧副本并重跑“复制 + 改 Bundle ID + 重签名”流程，把它当作一次性产物对待。

见：[MacOS Tahoe 26.5 实现微信双开](https://www.cnblogs.com/BeiJiuGuRen/p/20124145)

