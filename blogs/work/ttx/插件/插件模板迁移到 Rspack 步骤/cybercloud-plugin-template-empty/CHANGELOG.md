# Changelog

插件模板更新记录。

插件模板的版本号见 package.json CYBER_PLUGIN_TEMPLATE_VERSION 字段。

## 1.3.1

主要变动

* chore: 从 CDN 引用 element-plus 和 cybercloud-ui 的样式文件
* chore: 增加 sass 和 stylus loader 以便兼容老插件

## 1.3.0

主要变动

* feat: 代码提交前增加校验钩子，会对代码中异常情况抛错并阻止提交，防止曾经出现的改坏了 manifest 仍提交到了线上这种报错
* chore: 项目构建工具从 Vue-CLI 迁移到 Rspack
* chore: 自定义弹窗构建工具从 Webpack 迁移到 Rspack
* chore: 使用现代化配置的 ESLint

其它说明

* 给 cyber 全局变量增加 “@cyber” 别名

推荐使用导入的写法来获取 cyber 变量，以便在以后能获得类型支持。

```vue
<script lang="ts" setup>
// 推荐使用
import cyber from "@cyber";

// * 对老插件做了兼容，下面这两种方法也支持
// import cyber from "@cybercloud/lib"
// import cyber from "@cybercloud-internal/lib"

console.log('cyber', cyber)
</script>
```

* 移除 sass 依赖，请使用 less 作为替代；之后样式文件会迁移到 postcss；
* 移除无效 npm 指令 `view-create`

## 配置迁移

将项目常用配置迁移至 .cybercloud 目录中的 config.js 中

```javascript
const mode = process.env.NODE_ENV;

const headers = {};

if (mode === "development") {
  // 当前应用 id
  headers.contextId = "APPLICATION_ID";
  // 调试的 jwt token
  headers.jwt = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJjeWJlcmNsb3VkX2Rldl93ZWJfMTA1Iiwicm5TdHIiOiJGVVJ3M1gxeEpsV0R6QmRVTThFcVFlbmg4Wk1sdlk5dCIsImtleSI6ImN5YmVyY2xvdWQiLCJ0ZW5hbnRDb2RlIjoiY3liZXJjbG91ZCJ9.43fEgJiMJAMHEgZaCCwwqcgaD8Wx0E-FioNu7HBMWZQ`;
}

module.exports = {
  // 非生产模式接口的 baseURL , 生产模式固定使用 "/"
  REQUEST_BASEURL: "/",
  // 请求配置的超时时间
  REQUEST_TIMEOUT: 15000,
  // 开发环境的代理规则 , 从之前的 build/devServer.js 迁移至此
  PROXY_RULE: {
    "/api": {
      target: "http://www.baidu.com/api",
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    },
  },
  // 非生产环境下的 headers
  REQUEST_HEADERS: headers,
};
```

如果需要顶一个 api 层，推荐使用 '/api' 开头 , 如：
```javascript
export function fetchUserInfo(data) {
  return cyber.request({
    url: "/api/user/info",
    method: "POST",
    data,
  });
}
```

**注意：更改当前 config.js 需要进行重新启动开发服务器，哪怕只是更改了 jwt token**

## 增加 #app dom 节点的环境判断

位于 .cybercloud/bootstrap.js 中

```javascript
// 如果是宿主环境，添加类名 , 可以根据不同的环境做对应的样式区分
if (window.microApp) {
  const rootDom = document.getElementById("app");
  rootDom.classList.add("CYBERCLOUD-IN-PLATFORM");
}
```

如果只想在开发模式中生效的样式如下

```css
#app:not(.CYBERCLOUD-IN-PLATFORM) {
  /* .... */
}
```

## 依赖升级

由 cybercloud-ui 的依赖迁移至：@cybercloud/ui

## 模板代码

规范了模板代码。由当前之前目录结构

```bash
- src
  - toLaunch.vue # 启动页
  - test.vue # 测试页面
```

之后

```bash
- src
  -examples
    - button
      - index.vue
    - env
      - index.vue
  - launch
    - index.vue
```

默认的启动页路由从 /toLaunch -> /launch

## 关于图标

由于 @cybercloud/ui 中的部分功能引用到了内部图标，为了防止引用冲突，推荐插件在引用 iconfont 类似的 symbol ID 时更改自定义插件 code 为前缀。
如当前插件 code = authrep , 对应设置的 symbol 前缀可以为：authrep , 引用图标 search , 则可以使用 authrep-seach

## 添加 less css 预处理器支持

目前支持在项目中使用 .less 文件或者在组件中的 style 标签中标记 lang="less"

```vue
<template>
  <!-- ... -->
</template>

<style lang="less">
// ...
</style>
```

增加了公共 less 文件，处于：src/styles/common.less , 引用处为：src/App.vue

## 导出弹框

修复部分问题，规范代码。默认引用的 Element-Plus 和 @cybercloud/ui

**当前版本的的 manifest.json 标记 dialogs 中的 disabled 字段为 true , 即 禁用弹框，不会再构建时候进行处理，如果需要在产品中进行部署该弹框请一定需要将当前要暴露的 dialog.disabled = false**

**如果导出的弹框需要 ts 环境，需要在 mainifest.json 中标记该弹框的 typescript = true 字段**

## 修复问题

1. 解决 src 目录中的全局组件导出无效问题。
## 增加 typescript 环境，可以使用 ts 文件或者组件的 script 标签标记 lang="ts"
```vue

<script lang="ts">
// .... 
</script>
```
