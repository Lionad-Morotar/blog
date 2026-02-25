# Phase 4: Simple Batch 3 - Research

**Researched:** 2026-02-24
**Domain:** Knowledge base migration - 5 simple domains
**Confidence:** HIGH

## Summary

This research covers the migration of 5 simple domains in Phase 4 of the knowledge base refactoring project: `_game`, `_company`, `_communication`, `_cli`, and `_blogs`. Each domain contains exactly 1 file with simple content structure (< 50 lines), making them straightforward migration candidates following the established patterns from previous phases.

Key findings:
1. All 5 domains follow the simple complexity pattern (1 file each, < 50 lines of content)
2. Cross-domain links exist: `_industry/low-code.md` links to `_blogs/herb-caudill`, and `0.index.md` links to all 5 domains
3. Content organization varies: `_game` has game development topics, `_cli` contains CLI tools (ffmpeg/imagemagick), `_blogs` is a curated collection (Herb Caudill), `_company` has business registration info, and `_communication` covers communication concepts
4. Migration pattern: Create domain entry file → Create subdomain directory → Move original content → Update links → Preserve original_path in frontmatter

**Primary recommendation:** Migrate all 5 domains following the established simple domain pattern. Each domain should have an entry file and a subdomain directory containing the original content. Update cross-domain links in `0.index.md` and `_industry/low-code.md`.

---

## Domain Analysis

### 1. _game Domain

**Current Structure:**
- File: `content/6.maps/_game/game.md`
- Lines: ~49 lines
- Content: Game development knowledge including Chinese game license history and 2D Web game framework comparison

**Current Frontmatter:**
```yaml
---
title: 游戏
description: 游戏开发、游戏设计、游戏行业等
---
```

**Content Organization:**
- 2 knowledge points (H4 headings):
  - 中国游戏版号简史
  - 2D Web 游戏框架选型指南

**Subdomain Identification:**
- Primary subdomain: `game-development` or `game` (general game topics)
- Content fits a single subdomain (no need for multiple subdomains)

**Migration Approach:**
1. Create `content/6.maps/_game/game.md` (domain entry)
2. Create `content/6.maps/_game/game/` (subdomain directory)
3. Move original `game.md` to `content/6.maps/_game/game/game.md`
4. Add `original_path: content/6.maps/_game/game.md` to frontmatter

---

### 2. _company Domain

**Current Structure:**
- File: `content/6.maps/_company/company.md`
- Lines: ~11 lines
- Content: Business registration information (individual businesses vs companies)

**Current Frontmatter:**
```yaml
---
title: 公司
description: 注册和经营的流程及注意事项
---
```

**Content Organization:**
- 1 knowledge point (H4 heading):
  - 个体工商户与企业的主要区别是什么？

**Subdomain Identification:**
- Primary subdomain: `business` or `company` (business registration topics)
- Very simple content, single subdomain sufficient

**Migration Approach:**
1. Create `content/6.maps/_company/company.md` (domain entry)
2. Create `content/6.maps/_company/business/` (subdomain directory)
3. Move original `company.md` to `content/6.maps/_company/business/business.md` or keep as `company/company.md`
4. Add `original_path: content/6.maps/_company/company.md` to frontmatter

---

### 3. _communication Domain

**Current Structure:**
- File: `content/6.maps/_communication/index.md` (note: different filename)
- Lines: ~13 lines
- Content: Communication concepts (Bikeshed Effect)

**Current Frontmatter:**
```yaml
---
title: Communication
description: Communication is the process of exchanging information, ideas, thoughts, and feelings.
---
```

**Content Organization:**
- 1 knowledge point (H4 heading):
  - Bikeshed Effect（自行车棚问题）是什么？

**Subdomain Identification:**
- Primary subdomain: `communication` or `collaboration`
- Single subdomain sufficient

**Migration Approach:**
1. Create `content/6.maps/_communication/communication.md` (domain entry)
2. Create `content/6.maps/_communication/communication/` (subdomain directory)
3. Move original `index.md` to `content/6.maps/_communication/communication/communication.md`
4. Add `original_path: content/6.maps/_communication/index.md` to frontmatter

**Special Consideration:** Original file is named `index.md`, not `communication.md`. Need to handle filename change.

---

### 4. _cli Domain

