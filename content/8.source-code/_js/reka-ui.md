---
title: Reka UI
description: 一个用于使用 Vue.js 构建高质量、可访问的设计系统和 Web 应用的开源组件库。
---

## 设计理念

Reka UI 是 Radix Vue 的 v2 新品牌（rebrand），官方在 Introduction 里明确介绍 “Reka UI, the new identity of Radix Vue in its v2 evolution”。

Reka UI 和 Radix UI 一样，严重依赖 tailwind，但从官网来看似乎两者的 UI 设计理念就有很大不同。以下两张图分别是 Radix UI 和 Reka UI 的官网。第一印象，Radix 的设计感非常棒，Reka 则更像传统 SaaS 网站（带 Hero）。

![RadixUI](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503200719585.png?type=mac)
![RekaUI](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503200719249.png?type=mac)

从官网可知，Reka 主打可访问性和开发者友好。

由于之前没怎么关注过 UI 组件库的可访问性，对其可访问性优先的设计不是很理解，但开发体验这块却是戳到我了。

Nuxt UI 的官网介绍里也明确提到它由 Tailwind CSS 与 Reka UI 驱动（“powered by Tailwind CSS and Reka UI”）。这至少能说明：Reka 作为底层“无样式 + 可访问性优先”的 primitives，已经被主流上层 UI 方案选作基础设施。

至于“开发者友好”这点：我在 Headless UI（Vue）里遇到过一些 API/扩展点不够顺手的时刻（尤其是涉及焦点管理、受控/非受控、以及与动画库协作时的控制权边界），而 Reka 的很多设计选择会把控制权更明显地交还给使用者。主观而言，Reka 要好用得多。

除此之外，开发者友好还是个啥。总的来说，就是支持不同写法，不限制具体的使用方法。下面展开讨论一下。

样式方面。相比于常见的使用 `is-` 前缀加状态类名来动态绑定状态的方式，Reka 的不少 primitives 会在 DOM 上通过 `data-*` 暴露状态（例如 `data-state="open" | "closed"`），方便你直接用选择器写样式；官方 Animation / Presence 示例就是基于这一点组织 CSS 的。再加上对于任意有 DOM 结构的 Reka 组件，本身就支持 class 或 style 自定样式。可以说 Reka 把“样式控制权”更多留给使用者。

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

一般企业自己封装 UI 库会基于带设计规范的组件库，比如 Ant Design、Element UI 等。二次封装经常会碰到样式冲突问题。所以 Reka 更适合作为某种基础库去使用：上层 UI（例如 Nuxt UI）可以在 primitives 之上统一做主题、样式与交互约束。按照 Reka 文档自己的说法：“These components are low-level enough to give you control over how you want to wrap them.”，也难怪 Nuxt UI 会选它作为基础设施。

另一点样式方面有关开发体验的是动画：官方在 Animation/Transition 指南里直接给出了基于 `data-state` 的 CSS 动画写法，并说明“退出动画之所以可行，是因为组件会在动画播放期间暂缓卸载（suspend unmount）”（如果不暂缓卸载，那么 DOM 会立即从 Document 移除，也就没有动画可言）。

```css
.DialogOverlay[data-state="closed"],
.DialogContent[data-state="closed"] {
  animation: fadeOut 300ms ease-in;
}
```

刚才说某些组件会用 `data-state` 暴露状态，那么弹窗组件如果关闭就意味着取消 DOM 挂载，为何还能通过 `data-state` 控制退出动画呢？关键点在于 Presence：官方把它描述为“管理挂载/卸载并支持过渡”，其中 `present` 的语义“类似 `v-if`”，并且会在动画/过渡结束后再卸载，从而给 “closed 状态下的退出动画” 留出执行窗口。

文档还展示了两类方案：

- 使用原生 Vue `<Transition>` 包裹带 `force-mount`（即 `forceMount`）的部件（Overlay/Content 等）。
- 使用 Motion Vue（官方推荐）或其他 JS 动画库时，通过 `force-mount` + 外层条件渲染来“接管卸载时机”（官方同样给了 @vueuse/motion 的示例）。

