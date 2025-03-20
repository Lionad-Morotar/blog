---
title: Reka UI
description: 一个用于使用 Vue.js 构建高质量、可访问的设计系统和 Web 应用的开源组件库。
---

## 设计理念

以下两张图分别是 Radix UI 和 Reka UI 的官网。第一印象。Reka 官网的设计感差 Radix 太多了，完全没有 Radix 的一眼震撼。更别提 Reka 的前身 Radix Vue 的网站。

![RadixUI](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503200719585.png?type=mac)
![RekaUI](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503200719249.png?type=mac)

Reka 主打可访问性和开发者友好。

由于之前没怎么关注过 UI 组件库的可访问性，对其可访问性优先的设计不是很理解，但开发体验这块却是戳到我了。

Nuxt UI v2 升级到 Nuxt UI v3，底层原子组件库就是从 headless-vue 替换成了 Reka，在开发者体验这块可以说用过 headless-ui 的用户都被其封闭性给坑过。尤其记得 headless-ui 的 Dialog 组件，锁定页面 focus 不可更改就算了，还不能自定义插入节点；另一些组件则不能变成受控组件，也就意味着不能在外部直接操作内部状态，如控制弹窗开关。

那开发者友好到底是个啥。总的来说，就是支持不同写法，不限制具体的使用方法。下面展开讨论一下。

样式方面。相比于常见的使用 `is-` 前缀加状态名来动态绑定状态的方式，Reka 选择在部分组件上把状态绑定到 html dataset 中。再加上对于任意有 DOM 结构的 Reka 组件，本身就支持 class 或 style 自定样式。可以说 Reka 保留对样式的完全控制，开发体验足够了。

```vue
<template>
  <AccordionRoot>
    <!-- 这是 tailwind 的变体选择器写法 -->
    <AccordionItem
      class="data-[state=open]:border-b-2 data-[state=open]:border-gray-800"
      value="item-1"
    />
  </AccordionRoot>
</template>
<style>
  /* 或者使用 CSS 定义样式 */
  .AccordionItem[data-state="open"] {
    border-bottom-width: 2px;
  }
</style>
```

一般企业自己封装 UI 库会基于带设计规范的组件库，比如 Ant Design、Element UI 等。二次封装经常会碰到样式冲突问题。所以 Reka 适合作为某种基础库去使用，就像 Nuxt UI v3 是基于其二次封装。按照 Reka 文档自己的说法：“These components are low-level enough to give you control over how you want to wrap them.”

另一点样式方面有关开发体验的是动画，它特殊优化了这种 CSS 写法：

```css
.DialogOverlay[data-state="closed"],
.DialogContent[data-state="closed"] {
  animation: fadeOut 300ms ease-in;
}
```

刚才说某些组件的内部状态会绑定到 dataset 上，那么弹窗组件如果关闭就意味着取消 DOM 挂载，为何还能通过 dataset 控制动画呢？这是因为 Reka 不直接通过 v-if 来控制组件挂载，而是用一个高阶组件，内部使用了一个状态机，结合节点的创建销毁、动画开始结束等事件来控制实际的组件挂载。这样就可以做到等相关节点动画或缓动效果结束后再销毁节点。

文档还推荐使用 Vue Transition 或 Motion Vue 库来做动画。我在一些项目习惯使用 @vueuse/motion，但 Reka 和这些库相性不合，因为使用这些动画库要先把 Reka 组件转换成强制受控的组件，这样写起来非常麻烦。

```vue
<template>
  <DialogPortal v-if="styles.opacity !== 0">
    <DialogOverlay
      force-mount
      :style="{
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`,
      }"
    />
  </DialogPortal>
</template>
```

Reka 的组件叫做 Primitive，也许可以翻译成原子组件。这类组件封装模式可能是伴随 Headless 潮流而来的，他们希望通过组件组合的方式来构建上层 UI。不过在 View 层因为组件和 DOM 不是一一对应的关系，所以会碰到一个 DOM 节点用作两个原子组件的情况，比如一个 ElButton，即作为弹窗的触发，又作为 Tooltip 的触发。这样嵌套下来，会出现三层 div：tooltip-trigger-item > dialog-trigger-item > el-button。

Reka 继承了来自 Radix 的 asChild 模式以解决此类问题。给组件传递一个 asChild 属性，就能将其“隐形化”，去 DOM 结构的同时保留了样式、事件等。见下代码，可以把 TooltipTrigger 和 DialogTrigger 看做 Vue 中的 Template，而 ElButton 同时作为 Dialog 和 Tooltip 的直接子组件。在特定场景的开发体验确实不错。

```vue
<template>
  <DialogRoot>
    <TooltipRoot>
      <TooltipTrigger asChild>
        <DialogTrigger asChild>
          <ElButton>Open</ElButton>
        </DialogTrigger>
      </TooltipTrigger>
      Tip：Click the button to open dialog.
    </TooltipRoot>
    Your Dialog Content
  </DialogRoot>
