---
name: record-daily-bugs
description: 记录有意思的 bug 到博客某文件中
disable-model-invocation: true
---

## Workflow

1. 从上下文提取一个有意思的 bug
2. 记录到 `~/Github/Lionad-Morotar/blog/content/6.maps/_threads/daily-bugs.md` 正文开头（即 frontmatter 之后，其他内容之前），格式如下：
  ```
  #### {YYYY-MM-DD}

  {非常简短的描述}

  ````
3. `npx prettier --write ~/Github/Lionad-Morotar/blog/content/6.maps/_threads/daily-bugs.md`
4. 提交，提交消息“gists: daily bugs”
5. 向用户简短报告