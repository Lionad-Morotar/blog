---
title: Electron 发行与更新链
description: 出包矩阵、manifest 三方契约、mac/win 双更新策略与差分下载的隐式契约
---

#### 发行链三段：出包、分发、更新是三条可用性语义不同的链

发行链分出包（应用成型为平台安装物）、分发（新用户拿到）、更新（已装用户演进）三段。最易混淆的是
分发与更新：分发是一次性无状态下载，更新需要版本协商（本地版本对比远端清单）加安装时机管理。
mac 与 win 是两个更新世界：mac 的合法换包通道是 Squirrel.Mac（依赖代码签名信任链授权替换应用包），
win 是 NSIS 安装器覆盖安装（签名只影响 SmartScreen 警告，不影响能否更新），同一套更新代码在两平台
语义完全不同，这是更新策略必须按平台分叉的根因。机制全貌四类：Electron 内置 autoUpdater（mac 走
Squirrel.Mac、win 走 Squirrel.Windows，Linux 无内置支持，官方建议交包管理器）、electron-updater
（provider 体系与差分下载）、手动检查加下载页（自比版本）、第三方框架（Sparkle 等）。签名链未就绪的
mac 选手动自比加跳下载页，win 走 electron-updater 全自动，两分支消费同一份 manifest。

见：[autoUpdater](https://www.electronjs.org/docs/latest/api/auto-updater)

#### manifest 是三方契约的协议单点，字节级稳定是缓存的前提

版本清单（latest.json）由发布侧生成，壳侧自比、win 更新器、下载页三个消费方共享同一协议：字段名
对齐 electron-updater 的 UpdateInfo 使 win 链路直接消费，扩展字段（如制品 kind）被更新器静默忽略，
不另设更新专用格式。files 数组固定按 kind 声明序排序：清单内容是端点缓存的失效判据，乱序会制造
无意义抖动。制品寻址用站点相对路径，消费方按自身 origin 解析（URL 构造函数的相对解析语义天然兼容
未来切对象存储或 CDN 绝对直链，协议不变）。语义分离：404 是「尚未发布」的业务空态，503 是「存储
未配置或源不可达」的故障态，下载页与壳侧都要分开渲染，混为一谈会把「还没发版」显示成「系统坏了」。
服务端短 TTL 缓存加故障旧值回放（带降级标记头），发布过的版本信息不因存储抖动而消失，这是发行面
区别于普通接口的可用性语义。

见：[electron-builder auto-update](https://www.electron.build/auto-update)

#### mac 更新链有签名前提，签名未就绪的一期形态是根本不初始化更新器

electron-updater 在 macOS 的安装环节委托 Squirrel.Mac（底层 ShipIt 换包服务），换包动作需代码签名
信任链授权；adhoc 或未公证签名的应用，其自动更新链不可达且不易观测（检查与下载可能一切正常，
安装环节悄然失效，第三方实践报告此为静默失败）。因此签名资质到位前的正确一期形态是不初始化更新器：
不只是不调用，连 import 都不做（动态 import 保证 darwin 构建不加载更新器模块，排除任何构造路径被
意外触发），改为拉清单自比版本、原生对话框提示、系统浏览器跳下载页，下载页常驻 Gatekeeper 绕过
指引。协议先定好，公证就绪后切回全自动，清单格式不用变。

见：[electron-builder auto-update](https://www.electron.build/auto-update)

#### publish 配置是存在性锚，真实更新源在运行时声明

electron-updater 在打包态从应用内 resources/app-update.yml 读取 provider 配置构造自身，而这个文件是
electron-builder 检测到 publish 配置时才生成的，删掉 publish 段更新器初始化直接抛错。运行时用
setFeedURL（provider: 'custom' 加自定义 Provider 类）覆盖寻址后，配置里的 generic URL 从不被消费，
但它的存在仍是前提。custom provider 是 electron-updater 独有的扩展点，Electron 内置 autoUpdater
没有 provider 概念（官方 issue #41443 确认）。实现投影层时注意：UpdateInfo 顶层的 path/sha512 是
deprecated 的遗留必填字段，更新器实际读 files[] 数组，用首个制品填充满足接口契约即可；目标平台
制品为空时要在投影层语义化快速失败，否则放行进下载链后在文件查找处抛晦涩 TypeError，排障成本高
一个量级。

见：[electron#41443](https://github.com/electron/electron/issues/41443)

#### 制品代理分发：Range 语义透传与差分下载的隐式契约

对象存储桶策略禁止公开读对象时，公开分发走服务端流式代理端点，清单内是站点相对路径。代理端点要
透传 Range 与 416：Range 支撑更新器的断点续传与差分下载，416 是「Range 越界、可自愈」的业务语义，
改写成 502 会把「客户端应退全量重试」伪装成「源头故障」。差分下载的地址由更新器按 url 加
`.blockmap` 约定自行拼接，清单不列 blockmap，发布脚本必须把 blockmap 与制品同目录上传；差分引擎
对旧安装包块图与新块图逐块比对，只发 Range 请求拉变化的块，任何失败（响应 4xx/5xx、块图缺失、
校验不匹配）统一静默回退全量下载，只记日志，契约断一处只表现为「流量变大了」。mac 侧更新器只认
zip、显式排除 dmg 与 pkg，所以 mac 出包矩阵是 dmg 给人下载、zip 给更新链；旧 zip 缓存做差分基准，
首次安装无基准也退全量。版本目录按版本号寻址且内容不可变，是代理端点敢打「缓存一年、immutable」
缓存头的理论基础。

见：[DifferentialDownloader 源码](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/differentialDownloader/DifferentialDownloader.ts)

#### electron-builder v26 起签名默认行为漂移，升级是隐性破坏面

无证书时 v26 文档明确「跳过签名，adhoc 需 mac.identity 设为 '-' 显式开启」；但 Apple Silicon 上
完全未签名的二进制根本无法运行，而另有 issue（#9529）报告 v26 起 adhoc 实际发生且默认带 hardened
runtime（副作用：摄像头与麦克风权限异常）。三处证据有张力，该行为跨版本不稳定（争议未终审）。
工程结论：签名行为显式声明而非依赖默认，升级 electron-builder 大版本时把「产物能否在他机启动」
「摄像头麦克风是否正常」列入验证项。

见：[Code Signing for macOS（electron-builder v26）](https://www.electron.build/v26/docs/features/code-signing/code-signing-mac/)
