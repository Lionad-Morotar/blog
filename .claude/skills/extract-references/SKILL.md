---
name: extract-references
description: 从项目的 Markdown 文件中提取所有引用的外部网站链接，去重并按 A-Z 排序生成引用列表。禁止自动触发，该技能需要手动调用。
---

当前 SKILL 服务且仅服务于 `/Users/lionad/Github/Lionad-Morotar/blog` 博客项目，所有改动都应以该项目为基础。

# Extract References

从项目内容中提取引用的外部网站并生成 A-Z 排序的引用列表。

## 工作流程

### 1. 发现内容文件

使用 `Glob` 工具查找项目中的 Markdown 文件：

```
pattern: "content/**/*.md" 或 "**/*.md"（根据项目结构调整）
```

### 2. 提取 URL

使用 `Bash` 工具执行命令提取所有 URL：

```bash
grep -rhE 'https?://[a-zA-Z0-9.-]+' <content-path> --include='*.md' 2>/dev/null \
  | grep -oE 'https?://[a-zA-Z0-9.-]+' \
  | sed -E 's|^(https?://[^/]+).*|\1|' \
  | sed -E 's|^https?://||' \
  | grep -vE '^$|\.md$|localhost|example\.com' \
  | grep -E '^[a-z0-9][a-z0-9\-\.]+\.[a-z]{2,}$' \
  | sort -uf
```

### 3. 过滤无效条目

排除以下类型的域名：

- 不完整的链接（如 `https://blog.`、`http://www.`）
- 本地文件引用（如 `http://CHANGELOG.md`）
- 示例地址（`example.com`、`localhost`）
- 单字符域名
- 以 `.` 结尾的域名

### 4. 生成引用文件

创建 Markdown 文件，格式如下：

```markdown
---
title: 引用网站
---

博客中引用过的网站列表（按 A-Z 排序）。

## A

- [example.com](https://example.com) - 网站描述
...

---

*共收录 N 个网站，最后更新于 YYYY-MM-DD*
```

## 分类建议

- 按字母 A-Z 分组
- 中文网站可以单独归类或按拼音排序
- 为常见网站添加简短描述（可选）

## 输出文件

默认输出路径：`content/6.maps/_threads/references.md`

用户可指定其他路径。

## 示例

**用户输入**：
> 找所有我引用过的网站，放到 content/references.md

**执行步骤**：
1. 搜索项目中的 Markdown 文件
2. 提取所有 `https?://` 开头的链接
3. 清理域名（去掉协议、路径、查询参数）
4. 去重并排序
5. 生成按 A-Z 分类的 Markdown 文件
