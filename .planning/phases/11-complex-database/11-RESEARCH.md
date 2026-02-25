# Phase 11: Complex - Database - Research

**Researched:** 2026-02-25
**Domain:** Content Architecture Migration - _database (12 files)
**Confidence:** HIGH

## Summary

Phase 11 is the FIRST complex domain migration in the project, marking the transition from simple (1 file) and medium (2-10 files) domains to complex domains (12+ files). The _database domain contains 12 files across multiple nested subdirectories with varying content depths and conceptual relationships.

**Current Structure Analysis:**
- Root files: 2 (graphql.md, redis.md)
- datalake/ subdirectory: 2 files (datalake.md, paimon.md)
- delta-lake/ subdirectory: 2 files (delta-lake.md, liquid-clustering.md)
- graphql/ai/ nested subdirectory: 1 file (graphql-for-llm.md)
- lakehouse/ subdirectory: 2 files (lakehouse.md, delta-sharing.md)
- postgres/ subdirectory: 1 file (index.md)
- sql/ subdirectory: 2 files (sql.md, text-to-sql.md)

**Key Insight:** The existing subdirectory structure partially reflects logical groupings but does not consistently follow the 4-layer hierarchy pattern. Some subdirectories (datalake/, delta-lake/, lakehouse/) represent distinct technology areas suitable for subdomains, while others (graphql/ai/, postgres/) need reorganization.

**Primary recommendation:** Create 6 subdomains based on clear technology boundaries: nosql/ (Redis), datalake/ (Data Lake + Paimon), lakehouse/ (Lakehouse + Delta Sharing), deltalake/ (Delta Lake + Liquid Clustering), sql/ (SQL + Text-to-SQL + Postgres), and graphql/ (GraphQL + GraphQL for LLM). This provides a clean cognitive hierarchy while preserving existing content relationships.

---

## Domain Analysis

### Current File Inventory

| File Path | Lines | Content Summary | Current Level |
|-----------|-------|-----------------|---------------|
| graphql.md | 9 | Domain entry, links to GraphQL for LLM | Domain (thin) |
| redis.md | 29 | Redis data structures, key patterns, GETRANGE vs slice | Domain (content) |
| datalake/datalake.md | 11 | Data Lake overview, links to Delta Lake, Lakehouse, Paimon | Subdomain entry |
| datalake/paimon.md | 73 | Apache Paimon deep dive - LSM, lakehouse, CDC | Topic |
| delta-lake/delta-lake.md | 10 | Delta Lake overview, links to Liquid Clustering | Subdomain entry |
| delta-lake/liquid-clustering.md | 48 | Delta Lake Liquid Clustering optimization | Topic |
| graphql/ai/graphql-for-llm.md | 180 | GraphQL as LLM data access pattern | Topic (deeply nested) |
| lakehouse/lakehouse.md | 104 | Lakehouse architecture, data layering, open formats | Subdomain entry |
| lakehouse/delta-sharing.md | 95 | Delta Sharing protocol for cross-platform data | Topic |
| postgres/index.md | 15 | Postgres extensions ecosystem overview | Subdomain entry (misnamed) |
| sql/sql.md | 11 | SQL overview, links to Text-to-SQL and Postgres | Subdomain entry |
| sql/text-to-sql.md | 178 | Text-to-SQL risks, governance, semantic layers | Topic |

**Total Lines of Content:** ~765 lines
**Deepest Nesting:** 3 levels (graphql/ai/)

---

### Subdomain Analysis

#### 1. NoSQL / Redis

**Current State:**
- `redis.md` at domain root (29 lines)

**Content Analysis:**
- Redis data structures and operations
- Key naming conventions
- GETRANGE vs JavaScript slice comparison
- Contains 3 H4 knowledge points

**Subdomain Recommendation:**
**YES** - Create `nosql/` subdomain

```
_database/
├── database.md (domain entry)
├── nosql/
│   └── redis.md (subdomain entry, moved from root)
```

**Rationale:** Redis is a distinct NoSQL database category. While currently a single file, the nosql/ subdomain allows future expansion (MongoDB, Cassandra, etc.) and maintains consistency with other database type categories.

**Alternative Considered:** Keep redis.md at domain root as file-based topic. **Rejected** because:
1. Creates inconsistency with other database types that have subdomains
2. NoSQL is a clear conceptual boundary that may expand
3. 4-layer hierarchy prefers subdomains for distinct technology categories

---

#### 2. Data Lake

**Current State:**
- `datalake/datalake.md` (11 lines) - overview with links
- `datalake/paimon.md` (73 lines) - Apache Paimon deep dive

**Content Analysis:**
- datalake.md: Overview linking to Delta Lake, Lakehouse, Paimon
- paimon.md: Comprehensive coverage of Apache Paimon (LSM tree, lakehouse, CDC, streaming/batch)

