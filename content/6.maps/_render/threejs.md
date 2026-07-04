---
title: Three.js
description: Three.js 高级材质、着色器与实时渲染的实战秘密
---

Three.js 是在浏览器中使用 WebGL 进行硬件加速三维渲染的 JavaScript 库。这里的知识不覆盖基础 API，而是围绕"如何把 PBR 材质、程序化几何、顶点动画与后处理组合成有高级感的视觉"展开。

#### IcosahedronGeometry 的 detail 是指数级面数增长的隐藏开关

二十面体本身只有 20 个等边三角形面。`IcosahedronGeometry(radius, detail)` 中，detail 每增加 1，每个三角形会被递归细分为 4 个小三角形，顶点被投影到球面上。
这意味着面数按 `20 × 4^detail` 增长：detail=0 是 20 面，detail=1 是 80 面，detail=2 是 320 面，detail=5 已经达到 20480 面。
这种细分不是线性消耗，而是顶点数、内存和绘制开销同时膨胀。在把 detail 从 1 提升到 12 之前，必须先确认目标设备能承担，否则移动端会立刻掉帧。
高 detail 的真正价值不是让球更圆，而是给 `MeshPhysicalMaterial` 的光学效果提供足够的法线采样点。

见：[IcosahedronGeometry - three.js docs](https://threejs.org/docs/pages/IcosahedronGeometry.html)

#### 玻璃、清漆、虹彩等效果需要几何体先有足够的顶点密度

高级材质效果并不只由材质参数决定，它们对表面法线的连续变化非常敏感。
如果底层几何体的 detail 过低，反射和高光会在大平面上均匀分布，失去真实曲面应有的光学渐变。将 `IcosahedronGeometry` 的 detail 提升到 12，本质是用顶点密度换取法线精度，
让 clearcoat、iridescence、transmission 等属性有充足的逐顶点信息可采样。
在角色皮肤、宝石、液体等需要高级质感的场景中，先确认几何体细分足够，再调材质参数，否则容易陷入"参数对了但看起来还是塑料"的困境。

见：[MeshPhysicalMaterial - three.js docs](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)

#### 极低 metalness 能模拟金属微粒掺杂的有机材质

PBR 流程中 metalness 常被理解为"金属开关"，但实际是 0 到 1 的连续值。
当 metalness 设为 0.08 这种接近 0 但非 0 的数值时，材质大部分区域仍按非金属的漫反射计算，但会混入极少量的镜面反射，模拟表面嵌入微小金属颗粒或矿物质晶体的有机材质。
配合中等偏低的 roughness（如 0.26），高光不会过于锐利，整体呈现出类似皮革、果实表皮或含金属矿物的岩石质感。
这种"几乎不是金属"的数值区间常被忽略，却是表现复杂自然材质的有效手段。

见：[Materials - three.js manual](https://threejs.org/manual/en/materials.html)

#### 先调好不透明基础层，再叠加 clearcoat 与 transmission

`MeshPhysicalMaterial` 的 clearcoat、transmission、ior 等属性本质是在基础材质之上再叠加一层光学层。
如果底层的 color、metalness、roughness 没有先稳定，透明层会放大下方的不协调，而不是修复它。
正确的调参顺序是先关闭高级属性，把基础层调整到"看起来像正确的不透明材质"，再逐步开启 clearcoat 增加表面光泽，或开启 transmission 制作玻璃、液体效果。
这是分层材质的工作流核心：每一层都依赖下一层的可信度。

见：[MeshPhysicalMaterial - three.js docs](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)

#### transmission 是光线穿透率，不是 opacity 的替代品

`MeshPhysicalMaterial` 的 `transmission` 与 `opacity` 看起来都能让物体变透明，但物理含义完全不同。
`opacity` 是像素级的不透明度混合，透明度越高，反射也同步变弱；`transmission` 则模拟光线真正穿过介质，即使穿透率达到 1.0，表面仍会保留镜面反射。
设置 `transmission: 0.50` 意味着约一半入射光穿过物体，另一半被反射或吸收，物体因此呈现出半透明介质特有的"又透又亮"质感。
当 `transmission` 非零时，`opacity` 应保持为 1，否则会得到错误的双重衰减。

见：[MeshPhysicalMaterial - three.js docs](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)

#### thickness 给物体"Fake Volume"，与真实模型厚度无关

`thickness` 不是几何属性，而是着色器内部用来模拟光线在介质内传播距离的参数。
数值越大，光线在穿过物体时被吸收和散射得越多，视觉上表现为中心比边缘更暗、更厚实。
`thickness: 3.5` 可以让一个简单的球体看起来像是有内部体积的液滴或气泡，而无需真正建模出空心或实心结构。
这种 Fake Volume 技巧在实时渲染中非常实用，但也意味着 thickness 与模型真实尺寸解耦，调参时以视觉结果为准，而不是物理测量值。

见：[MeshPhysicalMaterial - three.js docs](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)

#### ior 1.30 是为油膜、肥皂泡准备的折射率

`ior`（Index of Refraction）控制光线进入介质时的弯曲程度，Three.js 中默认值是 1.5，接近普通玻璃。
真实世界中，水的 ior 约为 1.33，植物油和多种有机液体在 1.45–1.48 之间，某些油膜或肥皂泡甚至更低。
将 `ior` 设为 1.30，意味着光线弯曲程度略小于水和标准玻璃，配合 `transmission` 和 `thickness` 更容易得到湿润、有机的半透明球体感，而不是冷硬的玻璃块。
调参时参考真实介质表，可以快速把"像玻璃"修正为"像油"、"像水"或"像宝石"。

见：[MeshPhysicalMaterial - three.js docs](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)

#### clearcoat 是独立于基础层的第二层镜面反射

`MeshPhysicalMaterial` 的 `clearcoat` 不是在基础材质上叠加透明度，而是额外增加一个独立的高光反射层。
它不改变底层 `roughness` 或 `metalness` 的计算方式，只在最表面再生成一套镜面 BRDF。
这种双层结构让车漆、碳纤维、湿润表面等"表面光滑但底层粗糙"的材质成为可能，而无需真的用两个 Mesh 嵌套。
`clearcoat: 0.55` 表示涂层反射较强但尚未达到完全镜面，保留了真实清漆层常见的轻微能量损失。

见：[MeshPhysicalMaterial - three.js docs](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)

#### clearcoatRoughness 与基础 roughness 完全解耦

`clearcoatRoughness` 只控制清漆层本身的光泽度，与基础材质的 `roughness` 互不干扰。
这意味着可以构造出"底层粗糙但表面光亮"或"底层光滑但涂层磨砂"的组合，前者像旧车漆，后者像磨砂手机壳。
`clearcoatRoughness: 0.28` 属于中等偏光滑的值，高光不会收缩成刺眼的点，而是带有柔和的散射，模拟真实世界中涂层表面微观的微小不平整，避免产生廉价的塑料感。

见：[MeshPhysicalMaterial - three.js docs](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)

#### iridescence 的颜色来自干涉，不由 color 参数控制

很多人误以为 `iridescence` 是在基础颜色上叠加一层彩虹渐变，实际上它的颜色完全来自物理干涉。
光线在薄膜上下表面反射后发生相位差，某些波长相长干涉、某些波长相消干涉，从而呈现出随视角变化的色相。
`iridescenceIOR` 决定反射时的相位偏移，`iridescenceThicknessRange` 决定光程差范围，两者共同决定了"彩虹"中出现哪些颜色。
这意味着即使把 `color` 设为纯白，只要厚度和 IOR 合适，依然能看到紫、绿、橙等色带；反过来，color 再鲜艳也无法修正错误的厚度范围。

见：[MeshPhysicalMaterial - three.js docs](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)

#### iridescenceThicknessRange 的数值对应真实纳米级薄膜

`iridescenceThicknessRange: [160, 520]` 不是任意数字，而是直接映射到真实世界中肥皂泡、油膜、昆虫翅膀的薄膜厚度范围。
可见光波长约为 380–700 纳米，薄膜厚度在这个数量级时才会产生明显的干涉色。
160 纳米左右偏向紫外/蓝紫色相消，520 纳米左右偏向绿/橙色相长，中间值则覆盖绿、黄、橙等过渡色。
理解这个单位后，调参就从"试颜色"变成"选择薄膜物理状态"：想要肥皂泡的轻薄感用 100–300 纳米，想要厚重油膜的浓郁虹彩用 400–800 纳米。

见：[Thin Film Interference - OpenStax](https://openstax.org/books/college-physics-2e/pages/27-7-thin-film-interference)

#### iridescence 在曲面上天然形成色带，平面上几乎不可见

薄膜干涉的颜色取决于入射角和观察角之间的夹角。在平面上，同一片区域内的这两个角度几乎不变，因此颜色均匀甚至看不见虹彩；
在球体、曲面或复杂几何上，不同点的法线方向差异很大，视角和入射角连续变化，干涉波长也随之变化，从而形成自然的色带。
这也是为什么 `iridescence` 非常适合做"玻璃球"、"泡泡"、"有机曲面"等效果，而用在平板上往往需要配合法线贴图或刻意弯曲几何来打破单调。
选择应用对象时，优先把 iridescence 分配给高曲率表面。

见：[MeshPhysicalMaterial - three.js docs](https://threejs.org/docs/pages/MeshPhysicalMaterial.html)

#### 程序化 CubeTexture 可以替代 HDR 作为 PBR 环境贴图

PBR 材质并不强制要求 HDR 环境贴图，只要提供六张有颜色分布的图片，Three.js 就能把它们当作 CubeTexture 用于 `scene.environment` 或 `material.envMap`。
用 Canvas 2D 程序化绘制六个面，可以在不引入 HDR 解码、PMREM 预过滤和外部资源加载的情况下，精确控制每个方向的光源颜色与形状。
px、nx、py、ny、pz、nz 六个面本质上就是围绕物体的六个方向的"灯光设计稿"，每个面的径向渐变和色块会直接变成物体反射上的高光与边缘光颜色。
这种方式尤其适合需要特定品牌色或艺术化光照的场景。

见：[CubeTexture - three.js docs](https://threejs.org/docs/pages/CubeTexture.html)

#### 环境贴图侧面的色块会通过菲涅尔效应变成边缘光

曲面上的不同位置会采样环境贴图的不同方向：正面主要看到 pz 和 py，边缘主要看到 px/nx，背面主要看到 nz。
由于菲涅尔效应，曲面边缘的反射率显著升高，因此环境贴图侧面的颜色会集中在物体轮廓上形成边缘光。
把暖橙色放在 ny、紫罗兰放在 px、青绿放在 nx/pz，就能在球体转动时让边缘光颜色随视角变化。
这是用环境贴图"画"边缘光的秘密：不需要额外灯光，只需要在 CubeTexture 的对应面上放置色块。

见：[Environment Maps - Three.js Tutorials](https://sbcode.net/threejs/environment-maps/)

#### CubeTexture 的分辨率可以很低，因为 PBR 只需要低频光照

环境贴图在 PBR 中主要提供的是光照方向和颜色分布，而不是精细图像。
当材质有一定 roughness 或使用 PMREM 预过滤后，高频细节会被模糊掉，因此 128×128 甚至 64×64 的 CubeTexture 面往往就能产生合理效果。
程序化绘制的 Canvas 贴图可以刻意保持低分辨率，既能减少内存占用，又能避免不必要的细节干扰整体光照氛围。
只有在把 CubeTexture 同时当作背景天空盒显示时，才需要提高分辨率；仅作为光照使用时，小尺寸反而更干净。

见：[CubeTexture - three.js docs](https://threejs.org/docs/pages/CubeTexture.html)

#### onBeforeCompile 是修改内置材质着色器的轻量"后门"

如果想修改 Three.js 内置材质的着色器行为，通常有两种选择：从头写 `ShaderMaterial`，或用 `material.onBeforeCompile` 在编译前替换内置 shader 的代码片段。
`onBeforeCompile` 的优势在于保留原有材质的所有特性——PBR 光照、阴影、雾效、裁剪、UV 变换等——只注入自定义逻辑。
这比重写一个完整 ShaderMaterial 轻量得多，也更容易与 `MeshPhysicalMaterial` 等高级材质结合。
缺点是它依赖字符串替换，对 Three.js 版本和内部 chunk 命名敏感，升级库时需要检查注入点是否仍然有效。

见：[Modifying StandardMaterial or custom ShaderMaterial? - three.js forum](https://discourse.threejs.org/t/modifying-standardmaterial-or-custom-shadermaterial/37692)

#### 世界坐标噪声配合物体自转产生表面流动错觉

在顶点着色器中用 `position` 的世界坐标采样噪声时，噪声模式被"钉"在世界空间中。
当物体自身旋转时，模型表面的顶点会依次经过世界空间中的不同噪声值，于是形变模式看起来像是在物体表面流动。
这与把噪声绑定到局部坐标或 UV 的效果截然不同：局部坐标采样会让形变随物体一起转动，看不出流动；UV 采样则容易在接缝处断裂。
世界坐标方案是实现"有机 blob 缓慢蠕动"效果的关键，也让时间速度参数成为可选——即使速度为 0，自转本身也足以驱动视觉流动。

见：[GPU-Efficient Noise Techniques in Three.js](https://ymlogy.xyz/posts/2025-04-29-gpu-efficient-noise-techniques-threejs/)

#### 顶点偏移后必须在着色器中同步重建法线

顶点着色器里用噪声偏移 `position` 后，顶点位置变了，但法线仍然是原始几何体的法线。
如果直接用旧法线计算光照，高光和阴影会停留在原来的平滑曲面上，形变后的凸起和凹陷看起来就会"光照错误"。
正确的做法是在同一着色器里根据邻点或噪声梯度重新计算法线，或使用偏导数法线重建。
这是一个常见陷阱：形变看起来对了，但旋转物体时会发现高光不跟随表面起伏，反而像在原始球面上滑动。

见：[Calculating vertex normals after displacement in the vertex shader](https://discourse.threejs.org/t/calculating-vertex-normals-after-displacement-in-the-vertex-shader/16989)

#### 低频与高频噪声分层叠加才能塑造有机形态

单一频率的噪声会让形变看起来像规则波纹或机械震动，缺乏自然感。
真实的有机形态通常由多个频率叠加而成：低频噪声控制整体轮廓和大块起伏，中频噪声添加肌肉般的褶皱，高频噪声提供表面纹理细节。
高频层的振幅必须远小于低频层，通常每一层振幅约为上一层的 0.2–0.5 倍，否则表面会出现瘤状凸起或脱离整体轮廓。
全部在 GPU 顶点着色器中完成时，CPU 每帧不需要触碰几何体，性能远高于 JS 端逐帧修改顶点。

见：[Fractal Brownian Motion (FBM) - GLSL Shader Tutorial](https://shader-learn.com/learn/noise/fractal-brownian-motion)

#### 多层噪声速度错开才能打破视觉周期感

如果所有噪声层以相同速度漂移，形变会呈现出明显的循环感，观众很快能识别出重复模式。
让高频层显著快于低频层，甚至再叠加一个更慢的中频层，可以让不同尺度的形变各自拥有独立的时间节律。
由于各层频率通常是整数倍或无理数比关系，它们的叠加结果不会在短时间内完全重复，从而产生看似无限变化的有机运动。
这也是自然界流体、云层、火焰看起来不循环的原因：不同尺度的运动由不同速度驱动。

见：[10 Noise Functions for Three.js TSL Shaders](https://threejsroadmap.com/blog/10-noise-functions-for-threejs-tsl-shaders)

#### 鼠标"惯性鼓包"是 lerp + decay 的伪物理近似

实现"液体被手指靠近时微微鼓起"并不需要完整的物理模拟，只需要两个 cheap 操作：用 `lerp` 让鼠标影响目标位置平滑跟随实际光标，再用 `decay` 让已产生的影响随时间衰减。
`mouse.lerp` 决定跟随的延迟感，`mouse.idleDecay` 决定鼓包消失的速度，两者共同构成一个一阶弹簧阻尼的近似。
`noise.mouseInfluence` 控制凸起幅度，数值过大时液体会像被针刺穿，过小时又缺乏可感知反馈。
这种伪物理方案的优势是计算极轻、可控性高，且能在 GPU 顶点着色器中通过 uniform 直接读取当前影响值。

见：[Vector3 Lerp - Three.js Tutorials](https://sbcode.net/threejs/vector3-lerp/)

#### 鼠标屏幕坐标必须投影到 3D 空间才能驱动顶点形变

顶点着色器中的鼠标影响通常基于"顶点到鼠标位置的距离"计算，但鼠标坐标是 2D 屏幕空间，而顶点是 3D 世界空间。
直接把屏幕像素坐标传给 shader 会导致形变中心随相机视角、屏幕分辨率剧烈变化，甚至完全错位。
正确做法是在 CPU 端用 `Vector3.unproject(camera)` 将鼠标位置反投影到近裁剪面，再沿相机方向射线与目标物体相交，得到 3D 世界坐标后写入 uniform。
如果只需要一个近似影响区域，也可以把鼠标投影到与球心同深度的平面上，但这会让透视下的边缘区域产生偏差。

见：[Mouse / Canvas X, Y to Three.js World X, Y, Z](https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z)

#### Bloom threshold 是 tone mapping 后的相对亮度阈值

`UnrealBloomPass` 的 `threshold` 并不是场景中线性亮度的绝对 cutoff，而是经过当前渲染管线中 tone mapping 和 exposure 处理后的相对亮度判断。
如果渲染器开启了 `ACESFilmicToneMapping` 或 `ReinhardToneMapping`，暗部会被压缩、亮部会被柔和，threshold 0.92 实际上对应的是已经映射后的高亮区域。
这意味着同一个 threshold 值，在更换 tone mapping 算法或调整 exposure 后，辉光的触发范围会明显变化。
调 Bloom 前应该先确定最终 tone mapping 方案，否则 bloom 会忽强忽弱。

见：[I still don't get how UnrealBloomPass works - three.js forum](https://discourse.threejs.org/t/i-still-dont-get-how-unrealbloompass-works/57843)

#### UnrealBloomPass 的 radius 是多级 mipmap 高斯模糊的合成

`UnrealBloomPass` 的 `radius` 不是简单的高斯模糊像素半径，而是对多层降采样纹理（mipmap chain）进行加权组合时的扩散系数。
它会先生成一系列尺寸递减的 bloom 纹理，对每一层施加不同半径的模糊，再把它们按权重叠加回原始分辨率。
`radius: 0.45` 控制的是这些 mipmap 层之间的过渡平滑度，而不是某一个固定核的半径。
这种设计让光晕既有细腻的中心核，又有柔和的大范围羽化，同时保持较高性能。

见：[UnrealBloomPass - ROOT Documentation](https://root.cern.ch/js/latest/jsdoc/UnrealBloomPass.html)

#### 高 threshold 配低 strength 只强化局部高光，不污染全局

`threshold: 0.92` 与 `strength: 0.10` 的组合是一种典型的"克制型 Bloom"参数。
threshold 很高意味着只有极少数最亮的像素能进入辉光计算，strength 很低意味着这些像素的光晕扩散非常轻微。
结果是画面不会整体发糊，只有虹彩高光、清漆反射、金属边缘等本来就亮的区域会获得一层淡淡的呼吸感。
如果把 threshold 调低或 strength 调高，暗部和中灰区域也会被卷入 bloom，画面会迅速失去对比度，变得油腻。

见：[three.js webgl - postprocessing - unreal bloom](https://threejs.org/examples/webgl_postprocessing_unreal_bloom.html)

#### Bloom 之后必须接 ToneMappingPass 或 OutputPass

开启后处理管线后，Three.js 渲染器的 tone mapping 不再自动生效，因为画面已经被渲染到离屏纹理中。
如果 Bloom 之后没有 `OutputPass` 或 `ToneMappingPass` 做最终颜色映射，辉光叠加后的高亮像素可能直接截断到 1.0，出现生硬的白斑。
正确的后处理顺序通常是：RenderPass → UnrealBloomPass → ToneMappingPass/OutputPass。
很多初学者发现 bloom 开启后画面过曝，问题往往不在 bloom 参数，而是漏掉了最后这一步。

见：[Post Processing - three.js manual](https://threejs.org/manual/en/post-processing.html)
