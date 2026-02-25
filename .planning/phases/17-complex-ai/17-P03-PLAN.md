---
phase: 17
plan: P03
wave: 1
description: Expand training/ subdomain with additional training topics
depends_on: []
files_modified:
  - content/6.maps/_ai/training/training.md
  - content/6.maps/_ai/training/fine-tuning.md
  - content/6.maps/_ai/training/post-training.md
autonomous: true
---

# Plan 17-P03: Expand training/ Subdomain

## Goal
Expand the existing training/ subdomain to include fine-tuning and post-training topics.

## Current State
training/ directory exists with:
- training.md
- topology-aware-scheduling.md

## Tasks

### Task 1: Update training.md entry file

Update `content/6.maps/_ai/training/training.md`:

```yaml
---
title: AI Training
description: Model training, fine-tuning, and post-training techniques
original_path: _ai/training/training.md
---
```

Content:
```markdown
# AI Training

Model training paradigms, fine-tuning strategies, and post-training optimization.

## Topics

- [Fine-tuning](fine-tuning) — Model fine-tuning techniques
- [Post-training](post-training) — Post-training optimization and alignment
- [Topology-aware Scheduling](topology-aware-scheduling) — Distributed training scheduling
```

### Task 2: Migrate fine-tuning.md

Move `content/6.maps/_ai/fine-tuning.md` to `content/6.maps/_ai/training/fine-tuning.md`

Add frontmatter:
```yaml
---
title: Fine-tuning
description: Model fine-tuning techniques and best practices
original_path: _ai/fine-tuning.md
---
```

### Task 3: Migrate post-training.md

Move `content/6.maps/_ai/post-training.md` to `content/6.maps/_ai/training/post-training.md`

Add frontmatter:
```yaml
---
title: Post-training
description: Post-training optimization and model alignment
original_path: _ai/post-training.md
---
```

## Verification

- [ ] training.md updated with ## Topics navigation
- [ ] fine-tuning.md migrated with original_path
- [ ] post-training.md migrated with original_path
- [ ] training/ now contains 5 files
