# API 接口文档

> 博客系统提供的 API 接口参考

## 认证方式

所有 API 请求需要在 Header 中携带认证信息：

```http
Authorization: Bearer {token}
Content-Type: application/json
```

### 获取 Token

```bash
curl -X POST https://api.lionad.me/auth/token \
  -H "Content-Type: application/json" \
  -d '{"username":"xxx","password":"xxx"}'
```

**响应示例：**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

## 内容查询

### 获取文章列表

```http
GET /api/content/articles?page=1&limit=10
```

**参数说明：**

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
      必填
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
        page
      </code>
    </td>
    
    <td>
      number
    </td>
    
    <td>
      否
    </td>
    
    <td>
      页码，默认 1
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        limit
      </code>
    </td>
    
    <td>
      number
    </td>
    
    <td>
      否
    </td>
    
    <td>
      每页数量，默认 10
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tag
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      否
    </td>
    
    <td>
      按标签过滤
    </td>
  </tr>
</tbody>
</table>

### 获取单篇文章

```http
GET /api/content/articles/{slug}
```

## 搜索接口

### 全文搜索

```http
POST /api/search
Content-Type: application/json

{
  "query": "Nuxt Content",
  "filters": {
    "collection": ["articles", "maps"]
  }
}
```

**响应示例：**

```json
{
  "results": [
    {
      "title": "Nuxt Content 使用指南",
      "excerpt": "Nuxt Content 是一个强大的内容管理模块...",
      "path": "/articles/nuxt-content-guide",
      "score": 0.95
    }
  ],
  "total": 42
}
```

## 错误处理

所有 API 返回统一的错误格式：

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "请求的资源不存在",
    "details": {
      "resource": "article",
      "id": "non-existent-slug"
    }
  }
}
```

### 错误码列表

<table>
<thead>
  <tr>
    <th>
      错误码
    </th>
    
    <th>
      HTTP 状态
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
        UNAUTHORIZED
      </code>
    </td>
    
    <td>
      401
    </td>
    
    <td>
      未授权，Token 无效或过期
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        FORBIDDEN
      </code>
    </td>
    
    <td>
      403
    </td>
    
    <td>
      禁止访问，权限不足
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        NOT_FOUND
      </code>
    </td>
    
    <td>
      404
    </td>
    
    <td>
      资源不存在
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VALIDATION_ERROR
      </code>
    </td>
    
    <td>
      422
    </td>
    
    <td>
      参数校验失败
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        RATE_LIMITED
      </code>
    </td>
    
    <td>
      429
    </td>
    
    <td>
      请求过于频繁
    </td>
  </tr>
</tbody>
</table>
