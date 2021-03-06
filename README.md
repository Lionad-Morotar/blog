![Blog](https://img.shields.io/badge/Lionad--Guirotar-Blog-blueviolet)
![MIT](https://img.shields.io/badge/License-MIT-blue)

# Lionad's Blog

My personal websites，build with VuePress. Online URL: [https://www.lionad.art](https://www.lionad.art)

- [RSS Address](https://lionad.art/rss.xml)

## [Homepage](https://codepen.io/cmykpixels/pen/akYxmW)

<img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/assets/home.png" alt="Homepage" style="border: 1px solid" />

## Projects

### Issue

若遇到 Fibers 安装失败问题，请按照以下步骤操作：

1. 删除 node_modules 文件夹
2. 删除 package.json 中的 fibers
3. 执行 `npm install`
4. 执行 `npm install --save-dev fibers`
5. 若上一步仍然报错，到 /node_modules/fibers@x.x/ 文件夹中执行 `node ./build.js`

### Git Commit Style

* chore：项目配置等杂项变动
* gist（gists）: 零散的思绪
* blog（blogs）：技术博客
* text：细小的修复，如文本、图片链接
* feat：项目功能变动（或是博客内容相关功能）
* format：代码格式化
* style：页面样式变动

大体参考 [LeanCode Git Commit Style](https://open.leancloud.cn/git-commit-message/)。Commit Message 控制在一行以内，格式如：$chore: 加入 fflate 依赖$。如果有需要详细说明的内容，请再空一行后补充内容，如：

```
chore: update package-lock.json

!breaking-change
```
