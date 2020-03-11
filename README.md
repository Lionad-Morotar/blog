[![Netlify Status](https://api.netlify.com/api/v1/badges/0da4478f-b076-4a50-bcba-7f5bd7a987df/deploy-status)](https://app.netlify.com/sites/lionad/deploys)
![Open Source Flag](https://camo.githubusercontent.com/d9ce827af4ec2b7b3c52ce4595bbb354d8b21405/68747470733a2f2f6261646765732e66726170736f66742e636f6d2f6f732f76312f6f70656e2d736f757263652e7376673f763d313032)

# Lionad's Blog

这里是 Lionad-Guirotar 的技术博客, [线上地址](https://lionad.netlify.com). 也许以后会加上一些稀奇古怪的东西(说不准)...

## 项目说明

博客使用 vuepress 将 markdown 文件打包为 HTML 文件。整个项目托管在了 netlify 上，还用到了 google.analytics 服务，所以国内访问应该特别慢。

## 项目运行

### 前置条件

如果需要使用到中文字体切分相关功能，需要安装一下环境：

- python
- node(and npm)

执行一下命令：

```
npm install -g gulp@3.9.1
npm install -g subfont
pip install fonttools brotli zopfli
```

### 开发环境

```
npm run dev
```

注意，进行 vuepress 配置文件更改后（如 .vuepress/config.js），需要重新执行上述命令。

### 项目打包

```
npm run build
```

如果需要本地预览，建议安装 `http-server` 库：

```
npm install -g http-server
```

然后，启动本地服务器，预览打包后的 ./dist 文件夹：

```
http-server ./dist
```
