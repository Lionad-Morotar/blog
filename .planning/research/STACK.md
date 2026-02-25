# Stack Research: Knowledge Base Hierarchical Organization

**Project:** Knowledge Base Refactoring - Hierarchical Cognitive Structure
**Domain:** Knowledge Management & Documentation Systems
**Researched:** 2026-02-24
**Confidence:** HIGH

---

## Executive Summary

This research evaluates the technology stack and organizational patterns for refactoring a 324-file knowledge base into a unified 4-layer cognitive hierarchy: Domain (领域) → Subdomain (子领域) → Topic (主题) → Knowledge Point (知识点). The project uses Nuxt Content v3 as the core content management system.

**Key Finding:** Nuxt Content v3's Collections feature, combined with strategic directory naming conventions and YAML metadata, provides native support for hierarchical content organization without requiring additional database layers or complex tooling.

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Nuxt Content | ^3.x | Content management | Native hierarchical navigation via `queryCollectionNavigation`, type-safe collections with Zod schemas, automatic navigation tree generation from directory structure |
| Nuxt 3 | ^3.21.0 | Framework | Server-side rendering, auto-imports, file-based routing that mirrors content hierarchy |
| Zod | (via @nuxt/content) | Schema validation | Type-safe content schemas, runtime validation, TypeScript inference for content collections |
| TypeScript | ^5.x | Type safety | Full type safety across content queries, navigation items, and collection schemas |

### Supporting Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `.navigation.yml` files | Directory metadata | When you need custom titles/icons for folders that differ from directory names |
| `content.config.ts` | Collection definitions | Required for v3; defines which files belong to which collections and their schemas |
| `queryCollectionNavigation()` | Navigation generation | For rendering sidebar navigation trees dynamically from content structure |
| Frontmatter YAML | Content metadata | For per-file metadata like tags, dates, difficulty levels, related topics |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Content Studio | Visual editing | Optional; provides GUI for non-technical content editing |
| `nuxt-content-git` | Git-based versioning | Track content changes with git history |

---

## Hierarchical Organization Patterns

### Pattern 1: Directory-Based Hierarchy (Recommended)

**Structure:**
```
content/
└── maps/
    ├── _domain/                    # Domain (领域)
    │   ├── _subdomain/             # Subdomain (子领域)
    │   │   ├── topic/              # Topic (主题)
    │   │   │   ├── knowledge.md    # Knowledge Point (知识点)
    │   │   │   └── another.md
    │   │   └── topic.md            # Topic index
    │   └── subdomain.md            # Subdomain index
    └── domain.md                   # Domain index
```

**Why this works:**
- Nuxt Content v3 automatically generates navigation trees from directory structure
- The `queryCollectionNavigation()` utility returns nested `children` arrays matching your folder hierarchy
- File paths naturally encode the cognitive hierarchy without additional metadata
- URLs reflect the hierarchy: `/maps/domain/subdomain/topic/knowledge`

**Confidence:** HIGH - This is the standard pattern documented in Nuxt Content v3 and used in production by the Nuxt documentation itself.

### Pattern 2: Prefix-Based Ordering

Use numeric prefixes to control display order within each level:

```
maps/
├── 1.frontend/           # Ordered first
├── 2.backend/
├── 3.devops/
└── 4.ai/
```

**Why:** Nuxt Content respects numeric prefixes for ordering but strips them from URLs and navigation titles. This gives you explicit control over presentation order without affecting URLs.

**Confidence:** HIGH - Documented in Nuxt Content v3 "Ordering Files" behavior.

### Pattern 3: Collection Segmentation by Domain

Define separate collections for major domains in `content.config.ts`:

```typescript
import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Technical domains
    frontend: defineCollection({
      type: 'page',
      source: 'maps/_frontend/**/*.md',
      schema: z.object({
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
        tags: z.array(z.string()).optional(),
        related: z.array(z.string()).optional(),
      })
    }),
    ai: defineCollection({
      type: 'page',
      source: 'maps/_ai/**/*.md',
      schema: z.object({
        model: z.string().optional(),
        paper: z.string().optional(),
      })
    }),
    // Single unified collection for cross-domain queries
    knowledge: defineCollection({
      type: 'page',
      source: 'maps/**/*.md',
    })
  }
})
```

**Why:**
- Domain-specific schemas allow tailored metadata per knowledge area
- Unified `knowledge` collection enables cross-domain search and navigation
- Separate collections optimize queries when you only need one domain

**Confidence:** MEDIUM - Multiple collection patterns work but require careful `exclude` configuration to prevent duplicate indexing.

---

## What NOT to Do

### Anti-Pattern 1: Flat Structure with Tag-Based Hierarchy

**Avoid:** Putting all files in one directory and relying solely on frontmatter tags for hierarchy.

```yaml
# DON'T: Rely only on tags
---
domain: frontend
subdomain: css
topic: layout
---
```

**Why:**
- Loses the automatic navigation tree generation
- Requires custom query logic to reconstruct hierarchy
- No built-in breadcrumb support
- Harder to maintain consistency

