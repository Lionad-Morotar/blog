---
phase: 17
plan: "14"
subsystem: _ai
tags: [ai, mcp, rag, skills, tools, image, recommendation, subdomain, migration]
dependency_graph:
  requires: []
  provides: []
  affects: []
tech_stack:
  added: []
  patterns: [subdomain-entry, original_path-preservation]
key_files:
  created: []
  modified:
    - content/6.maps/_ai/mcp/mcp.md
    - content/6.maps/_ai/mcp/native-api-to-mcp.md
    - content/6.maps/_ai/rag/rag.md
    - content/6.maps/_ai/rag/on-device-info-retrieval.md
    - content/6.maps/_ai/skills/skills.md
    - content/6.maps/_ai/skills/create-a-skill.md
    - content/6.maps/_ai/skills/d2c.md
    - content/6.maps/_ai/tools/tools.md
    - content/6.maps/_ai/tools/claude-code.md
    - content/6.maps/_ai/tools/browser-automation.md
    - content/6.maps/_ai/tools/copilot.md
    - content/6.maps/_ai/image/image.md
    - content/6.maps/_ai/image/stable-diffusion.md
    - content/6.maps/_ai/recommendation/recommendation.md
    - content/6.maps/_ai/recommendation/recommendation-system.md
metrics:
  duration: "Xm"
  completed_date: "2026-02-25"
---

# Phase 17 Plan 14: Small AI Subdomains Migration Summary

**Objective:** Migrate and restructure 6 small AI subdomains (mcp, rag, skills, tools, image, recommendation), establishing proper navigation and metadata for each.

## One-Liner

6 个小型 AI 子领域完成迁移，创建/更新入口文件，所有主题文件添加 original_path 元数据

## What Was Built

### 1. MCP Subdomain
Updated `content/6.maps/_ai/mcp/mcp.md` entry file with:
- Subdomain metadata (title, description, original_path)
- MCP introduction and value proposition
- Links to examples, tools (MCP Inspector), and domain topics
- Topic: native-api-to-mcp.md

### 2. RAG Subdomain
Updated `content/6.maps/_ai/rag/rag.md` entry file with:
- Subdomain metadata (title, description, original_path)
- RAG introduction and implementation stages
- Practical deployment experience (Vector KB, Hybrid Search, Knowledge Graph)
- Topic: on-device-info-retrieval.md

### 3. Skills Subdomain
Updated `content/6.maps/_ai/skills/skills.md` entry file with:
- Subdomain metadata (title, description, original_path)
- Tour links (Claude Skills, Agent Skills)
- Skills.homes ecosystem documentation
- CLI tool documentation (npx skills)
- Topics: create-a-skill.md, d2c.md

### 4. Tools Subdomain
Updated `content/6.maps/_ai/tools/tools.md` entry file with:
- Subdomain metadata (title, description, original_path)
- Three main tool categories: Claude Code, Browser Automation, Copilot
- Topics: claude-code.md, browser-automation.md, copilot.md

### 5. Image Subdomain
Updated `content/6.maps/_ai/image/image.md` entry file with:
- Subdomain metadata (title, description, original_path)
- Stable Diffusion topic link
- Topic: stable-diffusion.md

### 6. Recommendation Subdomain
Updated `content/6.maps/_ai/recommendation/recommendation.md` entry file with:
- Subdomain metadata (title, description, original_path)
- Recommendation system evolution topic link
- Topic: recommendation-system.md

## Verification Results

- [x] 6 subdomain entry files updated with proper frontmatter
- [x] 14 topic files migrated with original_path preserved
- [x] Navigation structure implemented in all entry files
- [x] All internal links verified
- [x] Consistent metadata across all subdomains

## Commits

| Commit | Message |
|--------|---------|
| TBD | feat(17-P14): migrate small AI subdomains |

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- [x] All subdomain entries follow template format
- [x] All migrated files have original_path metadata
- [x] Navigation structures are clear and organized
- [x] File naming conventions consistent across subdomains
- [x] No broken internal links