</template>
```

也许是因为受控非受控组件辩论来源于 React 的缘故，以至于 Radix UI 或其他基于 React 实现的组件库会碰到受控非受控问题困扰。而我在写 Vue 时没碰到过此类问题的骚扰。在基于 Vue 的组件库中，只要组件支持判断传入了 model-value 就可以按照受控的方式运行，而使用者在外部从 v-model、model-value 的区分使用，来控制组件是否受控很天然的：v-model 受控，model-value 非受控。

进一步作说明，从语义上来说，非受控组件应该使用 default-value 而不是 model-value，因为外部传入 model-value 并不能作为其传或不传 update:model-value 的依据。Reka 的文档对这点有说明，只是文档写错了。实际写代码应当使用 default-value 来指示组件是非受控的。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503202109352.png)

另一个从 React 组件库继承过来的优化开发者体验特性是支持命名空间式组件调用。一看代码便知：

```vue
<template>
  <Dialog.Root>
    <Dialog.Trigger>
      Button Content
    </Dialog.Trigger>
  </Dialog.Root>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      Your Dialog Content
    </Dialog.Content>
  </Dialog.Portal>
</template>
```

其实现也很简单，就是新增了一个 namespaced 入口文件，导出关联的所有组件。导出是按相关性组织的，比如 Dialog 组件包含了 Root、Trigger、Content 等，Select 包含 Root、Group、Item 等，分组件导出有利于摇树优化。

```ts
export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Content: DialogContent,
} as {
  Root: typeof DialogRoot
  Trigger: typeof DialogTrigger
  Portal: typeof DialogPortal
  Content: typeof DialogContent
}
```

使用时，你也需要从这个 namespace 入口导入组件。

```vue
<script setup lang="ts">
import { Dialog } from 'reka-ui/namespaced'
</script>
```

那 Reka 从 Vue 中借鉴了哪些模式呢？一个显著的特性就是借助 Vue Inject 实现的 injectContext 功能，允许把组件的状态和方法作为一个整体，注入到子组件，达到共享的目的。举个例子，当你想替换 Dialog 中 DialogOverlay 的实现，就可以通过 injectDialogContext 来获取 DialogRoot 的状态和方法，这样可以自由的在子组件控制 Dialog 开关、拦截回调、获取组件元数据等。

```ts
const DialogRootContext = provideDialogRootContext({
  open,
  modal,
  openModal: () => {
    open.value = true
  },
  onOpenChange: (value) => {
    open.value = value
  },
  onOpenToggle: () => {
    open.value = !open.value
  },
  contentId: '',
  titleId: '',
  descriptionId: '',
  triggerElement,
  contentElement,
})
```

另一个对开发者友好的特性是，Reka 把虚拟化的思想融入到各个组件。以往开发业务组件，往往会在表格、列表等需要特定性能优化的场景使用虚拟化技术。而 Reka 的 Combobox、ListBox、Tree 组件内置了虚拟化功能，并支持常见的设置，如：动态设置子项目高度、预渲染数量（也称为 offset）、设置项目文本内容（以支持搜索功能）等。Nuxt UI 的 InputMenu 和 SelectMenu 组件就是基于此类虚拟化组件实现的。

总结一下，Reka 的设计原则是：无头、可访问性优先、开放可定制、开发者友好、高性能。此外，文档还提及 Reka 具有支持 SSR、国际化（多方向、日期、语言）等高级特性。最后，Reka 致谢有：Radix UI、React Aria、Floating UI、VueUse、Headless UI、Ariakit。两个没见过的都是“Aria”，即 React Aria 和 Ariakit。本以为是可访问性相关库，但是都只是 UI 组件库。也许 Reka 是从里面借鉴了一些组件？后续看到的话再确认。

Reka 的设计团队是 [unovue](https://unovue.com/)，其下还有一款叫 Inspira UI 的组件库，兼具酷炫和实用，有兴趣的话也可以去看看。

接下来主要从代码层看看。

## 工程保证

项目是一个包含 Docs 官方文档、Core 组件库、和 Histoire 开发文档三个项目组成的 pnpm monorepo。用来做工程保证的包大概都见过，这里列举一下：

* 交互式组件文档：[Histoire](https://histoire.dev/guide/)。StoryBook 的竞品，前年某个 Vue 项目接触过 StoryBook，简单尝试后发现对于小项目而言过于复杂了，他用的这个还不错。
* 代码规范：[@antfu/eslint-config](https://github.com/antfu/eslint-config)。
* 提交质量：simple-git-hooks 插入提交前检查和提交消息检查，分别由 lint-staged eslint 和 commitlint 代执行。
* 版本控制：bumpp 手动管理版本号。

其他工程工具包括：核心包的 vue-tsc 类型检查、Vitest 单元测试、Vite 编译、pnpm 发包。

因为没有历史包袱，代码量少的缘故，项目构建速度太快了，本体+插件（Nuxt module、Namespaced Entry、Unplugin-vue-component Resolver）能在 18 秒内完成。

CI 方面。包括基本的 build、publish、release 流程，结构比较简单，可以现学现用。此外还为每一个 Pull Request 增加了 Spell Check，以及使用 pkg.pr.new 为其发布新包。

[pkg.pr.new](https://github.com/stackblitz-labs/pkg.pr.new) 是一个发包工具，允许终端用户通过包管理器兼容的 URL 协议格式安装某个 PR 修改过代码后发布的最新的包，比如：

```bash
npm i https://pkg.pr.new/tinylibs/tinybench/tinybench@a832a55
```

项目的 TypeScript 配置分为四个部分：开发时配置、构建配置、类型检查配置、测试环境配置。构建和开发配置主要的区别就是构建时不包括测试文件提高性能。测试环境配置使用 tsconfig/node 的基础配置。这部分和大部分项目差不多。

![tsconfig](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503210235509.png)

## 具体实现

#### asChild 模式的具体实现？

组件的 asChild 属性允许用自定义元素替换组件默认的 HTML 元素，同时保留其功能和行为，如事件和无障碍相关属性。为了实现组件的 asChild，Reka 在每一个支持替换 DOM 结构的地方都使用 Primitive 组件作替代。其形如：

```vue
<template>
  <Primitive :as-child="asChild" :as="as">
    <slot />
  </Primitive>
