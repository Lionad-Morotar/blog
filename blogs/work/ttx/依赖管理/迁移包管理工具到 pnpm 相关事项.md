
## 背景

为了解决依赖管理上遇到的一些问题：

1.  项目幽灵依赖：[Sign in · GitLab](https://git.ittx.com.cn/cybercloud/frontend/cybercloud-setup/-/issues/582)
2.  下载项目依赖时速度缓慢或丢失链接：[Sign in · GitLab](https://git.ittx.com.cn/cybercloud/frontend/cybercloud-setup/-/issues/606)
3.  yarn 社区不活跃：[yarn - npm](http://www.npmjs.com/package/yarn?activeTab=versions)
4.  pnpm 设计上更先进，比如，天然支持 workspace

将前端 Setup、App、Main 和 UI 项目的包管理工具从 yarn 迁移到了更现代的 pnpm，主要涉及以下改动：

1.  替换项目配置文件
2.  替换 Gitlab CI 中的包管理工具
3.  本地开发使用的包管理工具也需要同步替换为 pnpm

## 常见问题

本地使用 pnpm 可能碰到一些问题，以下列举了一些常见问题的解决方法，方便本地更快的迁移。

#### 如何在 Setup、App 等项目联调 cyber-ui 库？

pnpm 的 link 语法上和 yarn 有差异。为了在 Setup 项目安装本地的 cyber-ui 库，需要在 cyber-ui 库目录中使用 `pnpm link --dir <path-of-setup-project>`。

#### 如何安装公司 nexus 源中的依赖？

1.  通过 pnpm 登陆 nexus，`pnpm login --registry [https://nexus.loghub.com/repository/npm-public/](https://nexus.loghub.com/repository/npm-public/) --scope=@cybercloud`
2.  使用 url 依赖安装 nexus 中的依赖，如，`pnpm add [https://nexus.loghub.com/repository/npm-public/](https://nexus.loghub.com/repository/npm-public/)`

#### 项目配置文件有何不同？

1.  yarn 使用 `.yarnrc` 配置文件，pnpm 使用 `.npmrc`；
2.  yarn 使用 `yarn-lock.json`，pnpm 使用 `pnpm-lock.json`；

#### 本地控制台找不到 pnpm 指令怎么处理？

一般是因为本地 NodeJS 环境不正常导致 pnpm 安装失败（或异常）。可以尝试：

1.  重装 NodeJS 环境，再重装 pnpm
2.  使用 `npx pnpm <your-command>` 的方式运行指令