---
title: 图形 API
description: DirectX、Vulkan、Metal 图形 API 与 DXVK、MoltenVK 翻译层，渲染管线的演进
---

#### DXVK 与 MoltenVK：Windows 游戏跑在 Apple 平台的翻译链

让 2003 年的 DirectX 8 游戏在 Apple Silicon 上原生运行，需要一条四段翻译链：游戏调用 DirectX 8 → DXVK 将
D3D8/9/10/11 调用实时翻译成 Vulkan → MoltenVK 将 Vulkan 翻译成 Metal → Apple GPU。DXVK 本是 Valve 为
Steam Play（Proton）在 Linux 上运行 Windows 游戏而开发；MoltenVK 则是 Vulkan 应用在 Apple 平台落地的事实标准。
世上没有成熟的“D3D 直达 Metal”工具，但两段各自久经考验，拼接即可。运行时还有一个加载细节：Vulkan 应用不直接
链接显卡驱动，而是链接 Vulkan loader，由它在运行时按约定路径查找真正的驱动（ICD）。iOS 限制 dlopen 只能加载
app bundle 内的库，loader 的系统路径查找全部失效，需要给查找列表加上 `@executable_path/Frameworks/MoltenVK`
这样的 bundle 内显式路径。

见：[Generals-Mac-iOS-iPad README](https://github.com/ammaarreshi/Generals-Mac-iOS-iPad/)

#### 固定管线与可编程管线

固定管线（fixed-function pipeline）是早期 GPU 的工作方式：渲染逻辑硬编码在芯片里，开发者不能写着色代码，只能
配置参数——开关光源、设置 Blinn-Phong 光照模型的环境光/漫反射/镜面反射系数、雾效、纹理层（texture stage）
混合方式。可编程管线（programmable pipeline）则允许开发者写 shader 在 GPU 上逐顶点、逐像素自定义计算。转折
发生在 2001 年 DirectX 8 首次引入 vertex/pixel shader，但 2003 年前后大量在售硬件只支持固定管线，所以那个年代
的游戏主体仍是固定管线风格；固定管线在 DirectX 10（2006）中被彻底移除，此后一切渲染都是 shader，PBR（基于物理
的渲染）也才成为可能。固定管线作为硬件概念已死，但作为 API 语义被翻译层完整保留：DXVK 这类兼容层的工作之一
就是用现代 shader 实时模拟固定管线——老游戏以为自己在拧固定管线的旋钮，幕后每个参数组合都被翻译成现代管线状态。

见：[Generals-Mac-iOS-iPad PORTING_PLAYBOOK](https://github.com/ammaarreshi/Generals-Mac-iOS-iPad/blob/main/docs/port/PORTING_PLAYBOOK.md)

#### 纹理格式是像素数据布局，不是材质模型

纹理格式（texture format / pixel format）描述像素在显存里的排布方式：每像素占几字节、RGBA 各通道占几位、
顺序如何、是否压缩。它是数据布局概念，与 PBR（一种光照/材质模型）分属两个层面——PBR 用到的贴图也要选某种
像素格式存储，但格式本身与材质模型无关。常见格式如 A8R8G8B8（四通道各 8 位含透明度）、X8R8G8B8（alpha 位
留空不存）、R5G6B5（16 位省显存无 alpha）、DXT1/DXT5（硬件解压的压缩格式）。2003 年显存紧张，游戏大量用
16 位格式，并习惯写“偏好格式列表 + 逐个查询驱动 + 全失败走回退”的防御代码，而现代 GPU 原生格式是 32 位
每像素，老格式很多已不在支持列表。这个时代错位能制造经典 bug：某移植案例中引擎查询雷达纹理格式，偏好列表
在 MoltenVK 的能力查询下全部失败，三张雷达纹理（地形、overlay、战争迷雾）全部落到写死返回 X8R8G8B8 的回退
路径——迷雾层需要 alpha 做透明，没有 alpha 就把整张地图涂黑。修复是让回退格式按调用方指定：不透明层用
X8R8G8B8，需要透明的层用 A8R8G8B8。

见：[PORTING_PLAYBOOK §8.1](https://github.com/ammaarreshi/Generals-Mac-iOS-iPad/blob/main/docs/port/PORTING_PLAYBOOK.md)

#### Apple 不支持 Vulkan 的原因

Apple 从未正式宣布拒绝 Vulkan，而是从未支持并力推自家 Metal 作为替代。时间上 Metal 于 2014 年随 iOS 8 发布，
比 Vulkan（2016）早两年，等 Vulkan 出现时 iOS 生态已在 Metal 上跑稳。硬件上 Apple 自研 GPU 采用 TBDR（分块
延迟渲染）架构，与桌面 GPU 的立即模式渲染差异很大，Metal 围绕 TBDR 特性设计（如显式 tile memory 控制），Apple
不愿被需要兼顾所有厂商的通用 API 束缚硬件演进节奏。生态策略上独占 API 提高跨平台移植成本，且有前科：macOS 的
OpenGL 支持常年滞后并停在 4.1，2018 年 Apple 干脆宣布弃用 OpenGL 和 OpenCL，只留 Metal 一条路。结果是第三方
补位：Brenwill Workshop 开发的 MoltenVK 于 2018 年由 Valve 出资促成开源并归入 Khronos 生态，成为 Vulkan
应用上 Apple 平台的事实标准。

见：[Generals-Mac-iOS-iPad README](https://github.com/ammaarreshi/Generals-Mac-iOS-iPad/)