</template>
```

Primitive 是一个专用于渲染的高阶组件，使用 as 指示 h 函数渲染具体的组件。而 asChild 属性其实是 as === 'template' 的一个语法糖。见下代码，如果 as 属性是 template，那么直接渲染子组件（Slot），否则渲染 as，默认值是 div。这样一来所有有 DOM 结构的 div 都可以在终端用户处处理成任意节点。代码简化如下：

```ts
const Primitive = defineComponent({
  setup(props, { attrs, slots }) {
    if (asTag !== 'template')
      return () => h(props.as, attrs, { default: slots.default })
    else
      return () => h(Slot, attrs, { default: slots.default })
  },
})
```

Primitive 中没有直接渲染 slots.default 而使用 Slot 中转的原因主要是要在 Slot 组件处理 css class、props 和事件合并相关事项。实际最后渲染的实际内容是处理后的克隆的 slots.default。Slot 的代码简化如下：

```ts
setup() {
  const mergedProps = child.props
    ? mergeProps(attrs, child.props)
    : attrs
  const cloned = cloneVNode(child, mergedProps)
  child[0] = cloned
  return child
}
```

#### InjectContext 模式的具体实现？

Reka 使用 injectContext 模式实现组件内的状态共享，具体而言，就是在组件分层定义不同的状态和方法，然后在子组件使用 inject 获得并使用。

以 Accordion 组件（折叠面板）为例，使用方式如下。Root 是 Accordion 的根节点，Item 是每一个可折叠的子项，Header 是子项标题，Trigger 是箭头按钮，Content 是子项展开后的内容区域。

```vue
<template>
  <AccordionRoot>
    <AccordionItem>
      <AccordionHeader>
        <AccordionTrigger />
      </AccordionHeader>
      <AccordionContent />
    </AccordionItem>
  </AccordionRoot>
</template>
```

由使用方式可以知道，在 Accordion 内部，context 的继承结构是这样的：

<Mermaid size='md'>
flowchart TD
    subgraph AccordionRootContext[AccordionRootContext]
        ARCDisabled[disabled]
        ARCDirection[direction]
        ARCRest[...]
    end
    subgraph AccordionItemContext[AccordionItemContext]
        AICValue[value]
        AICRest[...]
    end
    A(AccordionRoot) -.-> |provide| AccordionRootContext
    B(AccordionItem) -.-> |provide| AccordionItemContext
    B --> A
    C(AccordionHeader) --> B
    AccordionRootContext -.-> |inject| C
    AccordionItemContext -.-> |inject| C
    D(AccordionContent) --> B
    AccordionRootContext -.-> |inject| D
    AccordionItemContext -.-> |inject| D
</Mermaid>

一个组件可能有多个 Context，但是必须放在组件的 Vue SFC 文件中定义，才能从模版泛型中取到正确的类型。所以 Reka 组件实现有一种固定的写法，见下图，将需要导出的内容放在 script setup 外部，script setup 内部是一般的组件实现。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503210529128.png)

所有 Vue SFC 导出的内容都通过组件文件夹内的桶文件（index.ts）再次导出，这样其他 Reka 组件或终端用户就能正常获取 Context 的 inject 方法。

![组件桶文件](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503210534788.png)

至于 createContext 的实现，其实就是做了防错处理的 vue inject 和 vue provide，没什么特别之处，就不展开说了。

#### 组件延迟卸载的实现？

上面提到 Reka 使用 Presence 高阶组件来实现组件的延迟卸载，下面以 Dialog 举例。见下 DialogOverlay 的实现，根节点是 Presence 组件，其 present 属性用于节点存续状态。实际渲染的内容是 DialogOverlayImpl 组件。不过这种写法不支持 Vue Fragment。

```vue
<template>
  <Presence :present="forceMount || rootContext.open.value">
    <DialogOverlayImpl />
  </Presence>
