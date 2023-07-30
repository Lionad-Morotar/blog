# 错误边界组件

[TOC]

## 错误边界简介

错误边界（Error Boundaries）是 17 年时 React 中出现的一种概念，它指出：组件渲染、生命周期时出现的错误不应导致整个应用的崩溃[^error-boundary]。使用错误边界能捕获组件的错误并回退到特定组件。

[^error-boundary]: https://reactjs.org/docs/error-boundaries.html#gatsby-focus-wrapper

## Vue 中的错误捕获

VueJS 内置了两种选项用于捕获组件中出现的错误，errorHandler 和 errorCaptured（Vue@2.5+），分别用于设置全局的错误捕获与子孙组件的错误捕获。VueJS 自定义了错误的传播规则：只要 errorCaptured 没有返回 false，错误就会一直向上传播：

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20201013110407.png)

有两点需要注意：

* errorHandler 会阻止错误冒泡到 window.error；
* errorCaptured 不能捕获组件自身中的错误；

针对以上两点，一般会这么处理：

* 使用自定义函数包装并增强 errorHandler 函数，组件内部不再使用 errorCaptured 处理异常。
* 封装以 errorCaptured 为基础的 ErrorBoundary 组件，控制报错粒度，并防止 UI 崩溃。

### 错误边界组件

先看看最基本的使用。

```vue
<template>
  <ErrorBoundary :fall-back="uiFallBack">
    <UnstableComponent />
  </ErrorBoundary>
</template>

<script>
export default {
  data () {
    return {
      uiFallBack: {
        functional: true,
        render (h) {
          return h('div', [
            h('h1', '网络错误~'),
            h('p', '请稍后重试~')
          ])
        }
      }
    }
  }
}
</script>
```

源代码非常简单，直接贴上来啦。

```vue
<script>
/* 帮助函数 */
import { isObjectEmpty, warn, convertVNodeArray } from 'utils'

export default {
  name: 'ErrorBoundary',
  props: {
    fallBack: Object,
    onError: Function,
    params: Object,
    stopPropagation: Boolean,
    tag: String
  },
  data() {
    return {
      err: '',
      info: '',
      hasError: null
    };
  },
  // 当 ErrorBoundary 的子孙组件出错时，
  // 触发 errorCaptured 事件，
  // 并调用传入的 onError 处理异常
  errorCaptured(err, vm, info = '') {
    this.hasError = true
    this.err = err
    this.info = info

    this.$emit('errorCaptured', { err, vm, info })
    if (this.onError) this.onError(err, vm, info)
    if (this.stopPropagation) return false
  },
  // 渲染的流程：
  // 1. 有错误则尝试渲染 slots.boundary，
  //    没有 slots 时，回退到由 props 传入的 fallBack 组件
  // 2. 无错误则尝试渲染 slots.boundary，
  //    没有 slots 时，回退到 没有 slots.defaults
  render(h) {
    const content = this.$slots.default
    const isScoped = this.$scopedSlots.boundary
    let scopedSlot

    if (isScoped) {
      scopedSlot = this.$scopedSlots.boundary({
        hasError: this.hasError,
        err: this.err,
        info: this.info
      })
    }

    const fallbackOrScoped = isScoped
      ? scopedSlot
      : h(this.fallBack, {
        props: {...this.params}
      })
    
    if (this.hasError) {
      return Array.isArray(fallbackOrScoped) 
        ? convertVNodeArray(h, this.tag, fallbackOrScoped) 
        : fallbackOrScoped
    } 

    if (isScoped) {
      if (!this.$scopedSlots.boundary()) {
        warn('ErrorBoundary component must have child components.')
        return null
      }
      return Array.isArray(scopedSlot)
        ? convertVNodeArray(h, this.tag, scopedSlot)
        : scopedSlot
    }
      
    if (isObjectEmpty(this.$slots)) {
      warn('ErrorBoundary component must have child components.')
      return null;
    }

    return Array.isArray(content) 
      ? convertVNodeArray(h, this.tag, content) 
      : content
  }
}
</script>
```

### 其它的捕获错误思路

一般而言，只要代码中抛出的错误，没有被拦截，最终都会被 window.onerror 捕获到——所以需要强调以下特殊情况：

* 像 errorHandler 这种 API 会拦截错误，所以使用自定义函数对框架 API 进行增强。
* 特殊错误如 Promise 中的异常，需要使用 window.addEventListener('unhandledrejection', event => ···) 进行捕获。

## 阅读更多

* [vue-error-boundary](https://github.com/dillonchanis/vue-error-boundary#readme)
* [VueJS 选项/生命周期钩子 errorCaptured](https://cn.vuejs.org/v2/api/#errorCaptured)
* [5种处理Vue异常的方法](https://juejin.im/post/6844903869428793351)