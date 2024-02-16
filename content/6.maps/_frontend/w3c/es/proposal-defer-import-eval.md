---
title: proposal-defer-import-eval
description: 延迟导入执行提案允许导入的模块等到使用时才执行
---

[proposal-defer-import-eval](https://github.com/tc39/proposal-defer-import-eval)

延迟导入执行提案（proposal-defer-import-eval）希望通过创建一个类似 Proxy 的外部对象 DeferredModuleNamespace，允许同步模块导入模块，但是只有使用到模块时才执行。

动态导入有两个问题：网络请求带来的性能损耗、异步传染性。
