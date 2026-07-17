---
title: 经典游戏移植
description: 经典 Windows 游戏移植 macOS/iOS 的工程方法与平台陷阱
---

#### 移植方法论：调研先行与平台阶梯

移植经典游戏最高杠杆的一步是动手前的生态调研：朴素计划“移植厂商原始源码”可能是数月工程，而“找到最好的社区
fork 再往下走”可以压缩到一次长会话。选定基础前验证四条硬指标：能 64 位编译运行、能在 ARM64 上跑（证明没有
x86 内联汇编与字节序地雷）、Windows API 层已被替换（窗口、D3D、音频、视频编解码）、能加载零售版资产。验证要
看产物（release、CI 配置）而非 README 声明。随后沿平台阶梯逐级爬升：Windows → macOS ARM64 → iOS，每一级隔离
一类故障——API 可移植性、CPU 架构、沙盒+生命周期+签名。如果某个 fork 已能在 Apple Silicon macOS 上运行，
那么 iOS 移植就只剩“交叉编译 + 沙盒 + 生命周期 + 触控”，而不是“移植一个游戏”。

见：[Generals-Mac-iOS-iPad PORTING_PLAYBOOK](https://github.com/ammaarreshi/Generals-Mac-iOS-iPad/blob/main/docs/port/PORTING_PLAYBOOK.md)

#### 静默回退比报错更危险

移植工程里最贵的 bug 都来自不报错的路径。三个典型形态：构建系统找不到依赖的元数据，静默编译了错误后端（DXVK
找不到 SDL3 的 pkg-config 文件，悄悄编译 SDL2 版窗口集成，构建成功但游戏黑屏）；能力查询在新平台全部失败，
为“偶尔有个怪格式”写的回退路径变成主路径，其隐藏假设（如“这里没人需要 alpha”）直接成为 bug；按硬件名字
定档的自动检测遇到不认识的 GPU（如 Apple A19 Pro），静默降到最低画质——与 user-agent sniffing 遇到新浏览器
回退兼容模式是同一翻车模式。对策是把“不信任成功退出码”变成纪律：每次构建动态库后用 strings、nm、otool
验证产物本身（编译进去的是哪个后端、目标平台是什么）；留意管道掩盖失败（`build | grep error` 的退出码是
grep 的）；打包脚本应校验输入比源文件新，而不是只看步骤是否“成功”。

见：[Generals-Mac-iOS-iPad PORTING_PLAYBOOK](https://github.com/ammaarreshi/Generals-Mac-iOS-iPad/blob/main/docs/port/PORTING_PLAYBOOK.md)

#### iOS 对桌面软件的四大敌意约束

把桌面时代（引擎假设自己拥有整台机器）的软件搬到 iOS 会撞上四条平台约束。文件系统：app bundle 只读且代码
签名，引擎假设“所在目录可写”的配置、缓存、存档路径必须重定向，用相对路径读资产的引擎要在入口 chdir 到
bundle 内的数据目录。动态加载：dlopen 只能加载自己 bundle 内的库，所有动态库必须用
`@executable_path/Frameworks` 形式的显式路径。进程生命周期：打开应用切换器时 iOS 会夺走 Metal drawable
但不把进程后台化，此时多画一帧就会在恢复时崩溃，渲染与模拟循环必须能在后台期间完全暂停（跳过模拟与呈现）。
看门狗：点图标启动的 app 主线程卡住会被系统杀掉，而 devicectl 命令行启动会绕过看门狗——“CLI 能跑、点图标
闪退”时应怀疑初始化耗时。

见：[Generals-Mac-iOS-iPad PORTING_PLAYBOOK](https://github.com/ammaarreshi/Generals-Mac-iOS-iPad/blob/main/docs/port/PORTING_PLAYBOOK.md)

#### 壳应用打包模式：stub + 替换 + 重签名

大型 CMake 工程不必塞进 Xcode 工程才能上架 iOS。壳应用（shell-app）模式的做法：用 XcodeGen 生成一个极薄的
壳 app，里面只有一个 stub（桩）可执行文件——stub 是满足流程要求的最小占位实现，有外壳没有逻辑，存在的唯一
理由是让 Xcode 认为“这是完整 app”从而走完签名与授权（provisioning）流程。随后打包脚本用真正的游戏二进制
替换 stub，把动态库嵌入 Frameworks/ 目录，再自内向外逐层重新签名（先签每个 dylib 和 framework，最后签 app
本体）。两个细节：嵌入的库文件名必须与二进制里的加载路径（install name）一致，用 `otool -L` 和 `otool -D`
双向核对；entitlements 从壳 app 提取（`codesign -d --entitlements - --xml`）后沿用到重签。

见：[Generals-Mac-iOS-iPad PORTING_PLAYBOOK](https://github.com/ammaarreshi/Generals-Mac-iOS-iPad/blob/main/docs/port/PORTING_PLAYBOOK.md)

#### 跨平台游戏自带字体而非发现系统字体

跨平台游戏几乎不做“系统字体发现”，而是自带字体文件并用自带渲染库（如 FreeType）光栅化。原因有三：一致性，
同样的文本在每个平台渲染结果一致，依赖系统字体意味着每台机器排版都可能不同；许可，系统字体的授权通常不允许
打包进游戏资产再分发；可控性，渲染行为完全由游戏自己掌握。这也是 iOS 移植中 fontconfig 可以直接砍掉而不必
修编译错误的深层逻辑——fontconfig 解决的“发现系统里装了哪些字体”问题在游戏场景里本来不该存在。实操技巧是
度量兼容替换：用 Liberation 这类与 Arial/Times/Courier 度量兼容（每个字符宽度相同，排版不错位）的自由字体
改名成 arial.ttf 等，让按名字找字体的老引擎以为找到了系统字体。真正需要系统字体的场景（如聊天框要显示玩家
输入的任意中日韩字符，自带字体覆盖不了整个 Unicode）才回退到平台 API：Windows 用 DirectWrite，macOS/iOS 用
Core Text，Linux 用 fontconfig。

见：[Generals-Mac-iOS-iPad PORTING_PLAYBOOK](https://github.com/ammaarreshi/Generals-Mac-iOS-iPad/blob/main/docs/port/PORTING_PLAYBOOK.md)
