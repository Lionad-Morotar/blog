---
title: Iconify
description: Iconify 是一个图标库，提供了多种图标集合的访问和使用方式。
---

## 简介

Iconify 致力于让图标变得更容易使用。

提供了统一的图标开发规范：统一的命名约定，比如 camera-with-flash、home-outlined；统一的颜色规范，分单色和多色图标，单色图标使用 currentColor 作为颜色值，所以默认可以改颜色；统一的资源格式，禁止文本、栅格图片、外部资源、脚本等内容，因为公共的图标库使用 Iconify Tools 工具处理过。

以前使用 Iconfont 时，设计师在网站手动上传图标时是不会转换为自动颜色的，即颜色被硬编码到了图标文件中：

```html
<svg width="20" height="20" viewBox="0 0 24 24">
  <path fill="blue" d="M5 5h14v14H5z"/>
</svg>
```

此外还提供了统一的设计规范，使用 Material Design Icons 的网格为图标填充做指导。

![Material Design Icons](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202504010251952.png)

Iconify 的图标集就是一组带有相同设计规范和元信息的图标集合。

除了开发者使用上的方便，Iconify 在数量上也有优势，其包含了超过 20w 的开源图标。

那么具体如何使用呢？Iconify 提供了两种使用方式：

1. 下载 IconifyJSON 格式的图标集合库，如 @iconify/json，然后在代码中通过 API 找到并使用对应 SVG 文件
2. 使用 Iconify API，一般来说是向第三方发送图标名称，然后使用服务返回的图标文件

由于 @iconify/json 包含所有图标集，其包体积很大，所以一般会使用单独的图标集如 @iconify-json/heroicons，或是通过 @iconify/collections 获取图标集列表然后按需载入对应图标集内容。

独立的图标集会包含 IconifyJSON 类型的图标文件、以及 IconifyInfo、IconifyMetaData、IconifyChars 等格式的信息文件。

* IconifyChars 是给部分带文本映射的图标集使用的，比如 Twemoji 图标集是对 emoji 的某种重新设计，所以其图标需要一一对应到 emoji 字符，见 [Twemoji Chars](https://www.npmjs.com/package/@iconify-json/twemoji?activeTab=code)。
* IconifyMetaData 包含了图标分类、主题等信息，例如 [Twemoji Metadata](https://www.npmjs.com/package/@iconify-json/twemoji?activeTab=code)
* IconifyInfo 包含了图标集的元信息，如名称、版本、作者、协议等，例如 [Twemoji Info](https://www.npmjs.com/package/@iconify-json/twemoji?activeTab=code)
* IconifyJSON 是图标文件的具体聚合，见 [Twemoji JSON](https://www.npmjs.com/package/@iconify-json/twemoji?activeTab=code)。

## 具体使用

尽管 Iconify 做到了开箱即用，但是部分老旧项目仍然需要维持使用大量老旧图标的现状。所以 Iconify 也提供了自定义图标集工具 Iconify Tools，辅助用户将老旧图标转换为 IconifyJSON 格式的图标集，以便使用上统一的开发规范。

1. 使用 importDirectory 等导入函数导入图标文件
2. 使用 cleanupSVG 函数清理图标文件
3. 使用 parseColors 为图标设置统一的颜色
4. export 导出图标集为 IconifyJSON 格式文件

<!-- continue on https://iconify.design/docs/usage/css/ -->
