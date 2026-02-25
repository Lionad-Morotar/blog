---
phase: 17
plan: P09
wave: 2
description: Migrate benchmark/ and framework/ subdomains
depends_on: []
files_modified:
  - content/6.maps/_ai/benchmark/benchmark.md
  - content/6.maps/_ai/framework/framework.md
autonomous: true
---

# Plan 17-P09: Migrate benchmark/ and framework/ Subdomains

## Goal
Reorganize the benchmark/ and framework/ subdomains with proper entry files.

## Current State

benchmark/ contains:
- benchmark.md
- cl-bench.md
- simple.md

framework/ contains:
- saif.md

## Tasks

### Task 1: Update benchmark/benchmark.md entry file

Update `content/6.maps/_ai/benchmark/benchmark.md`:

```yaml
---
title: AI Benchmarks
description: Benchmarking methodologies and evaluation suites for AI systems
original_path: _ai/benchmark/benchmark.md
---
```

Content:
```markdown
# AI Benchmarks

Benchmarking methodologies, evaluation suites, and performance testing for AI systems.

## Topics

- [Benchmark Overview](benchmark) — General benchmarking approaches
- [CL Bench](cl-bench) — Continual learning benchmarks
- [Simple Benchmarks](simple) — Simplified evaluation methods
```

### Task 2-3: Add frontmatter to benchmark files

Add original_path to:
- cl-bench.md (original_path: _ai/benchmark/cl-bench.md)
- simple.md (original_path: _ai/benchmark/simple.md)

### Task 4: Create framework/ entry file

Create `content/6.maps/_ai/framework/framework.md`:

```yaml
---
title: AI Frameworks
description: AI development frameworks and safety tools
original_path: _ai/framework/saif.md
---
```

Content:
```markdown
# AI Frameworks

Development frameworks, safety tools, and libraries for building AI systems.

## Topics

- [SAIF](saif) — Secure AI Framework
```

### Task 5: Add frontmatter to saif.md

Update `content/6.maps/_ai/framework/saif.md`:
```yaml
---
title: SAIF
description: Secure AI Framework for safe AI development
original_path: _ai/framework/saif.md
---
```

## Verification

- [ ] benchmark/benchmark.md has ## Topics navigation
- [ ] framework/framework.md entry file created
- [ ] All files have original_path frontmatter
