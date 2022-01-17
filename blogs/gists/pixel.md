# 像素

[TOC]

##### <Link type='h5' to='https://mgear-file.oss-cn-shanghai.aliyuncs.com/Understanding%20ProRAW%20%E2%80%93%20Lux.html' source='https://lux.camera/understanding-proraw/' >《Understanding ProRAW》</Link>

成像到出图有三个步骤：去像素化、色调映射和压缩。

根据传感器上不同像素获得的颜色数据，去像素化会使用不同算法猜出原像素的颜色。

![去像素化 | https://lux.camera/understanding-proraw/](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210920022854.png)

色调映射时会涉及到色彩空间转换、白平衡和动态处理相关的技术。

压缩则是把原始数据砍精度，再通过有损压缩方案输出成一张 JEPG 之类的图片。

因为 JPEG 的压缩有损，所以对 JPEG 进行后期就好比还原一个烘焙好的蛋糕一样艰难。而 RAW 文件保存的不是有损压缩后的图片数据，而是从传感器获取的原始数据，所以允许你使用最大限度的对图像进行改动。

RAW 的缺陷就在于预览时非常难看，除非用来打开 RAW 的软件能用上 iPhone 一样的预览 RAW 时自动优化的功能。

这时候，ProRAW 来了，它保存的不再是传感器的原始数据，而是去像素化后的数据，也就是说 iPhone 把传感器数据优化后的那部分内容保存下来了。苹果和 Adobe 公司共同开发了 DNG 文件标准，里面定义了 RAW 文件能用上的不同的数据标签，第三方软件可以直接从 ProRAW 拿到成像、精度、色调等信息，也就可以很方便的处理图片了。


