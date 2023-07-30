# VS Code 插件开发

[TOC]

## 权威指南

为了不让插件对编辑器本身造成破坏性影响，VS Code 会对插件进行进程隔离。在初始化时，编辑器初始化出主进程、渲染进程和插件进程三个进程。由插件进程（Extension Host）复杂加载与运行插件。这样可以保证编辑器的启动速度、界面的响应速度以及界面样式都不会受插件的影响。

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

yo code 生成的 HelloWolrd 项目中，我们主要关心 package.json 和 src/extension.ts 两个文件。前者就是我们熟悉的项目配置说明文件，它额外指定了一些字段用来配置 VS Code 插件所启用的功能；后者则是插件的主入口。

看到 package.json，重要关注 activationEvents 和 contributes 属性。contributes 即插件的“贡献点”，这个属性的名字可能有点绕，但其意思就是如此，即插件给 VS Code 新增了哪些额外的功能。这些新增的功能都需要通过 contributes 中的值来绑定其 ID。而 activationEvents 则意味着这些指令在什么情况下可以激活，比如 HelloWorld 中的 onCommand 便意味着在 VS Code 中使用 <keyboard>Ctrl + P</keyboard> 输入指令时可以激活 vscode-plugin-demo.helloWorld 指令。

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

脚手架默认生成了调试插件所需要的配置，存放在了 .vscode 文件夹中。只需要按 <keyboard>F5</keyboard> 键就可以在新窗口启动当前插件查看运行效果。如果你对插件有修改，可以 <keyboard>Shift + F5</keyboard> 停用插件后再重开，或者直接在新窗口使用 <keyboard>Ctrl + R</keyboard> 重载（或使用指令 Reload Window）。

![Reload Window](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220121235255.png)

### 项目配置

正如上一小节提到的 package.json 中最重要的两项设置分别是 activationEvents 和 contributes，者两个属性直接关系到项目可以做什么。