**Subdomain Recommendation:**
**YES** - Keep `datalake/` subdirectory as formalized subdomain

```
_database/
├── datalake/
│   ├── datalake.md (subdomain entry, keep existing)
│   └── paimon.md (keep existing)
```

**Rationale:**
1. Existing structure already follows subdomain pattern
2. 2 files fit the 1-2 topics = directory-based threshold when content is substantial
3. Paimon is a significant topic (73 lines) deserving its own file
4. Data Lake is a distinct architectural pattern from Lakehouse and Delta Lake

**Cross-Link Note:** datalake.md currently links to Delta Lake and Lakehouse - these should remain as cross-subdomain navigation.

---

#### 3. Delta Lake

**Current State:**
- `delta-lake/delta-lake.md` (10 lines) - overview
- `delta-lake/liquid-clustering.md` (48 lines) - Liquid Clustering feature

**Content Analysis:**
- delta-lake.md: Overview linking to Liquid Clustering
- liquid-clustering.md: Detailed coverage of Delta Lake's dynamic data layout optimization

**Subdomain Recommendation:**
**YES** - Keep `deltalake/` subdirectory as formalized subdomain

```
_database/
├── deltalake/
│   ├── deltalake.md (subdomain entry, renamed from delta-lake.md)
│   └── liquid-clustering.md (keep existing)
```

**Rationale:**
1. Delta Lake is a specific technology (Databricks/Linux Foundation)
2. Liquid Clustering is a sub-topic/feature of Delta Lake
3. Directory structure already appropriate

**Naming Decision:** Rename `delta-lake/` to `deltalake/` for consistency with other single-word subdomain names (datalake, lakehouse, etc.). The hyphenated directory name should be normalized.

---

#### 4. Lakehouse

**Current State:**
- `lakehouse/lakehouse.md` (104 lines) - comprehensive architecture guide
- `lakehouse/delta-sharing.md` (95 lines) - Delta Sharing protocol

**Content Analysis:**
- lakehouse.md: Extensive coverage of lakehouse architecture, data layering (ODS/DWD/DWS/ADS/DIM), open formats comparison (Paimon, Parquet, ORC, Avro), AI Agent integration
- delta-sharing.md: Delta Sharing protocol for secure cross-platform data sharing

**Subdomain Recommendation:**
**YES** - Keep `lakehouse/` subdirectory as formalized subdomain

```
_database/
├── lakehouse/
│   ├── lakehouse.md (subdomain entry, keep existing)
│   └── delta-sharing.md (keep existing)
```

**Rationale:**
1. Lakehouse is a distinct architectural pattern combining data lake + warehouse
2. Both files are substantial (104 + 95 lines)
3. Delta Sharing is a protocol often used with lakehouse architectures
4. Existing structure is appropriate

**Content Relationship:** Delta Sharing is related to but distinct from core lakehouse concepts - appropriate as separate topic file under lakehouse/ subdomain.

---

#### 5. SQL / Relational Databases

**Current State:**
- `sql/sql.md` (11 lines) - overview with links
- `sql/text-to-sql.md` (178 lines) - Text-to-SQL deep dive
- `postgres/index.md` (15 lines) - Postgres extensions overview

**Content Analysis:**
- sql.md: Overview linking to Text-to-SQL and Postgres
- text-to-sql.md: Comprehensive risk analysis of LLM-generated SQL, governance recommendations, semantic layer patterns
- postgres/index.md: Postgres as "one database to rule them all" - extensions ecosystem

**Subdomain Recommendation:**
**YES** - Consolidate SQL and Postgres under `sql/` subdomain

```
_database/
├── sql/
│   ├── sql.md (subdomain entry, keep existing)
│   ├── text-to-sql.md (keep existing)
│   └── postgres.md (moved from postgres/index.md, renamed)
```

**Rationale:**
1. Postgres is fundamentally an SQL database - fits naturally under sql/ subdomain
2. Text-to-SQL relates to SQL query generation - appropriate under sql/
3. Current `postgres/index.md` naming breaks convention (should be postgres.md)
4. Consolidating 3 related files under sql/ creates coherent cognitive grouping

**Migration Note:** Move `postgres/index.md` to `sql/postgres.md` - the content is about Postgres as an SQL database extension platform, fitting the SQL subdomain theme.

---

#### 6. GraphQL

**Current State:**
- `graphql.md` (9 lines) - domain root overview
- `graphql/ai/graphql-for-llm.md` (180 lines) - GraphQL for LLM deep dive (nested 2 levels)

**Content Analysis:**
- graphql.md: Minimal overview linking to GraphQL for LLM
- graphql-for-llm.md: Comprehensive coverage of GraphQL as LLM data access pattern, schema design, security, governance

**Subdomain Recommendation:**
**YES** - Create `graphql/` subdomain, flatten nested structure

