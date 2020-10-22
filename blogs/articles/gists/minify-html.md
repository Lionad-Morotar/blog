# 减小页面快照体积

页面快照，即爬虫将抓取的页面以源码的形式保存下来。

<Article-G201022-MinifyHTML />

压缩思路主要就是 Tree Shake，将不要用到的内容移除

- Remove Scripts，删除所有的脚本
- DOM Tree Shake，移除空元素、移除框架等
- CSS Tree Shake，移除空样式、移除无用样式等
