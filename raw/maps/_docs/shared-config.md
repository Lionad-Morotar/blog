# 共享配置参考

> 博客系统的通用配置参数，供其他文档引用

## 站点基础配置

```yaml
# nuxt.config.ts
site: {
  url: 'https://lionad.me',
  name: 'Lionad Morotar',
  description: '前端工程师 / 设计师 / 数字游民',
}
```

### 关键参数

<table>
<thead>
  <tr>
    <th>
      参数
    </th>
    
    <th>
      类型
    </th>
    
    <th>
      默认值
    </th>
    
    <th>
      说明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        url
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      -
    </td>
    
    <td>
      站点主域名
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        name
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      -
    </td>
    
    <td>
      站点名称
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        description
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      -
    </td>
    
    <td>
      SEO 描述
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        defaultLocale
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      'zh'
    </td>
    
    <td>
      默认语言
    </td>
  </tr>
</tbody>
</table>

## 内容集合配置

博客使用以下集合结构：

<table>
<thead>
  <tr>
    <th>
      集合
    </th>
    
    <th>
      路径
    </th>
    
    <th>
      说明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        flows
      </code>
    </td>
    
    <td>
      <code>
        1.flows/**
      </code>
    </td>
    
    <td>
      流程/工作流文档
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        articles
      </code>
    </td>
    
    <td>
      <code>
        2.articles/**
      </code>
    </td>
    
    <td>
      博客文章
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        books
      </code>
    </td>
    
    <td>
      <code>
        4.books/**
      </code>
    </td>
    
    <td>
      读书笔记
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        maps
      </code>
    </td>
    
    <td>
      <code>
        6.maps/**
      </code>
    </td>
    
    <td>
      知识地图
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tools
      </code>
    </td>
    
    <td>
      <code>
        7.tools/**
      </code>
    </td>
    
    <td>
      工具使用指南
    </td>
  </tr>
</tbody>
</table>

## 部署配置

### 静态生成

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/rss.xml'],
      crawlLinks: true
    }
  }
})
```

### 环境变量

```bash
# .env
NUXT_PUBLIC_SITE_URL=https://lionad.me
NUXT_PUBLIC_GITHUB_TOKEN=ghp_xxx
```
