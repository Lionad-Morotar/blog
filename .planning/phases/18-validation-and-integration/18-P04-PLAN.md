---
plan_id: 18-P04
phase: 18
title: Update Domain Navigation in 0.index.md
wave: 2
depends_on: [18-P01]
estimated_duration: 20m
autonomous: true
requirements:
  - VAL-04
files_modified:
  - content/0.index.md
must_haves:
  - 0.index.md contains links to all 46+ domains
  - Each domain link points to domain entry file
  - Navigation structure matches new hierarchy
---

# Plan 18-P04: Update Domain Navigation in 0.index.md

## Goal
Update root navigation file (0.index.md) to link to all migrated domains.

## Context
- 0.index.md is the main entry point
- Should provide navigation to all 46+ domains
- Domain entries are at `_domain/domain.md`

## Tasks

### Task 1: Inventory All Domains
```xml
<task>
  List all _*/ directories in content/
  Identify which have domain entry files ({domain}.md)
  Note any domains missing entries
</task>
```

### Task 2: Review Current Navigation
```xml
<task>
  Read content/0.index.md
  Identify existing domain links
  Note which links need updating
</task>
```

### Task 3: Update Navigation Links
```xml
<task>
  Update links to point to new domain entry paths
  Add links for any missing domains
  Ensure consistent formatting
</task>
```

### Task 4: Verify Navigation
```xml
<task>
  Check all domain links resolve
  Verify subdomain navigation from domain entries
  Document any broken navigation paths
</task>
```

## Verification Criteria
- [ ] All domains linked from 0.index.md
- [ ] Links point to correct domain entry files
- [ ] No broken navigation links

## Rollback
- Git revert content/0.index.md if needed
