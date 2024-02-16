# Vite

## 常见问题

#### 如何配置 HTTPs 开发环境？

1. 设置 `server.https` 为 true
2. 安装 `vite-plugin-mkcert` 插件并创建实例添加到 plugins 中
3. 运行项目，系统会提示是否安装证书，选“安装”即可

如果不使用 vite-plugin-mkcert 创建证书，Chrome 不会显示有“忽略证书错误并打开页面”的“高级选项”按钮。