**Current Structure:**
- File: `content/6.maps/_cli/ffmpeg.md` (note: different filename)
- Lines: ~51 lines
- Content: CLI tools reference (ffmpeg and imagemagick commands)

**Current Frontmatter:**
```yaml
---
title: ffmpeg & imagemagick
description: 最常使用的视频和图片处理工具。
---
```

**Content Organization:**
- 2 sections (H2 headings):
  - FFMPEG (with 4 H4 command examples)
  - ImageMagick (with 1 H4 command example)
- Structure: Tool reference/cheatsheet format

**Subdomain Identification:**
- Primary subdomain: `media-tools` or `tools` (CLI media processing tools)
- Alternative: Could use `ffmpeg` as subdomain name since that's the current file focus

**Migration Approach:**
1. Create `content/6.maps/_cli/cli.md` (domain entry)
2. Create `content/6.maps/_cli/tools/` (subdomain directory)
3. Move original `ffmpeg.md` to `content/6.maps/_cli/tools/ffmpeg.md`
4. Add `original_path: content/6.maps/_cli/ffmpeg.md` to frontmatter

**Special Consideration:** Original file is named `ffmpeg.md`, not `cli.md`. The content is specifically about media tools. Keeping original filename preserves the semantic meaning.

---

### 5. _blogs Domain

**Current Structure:**
- File: `content/6.maps/_blogs/herb-caudill.md` (note: different filename)
- Lines: ~118 lines
- Content: Curated blog posts from Herb Caudill about software engineering

**Current Frontmatter:**
```yaml
---
title: Herb Caudill
description: 对软件工程的反思
---
```

**Content Organization:**
- 3 major blog post summaries (H4 headings):
  - Solving the software puzzle
  - Excel hell: A cautionary tale
  - Data types for humans
- Structure: Curated reading list with detailed summaries

**Subdomain Identification:**
- Primary subdomain: `software-engineering` or `engineering-blogs`
- Content is specifically about software engineering philosophy

**Migration Approach:**
1. Create `content/6.maps/_blogs/blogs.md` (domain entry)
2. Create `content/6.maps/_blogs/software-engineering/` (subdomain directory)
3. Move original `herb-caudill.md` to `content/6.maps/_blogs/software-engineering/herb-caudill.md`
4. Add `original_path: content/6.maps/_blogs/herb-caudill.md` to frontmatter

**Special Consideration:** Original file is named `herb-caudill.md`. This is a curated blog collection, so keeping the original filename makes sense for identifying the content.

---

## Cross-Domain Links

### Links TO these domains (from other domains):

| Source File | Current Link | Target Domain | Action Required |
|-------------|--------------|---------------|-----------------|
| `content/6.maps/0.index.md:68` | `[ffmpeg & imagemagick](/maps/_cli/ffmpeg)` | _cli | Update to `/maps/_cli/tools/ffmpeg` |
| `content/6.maps/0.index.md:143` | `[游戏](/maps/_game/game)` | _game | Update to `/maps/_game/game/game` |
| `content/6.maps/0.index.md:149` | `[注册公司](/maps/_company/company)` | _company | Update to `/maps/_company/business/company` or `/maps/_company/company/company` |
| `content/6.maps/_industry/low-code.md:45` | `[Herb Caudill](/maps/_blogs/herb-caudill)` | _blogs | Update to `/maps/_blogs/software-engineering/herb-caudill` |

### Links FROM these domains:
- None found - all 5 domains are leaf nodes with no internal links to other maps content

### External Links (outside 6.maps/):
- None found for these 5 domains

---

## Migration Approach Summary

### Standard Pattern for Simple Domains

Based on previous phases (Simple Batch 1 and 2), the migration pattern is:

```
Before:
_domain/
└── file.md

After:
_domain/
├── domain.md              # Domain entry file
└── subdomain/             # Subdomain directory
    └── subdomain.md       # Original content moved here (or keep original name)
```

### Domain Entry File Template

```yaml
---
title: [Domain Title]
description: [Domain description]
---

## 子领域

* [Subdomain Title](/maps/_domain/subdomain/subdomain)

## 概述

[Brief domain overview]
```

### Frontmatter Requirements

All moved files must include:
```yaml
---
title: [Original Title]
description: [Original Description]
original_path: content/6.maps/_domain/original-filename.md
---
```

