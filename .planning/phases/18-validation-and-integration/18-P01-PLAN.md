---
plan_id: 18-P01
phase: 18
title: Validate Internal Links
wave: 1
depends_on: []
estimated_duration: 20m
autonomous: true
requirements:
  - VAL-01
files_modified:
  - .planning/link-validation-report.md
must_haves:
  - All internal .md links resolve to existing files
  - No orphaned files without incoming links
  - Cross-domain links point to correct new paths
---

# Plan 18-P01: Validate Internal Links

## Goal
Verify all internal markdown links resolve correctly after domain restructuring.

## Context
- 298 internal links were audited in Phase 1
- Direct link updates were made during each migration phase
- Need final verification that no links were missed or broken

## Tasks

### Task 1: Check for Broken Links
```xml
<task>
  Scan all .md files in content/ for internal links
  Verify each link target exists
  Record any broken links found
</task>
```

### Task 2: Check for Orphaned Files
```xml
<task>
  List all .md files in migrated _*/ domains
  Check each file has at least one incoming link
  List orphaned files (if any)
</task>
```

### Task 3: Verify Cross-Domain Links
```xml
<task>
  Check links from 0.index.md to domain entries
  Check cross-references between domains
  Verify subdomain navigation links
</task>
```

### Task 4: Generate Validation Report
```xml
<task>
  Create .planning/link-validation-report.md
  Document: total links checked, broken links found, orphaned files
  If issues found, list specific files and suggested fixes
</task>
```

## Verification Criteria
- [ ] All internal `.md` links resolve to existing files
- [ ] No critical orphaned files (optional: list acceptable orphans)
- [ ] Report generated with findings

## Rollback
N/A - validation only, no file modifications
