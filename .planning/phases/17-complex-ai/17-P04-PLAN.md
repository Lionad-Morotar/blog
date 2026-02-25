---
phase: 17
plan: P04
wave: 1
description: Create operations/ subdomain for MLOps and infrastructure
depends_on: []
files_modified:
  - content/6.maps/_ai/operations/operations.md
  - content/6.maps/_ai/operations/data-processing.md
  - content/6.maps/_ai/operations/distributed.md
  - content/6.maps/_ai/operations/infrastructure.md
  - content/6.maps/_ai/operations/mlops.md
autonomous: true
---

# Plan 17-P04: Create operations/ Subdomain

## Goal
Create the operations/ subdomain for MLOps, infrastructure, and data processing topics.

## Tasks

### Task 1: Create operations/ directory and entry file

Create `content/6.maps/_ai/operations/operations.md`:

```yaml
---
title: AI Operations
description: MLOps, infrastructure, and data processing for AI systems
---
```

Content:
```markdown
# AI Operations

MLOps practices, infrastructure management, and data processing pipelines for AI systems.

## Topics

- [Data Processing](data-processing) — Data pipelines and preprocessing
- [Distributed Systems](distributed) — Distributed training and inference
- [Infrastructure](infrastructure) — AI infrastructure and hardware
- [MLOps](mlops) — Machine learning operations
```

### Task 2-5: Migrate operations topic files

Move and add frontmatter:
- `data-processing.md` → `operations/data-processing.md` (original_path: _ai/data-processing.md)
- `distributed.md` → `operations/distributed.md` (original_path: _ai/distributed.md)
- `infrastructure.md` → `operations/infrastructure.md` (original_path: _ai/infrastructure.md)
- `mlops.md` → `operations/mlops.md` (original_path: _ai/mlops.md)

## Verification

- [ ] operations/ directory exists with entry file
- [ ] 4 topic files migrated with original_path frontmatter
