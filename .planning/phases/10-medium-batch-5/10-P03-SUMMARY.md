---
phase: 10-medium-batch-5
plan: 03
subsystem: _web domain
completed: 2026-02-25
duration: 6m
tasks: 8
files_created: 6
files_modified: 5
dependencies:
  - 10-P02
key_decisions: []
tech_stack:
  added: []
  patterns:
    - 4-layer domain structure with subdomain directories
    - original_path metadata preservation
    - Cross-domain link updates in 0.index.md
key_files:
  created:
    - content/6.maps/_web/web.md
    - content/6.maps/_web/browser/browser.md
    - content/6.maps/_web/browser/crypto.md
    - content/6.maps/_web/performance/performance.md
    - content/6.maps/_web/security/security.md
    - content/6.maps/_web/crawler/crawler.md
    - content/6.maps/_web/miniapp/miniapp.md
  modified:
    - content/6.maps/_web/browser/browser-engine.md
    - content/6.maps/_web/browser/principle.md
    - content/6.maps/_web/browser/new.md
    - content/6.maps/_web/browser/router.md
    - content/6.maps/0.index.md
  removed:
    - content/6.maps/_web/browser/index.md
    - content/6.maps/_web/browser-api/crypto.md
    - content/6.maps/_web/performance.md
    - content/6.maps/_web/security.md
    - content/6.maps/_web/oauth.md
    - content/6.maps/_web/crawler.md
    - content/6.maps/_web/miniapp.md
---

# Phase 10-03: Migrate _web Domain (MED-19) Summary

**One-liner:** Migrated _web domain to 4-layer structure with domain entry and 5 subdomains (browser, performance, security, crawler, miniapp), merging browser-api into browser and security+oauth into unified security subdomain.

## What Was Done

### Domain Structure Created

Established the _web domain following the 4-layer cognitive navigation structure:

```
_web/
├── web.md                    # Domain entry with subdomain navigation
├── browser/
│   ├── browser.md            # Subdomain entry (from index.md)
│   ├── browser-engine.md     # Browser engine content
│   ├── principle.md          # Browser principles
│   ├── new.md                # New features
│   ├── router.md             # Router technology
│   └── crypto.md             # Web Crypto API (from browser-api/)
├── performance/
│   └── performance.md        # Performance optimization
├── security/
│   └── security.md           # Security + OAuth merged
├── crawler/
│   └── crawler.md            # Web crawler technology
└── miniapp/
    └── miniapp.md            # Mini-program development
```

### Key Migrations

1. **Browser Subdomain Formalization**
   - Moved `browser/index.md` to `browser/browser.md` with `original_path` metadata
   - Added `original_path` to all nested files (browser-engine.md, principle.md, new.md, router.md)
   - Updated internal links to relative paths

2. **Browser-api Merge**
   - Moved `browser-api/crypto.md` to `browser/crypto.md`
   - Updated link in security.md from `/maps/_web/browser-api/crypto` to `/maps/_web/browser/crypto`
   - Removed empty browser-api/ directory

3. **Security Subdomain Merge**
   - Created unified `security/security.md` with merged content from:
     - Original `security.md` (XSS, CSRF, CSS Exfiltration, user tracking)
     - Original `oauth.md` (OAuth fundamentals, PKCE, OIDC)
   - Removed original separate files

4. **Other Subdomain Migrations**
   - `performance.md` -> `performance/performance.md`
   - `crawler.md` -> `crawler/crawler.md`
   - `miniapp.md` -> `miniapp/miniapp.md`

5. **Cross-domain Link Updates**
   - Updated 5 links in `0.index.md` to point to new nested paths:
     - `/maps/_web/browser` -> `/maps/_web/browser/browser`
     - `/maps/_web/performance` -> `/maps/_web/performance/performance`
     - `/maps/_web/crawler` -> `/maps/_web/crawler/crawler`
     - `/maps/_web/security` -> `/maps/_web/security/security`
     - `/maps/_web/miniapp` -> `/maps/_web/miniapp/miniapp`

## Commits

| Hash | Message |
|------|---------|
| e50f9525e | feat(10-P03): create _web domain entry file |
| 09e8a45aa | feat(10-P03): formalize browser subdomain structure |
| 433a54502 | feat(10-P03): merge browser-api into browser subdomain |
| 5d199a8b0 | feat(10-P03): create performance subdomain and migrate content |
| 190be3769 | feat(10-P03): create security subdomain and merge content |
| 85735bd0f | feat(10-P03): create crawler subdomain and migrate content |
| 98a327f6b | feat(10-P03): create miniapp subdomain and migrate content |
| c6c57ae7e | feat(10-P03): update cross-domain links in 0.index.md |

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- [x] content/6.maps/_web/web.md exists with proper frontmatter
- [x] Domain entry has ## 子领域 section linking to all five subdomains
- [x] content/6.maps/_web/browser/browser.md exists (moved from index.md)
- [x] content/6.maps/_web/browser/browser-engine.md exists with original_path
- [x] content/6.maps/_web/browser/principle.md exists with original_path
- [x] content/6.maps/_web/browser/new.md exists with original_path
- [x] content/6.maps/_web/browser/router.md exists with original_path
- [x] content/6.maps/_web/browser/crypto.md exists (moved from browser-api/) with original_path
- [x] content/6.maps/_web/performance/performance.md exists (migrated from performance.md)
- [x] content/6.maps/_web/security/security.md exists (merged from security.md and oauth.md)
- [x] content/6.maps/_web/crawler/crawler.md exists (migrated from crawler.md)
- [x] content/6.maps/_web/miniapp/miniapp.md exists (migrated from miniapp.md)
- [x] All moved files have original_path in frontmatter
- [x] Original files removed
- [x] browser-api/ directory removed
- [x] All 5 links in 0.index.md updated

## Self-Check: PASSED

All created files verified to exist:
- /Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_web/web.md
- /Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_web/browser/browser.md
- /Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_web/browser/crypto.md
- /Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_web/performance/performance.md
- /Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_web/security/security.md
- /Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_web/crawler/crawler.md
- /Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/_web/miniapp/miniapp.md

All commits verified:
- e50f9525e, 09e8a45aa, 433a54502, 5d199a8b0, 190be3769, 85735bd0f, 98a327f6b, c6c57ae7e