我在一些项目习惯使用 @vueuse/motion，这种“由动画状态决定是否渲染 Portal”的写法确实会让代码更啰嗦一些，但这是 JS 动画库需要控制卸载阶段的常见代价，并非 Reka 独有。

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

Reka 提供了一个通用的 `Primitive` 工具组件，用来把“默认渲染什么元素”这件事交给使用者控制（通过 `as` / `asChild`），并处理 props/行为的合并。这类 primitives + 组合式 parts 的模式，常用于构建无样式但可访问性完备的基础组件库。

在 View 层因为“组件 != DOM 一一对应”，会碰到一个 DOM 节点同时承担多个 primitives 的场景，比如一个 Button 既作为 Dialog 的触发，又作为 Tooltip 的触发。若直接套壳，DOM 可能会多包几层。

Reka 的 `asChild` 用来解决“多包几层 DOM”的问题：当 `asChild` 为 true 时，组件不会渲染默认 DOM 元素，而是把它所需的 props/行为合并到 slot 的第一个子元素上（官方在 Composition/Primitive 文档里明确这样描述）。见下代码：

```vue
<template>
  <DialogRoot>
    <TooltipRoot>
      <TooltipTrigger as-child>
        <DialogTrigger as-child>
          <ElButton>Open</ElButton>
        </DialogTrigger>
      </TooltipTrigger>
      Tip：Click the button to open dialog.
    </TooltipRoot>
    Your Dialog Content
  </DialogRoot>
</template>
```

受控/非受控这套术语确实更常见于 React 生态，但 Reka 在 Vue 里也把它定义得很清楚（Controlled State 指南）：

- 受控：使用 `modelValue` + `update:modelValue`（或直接 `v-model`）由父组件驱动状态。
- 非受控：用 `defaultValue` 作为“内部状态的初始值”，之后状态在组件内部演进。

注：文档示例里也会写成 `default-value`（Vue 模板里 props 的 kebab-case 形式）；两者本质是同一个 prop 的不同写法。

这也解释了一个常见误区：`modelValue` 并不是“非受控写法”，它表达的仍是“受控输入”（只是你可能没监听更新事件，导致组件变成只读）。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503202109352.png)

另一个开发体验相关的特性是“命名空间式组件调用”（官方指南：Namespaced components）。一看代码便知：

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

其实现就是提供一个 `reka-ui/namespaced` 入口，把同一组件族（例如 Dialog）相关 parts 组织在一个对象下，减少逐个导入的心智负担。

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

那 Reka 从 Vue 中借鉴了哪些模式呢？一个显著的特性就是 `injectContext`：它基于 Vue 的 Provide/Inject，把组件内部状态与方法暴露给子组件，从而允许你在“仍复用内部逻辑”的前提下替换/扩展某个 part（官方也强调该 API 主要为内部设计，可能会变动，建议谨慎使用）。

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

另一个对开发者友好的特性是虚拟化：官方的 Virtualization 指南说明，Combobox / Listbox / Tree 提供 Virtualizer 相关能力，底层基于 `@tanstack/vue-virtual`，并暴露了如 `estimateSize`、`overscan`、`textContent` 等配置，以支持大数据量列表的性能与可访问性（例如 type-ahead）。

总结一下（尽量对齐官方表述）：Reka UI 的原则包括 Accessibility-First、Customizable & Unstyled、Open & Modular、Flexible State Management、Developer-Centric Experience、Performance & Tree-Shaking。除此之外，文档体系里也提供了 SSR、国际化（RTL/locale/dates）等指南。

最后，Credits 页面列出的致谢包括 Radix UI、React Aria、Floating UI、VueUse、Headless UI、Ariakit 等；这些更多是“理念/实现参考与生态依赖”的线索，而不是直接等同于“代码来自某某库”。

