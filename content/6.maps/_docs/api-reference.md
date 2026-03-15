---
title: API 接口文档
description: 博客系统提供的 API 接口参考
created: 2026-03-11
tags: [api, reference]
---

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

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `page` | number | 否 | 页码，默认 1 |
| `limit` | number | 否 | 每页数量，默认 10 |
| `tag` | string | 否 | 按标签过滤 |

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

| 错误码 | HTTP 状态 | 说明 |
|--------|-----------|------|
| `UNAUTHORIZED` | 401 | 未授权，Token 无效或过期 |
| `FORBIDDEN` | 403 | 禁止访问，权限不足 |
| `NOT_FOUND` | 404 | 资源不存在 |
| `VALIDATION_ERROR` | 422 | 参数校验失败 |
| `RATE_LIMITED` | 429 | 请求过于频繁 |
