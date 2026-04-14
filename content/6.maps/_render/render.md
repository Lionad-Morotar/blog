---
title: 渲染技术
original_path: content/6.maps/_render/
---
3D 渲染、着色器与图形编程相关技术。

## 工作室与案例

#### Lusion 数字制作工作室

Lusion 是一家位于 Bristol 的获奖数字制作工作室，由 Edan Kwan 于 2017 年创立。创始人从音乐人转型，自学设计与编码，先后在纽约 agency 任职后回归独立实践。工作室专注 3D 视觉叙事、沉浸式网站和互动数字体验，客户包括 Coca-Cola、Porsche、Max Mara、Google 等全球品牌。代表作：

* **Oryzo AI**：讽刺性 AI 产品发布 campaign，将软木杯垫包装为高端 AI 产品，测试「荒诞创意 + 真实工艺」的上限
* **Porsche: Dream Machine**：为 Wallpaper* 与 Porsche GB 制作的 2-3 分钟生成式 CG 短片，3 周内从未涉足的媒介中学习并完成
* **My Little Storybook**：月度实验系列的 WebGL 互动故事书，以日式动漫手绘风格呈现鸟类家族渡河的童话
* **Devin AI 官网**（devin.ai）：为 Cognition 设计开发 Devin AI 产品官网，Devin 本身也参与了网页开发

工作室核心理念是拒绝模板化，每个项目构建独立系统。获 FWA Site of the Year、Awwwards、CSSDA、Cannes Lions、D&AD、Webby 等荣誉。

见：[Codrops Studio Spotlight](https://tympanus.net/codrops/2026/04/13/lusion-where-digital-craft-meets-ambitious-experimentation/)：Codrops 2026 年 4 月深度访谈、[Lusion 官网](https://lusion.co/)、[Devin AI 项目页](https://lusion.co/projects/devin_ai)

#### They Call Me Giulio：赛博朋克电影感作品集

Giulio Collesei（意大利创意技术专家）的个人作品集第五版，以 Blade Runner、Dragon Ball、Matrix、Back to the Future 四部经典电影为灵感构建四幕叙事场景（About → Works → Room of Memories → Contact），使用 Three.js + WebGPU（TSL）、React、Turborepo monorepo、GSAP、Lenis。全站 12.5MB 全量加载（gltf-transform + KTX2 + AVIF 压缩），获 FWA 和 Awwwards 认可。设计理念：「真正的创意不是跟随模式，而是构建连贯叙事」——每个动画都是叙事工具而非装饰，文本直接融入 3D 场景而非使用遮罩。

见：[Codrops 案例拆解](https://tympanus.net/codrops/2026/04/14/they-call-me-giulio-the-making-of-a-cinematic-cyberpunk-portfolio/)：四幕场景、技术栈、渲染管线与优化详解、[作品集网站](https://www.theycallmegiulio.com/)

#### 月度实验驱动 R&D 模式

Lusion 通过 Lusion Labs 和月度实验系列进行内部研发，用小周期（每月一个）内部项目测试想法、开发新技能。My Little Storybook 即为月度实验产出，仅用一个月完成，最终成为最受认可的内部作品之一。方法论核心是「先答应，边做边学」——Porsche CG 短片项目中团队从未制作过类似影片，但接下任务后在 3 周内并行学习、设计与构建。内部实验不仅是技能练习场，也是吸引和留住创作型人才的文化机制。

见：[Codrops Studio Spotlight](https://tympanus.net/codrops/2026/04/13/lusion-where-digital-craft-meets-ambitious-experimentation/)

## 主题

- [C4D](c4d.md) - Cinema 4D 三维设计
- [Shader](shader.md) - 着色器编程
- [WebGL](webgl.md) - WebGL 基础与实战

#### DLSS 5：实时光线追踪后的下一个图形突破

NVIDIA 将 DLSS 5 定位为"自 2018 年实时光追以来计算机图形领域最重要的突破”。
与之前专注于性能提升（超分辨率、帧生成）不同，DLSS 5 转向**视觉保真度**——
通过实时神经渲染模型为像素注入照片级真实的照明和材质。

核心技术特点：
*   **输入**：帧的颜色和运动向量
*   **输出**：照片级真实的照明和材质效果
*   **语义理解**：AI 模型理解角色、头发、织物、半透明皮肤等复杂场景语义，以及前光、背光、阴天等环境光照条件
*   **艺术控制**：提供强度、调色和遮罩等详细控制，艺术家可决定增强效果的应用位置和方式
*   **确定性输出**：与离线视频生成 AI 不同，DLSS 5 是确定性的、实时的，并紧密锚定在游戏开发者的 3D 内容和艺术意图上

Jensen Huang 将其称为"图形领域的 GPT 时刻"——融合手工渲染与生成式 AI，
在保留艺术家创作控制的同时实现视觉真实性的飞跃。

见：[NVIDIA DLSS 5 Delivers AI-Powered Breakthrough In Visual Fidelity For Games](https://www.nvidia.com/en-us/geforce/news/dlss5-breakthrough-in-visual-fidelity-for-games/)