Reka 的设计团队是 [unovue](https://unovue.com/)，其下还有一款叫 Inspira UI 的组件库，兼具酷炫和实用，有兴趣的话也可以去看看。

接下来主要从代码层看看。

## 工程保证

从其开源仓库结构与脚本来看，它是一个 pnpm 驱动的 monorepo：核心组件在 `packages/core`，文档站点在 `docs`（VitePress），并配套 Histoire 作为交互式示例/Story 环境。

下面这些点都能在其仓库中直接核对（链接指向具体文件/目录，避免“凭印象”）：

- 仓库结构（`docs/`、`packages/`、`.histoire/`）：https://github.com/unovue/reka-ui
- Docs 使用 VitePress（站点配置）：https://github.com/unovue/reka-ui/blob/main/docs/.vitepress/config.ts
- Histoire 配置（Story 环境）：https://github.com/unovue/reka-ui/blob/main/.histoire/vite.config.ts
- ESLint 规则来自 @antfu/eslint-config：https://github.com/unovue/reka-ui/blob/main/eslint.config.mjs
- a11y 测试（Vitest + vitest-axe）：
  - https://github.com/unovue/reka-ui/blob/main/packages/core/vitest.setup.ts
  - https://github.com/unovue/reka-ui/blob/main/packages/core/src/Accordion/Accordion.test.ts
- 配套产物（Nuxt module / namespaced / resolver 的构建入口）：https://github.com/unovue/reka-ui/blob/main/packages/plugins/build.config.ts
- 交互式组件示例：[Histoire](https://histoire.dev/guide/)。
- 代码规范：[@antfu/eslint-config](https://github.com/antfu/eslint-config)。

其他工程工具包括：类型检查（vue-tsc）、测试（Vitest + vitest-axe）、以及基于 Vite 的构建链路等。

另外它还提供了面向生态的配套产物：Nuxt module、namespaced entry、以及 unplugin-vue-components resolver 等，降低接入成本。

CI 方面这里就不展开逐项推断了（这部分很容易随时间变化）；更稳妥的做法是以仓库当前 workflows/脚本为准。

项目的 TypeScript 配置也有做分场景拆分（例如构建/测试），具体细节建议直接以仓库里的 tsconfig 文件为准。

![tsconfig](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503210235509.png)

## 具体实现

#### asChild 模式的具体实现？

组件的 `asChild` 允许用自定义元素替换组件默认的 HTML 元素，同时仍沿用组件所产生的 attrs（例如 class、事件监听、ARIA attributes 等）。在 Reka UI 的实现里，很多部件会通过 `Primitive` 来统一支持 `as` / `asChild` 这组能力。

这部分可以直接从源码核对：

- Primitive 的分支逻辑：`packages/core/src/Primitive/Primitive.ts`（`asChild` 时改用 `Slot`，否则按 `as` 渲染）
  - https://github.com/unovue/reka-ui/blob/main/packages/core/src/Primitive/Primitive.ts
- Slot 的 attrs 合并与 clone 逻辑：`packages/core/src/Primitive/Slot.ts`
  - https://github.com/unovue/reka-ui/blob/main/packages/core/src/Primitive/Slot.ts
- Fragment 展平辅助：`packages/core/src/shared/renderSlotFragments.ts`
  - https://github.com/unovue/reka-ui/blob/main/packages/core/src/shared/renderSlotFragments.ts
- Primitive 的行为测试（例如 attrs/class 合并与覆盖规则）：`packages/core/src/Primitive/Primitive.test.ts`
  - https://github.com/unovue/reka-ui/blob/main/packages/core/src/Primitive/Primitive.test.ts

在组件侧使用时通常长这样：

```vue
<template>
  <Primitive :as-child="asChild" :as="as">
    <slot />
  </Primitive>
</template>
```

从 `Primitive.ts` 能看到一个很明确的“二选一”渲染策略：

- `asChild = false`：直接 `h(props.as, attrs, slots)`（默认 `div`）
- `asChild = true`：改为 `h(Slot, attrs, slots)`，把 attrs 转交给 Slot 去“落到”某个子节点上

这里的关键并不是“把 slot 原样渲染出来”，而是 Slot 的合并规则。`Slot.ts` 里能核对到：

- 会先通过 `renderSlotFragments` 展平 Fragment；并跳过注释节点（`Comment`）
- 选择第一个“非注释子节点”作为合并目标
- 使用 `mergeProps(attrs, child.props)` 合并 props，并 `cloneVNode`
- 由于 `mergeProps` 的调用顺序是 `(attrs, child.props)`，所以在同名 props 冲突时，child 侧会覆盖 attrs（例如 class/aria/事件等）


对应的官方文档（概念层描述）在这里：https://reka-ui.com/docs/utilities/primitive

#### InjectContext 模式的具体实现？

Reka UI 的 Inject Context 指南讨论的是一种基于 Vue `provide/inject` 的“组件分层状态共享”模式。在源码实现上，它提供了一个通用的 helper：`createContext`，用来生成一对 `[injectContext, provideContext]`。

这个 helper 的实现可以在这里直接核对：

- `packages/core/src/shared/createContext.ts`
  - https://github.com/unovue/reka-ui/blob/main/packages/core/src/shared/createContext.ts

从该文件可以明确看到的行为包括：

- `createContext(providerComponentName, contextName?)` 会创建一个 `InjectionKey`，并返回一对函数
- `provideContext(contextValue)` 会调用 Vue 的 `provide(injectionKey, contextValue)` 并返回 `contextValue`
- `injectContext(fallback?)` 会调用 `inject(injectionKey, fallback)`
  - 如果注入到了值，直接返回
  - 如果注入结果是 `null`，会直接返回 `null`（这是源码里的显式分支）
  - 如果没注入到且也没有 fallback，会抛出错误；错误信息会包含 provider 组件名（`providerComponentName` 支持 string 或 string[]）

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

一个组件可能有多个 Context。就 Reka 的实现习惯而言，这些 context 往往定义在对应组件的 `.vue` 文件中，并在同文件内导出 `provideXxxContext` / `injectXxxContext` 之类的 helper；这样做的好处是类型更集中、使用侧导入路径也更直观。见下图，将需要导出的内容放在 script setup 外部，script setup 内部是一般的组件实现。

上面这段属于“项目组织方式”的经验总结：在 Reka UI 仓库里确实能看到不少 `provideXxxContext` / `injectXxxContext` 命名的 helper，但它们具体定义在 `.vue` 还是 `.ts`、以及是否与组件同文件，仍以对应组件源码为准（这类组织方式在不同版本中也可能调整）。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503210529128.png)

不少组件目录会通过桶文件（`index.ts`）做 re-export，方便在包入口集中导出；但这属于仓库组织细节，建议以仓库当前结构为准。

![组件桶文件](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503210534788.png)

如果你想看“到底多了哪些防错处理”，建议直接阅读 `createContext.ts`：它的差异点主要在“对缺失注入的报错信息”和“fallback/null 分支”。

#### 组件延迟卸载的实现？

上面提到 Reka 使用 Presence 组件来实现“延迟卸载”（更准确地说：Presence 会在“应该卸载”时，结合 `forceMount` 与 `usePresence` 的状态来决定是否继续渲染）。下面以 DialogOverlay 举例：Presence 的 `present` 用于表达“是否应该展示”，实际渲染内容是 DialogOverlayImpl。

Presence 的实现与文档可以分别在这里核对：

- 源码：`packages/core/src/Presence/Presence.ts`
  - https://github.com/unovue/reka-ui/blob/main/packages/core/src/Presence/Presence.ts
- 源码：`packages/core/src/Presence/usePresence.ts`
  - https://github.com/unovue/reka-ui/blob/main/packages/core/src/Presence/usePresence.ts
- 文档：`docs/content/docs/utilities/presence.md`
  - https://github.com/unovue/reka-ui/blob/main/docs/content/docs/utilities/presence.md

从 `Presence.ts` 可以直接确认两点“硬约束/硬逻辑”：

- slot 只接受一个直接子节点；如果给多个子节点/Fragment，会抛错并提示“Presence works similarly to v-if... expects only one direct child...”
- 渲染条件是 `forceMount || present || isPresent`（其中 `isPresent` 来自 `usePresence`）

```vue
<template>
  <Presence :present="forceMount || rootContext.open.value">
    <DialogOverlayImpl />
  </Presence>
</template>
```

在官方文档里，`present` 的语义被描述为“类似 `v-if`”；`forceMount` 的语义是“强制始终渲染”，并提到可以配合暴露出来的 `present` 去更精细地控制子树（例如在需要时把“孙组件何时渲染/卸载”的决策放到外层）。

```ts
setup(props, { slots, expose }) {
  const { present, forceMount } = toRefs(props)
  const { isPresent } = usePresence(present, node)
  return () => {
    if (forceMount.value || present.value || isPresent.value) {
      return slots.default?.()
    } else {
      return null
    }
  }
}
```

`usePresence.ts` 里可以看到它使用了一个简单状态机（`mounted` / `unmountSuspended` / `unmounted`）来表达“当前是否仍应视为 present”。三种状态组合成 `isPresent`：当状态是 `mounted` 或 `unmountSuspended` 时，`isPresent` 为 true。

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

状态流转的判定依据也能在源码中直接看到：它会读取 `getComputedStyle(node).animationName`（在源码里做了 `none` 的回退），并监听 `animationstart/animationcancel/animationend` 来更新状态；当检测到“离场动画结束”时，会 dispatch 对应事件让状态进入 `unmounted`。

另外，`usePresence.ts` 中也能核对到它会派发 `enter/after-enter/leave/after-leave` 这些自定义事件；Presence 的官方文档同样列出了这些 emits，并将其用于与动画/过渡协作的场景。

关于 Presence/forceMount 在 SSR 支持上的调整，迁移指南里也有提到（属于“版本行为变化”的证据点之一）：

- `docs/content/docs/guides/migration.md`
  - https://github.com/unovue/reka-ui/blob/main/docs/content/docs/guides/migration.md

## 组件代码

如果有有意思的组件代码，会放到在这一小节介绍。

## 参考链接

- Reka UI Introduction（rebrand、原则）：https://reka-ui.com/docs/overview/introduction
- Primitive / as / asChild：https://reka-ui.com/docs/utilities/primitive
- Presence / forceMount / events：https://reka-ui.com/docs/utilities/presence
- Animation / Transition（data-state、延迟卸载、与动画库协作）：https://reka-ui.com/docs/guides/animation
- Controlled State（modelValue vs defaultValue）：https://reka-ui.com/docs/guides/controlled-state
- Namespaced components：https://reka-ui.com/docs/guides/namespaced-components
- Inject Context（谨慎使用、API 可能变动）：https://reka-ui.com/docs/guides/inject-context
- Virtualization（基于 @tanstack/vue-virtual）：https://reka-ui.com/docs/guides/virtualization
- 源码仓库（本文提到的 Primitive/Slot/Presence 实现均可在此找到）：https://github.com/unovue/reka-ui

本文涉及的源码/文档锚点（更适合“逐条核对”）：

- Primitive 实现：https://github.com/unovue/reka-ui/blob/main/packages/core/src/Primitive/Primitive.ts
- Slot 实现：https://github.com/unovue/reka-ui/blob/main/packages/core/src/Primitive/Slot.ts
- renderSlotFragments 实现：https://github.com/unovue/reka-ui/blob/main/packages/core/src/shared/renderSlotFragments.ts
- Primitive 测试：https://github.com/unovue/reka-ui/blob/main/packages/core/src/Primitive/Primitive.test.ts
- createContext 实现：https://github.com/unovue/reka-ui/blob/main/packages/core/src/shared/createContext.ts
- Presence 实现：https://github.com/unovue/reka-ui/blob/main/packages/core/src/Presence/Presence.ts
- usePresence 实现：https://github.com/unovue/reka-ui/blob/main/packages/core/src/Presence/usePresence.ts
- Presence 文档源文件：https://github.com/unovue/reka-ui/blob/main/docs/content/docs/utilities/presence.md
- Migration 文档源文件：https://github.com/unovue/reka-ui/blob/main/docs/content/docs/guides/migration.md