</template>
```

在 Presence 内部，只要动画还没结束，或组件受控（强制挂载），就仍然会渲染内容。其中，usePresence 就是判断 DOM 节点动画运行状态的相关逻辑，动画没有结束，那么 isPresent 就是 true。forceMount 用于需要强制渲染组件的场景，就类似上文提到 Reka 结合 @vueuse/motion 使用调控组件动画。

```ts
setup(props, { slots, expose }) {
  const { present, forceMount } = toRefs(props)
  const { isPresent } = usePresence(present, node)
  return () => {
    if (forceMount.value || present.value || isPresent.value) {
      return h(slots.default())
    } else {
      return null
    }
  }
}
```

usePresence 内部有个状态机，用来表示组件所处的挂载状态。Vue 组件有 mounted 和 unmounted 两种，再加一种 unmountSuspended 用来表示动画还在运行。三种状态的流转方式如下：

<Mermaid size='md'>
stateDiagram-v2
    [*] --> mounted
    mounted --> unmounted: UNMOUNT
    mounted --> unmountSuspended: ANIMATION_OUT
    unmountSuspended --> mounted: MOUNT
    unmountSuspended --> unmounted: ANIMATION_END
    unmounted --> mounted: MOUNT
</Mermaid>

三种状态组合成计算属性 isPresent，只要动画还在运行，isPresent 就是 true，这和上面提到的是一致的。

```ts
const isPresent = computed(() =>
  ['mounted', 'unmountSuspended'].includes(state.value),
)
```

怎么处理状态的流转呢？代码中根据当前组件是否挂载，以及动画的名称，来决定触发何种状态流转。

* 组件挂载时，状态切换到 mounted
* 当前没有动画，或节点不可见，状态切换到 unmounted
* 组件已挂载且当前动画正在运行，状态切换到 unmountSuspended
* 动画结束后，状态切换到 unmounted

```ts
watch(
  // * 这行监听的是外部调用 usePresence(present, node) 中的参数 present
  present,
  async (currentPresent, prevPresent) => {
    const hasPresentChanged = prevPresent !== currentPresent
    if (hasPresentChanged) {
      if (currentPresent)
        dispatch('MOUNT')
      else if (currentAnimationName === 'none' || styles.value?.display === 'none')
        dispatch('UNMOUNT')
      else {
        const isAnimating = prevAnimationName !== currentAnimationName
        if (prevPresent && isAnimating)
          dispatch('ANIMATION_OUT')
        else
          dispatch('UNMOUNT')
      }
    }
  }
)
```

上面这个 watch 中使用到的 styles 样式，即 getComputedStyle 获得的样式；动画名称，则是 getComputedStyle().animationName 获得的动画名称，如果没有动画名称，则回退为默认值 'none'。至于何时才算 !isAnimating 还没有说清楚，因为要提到 currentAnimationName 和 prevAnimationName 的变化。

每次动画开始时（addEventListener(animationstart)），会重新计算动画名称，存放到 prevAnimationName 中。watch 监听时，currentAnimationName 会实时计算，这样就能对比得到当前动画是否在运行。比如上一个动画是 fadeIn，当前动画是 none，就意味着允许卸载了（状态流转到 unmounted）。此外，动画结束时，会主动触发 ANIMATION_END 事件，转换状态到 unmounted。

```ts
const handleAnimationEnd = (event: AnimationEvent) => {
  const currentAnimationName = getAnimationName(node.value)
  const isCurrentAnimation = currentAnimationName.includes(event.animationName)
  if (event.target === node.value && isCurrentAnimation) {
    dispatch('ANIMATION_END')
  }
}
```

最后，为什么 Presence 组件的支持 Vue Transition 呢？这是因为 usePresence 中每次转换状态时，都会抛出一个自定义事件。回到上面那个 watch 的例子中，以组件 mounted 为例，其他事件同理。

```ts
watch(presence, () => {
  if (currentPresent) {
    dispatch('MOUNT')
    dispatchCustomEvent('enter')
    if (currentAnimationName === 'none')
      dispatchCustomEvent('after-enter')
  }
})
```

## 组件代码

如果有有意思的组件代码，会放到在这一小节介绍。
