---
phase: 14-complex-workflow
plan: P04
subsystem: workflow
tags: [links, cross-domain, navigation]
dependency_graph:
  requires: [14-P01, 14-P02, 14-P03]
  provides: [valid-internal-links]
  affects: [0.index.md]
tech_stack:
  added: []
  patterns: [link-update, path-migration]
key_files:
  created: []
  modified:
    - content/6.maps/0.index.md
decisions: []
metrics:
  duration: 1m 44s
  completed_date: 2026-02-25
---

# Phase 14 Plan P04: Update Cross-Domain Links Summary

**One-liner:** Updated main navigation links in 0.index.md to point to new _workflow subdomain paths after domain restructuring.

---

## Completed Tasks

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Update 0.index.md navigation links | 519d8356e | content/6.maps/0.index.md |
| 2 | Verify internal _workflow links | 6af1846fa | (verification only) |
| 3 | Verify cross-domain links from _software and _devops | a24afe5f4 | (verification only) |

---

## Changes Made

### Task 1: 0.index.md Navigation Updates

Updated the "工程" section links to use new _workflow subdomain paths:

| Old Link | New Link | Text Change |
|----------|----------|-------------|
| `/_workflow/fe-engineering` | `/_workflow/engineering/fe-engineering` | 前端工程 → 前端工程化 |
| `/_workflow/monorepo` | `/_workflow/monorepo/monorepo` | (same text) |
| `/_workflow/package-manager` | `/_workflow/package-manager/package-manager` | (same text) |
| `/_workflow/packer` | `/_workflow/build-tools/build-tools` | 打包工具 → 构建工具 |
| `/_workflow/compiler` | `/_workflow/compiler/compiler` | (same text) |
| `/_workflow/linter` | `/_workflow/linter/linter` | Linter → 代码规范 |

### Task 2: Internal _workflow Links Verification

All internal _workflow links were already correctly using new paths:
- `build-tools/build-tools.md` correctly links to vite, webpack, rspack
- `package-manager/package-manager.md` correctly links to npm, pnpm, lockfile
- `linter/linter.md` correctly links to eslint, code-style
- `monorepo/monorepo.md` correctly links to turborepo
- `engineering/engineering.md` correctly links to fe-engineering
- `workflow.md` domain entry correctly links to all 6 subdomains

### Task 3: Cross-Domain Links Verification

No cross-domain links from _software or _devops to _workflow were found:
- `_software/software.md` - no _workflow references
- `_devops/devops.md` - no _workflow references

---

## Verification Results

All 7 verification checks passed:

- [x] 0.index.md links to _workflow updated to new paths
- [x] No references to /_workflow/fe-engineering (old root path) remain
- [x] No references to /_workflow/monorepo (old root path) remain
- [x] No references to /_workflow/compiler (old root path) remain
- [x] No references to /_workflow/packer (old directory name) remain
- [x] All internal _workflow links use correct new paths
- [x] Cross-domain links from _software and _devops verified (none exist)

---

## Deviations from Plan

None - plan executed exactly as written.

---

## Auth Gates

None encountered.

---

## Self-Check

```bash
# Check modified file exists
[ -f "content/6.maps/0.index.md" ] && echo "FOUND: content/6.maps/0.index.md" || echo "MISSING"

# Check commits exist
git log --oneline --all | grep -q "519d835" && echo "FOUND: Task 1 commit" || echo "MISSING"
git log --oneline --all | grep -q "6af1846" && echo "FOUND: Task 2 commit" || echo "MISSING"
git log --oneline --all | grep -q "a24afe5" && echo "FOUND: Task 3 commit" || echo "MISSING"
```

## Self-Check: PASSED

---

## commits

- 519d8356e: feat(14-P04): update 0.index.md navigation links to new _workflow paths
- 6af1846fa: chore(14-P04): verify internal _workflow links are already correct
- a24afe5f4: chore(14-P04): verify no cross-domain _workflow links in _software or _devops
