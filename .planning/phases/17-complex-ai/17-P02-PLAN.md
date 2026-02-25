---
phase: 17
plan: P02
wave: 1
description: Create models/ subdomain for model-related topics
depends_on: []
files_modified:
  - content/6.maps/_ai/models/models.md
  - content/6.maps/_ai/models/inference.md
  - content/6.maps/_ai/models/mechanistic-interpretability.md
  - content/6.maps/_ai/models/multimodal.md
  - content/6.maps/_ai/models/optimization.md
  - content/6.maps/_ai/models/tokenization.md
autonomous: true
---

# Plan 17-P02: Create models/ Subdomain

## Goal
Create the models/ subdomain for AI model internals, inference, and optimization topics.

## Tasks

### Task 1: Create models/ directory and entry file

Create `content/6.maps/_ai/models/models.md`:

```yaml
---
title: AI Models
description: Model internals, inference, optimization, and interpretability
---
```

Content:
```markdown
# AI Models

Model internals, inference mechanisms, optimization techniques, and interpretability methods.

## Topics

- [Inference](inference) — Model inference and serving
- [Mechanistic Interpretability](mechanistic-interpretability) — Understanding model internals
- [Multimodal Models](multimodal) — Vision, language, and multimodal systems
- [Optimization](optimization) — Model optimization techniques
- [Tokenization](tokenization) — Text tokenization and encoding
```

### Task 2-6: Migrate model topic files

Move and add frontmatter to:
- `inference.md` → `models/inference.md` (original_path: _ai/inference.md)
- `mechanistic-interpretability.md` → `models/mechanistic-interpretability.md` (original_path: _ai/mechanistic-interpretability.md)
- `multimodal.md` → `models/multimodal.md` (original_path: _ai/multimodal.md)
- `optimization.md` → `models/optimization.md` (original_path: _ai/optimization.md)
- `tokenization.md` → `models/tokenization.md` (original_path: _ai/tokenization.md)

## Verification

- [ ] models/ directory exists with entry file
- [ ] 5 topic files migrated with original_path frontmatter