```
_database/
├── graphql/
│   ├── graphql.md (subdomain entry, moved from root)
│   └── graphql-for-llm.md (moved from graphql/ai/, flattened)
```

**Rationale:**
1. GraphQL is a distinct query language/technology from SQL
2. Current `graphql/ai/` nesting is unnecessary - only 1 file at that level
3. Flatten to standard 2-level subdomain structure (subdomain/topic.md)
4. graphql-for-llm.md is substantial (180 lines) but doesn't need its own ai/ subdirectory

**Structural Improvement:** The `graphql/ai/` directory with single file is over-engineered. Moving graphql-for-llm.md directly under graphql/ maintains organization while simplifying navigation.

---

## Proposed Final Structure

```
_database/
├── database.md                 # Domain entry (NEW)
├── nosql/
│   └── redis.md                # Moved from root
├── datalake/
│   ├── datalake.md             # Keep existing
│   └── paimon.md               # Keep existing
├── deltalake/                  # Renamed from delta-lake/
│   ├── deltalake.md            # Renamed from delta-lake.md
│   └── liquid-clustering.md    # Keep existing
├── lakehouse/
│   ├── lakehouse.md            # Keep existing
│   └── delta-sharing.md        # Keep existing
├── sql/
│   ├── sql.md                  # Keep existing
│   ├── text-to-sql.md          # Keep existing
│   └── postgres.md             # Moved from postgres/index.md
└── graphql/
    ├── graphql.md              # Moved from root
    └── graphql-for-llm.md      # Moved from graphql/ai/
```

**Subdomain Count:** 6 subdomains
**Files per Subdomain:**
- nosql/: 1 file (file-based pattern)
- datalake/: 2 files (directory-based pattern)
- deltalake/: 2 files (directory-based pattern)
- lakehouse/: 2 files (directory-based pattern)
- sql/: 3 files (directory-based pattern)
- graphql/: 2 files (directory-based pattern)

---

## Hybrid Pattern Application

This phase demonstrates the hybrid pattern for complex domains:

| Subdomain | Files | Pattern | Rationale |
|-----------|-------|---------|-----------|
| nosql/ | 1 | File-based | Single topic currently, but clear expansion path |
| datalake/ | 2 | Directory-based | Distinct technology with substantial content |
| deltalake/ | 2 | Directory-based | Specific technology with feature sub-topic |
| lakehouse/ | 2 | Directory-based | Architectural pattern with protocol extension |
| sql/ | 3 | Directory-based | Core technology with multiple related topics |
| graphql/ | 2 | Directory-based | Query language with LLM application |

**Decision Criteria Applied:**
1. **Technology Boundary:** Each subdomain represents a distinct database/query technology
2. **Content Volume:** All subdomains have substantial content (min 29 lines, max 180 lines per file)
3. **Cognitive Grouping:** SQL-related content (SQL, Text-to-SQL, Postgres) consolidated; NoSQL separate
4. **Future Expansion:** nosql/ allows future MongoDB, Cassandra, etc.

---

## Cross-Domain Link Updates

The following links in `0.index.md` need updating:

| Current Link | New Link | Action |
|--------------|----------|--------|
| `/maps/_database/redis` | `/maps/_database/nosql/redis` | Update |
| `/maps/_database/datalake/datalake` | `/maps/_database/datalake/datalake` | Keep (no change) |
| `/maps/_database/graphql` | `/maps/_database/graphql/graphql` | Update |
| `/maps/_database/sql/sql` | `/maps/_database/sql/sql` | Keep (no change) |

**Note:** The 0.index.md currently lists "EdgeDB" and "FerretDB" without links - these could be future additions to the nosql/ subdomain.

---

## Patterns for Future Complex Phases

This phase establishes patterns for remaining complex domains:

### 1. Nested Directory Flattening
**Pattern:** When a subdirectory contains only 1 file at a nested level, flatten it.
**Example:** `graphql/ai/graphql-for-llm.md` → `graphql/graphql-for-llm.md`

### 2. Hyphenated Name Normalization
**Pattern:** Normalize hyphenated directory names to single words for consistency.
**Example:** `delta-lake/` → `deltalake/`

### 3. Index.md Renaming
**Pattern:** Rename `index.md` files to `{subdomain}.md` for clarity.
**Example:** `postgres/index.md` → `sql/postgres.md`

### 4. Cross-Technology Consolidation
**Pattern:** When related technologies share a fundamental category, consolidate under one subdomain.
**Example:** SQL + Text-to-SQL + Postgres under `sql/`

### 5. Domain Entry Creation
**Pattern:** Every domain MUST have a `{domain}.md` entry file with subdomain navigation.
**Example:** Create `database.md` with links to all 6 subdomains.

---

## Risk Analysis

