---
phase: 17
plan: P14
wave: 2
description: Migrate remaining small subdomains (mcp, rag, skills, tools, image, recommendation)
depends_on: []
files_modified:
  - content/6.maps/_ai/mcp/mcp.md
  - content/6.maps/_ai/rag/rag.md
  - content/6.maps/_ai/skills/skills.md
  - content/6.maps/_ai/tools/tools.md
  - content/6.maps/_ai/image/image.md
  - content/6.maps/_ai/recommendation/recommendation.md
autonomous: true
---

# Plan 17-P14: Migrate Small Subdomains

## Goal
Reorganize the remaining small subdomains with proper entry files.

## Current State

mcp/:
- mcp.md
- native-api-to-mcp.md

rag/:
- rag.md
- on-device-info-retrieval.md

skills/:
- skills.md
- create-a-skill.md
- d2c.md

tools/:
- claude-code.md
- browser-automation.md
- copilot.md

image/:
- stable-diffusion.md

recommendation/:
- recommendation-system.md

## Tasks

### Task 1: Update mcp/mcp.md

```yaml
---
title: Model Context Protocol
description: MCP protocol and API integrations
original_path: _ai/mcp/mcp.md
---
```

Content:
```markdown
# Model Context Protocol

Model Context Protocol (MCP) for connecting AI systems with data sources and tools.

## Topics

- [MCP Overview](mcp) — Protocol fundamentals
- [Native API to MCP](native-api-to-mcp) — Converting APIs to MCP
```

Add original_path to native-api-to-mcp.md

### Task 2: Update rag/rag.md

```yaml
---
title: RAG
description: Retrieval-Augmented Generation techniques and implementations
original_path: _ai/rag/rag.md
---
```

Content:
```markdown
# RAG

Retrieval-Augmented Generation (RAG) techniques, implementations, and best practices.

## Topics

- [RAG Overview](rag) — Core RAG concepts
- [On-device Info Retrieval](on-device-info-retrieval) — Edge RAG implementations
```

Add original_path to on-device-info-retrieval.md

### Task 3: Update skills/skills.md

```yaml
---
title: AI Skills
description: AI skill development and design patterns
original_path: _ai/skills/skills.md
---
```

Content:
```markdown
# AI Skills

AI skill development, design patterns, and implementation guides.

## Topics

- [Skills Overview](skills) — Skill design patterns
- [Create a Skill](create-a-skill) — Skill development guide
- [D2C](d2c) — Design-to-code skills
```

Add original_path to create-a-skill.md and d2c.md

### Task 4: Create tools/tools.md entry

Create `content/6.maps/_ai/tools/tools.md`:

```yaml
---
title: AI Tools
description: AI development tools and assistants
original_path: _ai/tools/claude-code.md
---
```

Content:
```markdown
# AI Tools

AI development tools, coding assistants, and productivity tools.

## Topics

- [Claude Code](claude-code) — AI-powered development environment
- [Browser Automation](browser-automation) — AI browser automation
- [Copilot](copilot) — GitHub Copilot and alternatives
```

Add original_path to claude-code.md, browser-automation.md, and copilot.md

### Task 5: Create image/image.md entry

Create `content/6.maps/_ai/image/image.md`:

```yaml
---
title: AI Image Generation
description: AI image generation and diffusion models
original_path: _ai/image/stable-diffusion.md
---
```

Content:
```markdown
# AI Image Generation

AI image generation, diffusion models, and visual AI technologies.

## Topics

- [Stable Diffusion](stable-diffusion) — Open-source diffusion models
```

Add original_path to stable-diffusion.md

### Task 6: Create recommendation/recommendation.md entry

Create `content/6.maps/_ai/recommendation/recommendation.md`:

```yaml
---
title: Recommendation Systems
description: AI-powered recommendation systems and algorithms
original_path: _ai/recommendation/recommendation-system.md
---
```

Content:
```markdown
# Recommendation Systems

AI-powered recommendation systems, collaborative filtering, and personalization algorithms.

## Topics

- [Recommendation System](recommendation-system) — Recommendation algorithms and techniques
```

Add original_path to recommendation-system.md

## Verification

- [ ] All 6 subdomains have entry files with ## Topics navigation
- [ ] All topic files have original_path frontmatter
