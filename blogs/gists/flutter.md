# Flutter

[TOC]

##### [Flutter architectural overview - CN](https://flutter.cn/docs/resources/architectural-overview)

##### [Flutter architectural overview](https://docs.flutter.dev/resources/architectural-overview)

![flutter architectural layers](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220615164750.png?type=win11-square)

响应式及声明式的视图是从 React 框架中获取的灵感。

<q>Flutter is a reactive, pseudo-declarative UI framework, in which the developer provides a mapping from application state to interface state, and the framework takes on the task of updating the interface at runtime when the application state changes. This model is inspired by work that came from Facebook for their own React framework.</q>

build 每帧都会调用，和 Vue 的 watcher.update 相比有很大不同。归因为两者的体量根本就不是一个层面的。

<q>The build() method is by design fast to execute and should be free of side effects, allowing it to be called by the framework whenever needed (potentially as often as once per rendered frame).</q>

快速的对象初始化及 GC 的速度和具体语言相关？有很大差异么？

<q>This approach relies on certain characteristics of a language runtime (in particular, fast object instantiation and deletion). Fortunately, Dart is particularly well suited for this task.</q>

在 HTML 中用 center tag 是禁忌，应该用 CSS 做，这是前端某种常识。然而在 Flutter 中，padding、alignment 等都是由组件（类似 React 组件）来控制的，一个 Container 由 LimitedBox、ConstrainedBox、Align、Padding、DecoratedBox、Transform 组件组成。这是因为 Flutter 把组件设计的功能单一但覆盖面广泛，这是它的“组合优于继承”原则（？）。

<q>So, for example, to center a widget, rather than adjusting a notional Align property, you wrap it in a Center widget. Specifically, Container is made up of the LimitedBox, ConstrainedBox, Align, Padding, DecoratedBox, and Transform widgets.</q>

为什么 build 需要无副作用。

<q>A widget’s build function should be free of side effects. </q>

无状态组件需要 build，而有状态组件则不需要，因为其用户接口（界面）通过状态自动 build 了。没有找到可以类比的东西。

<q>StatefulWidgets don’t have a build method; instead, their user interface is built through their State object.</q>

Theme、Navigator、MediaQuery 等上下文都需要在使用到的时候去“of”一下才能拿到，这是“最基本的状态管理”，我不理解。

```js
Container(
  color: Theme.of(context).secondaryHeaderColor,
  child: Text(
    'Text with a background color',
    style: Theme.of(context).textTheme.headline6,
  ),
);
```

大部分跨平台框架使用 JS 作为基于 Java 的安卓以及基于 OC 的 iOS 的系统 UI 库的中间层，以及 UI 与 app logic 大量交互，拖累的性能。在 Flutter 中，Dart 代码最终被编译为 native 代码，直接交由 Skia 绘制。这就意味着没有中间层通讯以及 JS 缓慢速度带来的性能损耗。

<q>Cross-platform frameworks typically work by creating an abstraction layer over the underlying native Android and iOS UI libraries, attempting to smooth out the inconsistencies of each platform representation. App code is often written in an interpreted language like JavaScript, which must in turn interact with the Java-based Android or Objective-C-based iOS system libraries to display UI.</q>

![what's render means in flutter](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220615164637.png)

Layouts 时，依据深度优先策略把 constraints（min size、max size）自根像叶传递，相反地，实际的元素尺寸信息由叶向根传递。这有点类似某个浏览器中的布局算法？

![from widgets to element tree, to render tree](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220615164604.png)

事件不是 Dart 层处理，最终还是交给 Embedded 层处理，为什么要优于“跨平台的框架”？

<q>When you start a Flutter app, the embedder provides the entrypoint, initializes the Flutter engine, obtains threads for UI and rastering, and creates a texture that Flutter can write to. The embedder is also responsible for the app lifecycle, including input gestures (such as mouse, keyboard, touch), window sizing, thread management, and platform messages.</q>

Skia 对接的是 iOS 或 macOS 的 UIViewController 和 NSViewController，安卓的 Activity，以及 Windows 的 ANGLE。这些平台的绘图库（？）直接和驱动打交道（？）。

... 跳过“集成其它代码”部分

Flutter 如果要在 Web 端用 WebGL 绘制，需要引入编译为 WASM 的 Skia 引擎。

![flutter web support](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220615164818.png?type=win11-square)