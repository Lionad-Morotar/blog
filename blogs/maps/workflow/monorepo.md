# Monorepo

[TOC]

## TODO

* [现代 Monorepo 工程技术选型，聊聊我的思考](https://juejin.cn/post/7102452341210611720)
* [Monorepo Tools](https://monorepo.tools/)
* [Monorepo 的这些坑，我们帮你踩过了](https://juejin.cn/post/6972139870231724045)

## 简介

#### monorepo 是什么？

monorepo 对应 multirepo，是“把多个仓库放到一个仓库中来管理”这种技术的统称，它可以给不同项目带来一致的工作流，使团队协作更加容易，减小项目的开发和维护成本。

#### 使用 monorepo 能解决什么问题？

* 重复编码：不同项目需要维护多套基础建设（Husky、Linter、Test、CI、Sentry、Sonar）
* 简化调试：多仓共享及调试代码成本高昂
* 版本管理：公共部分代码一定是最新版本，所以便于调试和发版

#### 使用 monorepo 带来了什么问题？

* 幽灵依赖：除非使用 pnpm 严格限制依赖，不然很容易碰到幽灵依赖的问题
* 按需构建：需要手动使用 yarn lerna:changed 找出变化的项目进行按需构建
* 提交记录混乱：需要使用更规范的分支管理及提交信息管理

## Lerna

见：[Lerna Documention](https://lerna.js.org/docs/introduction)

#### lerna 如何管理项目间的依赖？

使用 lerna bootstrap --use-workspaces 指令将会使 lerna 代理包管理器的依赖 linking 过程（类似 yarn 的 pnp 模式）；如果不带 --use-workspaces 指令，将会使用传统的符号链接进行依赖管理。

#### lerna 如何管理并行任务的依赖关系？

可以在 nx.json 中启用 targetDefaults 配置指定任务间的依赖关系。

```js
{
  ...
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build", "prebuild"]
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

![[Command Execution](https://lerna.js.org/docs/concepts/task-pipeline-configuration)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20221005225436.png)

#### lerna 的任务缓存哈希来源？

可以在任务中启用任务的缓存，如果项目源文件、项目依赖、全局配置、执行环境（NodeJS Version）、命令行参数等条件都没有改变，则这个项目的任务就会命中上一次缓存。