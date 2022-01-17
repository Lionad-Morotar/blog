# VSCode 插件开发

[TOC]

## 遇到的一些问题

### Hello World

拉下代码运行时，需要注意一下 package.json 文件中的配置：

```js
{
    "engines": {
        "vscode": "^1.45.0" // 如果你的 VSCode 版本和这段配置不符，那么调试的时候会报错
    },
    "activationEvents": [
        "*" // 什么时候触发插件加载，'*' 代表默认加载，适合打开编辑器就要读取配置之类的操作
    ],
}
```