### Anti-Pattern 2: Deep Nesting Beyond 4 Levels

**Avoid:** Creating hierarchies deeper than Domain → Subdomain → Topic → Knowledge Point.

**Why:**
- Navigation becomes unwieldy
- Content discovery suffers
- URL paths become excessively long
- Cognitive load increases disproportionately

### Anti-Pattern 3: Mixing File and Folder Patterns Inconsistently

**Avoid:** Having `topic.md` alongside `topic/` folder in some places but not others.

**Why:**
- Inconsistent URL patterns confuse users
- Navigation generation becomes unpredictable
- Harder to establish mental models

**Instead:** Be consistent - if a topic has sub-topics, use `topic/index.md` inside a `topic/` folder.

### Anti-Pattern 4: Manual Navigation Configuration

**Avoid:** Hardcoding navigation structures in Vue components.

```vue
<!-- DON'T: Hardcode navigation -->
<script setup>
const nav = [
  { title: 'Frontend', children: [
    { title: 'CSS', children: [...] }
  ]}
]
</script>
```

**Why:**
- Must be updated manually when content changes
- Violates single source of truth principle
- Nuxt Content provides `queryCollectionNavigation()` specifically to avoid this

---

## Migration Strategy

### Phase 1: Collection Configuration

1. Create `content.config.ts` with unified `knowledge` collection
2. Define schema with common fields: `title`, `description`, `tags`, `difficulty`, `related`
3. Test that all 324 files are indexed

### Phase 2: Directory Restructuring

1. Rename folders to use underscore prefix for ordering: `_frontend`, `_ai`, etc.
2. Move files to match 4-layer hierarchy
3. Add `index.md` files at each level for overview content
4. Use numeric prefixes where explicit ordering is needed

### Phase 3: Metadata Enhancement

1. Add `.navigation.yml` files for directory metadata where needed
2. Enrich frontmatter with cross-reference fields (`related`, `prerequisites`)
3. Add difficulty/complexity indicators

### Phase 4: Navigation Implementation

1. Use `queryCollectionNavigation('knowledge')` for global navigation
2. Use `findPageBreadcrumb()` for breadcrumb components
3. Use `findPageChildren()` for sub-topic listings

---

## Tools for Refactoring

### Automated Migration Scripts

| Tool | Purpose | Confidence |
|------|---------|------------|
| Custom Node.js scripts | Bulk file moves, frontmatter updates | HIGH |
| `gray-matter` | Parse and update YAML frontmatter | HIGH |
| `glob` | File discovery and pattern matching | HIGH |

### Validation Tools

| Tool | Purpose |
|------|---------|
| `queryCollection()` | Verify all content is queryable |
| `queryCollectionNavigation()` | Verify navigation tree structure |
| TypeScript compiler | Validate schema types |

---

## Nuxt Content v3 Specific Recommendations

### Use `type: 'page'` for Knowledge Content

Pages have:
- Automatic path generation based on file location
- Full frontmatter support
- Navigation tree inclusion
- 1-to-1 file-to-URL mapping

### Leverage `.navigation.yml` for Directory Metadata

```yaml
# maps/_ai/.navigation.yml
title: Artificial Intelligence
icon: i-lucide-brain
badge: New
```

This provides:
- Custom display titles different from folder names
- Icons for visual navigation
- Badges for status indicators

### Use `queryCollectionNavigation()` with Extra Fields

```typescript
const { data: nav } = await useAsyncData('nav', () =>
  queryCollectionNavigation('knowledge', ['description', 'difficulty', 'tags'])
)
```

This includes custom fields in the navigation tree for rich navigation UI.

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| @nuxt/content ^3.0.0 | Nuxt ^3.13.0 | v3 requires Nuxt 3.13+ |
| @nuxt/content ^2.13.4 | Nuxt ^3.0.0 | Current project version |

**Recommendation:** The project currently uses v2.13.4. The hierarchical patterns described work in v2, but v3 provides:
- Better TypeScript support for collections
- More robust navigation utilities
- Improved performance with database-backed queries

Consider upgrading to v3 as part of the refactoring.

---

## Sources

- [Nuxt Content v3 Collections Documentation](https://github.com/nuxt/content/blob/master/docs/content/docs/2.collections/1.define.md) - HIGH confidence
- [Nuxt Content v3 Sources Documentation](https://github.com/nuxt/content/blob/master/docs/content/docs/2.collections/3.sources.md) - HIGH confidence
- [Nuxt Content v3 Navigation Utilities](https://github.com/nuxt/content/blob/master/docs/content/docs/4.utils/2.query-collection-navigation.md) - HIGH confidence
- [Nuxt Content v3 Source Code - collection.ts](https://github.com/nuxt/content/blob/master/src/utils/collection.ts) - HIGH confidence
- Project analysis: `/Users/lionad/Github/Lionad-Morotar/blog/content/6.maps/` structure - HIGH confidence

---

*Stack research for: Knowledge Base Hierarchical Refactoring*
*Researched: 2026-02-24*