### Link Update Priority

1. **High Priority:** `0.index.md` navigation links (user-facing)
2. **Medium Priority:** Cross-domain content links (`_industry/low-code.md`)
3. **Low Priority:** Internal domain links (none for these domains)

---

## Special Considerations

### 1. Filename Preservation

Per prior phase decisions, original filenames should be preserved when they carry semantic meaning:
- `_cli/ffmpeg.md` → Keep as `tools/ffmpeg.md` (not `tools/tools.md`)
- `_blogs/herb-caudill.md` → Keep as `software-engineering/herb-caudill.md`
- `_communication/index.md` → Rename to `communication/communication.md` (index has no semantic value)

### 2. Subdomain Naming

| Domain | Proposed Subdomain | Rationale |
|--------|-------------------|-----------|
| _game | `game` | Matches domain name, general game topics |
| _company | `business` or `company` | Business registration focus |
| _communication | `communication` | Matches domain name |
| _cli | `tools` | CLI tools focus (media processing) |
| _blogs | `software-engineering` | Content is specifically SE blogs |

### 3. Content Complexity

All 5 domains are simple (< 50 lines each), so:
- No need to split content into multiple topic files
- Single subdomain per domain is sufficient
- No nested subdomains needed

### 4. Cross-Domain Link Updates

After migration, these links need updating:

**0.index.md updates:**
```markdown
# Before:
* [ffmpeg & imagemagick](/maps/_cli/ffmpeg)
* [游戏](/maps/_game/game)
* [注册公司](/maps/_company/company)

# After:
* [ffmpeg & imagemagick](/maps/_cli/tools/ffmpeg)
* [游戏](/maps/_game/game/game)
* [注册公司](/maps/_company/business/company)  # or /company/company
```

**_industry/low-code.md update:**
```markdown
# Before:
* [Herb Caudill](/maps/_blogs/herb-caudill)

# After:
* [Herb Caudill](/maps/_blogs/software-engineering/herb-caudill)
```

---

## Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| Broken navigation links | Medium | Update 0.index.md links immediately after migration |
| Broken cross-domain links | Low | Update _industry/low-code.md link |
| Content loss | Low | Use git version control, add original_path |
| Inconsistent subdomain naming | Low | Follow naming conventions documented above |

---

## Recommended Migration Order

1. **_game** - Straightforward, clear subdomain name
2. **_company** - Simple content, business subdomain
3. **_communication** - Handle index.md rename
4. **_cli** - Keep ffmpeg.md filename
5. **_blogs** - Keep herb-caudill.md filename, update cross-domain link

---

## References

### Previous Phase Patterns
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/phases/03-simple-batch-2/03-01-PLAN.md` - _react-native migration pattern
- `/Users/lionad/Github/Lionad-Morotar/blog/.planning/phases/03-simple-batch-2/03-02-PLAN.md` - _oop and _medicine migration pattern

### Source Files Analyzed
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_game/game.md`
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_company/company.md`
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_communication/index.md`
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_cli/ffmpeg.md`
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_blogs/herb-caudill.md`
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/0.index.md`
- `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_industry/low-code.md`

---

## Metadata

**Confidence breakdown:**
- Domain structure analysis: HIGH - All files read and analyzed
- Cross-domain link identification: HIGH - Grep search completed
- Migration pattern: HIGH - Based on 2 previous phases
- Subdomain naming: MEDIUM - Requires planner confirmation

**Research date:** 2026-02-24
**Valid until:** 2026-03-24

---

## RESEARCH COMPLETE

**Phase:** 04 - Simple Batch 3
**Confidence:** HIGH

### Key Findings
1. All 5 domains are simple (1 file each, < 50 lines) - straightforward migration
2. 4 cross-domain links need updating: 3 in 0.index.md, 1 in _industry/low-code.md
3. 2 domains have non-standard filenames (_communication/index.md, _cli/ffmpeg.md, _blogs/herb-caudill.md)
4. Subdomain naming decisions needed for _company (business vs company) and _blogs (software-engineering vs engineering)
5. No internal links within these domains - all are leaf nodes

### File Created
`.planning/phases/04-simple-batch-3/04-simple-batch-3-RESEARCH.md`

### Ready for Planning
Research complete. Planner can now create PLAN.md files for each domain migration.
