# Vue Test Utils

[TOC]

## create-local-vue

Vue 3 的文档中有提到，由于从同一个 Vue 构造函数中创建的实例共享同一份配置，所以在测试工具（或者其它需要隔离的环境）中容易污染全局配置。Vue3 新增了 createApp 解决这个问题。如果是 Vue2 则需要使用 vue-test-utils 项目中的一个函数，它创建了一个新实例，深拷贝了一份全局函数和配置，并劫持了其 use 方法。

```js
/**
 * @see https://github.com/vuejs/vue-test-utils/blob/e91effeda17e68817aa7bafaaf24a7ffa8185776/packages/shared/create-local-vue.js
 **/
function _createLocalVue(Vue, {}) {
  const instance = _Vue.extend()

  // clone global APIs
  Object.keys(_Vue).forEach(key => { /*...*/ })

  // clone config
  instance.config = cloneDeep(Vue.config)
  instance.config.errorHandler = config.errorHandler
  instance.config.optionMergeStrategies = Vue.config.optionMergeStrategies
  instance.options._base = instance

  // hijack use method
  const use = instance.use
  instance.use = (plugin, ...rest) => {
    /*...*/
    use.call(instance, plugin, ...rest)
  }

  return instance
}
```