### Risk 1: GraphQL URL Change
**Issue:** `graphql.md` moves from root to `graphql/graphql.md`
**Impact:** External links to `/maps/_database/graphql` will break
**Mitigation:** Update 0.index.md link; accept direct link update (per established decision)

### Risk 2: Postgres Path Change
**Issue:** `postgres/index.md` moves to `sql/postgres.md`
**Impact:** Any internal links to postgres/ path will break
**Mitigation:** Search for internal links to postgres/ during migration

### Risk 3: Delta-Lake Rename
**Issue:** Directory renamed from `delta-lake/` to `deltalake/`
**Impact:** Links to `/maps/_database/delta-lake/` will break
**Mitigation:** Update any internal links; verify no external dependencies

### Risk 4: Content Relationship Clarity
**Issue:** Data Lake, Lakehouse, and Delta Lake are related concepts
**Impact:** Users may be confused about which subdomain contains what
**Mitigation:** Clear descriptions in database.md domain entry; cross-links between related subdomains

---

## Open Questions

### 1. Postgres Placement
**Question:** Should Postgres remain as its own subdomain instead of under sql/?
**Analysis:**
- For: Postgres is a specific database product; other databases (MySQL, SQLite) might join
- Against: Content is about Postgres as "extended SQL" - fits sql/ theme; current content minimal (15 lines)
**Recommendation:** Keep under sql/ for now; create dedicated postgres/ subdomain when content expands beyond extensions overview.

### 2. NoSQL Naming
**Question:** Should `nosql/` be renamed to `kv-store/` or `cache/` since only Redis is included?
**Analysis:**
- Redis is more than just a cache (data structures, persistence)
- NoSQL is the broader accurate category
- Future expansion (MongoDB, etc.) expected
**Recommendation:** Keep `nosql/` name for future expansion.

### 3. Delta Sharing Placement
**Question:** Should Delta Sharing be under lakehouse/ or deltalake/?
**Analysis:**
- Delta Sharing is a protocol developed by Databricks (Delta Lake creators)
- But it's often used with lakehouse architectures
- Current placement under lakehouse/ is appropriate
**Recommendation:** Keep under lakehouse/; add cross-link from deltalake/ if needed.

---

## Implementation Notes

### Frontmatter Requirements
All migrated files must include:
```yaml
---
title: [Clear title]
description: [Concise description]
original_path: [Original file path for traceability]
---
```

### Knowledge Point Structure
- H4 headings (`####`) represent atomic knowledge points
- Current files already follow this pattern (e.g., "#### `NX`和`XX`如何记忆？")
- Preserve existing H4 structure during migration

### Navigation Structure
Each subdomain entry file must include:
- Brief subdomain description
- List of topics with links
- Cross-links to related subdomains (where appropriate)

---

## Sources

### Primary (HIGH confidence)
- File content analysis of all 12 _database files
- Phase 10 medium batch research patterns
- Established 4-layer hierarchy rules from project foundation

### Secondary (MEDIUM confidence)
- Database technology categorization (industry standard groupings)
- Content architecture best practices

---

## Metadata

**Confidence breakdown:**
- File inventory: HIGH - Complete enumeration of all files
- Content analysis: HIGH - All files read and categorized
- Structure recommendation: HIGH - Clear technology boundaries
- Pattern application: HIGH - Established patterns from previous phases

**Research date:** 2026-02-25
**Valid until:** 2026-03-25 (30 days for stable content architecture)

---

## RESEARCH COMPLETE

**Phase:** 11 - Complex Database
**Confidence:** HIGH

### Key Findings

1. **12 files across 7 locations** - Most fragmented domain so far, requiring careful consolidation
2. **6 logical subdomains identified** - nosql, datalake, deltalake, lakehouse, sql, graphql
3. **3 structural improvements needed** - Flatten graphql/ai/, rename delta-lake/ to deltalake/, move postgres/ under sql/
4. **Hybrid pattern validated** - Mix of file-based (nosql/) and directory-based (others) subdomains appropriate
5. **First complex domain patterns** - Establishes flattening, normalization, and consolidation patterns for future complex phases

### File Created
`.planning/phases/11-complex-database/11-RESEARCH.md`

### Confidence Assessment
| Area | Level | Reason |
|------|-------|--------|
| File Inventory | HIGH | All 12 files enumerated and analyzed |
| Content Analysis | HIGH | All files read, categorized by topic |
| Structure Design | HIGH | Clear technology boundaries, follows established patterns |
| Pattern Application | HIGH | Consistent with previous phase decisions |

### Open Questions
1. Postgres placement under sql/ vs standalone subdomain - recommend sql/ for now
2. NoSQL naming appropriateness - recommend keeping for future expansion
3. Delta Sharing placement - recommend keeping under lakehouse/

### Ready for Planning
Research complete. Planner can now create PLAN.md files with confidence in subdomain structure and migration approach.
