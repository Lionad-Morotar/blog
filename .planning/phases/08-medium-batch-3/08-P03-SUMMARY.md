---
phase: 08-medium-batch-3
plan: 03
subsystem: _software domain migration
tags:
  - domain-migration
  - medium-domain
  - 4-layer-structure
  - software
  - subdomain-organization
dependency_graph:
  requires: []
  provides:
    - _software domain with 5 subdomains
    - cross-domain link updates
  affects:
    - content/6.maps/0.index.md
tech_stack:
  added: []
  patterns:
    - Domain entry file with subdomain navigation
    - Subdomain directory with original_path preservation
    - Cross-domain link updates in 0.index.md
key_files:
  created:
    - content/6.maps/_software/software.md
    - content/6.maps/_software/whale-fall/whale-fall.md
    - content/6.maps/_software/software-engineering/software-engineering.md
    - content/6.maps/_software/data-structure/data-structure.md
    - content/6.maps/_software/design-patterns/design-patterns.md
    - content/6.maps/_software/algorithm/algorithm.md
  modified:
    - content/6.maps/0.index.md
key_decisions:
  - "Domain entry follows 4-layer structure with ## 子领域 navigation"
  - "All 5 subdomains use directory structure with original_path preservation"
  - "Cross-domain links updated to nested paths in 0.index.md"
  - "Content fully preserved during migration including diagrams and references"
metrics:
  duration: 357 seconds
  completed_date: 2026-02-24
---

# Phase 8-03: Migrate _software Domain (MED-11) Summary

**One-liner:** Migrated _software domain to 4-layer structure with domain entry file and 5 reorganized subdomains (whale-fall, software-engineering, data-structure, design-patterns, algorithm) with preserved content and metadata.

## What Was Done

### 1. Created _software Domain Entry File
- **File:** `content/6.maps/_software/software.md`
- **Frontmatter:** Title (软件), description (软件工程、数据结构、算法与设计模式)
- **## 子领域 section:** Links to all 5 subdomains with descriptions
- **## 概述 section:** Domain overview covering software engineering, open source evolution, computer science fundamentals, and design patterns

### 2. Created whale-fall Subdomain
- **Directory:** `content/6.maps/_software/whale-fall/`
- **Migrated:** `whale-fall.md` → `whale-fall/whale-fall.md`
- **original_path:** `content/6.maps/_software/whale-fall.md`
- **Content preserved:**
  - 开源项目的鲸落三阶段 section
  - 连续再殖民化 section (Sass迁移路径、失败模式)
  - 许可证变更触发食腐 section
  - Sun Microsystems的鲸群死亡 section
  - 浅水区与云厂商整合 section

### 3. Created software-engineering Subdomain
- **Directory:** `content/6.maps/_software/software-engineering/`
- **Migrated:** `software-engineering.md` → `software-engineering/software-engineering.md`
- **original_path:** `content/6.maps/_software/software-engineering.md`
- **Content preserved:**
  - Gists section with Martin Fowler访谈
  - All quotes about AI and software engineering

### 4. Created data-structure Subdomain
- **Directory:** `content/6.maps/_software/data-structure/`
- **Migrated:** `data-structure.md` → `data-structure/data-structure.md`
- **original_path:** `content/6.maps/_software/data-structure.md`
- **Content preserved:**
  - 树 section (Morris遍历、二叉树删除)
  - B树和B+树详解 section

### 5. Created design-patterns Subdomain
- **Directory:** `content/6.maps/_software/design-patterns/`
- **Migrated:** `design-patterns.md` → `design-patterns/design-patterns.md`
- **original_path:** `content/6.maps/_software/design-patterns.md`
- **Content preserved:**
  - Related link to OOP
  - 创建型模式 section (工厂、抽象工厂、生成器、原型、单例)
  - 结构型模式 section (适配器、桥接、组合、装饰、外观、享元、代理)
  - 行为模式 section (责任链、命令、中介者、备忘录、观察者)
  - 阅读 section with Vue Patterns reference

### 6. Created algorithm Subdomain
- **Directory:** `content/6.maps/_software/algorithm/`
- **Migrated:** `algorithm.md` → `algorithm/algorithm.md`
- **original_path:** `content/6.maps/_software/algorithm.md`
- **Content preserved:**
  - 快速排序 section with implementation link
  - 多人协作系统 section with Figma references

### 7. Updated Cross-Domain Links in 0.index.md
Updated links under ## 软件 section:
- `[软件工程](/maps/_software/software-engineering)` → `[软件工程](/maps/_software/software-engineering/software-engineering)`
- `[Whale Fall](/maps/_software/whale-fall)` → `[Whale Fall](/maps/_software/whale-fall/whale-fall)`
- `[设计模式](/maps/_software/design-patterns)` → `[设计模式](/maps/_software/design-patterns/design-patterns)`
- `[数据结构](/maps/_software/data-structure)` → `[数据结构](/maps/_software/data-structure/data-structure)`
- `[算法](/maps/_software/algorithm)` → `[算法](/maps/_software/algorithm/algorithm)`

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

- [x] content/6.maps/_software/software.md exists with proper frontmatter
- [x] Domain entry has ## 子领域 section linking to all five subdomains
- [x] content/6.maps/_software/whale-fall/whale-fall.md exists with original content
- [x] content/6.maps/_software/software-engineering/software-engineering.md exists with original content
- [x] content/6.maps/_software/data-structure/data-structure.md exists with original content
- [x] content/6.maps/_software/design-patterns/design-patterns.md exists with original content
- [x] content/6.maps/_software/algorithm/algorithm.md exists with original content
- [x] All moved files have original_path in frontmatter
- [x] 0.index.md links updated to new paths
- [x] All original content preserved

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | e8a38e886 | feat(08-P03): create _software domain entry file with subdomain navigation |
| 2 | 69cc086b1 | feat(08-P03): create whale-fall subdomain and migrate content |
| 3 | d508e271a | feat(08-P03): create software-engineering subdomain and migrate content |
| 4 | 721eec121 | feat(08-P03): create data-structure subdomain and migrate content |
| 5 | 0ad318bba | feat(08-P03): create design-patterns subdomain and migrate content |
| 6 | 2ca9205ca | feat(08-P03): create algorithm subdomain and migrate content |
| 7 | 38228902f | fix(08-P03): update cross-domain links in 0.index.md |

## Self-Check: PASSED

All created files verified to exist:
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_software/software.md` - FOUND
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_software/whale-fall/whale-fall.md` - FOUND
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_software/software-engineering/software-engineering.md` - FOUND
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_software/data-structure/data-structure.md` - FOUND
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_software/design-patterns/design-patterns.md` - FOUND
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_software/algorithm/algorithm.md` - FOUND

All commits verified to exist in git history.
