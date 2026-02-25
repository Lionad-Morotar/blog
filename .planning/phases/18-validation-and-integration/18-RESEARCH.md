---
phase: 18
slug: validation-and-integration
created: 2026-02-25
---

# Phase 18 Research: Validation & Integration

## Domain Understanding

Phase 18 is the **final validation phase** of the Maps knowledge base refactoring project. All domain migrations should be complete before this phase begins.

### Phase Goal
Verify the complete reorganization and update all cross-cutting concerns.

### Requirements to Address
- **VAL-01**: 验证所有内部链接可正常访问 (Verify all internal links work)
- **VAL-02**: 验证 RSS Feed 配置正确 (Verify RSS Feed configuration)
- **VAL-03**: 更新 sitemap 生成配置 (Update sitemap generation config)
- **VAL-04**: 更新 0.index.md 中的领域导航链接 (Update domain navigation links)
- **VAL-05**: 执行端到端导航测试 (Execute end-to-end navigation tests)

## Technical Context

### Link Audit Status
From `.planning/link-audit.md`:
- 298 internal links audited across 71 files
- All links mapped with source location and target path
- Direct link update approach (no redirects)

### Migration Status (from STATE.md)
- 40/62 domains migrated (as of last update)
- 55/56 requirements complete (98%)
- 0 broken internal links (298 audited)

### Target Structure
```
_domain/                    # 领域 (Domain)
├── domain.md               # 领域入口
└── subdomain/              # 子领域
    ├── subdomain.md        # 子领域入口
    └── topic.md            # 主题 (Topic)
        #### 知识点         # 知识点 (Knowledge Point) - H4
```

## Validation Architecture

### 1. Link Validation
- Use grep/md-link-check to verify all `.md` links resolve
- Check for orphaned files (no incoming links)
- Verify cross-domain links updated correctly

### 2. RSS Feed Validation
- Check feedme configuration
- Verify feed paths match new structure
- Validate feed output

### 3. Sitemap Validation
- Verify sitemap generation includes all new paths
- Check SEO metadata preserved

### 4. Navigation Validation
- 0.index.md contains links to all domains
- Domain entries link to subdomains
- Subdomain entries link to topics

### 5. E2E Navigation Test
- Root → Domain → Subdomain → Topic → Knowledge Point
- All paths traversable

## Key Files to Examine
- `.planning/link-audit.md` - Link inventory
- `content/0.index.md` - Root navigation
- `nuxt.config.ts` - RSS/sitemap config
- Domain entry files across `_*/` directories

## Risks
- Phase 17 (AI domain with 70 files) not yet complete
- May need to scope validation to migrated domains only
