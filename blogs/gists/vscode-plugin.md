# VSCode 插件开发

[TOC]

## 权威指南

为了不让插件对编辑器本身造成破坏性影响，VSCode 会对插件进行进程隔离。在初始化时，编辑器初始化出主进程、渲染进程和插件进程三个进程。由插件进程（Extension Host）复杂加载与运行插件。这样可以保证编辑器的启动速度、界面的响应速度以及界面样式都不会受插件的影响。

## 开始开发

### Hello World

环境初始化依赖特定的工具，可以通过以下命令安装。

```shell
npm install -g yo code-generator
```

安装完工具后，使用以下指令便可创建一个新的项目。

```shell
yo code
```

选择好基础项目设置（这里以我常用的配置为例），脚手架会自动生成项目代码以及安装依赖。这里需要稍微等一会儿。

![项目启动配置](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220121233025.png)

yo code 生成的 HelloWolrd 项目中，我们主要关心 package.json 和 src/extension.ts 两个文件。前者就是我们熟悉的项目配置说明文件，它额外指定了一些字段用来配置 VSCode 插件所启用的功能；后者则是插件的主入口。

看到 package.json，重要关注 activationEvents 和 contributes 属性。contributes 即插件的“贡献点”，这个属性的名字可能有点绕，但其意思就是如此，即插件给 VSCode 新增了哪些额外的功能。这些新增的功能都需要通过 contributes 中的值来绑定其 ID。而 activationEvents 则意味着这些指令在什么情况下可以激活，比如 HelloWorld 中的 onCommand 便意味着在 VSCode 中使用 Ctrl+P 输入指令时可以激活 vscode-plugin-demo.helloWorld 指令。

```json
{
  "activationEvents": [
    "onCommand:vscode-plugin-demo.helloWorld"
  ],
  "contributes": {
    "commands": [
      {
        "command": "vscode-plugin-demo.helloWorld",
        "title": "Hello World"
      }
    ]
  }
}
```

指令是在插件主入口 src/extension.ts 注册的。可以看到它暴露了 activate 和 deactivate 两个函数，分别会在插件初始化和插件失效时执行。插件初始化时注册了 vscode-plugin-demo.helloWorld 这个指令，用来显示一段 Hello World 文本。

```js
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-plugin-demo.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vscode-plugin-demo!');
	});
	context.subscriptions.push(disposable);
}

export function deactivate() {}
```

脚手架默认生成了调试插件所需要的配置，存放在了 .vscode 文件夹中。只需要按 F5 键就可以在新窗口启动当前插件查看运行效果。如果你对插件有修改，可以 Shift+F5 停用插件后再重开，或者直接在新窗口使用 Ctrl+R 重载（或使用指令 Reload Window）。

![Reload Window](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220121235255.png)
