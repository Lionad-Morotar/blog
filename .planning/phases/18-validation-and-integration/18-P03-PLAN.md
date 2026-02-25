---
plan_id: 18-P03
phase: 18
title: Update Sitemap Configuration
wave: 1
depends_on: []
estimated_duration: 15m
autonomous: true
requirements:
  - VAL-03
files_modified:
  - nuxt.config.ts (sitemap section)
must_haves:
  - Sitemap includes all new domain paths
  - Sitemap excludes old/redirected paths
  - Sitemap generation works correctly
---

# Plan 18-P03: Update Sitemap Configuration

## Goal
Update sitemap generation configuration to reflect new domain structure.

## Context
- Sitemap should include all migrated domain content
- Old paths should be excluded or updated
- Important for SEO and search indexing

## Tasks

### Task 1: Examine Sitemap Configuration
```xml
<task>
  Read nuxt.config.ts sitemap configuration
  Check @nuxtjs/sitemap module settings
  Identify current include/exclude patterns
</task>
```

### Task 2: Update Sitemap Paths
```xml
<task>
  Add include patterns for new _domain/ structure
  Ensure all migrated domains are covered
  Update exclude patterns if needed
</task>
```

### Task 3: Test Sitemap Generation
```xml
<task>
  Run sitemap generation
  Verify sitemap.xml contains new paths
  Check no errors in generation
</task>
```

## Verification Criteria
- [ ] Sitemap config updated for new structure
- [ ] Generation succeeds
- [ ] Output includes migrated domain paths

## Rollback
- Git revert nuxt.config.ts if issues found
