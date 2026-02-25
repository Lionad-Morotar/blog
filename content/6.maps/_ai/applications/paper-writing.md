---
title: ML 论文写作
description: 机器学习学术论文写作指南，包括 LaTeX 工具、文献管理与可复现性实践。
original_path: _ai/paper-writing.md
---

# ML 论文写作 (ML Paper Writing)

## LaTeX 与学术写作工具

Overleaf 是在线协作 LaTeX 编辑的事实标准，内置 ACL、NeurIPS、ICML、ICLR、arXiv 等会议期刊模板。2025 年出现的 PaperDebugger 将 AI 辅助写作引入 Overleaf，通过多 Agent 系统在编辑器内提供语言润色、结构建议、引用验证等功能。

见：[Overleaf 模板库](https://www.overleaf.com/latex/templates) | [PaperDebugger 论文](https://arxiv.org/html/2512.02589v1)

## 文献管理与引用

Zotero 是开源文献管理的首选，支持浏览器插件一键保存、DOI 自动解析、与 Overleaf 集成。BibTeX 是 LaTeX 原生支持的引用格式，使用 DOI 可确保引用准确性。Mendeley 提供跨平台同步和协作批注功能。

见：[Zotero 官网](https://www.zotero.org/) | [ICML 2025 投稿指南](https://icml.cc/Conferences/2025/CallForPapers)

## 可复现性与开源

ML 论文可复现性 checklist 包括：使用 Git 管理代码版本、记录超参数和随机种子、保存中间 checkpoint、提供 Docker 封装环境。顶级会议（ICML、NeurIPS）要求接受论文必须发布代码和数据。

见：[ML Reproducibility Checklist](https://arxiv.org/abs/2003.12206) | [How to Write a Good ML Paper](https://ml-retrospectives.github.io/writing-guide/)
