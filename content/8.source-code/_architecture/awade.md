---
title: Awade
description: 中兴的一套低码系统。Jigsaw 是其前端组件库。
---

## 问题

#### 代码编译器的实现？

相较于一个具体的简单的实现了 html、script 结构的 tableCmpt 的 Angular 组件，增加了一层代码编译器抽象，把属性抽象成类，具体的组件实现由 SVD（Structured View Director）指导。

```typescript
abstract class Property {
  // 这是一个抽象函数，只有声明，无法实现
  abstract script(): string;
  name: string = '';
  value: string = '';
  member: string = '';
  property(): string {
    // ...
  }
}
abstract class SVD {
  // 和 Property 类似，基类里不知道如何实现的方法，都只声明，不实现
  abstract script(): string;
  properties: Property[];
  selector: string = '';
  // 能在基类里实现的方法都尽量在基类提供实现，这样子类直接复用就好了
  html(): string {
    // ...
  }
}
```

任何要纳入到低代码平台的组件都需要继承这些基类，才能派生出描述具体某个组件如何使用的子类。

```typescript
class JigsawSelect extends SVD {
  properties: Property[] = [
    new DataProperty(), new ValueProperty()
  ];
  selector = 'jigsaw-select';
  script() {
    // ...
  }
}
```

Jigsaw 将编辑器插件视为组件+根据协议指导组件生成组件代码的工具。

![内置组件集的和插件提供的组件是平起平坐的](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503200044256.png?w=50)

作为对比，PRay 的架构要简化很多：

<Mermaid size="md">
graph TD
    subgraph InnerCmpts[内置组件库]
        IButton[按钮]
        IOther[其他组件]
    end
    subgraph ExtCmpts[扩展组件库]
        EButton[按钮]
        EOther[其他组件]
    end
    Renderer --> VueSchema[Vue-like Schema（props、emits、inject...）]
    Editor --> Renderer
    VueSchema --> Vue
    InnerCmpts --> Vue
    ExtCmpts --> Vue
</Mermaid>

其中，代码生成器是一层很薄的动态组件封装，即：

```vue
<component :is="xxx" v-bind="props" v-on="events" />
```

## 阅读

* [说透低代码 @陈旭](https://time.geekbang.org/column/intro/100108401)