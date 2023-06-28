# CyberCloud 插件

插件前端项目

## 开始

1. 首先使用 yarn / npm 进行安装项目依赖

```bash
yarn
# 或者
npm install
```

2. 使用 yarn / npm 进行开发环境, 可进行快速预览和开发

```bash
yarn serve
# 或者
npm run serve
```



## 开发

本模板使用 VueCli4 + Vue3 + js 的方式进行搭建, 如不熟悉可先查看[VueCli 4](https://cli.vuejs.org/zh/)和 [Vue3](https://v3.cn.vuejs.org/) 之后进行开发




## 环境

目前所有的预设文件全部都放进了 .cybercloud 的目录中


### .cybercloud 目录

此目录包含这当前插件的所有构建配置和入口配置. 目录结构为: 

build : 包含当前插件的构建配置

expose:  当前环境的暴露内容

lib :  cyber 对象的功能

router :  vue-router 的引导模块

config.js :  插件的自定义配置

index.html : 当前插件的 html 模板, 之前为: public/index.html 

index.js :  当前插件的入口文件 , 之前为: src/main.js 

manifest.json : 当前插件的描述和配置文件,供平台使用

meta :  插件元信息 (勿动)



#### 常见问题

1. 安装模块并且装载至项目, 之前在src/main.js 中进行配置, 现在去 .cybercloud/index.js 中配置
2. 更改构建配置可以编写 vue.config.js 也可以去 .cybercloud/build/index.js 中进行更改. 推荐第二种,第一种很可能会存在配置冲突的情况
3. 更改 devServer 配置需要去 .cybercloud/build/devServer.js 中进行配置



### 路由 

定义路由请在 src/router/index.js 中进行定义 

```js
import Home from '@/views/index.vue';

export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/test',
    component: () => import('@/views/test.vue'),
  },
  {
    path: '/toLaunch',
    component: () => import('@/views/toLaunch.vue'),
  },
];

```

需要引用路由对象请直接使用 

```js
import router from '@router'
```

需要引用 vue-router 中的子模块照常使用

```js
import { useRoute } from 'vue-router'
```



### vuex

```js
暂无
```



### 定义全局组件

所在位置: src/components/index.js

定义全局组件需要导出一个 map .  key = 全局组件的名称, value = 全局组件

```js
import RouterLink from './RouterLink/index.vue';

const map = new Map();

map.set('c-router-link', RouterLink);

export default map;

```

### 全局样式

可以使用全局css类来引用平台提供的插件样式

```vue
<template>
  <div class="plugin-page plugin-page-home">
    <h1>CyberCloud 插件首页</h1>
    <hr />
    <c-router-link to="/test">进入测试页面</c-router-link>
  </div>
</template>
```

### 请求接口

```js
 cyber.request({ url: '/user/info' }).then((response) => {
    console.log(response);
  }).catch(() => alert('接口请求失败'));
```

### 使用cyber 对象

cyber 对象在插件内部所有模块通用, 可以获取当前插件的环境信息和工具函数, 如上方的请求



## 构建

```bash
yarn build
# 或者
npm run build
```



## 当前插件的构建版本

可以查看当前应用的 package.json 中的 CYBER_PLUGIN_TEMPLATE_VERSION 字段, 如果没有则为 1.0.0 





## 部署

### 编写 manifest.json 

所在位置: .cybercloud/manifest.json

将我们内部的路由给暴露给平台, 否则当前插件的路由或者其他信息不会被平台识别并正常运行功能

1. 路由申明
2. 启动页配置
3. 当前应用需要暴露的弹框组件 (需要插件构建版本为:1.1.0+ , 即 package.json 中的 CYBER_PLUGIN_TEMPLATE_VERSION 为1.1.0 以上)

```js
{
  "pages": [
    {
      "name": "首页",
      "page": "Home",
      "path": "/"
    },
    {
      "name": "测试页",
      "page": "Test",
      "path": "/test"
    }
  ],
  "launch": {
    "path" : "/toLaunch"
  },
  "dialogs": [
    {
      "title": "新增测试",
      "code": "createTest",
      "component": "/src/dialogs/createTest.vue",
      "description" : "插件模板的测试"
    }
  ]
}

```


## 暴露弹框组件

### 编写组件

该功能用来暴露当前应用定义的弹框内容渲染组件 , 可以供其他插件应用进行调用,并通过弹框的方式将当前组件给渲染出来

该功能需要注意, 因为当前组件会被当成一个最基础的组件给暴露出去, 所以不带有任何该应用的全局环境. 比如 router-link , router-view 功能都是不可使用的. 

如果需要使用第三方库, 请使用按需加载的方式进行引用, 如 element-plus , 然后引入对应的 css 文件. (不过样式引入不做要求 ,可以全部引入)

```vue
<template>
	<div>
    	<el-button> 测试 </el-button>
  </div>
</template>
<script>
import { ElButton } from 'element-plus'  
import 'element-plus/theme-chalk/base.css';
import 'element-plus/theme-chalk/el-button.css';  
// 引入全量 css 
// import 'element-plus/dist/index.css';
export default {
  components : {
    ElButton 
  }
}
</script>
```



### 触发行为

弹框组件依然可以调用 cyber 对象来调用各种操作, 其中有两个方法可以进行通信 

1. dispatchs.dispatchDialogClose() 

   通知系统,当前弹框需要关闭 , 调用该方法后会通知应用将该组件进行删除.

2. dispatchs.dispathDialogCustomEvent(eventName , data )

   向唤起该弹框的使用者传递一个事件和值来通知使用者. 使用者可以通过回调函数来订阅该事件

```vue
<template>
  <div>
    createTest
    <button @click="click"> Button </button>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const click = () => {
      // 通知系统, 该弹框当前执行关闭命令
      cyber.dispatchs.dispatchDialogClose();
    };
    return {
      click,
    };
  },
});
</script>

```



### 进行暴露

在 manifest.json 中使用 "dialogs" 字段进行描述,需要指定为一个数组, 然后其中类型为: 

1. title : 当前暴露弹框功能的预设标题, 如果在其他应用中定义了 title , 那么会将该值覆盖
2. code : 当前组件的一个唯一 code 值
3. component : 当前弹框渲染组件路径
4. description :  当前弹框组件的一个描述, 可以在插件管理中看到定义的描述信息 


### 常见问题

1. 弹框控件会被当成一个 mpa 页面被构建出来, 基座应用是一个单纯的 Vue 实例, 所以不包含其他页面元素的 vue-router 功能,也不会有包含当前本身插件的第三方工具
2. 当前弹框组件不支持嵌套功能,如在弹框组件中去激活另外一个其他插件中的弹框组件
3. 组件编写时应该按需加载, 样式引入随意



