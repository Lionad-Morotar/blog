---
title: Electron 安全基线
description: 加载远程内容的安全清单、导航白名单盲区与权限双层执法
---

#### 加载远程内容的安全清单：默认放行与导航接管才是硬门

隔离三件套（`contextIsolation`、`sandbox`、`nodeIntegration: false`）在新版已是默认值，显式钉死即可；
真正出事故的是清单后半：`setPermissionRequestHandler` 对远程内容的权限请求默认自动批准，通知、地理位置、
摄像头都会直接放行；`will-navigate` 与 `setWindowOpenHandler` 不接管时，站点可以把窗口导航到任意 URL
或弹出新窗；所有 IPC 消息必须校验 sender；`shell.openExternal` 只喂白名单 URL。官方清单共 20 条，
对加载远程内容的壳可收敛为五组：隔离、导航接管、权限审批、IPC 校验、fuses。

见：[Security Recommendations](https://www.electronjs.org/docs/latest/tutorial/security)

#### 导航白名单有三个静默盲区

`will-navigate` 只在「用户或页面发起导航」时触发，三个盲区都藏在这个限定里。其一，服务端 302
重定向发生在导航进行中，走的是 `will-redirect` 事件：只挂 `will-navigate` 的白名单，会被可信页面
的一跳 302 静默带到外域。其二，壳自身的程序化 `loadURL`（起窗、恢复会话）同样不触发
`will-navigate`，首屏 URL 天然免检，必须按受信输入对待。其三，官方文档明确：对任一可取消事件调用
`preventDefault()` 后，后续导航事件链不再触发，双事件各自的裁决缺一不可。解法是 `will-navigate` 与
`will-redirect` 各挂一份同白名单裁决。

见：[webContents navigation events](https://www.electronjs.org/docs/latest/api/web-contents)

#### 权限白名单要两层执法：request 与 check handler 缺一不可

站点和权限打交道有两种动作：真要权限（`getUserMedia`、`Notification.requestPermission`）触发授权
流程，走 `setPermissionRequestHandler`；只是打听状态（`navigator.permissions.query`）走同步的
`setPermissionCheckHandler`。check handler 未设置时，Electron 对查询默认返回 granted：站点 UI 显示
「通知已开启」，实际发通知又被 request handler 拒掉，前端拿着假状态做出一连串误判（社区 issue 记录
`permissions.query` 恒返回 granted，且裁决 API 只有布尔、没有 prompt 态）。解法是两个 handler 共用
同一个裁决纯函数，两层答案天然一致。另一个粒度事实：media 的授权单位是整个 permission 而非单个设备，
audio+video 组合请求拆不开、只能整体拒，请求里缺 `mediaTypes` 时按拒绝处理。

见：[session.setPermissionCheckHandler](https://www.electronjs.org/docs/latest/api/session#sessetpermissioncheckhandlerhandler)
