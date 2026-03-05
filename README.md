![Blog](https://img.shields.io/badge/Lionad--Guirotar-Blog-blueviolet)
![LICENSE](https://img.shields.io/badge/license-CC--BY--NC--CD--4.0-blue)
![HEART](https://img.shields.io/badge/made%20with-%E2%9D%A4-red)
![CI Status](https://github.com/Lionad-Morotar/blog/actions/workflows/studio.yml/badge.svg?branch=master)

# Lionad's Blog

My personal knowledge base，also a blog，build with Nuxt，online url: [https://www.lionad.art](https://www.lionad.art)

## Homepage

<img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/assets/home.png" alt="Homepage" style="border: 1px solid" />

thanks [cmykpixels@codepen](https://codepen.io/cmykpixels/pen/akYxmW) for beautiful backgrounds

## Features

### Git 时间戳 (nuxt-content-git)

使用 [nuxt-content-git](https://github.com/dword-design/nuxt-content-git) 模块自动从 Git 历史中提取文章的创建和更新时间：

- **创建时间** (`createdAt`)：首次提交的时间
- **更新时间** (`updatedAt`)：最后修改的时间

文章底部会自动显示时间戳组件，如果更新时间与创建时间相同，则只显示创建时间。

**相关文件**：
- `content.config.ts` - 定义 `createdAt` 和 `updatedAt` 字段
- `app/components/content/ArticleTimestamp.vue` - 时间戳显示组件
- `app/pages/[...slug].vue` - 集成时间戳到文章页面

## License

<center>
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a>
<br />
本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a>进行许可。
<br />
如需转载部分内容，请邮件联系作者。
</center>
