---
title: Vue Reactivity API
description: Vue3 响应式系统的核心 API 详解，包含 reactive、ref、computed、effect 等原理与用法
original_path: content/6.maps/_fe-framework/ui/vue/reactive.md
---

## 核心概念

#### reactive() 和 effect() 的基本关系？

`reactive()` 创建响应式对象，`effect()` 定义副作用函数。
在 effect 内访问响应式数据会建立依赖关系，数据变化时自动触发 effect 重新执行。

#### shallowReactive() 的作用？

创建浅层响应式对象，只代理对象第一层属性。
嵌套对象的修改不会触发响应，适合优化大数据量场景的性能。

#### readonly() 与 shallowReadonly() 的区别？

`readonly()` 创建深层只读代理，任何修改都会警告。
`shallowReadonly()` 仅第一层只读，深层对象仍可修改，Vue 内部用其实现 props。

#### 如何判断响应式对象的类型？

- `isReactive()` - 判断是否 reactive 代理
- `isReadonly()` - 判断是否 readonly 代理
- `isProxy()` - 判断是否为任意代理（reactive 或 readonly）

#### markRaw() 的作用和使用场景？

在对象上添加 `__v_skip: true` 标记，使其跳过代理。适用于第三方库实例（如大型图表对象）、不需要响应式的复杂对象，或优化性能避免不必要的代理开销。

见：[深入理解 Vue3 Reactivity API](https://zhuanlan.zhihu.com/p/146097763)

#### toRaw() 的用途？

接收代理对象，返回原始对象。用于需要获取未代理数据的场景，如与不支持代理的 API 交互。

#### ReactiveFlags 枚举的作用？

Vue 内部使用的一组 Symbol 属性：
- `__v_skip` - 跳过代理标记
- `__v_isReactive` / `__v_isReadonly` - 类型标识
- `__v_raw` - 指向原始对象
- `__v_reactive` / `__v_readonly` - 缓存代理对象

## 调度与执行

#### effect 的 scheduler 选项有什么用？

自定义副作用的调度方式。例如使用队列和微任务合并多次数据变更，只执行一次副作用，这是 `watchEffect()` 的实现基础。

#### watchEffect() 与 effect() 的核心区别？

`effect()` 是底层 API，不关联组件生命周期；`watchEffect()` 在 `@vue/runtime-core` 中提供，与组件实例绑定，组件卸载时自动停止。

#### 异步副作用的竞态问题如何解决？

`watchEffect()` 接收 `onInvalidate` 函数，可在副作用重新执行前使上次的异步操作失效，避免竞态问题。

#### 如何停止一个副作用？

`effect()` 返回 runner 函数，调用 `stop(runner)` 可停止副作用，后续数据变更不再触发执行。

## 依赖收集原理

#### track() 和 trigger() 的作用？

- `track(target, type, key)` - 手动收集依赖，建立 target → key → effects 的映射
- `trigger(target, type, key)` - 手动触发响应，执行关联的 effects

Vue 通过 Proxy 自动完成这些调用，但也可手动调用实现自定义响应式逻辑。

## ref 相关

#### ref() 为什么能处理基本类型？

JavaScript 无法直接代理基本类型，ref 通过包装对象实现：返回一个带 `value` 属性的对象，通过 getter/setter 拦截 `.value` 访问来实现响应式。

#### toRef() 解决什么问题？

解决"丢失响应"问题。当从 reactive 对象解构或赋值属性到新对象时，响应式连接会丢失。
`toRef(obj, 'key')` 创建一个 ref，保持与原对象的响应式关联。

#### toRefs() 的作用？

将 reactive 对象的所有属性批量转换为 ref，配合展开运算符 `...toRefs(obj)` 使用，在解构时保持响应式。

#### 什么是自动脱 ref？

在渲染环境中访问 ref 时无需 `.value`，Vue 会自动解包。
这是通过让包含 ref 的对象也成为 reactive 代理实现的：访问属性时如果发现是 ref，自动返回 `.value`。

#### shallowRef() 与 ref() 的区别？

`ref()` 会递归代理 `.value` 引用的对象；`shallowRef()` 只代理 ref 本身，`.value` 的对象不代理。
修改深层属性不会触发响应，需配合 `triggerRef()` 手动触发。

#### triggerRef() 的使用场景？

强制触发 shallowRef 的响应。当使用 shallowRef 优化性能时，手动修改深层数据后调用 `triggerRef(ref)` 通知 Vue 数据已变化。

## 计算属性

#### computed() 的实现原理？

`computed` 是一个 lazy effect，核心机制：
- 使用 `dirty` 标志位缓存计算结果
- 仅当依赖变化时才重新计算
- 依赖变化时通过 scheduler 将 `dirty` 设为 true，下次取值时重新计算

这比 methods 更高效，因为避免了不必要的重复计算。

## Source

* [深入理解 Vue3 Reactivity API](https://zhuanlan.zhihu.com/p/146097763)
