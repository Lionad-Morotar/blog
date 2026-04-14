# For LLM

## 要求

* 所有 Markdown 文档有 frontmatter.title 就不要一级标题了

## Project Context

* [i18n 国际化实现](/maps/_ai/agents/docs/i18n) - 博客的轻量级多语言方案（路径约定 + 客户端偏好）

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `python3 -c "from graphify.watch import _rebuild_code; from pathlib import Path; _rebuild_code(Path('.'))"` to keep the graph current