activationEvents 指示了插件在哪些情况下会激活，VS Code 提供了以下激活场景供开发者选择。详细说明参见官方文档：[Activation Events](https://code.visualstudio.com/api/references/activation-events)，以下对每项进行简要说明。

```markdown
<!-- 打开某种语言的文件时激活，如：onLanguage:python -->
* onLanguage
<!-- 使用 Ctrl+P 调用指令时激活 -->
* onCommand
<!-- 调试插件时激活插件；还细分出了两个颗粒度更小的 API -->
* onDebug
  * onDebugInitialConfigurations
  * onDebugResolve
<!-- 当工作区中包含某些文件时，如：workspaceContains:**/.gitignore -->
* workspaceContains
<!-- 从不同类型的文件系统中读取项目时激活，如：onFileSystem:sftp -->
* onFileSystem
<!-- 当某个 ID 的侧边栏被打开时激活，如：onView:nodeDependencies -->
* onView
<!-- 收到 URI 协议时激活插件；这里的 URI 协议是系统级别的协议 -->
<!-- 比如你在 VS Code 登录 GitHub 账号时收到的那一串以“vscode:”打头的地址 -->
<!-- 此时浏览器会通过系统 API 自动通知 VS Code 接收调用 -->
* onUri
<!-- 当某种类型的面板打开时激活，如：onWebviewPanel:testPage -->
<!-- 面板类型是指使用 window.createWebviewPanel API 创建新面板时其 viewType 属性 -->
* onWebviewPanel
<!-- 当一个自定义面板打开时（如某个渲染 PPT 的页面）激活 -->
* onCustomEditor
<!-- 当使用同步功能登陆时激活，如 onAuthenticationRequest:github -->
* onAuthenticationRequest
<!-- 等 VS Code 启动结束且默认插件加载完毕时激活（比“*”要晚一些但不会影响启动速度） -->
* onStartupFinished
<!-- 启动 VS Code 时便激活插件（比 onStartupFinished 早一些） -->
* *
```

contributes 指示了插件有哪些功能。详细说明参见官方文档：[Contribution Points](https://code.visualstudio.com/api/references/contribution-points)，以下对 VS Code 所有插件所支持的功能列表做一个简短的说明。

```js
// 为扩展断点提供支持
breakpoints
// 定义新的颜色（以便在代码中快速引用）
colors
// 定义新的指令（可以使用 Ctrl+Shift+P、快捷键等多种方式打开）
commands
// 给用户提供自定义设置
configuration
// 给特定语言提供自定义设置的默认值
configurationDefaults
// 自定义编辑器页面（比如 Markdown 预览）
customEditors
// 为扩展调试功能提供支持
debuggers
// 为扩展语法及高亮等功能提供支持
grammars
// 文件类型的图标
iconThemes
// 为特定 JSON 文件提供模式校验（如 .eslintrc 的模式是：https://json.schemastore.org/eslintrc）
jsonValidation
// 给插件注册的指令绑定快捷键
keybindings
// 定义新语言
languages
// 在右键菜单上新增选项（编辑区、文件树等各种区域都能右键）
menus
// 对 Output 或是 Terminal 中抛出的错误进行捕获
problemMatchers
// 对抛出的错误进行命名
problemPatterns
// 对 VS Code 自带的图标进行替换
productIconThemes
// 对工作区中的 URI 文本进行替换
resourceLabelFormatters
// 定义代码片段
snippets
// 右键菜单的子菜单
submenus
// 定义任务（比方说把 NPM Script 定义为任务，以便在代码中执行）
taskDefinitions
// VS Code 主题
themes
// 自带的 TS 语言服务器
typescriptServerPlugins
// 扩展左侧图标导航区（扩展导航视图、测试视图等，或是提供自定义的新视图）
views
// 扩展新视图时需要用 viewsContainers 绑定 ID
viewsContainers
// 定义视图区的欢迎页（比如项目没有初始化 Git 时，Git 视图会提示初始化的快捷键）
viewsWelcome
// 一些大型插件需要提供演示页面（walkthroughs）以便让用户更方便地配置及掌握插件
walkthroughs
```

如果你想更详细配置手头的项目，或是想在 VS Code 的插件市场发布你的插件的话，就需要对 package.json 好好设定一番了。以下以一个简单的统计 Markdown 文件字数插件的配置为例，初步介绍一下各个属性的作用，让你有一个大致印象。

```shell
npm install -g yo code-generator
```

安装完工具后，使用以下指令便可创建一个新的项目。

```shell
yo code
```

选择好基础项目设置（这里以我常用的配置为例），脚手架会自动生成项目代码以及安装依赖。这里需要稍微等一会儿。

![项目启动配置](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220121233025.png)

yo code 生成的 HelloWolrd 项目中，我们主要关心 package.json 和 src/extension.ts 两个文件。前者就是我们熟悉的项目配置说明文件，它额外指定了一些字段用来配置 VS Code 插件所启用的功能；后者则是插件的主入口。

看到 package.json，重要关注 activationEvents 和 contributes 属性。contributes 即插件的“贡献点”，这个属性的名字可能有点绕，但其意思就是如此，即插件给 VS Code 新增了哪些额外的功能。这些新增的功能都需要通过 contributes 中的值来绑定其 ID。而 activationEvents 则意味着这些指令在什么情况下可以激活，比如 HelloWorld 中的 onCommand 便意味着在 VS Code 中使用 <keyboard>Ctrl + P</keyboard> 输入指令时可以激活 vscode-plugin-demo.helloWorld 指令。

```json
{
  // 插件的名称
  "name": "wordcount",
  // 插件在插件市场显示的名称
  "displayName": "Word Count",
  // 版本号
  "version": "0.1.0",
  // 发表插件时所需要的发布者 ID
  "publisher": "ms-vscode",
  // 描述
  "description": "Markdown Word Count Example - reports out the number of words in a Markdown file.",
  // 作者
  "author": {
    "name": "sean"
  },
  // 插件类型
  "categories": ["Other"],
  // 插件图标
  "icon": "images/icon.png",
  //  插件市场展示插件时显示的颜色主题
  "galleryBanner": {
    "color": "#C80000",
    "theme": "dark"
  },
  // 插件在哪些情况下会激活
  "activationEvents": ["onLanguage:markdown"],
  // 其中的 vscode 属性指示了插件兼容哪个版本的 VS Code
  "engines": {
    "vscode": "^1.0.0"
  },
  // 脚本主入口
  "main": "./out/extension",
  // 同 NPM package.json 的 scripts 属性
  "scripts": {
    "vscode:prepublish": "node ./node_modules/vscode/bin/compile",
    "compile": "node ./node_modules/vscode/bin/compile -watch -p ./"
  },
  // 同 NPM package.json 的 devDependencies 属性
  "devDependencies": {
    "@types/vscode": "^0.10.x",
    "typescript": "^1.6.2"
  },
  // 版权说明
  "license": "SEE LICENSE IN LICENSE.txt",
  // 指示了在哪反馈插件的缺陷
  "bugs": {
    "url": "https://github.com/microsoft/vscode-wordcount/issues",
    "email": "sean@contoso.com"
  },
  // 源代码仓库地址
  "repository": {
    "type": "git",
    "url": "https://github.com/microsoft/vscode-wordcount.git"
  },
  // 项目主页
  "homepage": "https://github.com/microsoft/vscode-wordcount/blob/main/README.md"
}

export function deactivate() {}
```

package.json 中每个属性的具体描述、用法都可以在官方文档找到实例。详情请参考：[Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest)。许多属性并不是 VS Code Plugin 专用属性，而是沿用的 NPM 的那套设置，这是需要参考：[NPM package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)。
