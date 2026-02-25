---
phase: 11-complex-database
plan: 02
type: execute
wave: 2
depends_on: ['11-P01']
files_modified:
  - content/6.maps/_database/deltalake/deltalake.md
  - content/6.maps/_database/deltalake/liquid-clustering.md
  - content/6.maps/_database/delta-lake/delta-lake.md
  - content/6.maps/_database/delta-lake/liquid-clustering.md
  - content/6.maps/_database/sql/postgres.md
  - content/6.maps/_database/postgres/index.md
  - content/6.maps/_database/datalake/datalake.md
  - content/6.maps/_database/lakehouse/lakehouse.md
autonomous: true
must_haves:
  truths:
    - delta-lake/ directory renamed to deltalake/ (without hyphen)
    - delta-lake.md renamed to deltalake.md with original_path preserved
    - liquid-clustering.md moved to deltalake/ with original_path preserved
    - postgres/index.md moved to sql/postgres.md with original_path preserved
    - Empty postgres/ directory removed after migration
    - datalake/datalake.md and lakehouse/lakehouse.md updated with new paths
    - All internal links updated to reflect new paths
  artifacts:
    - path: content/6.maps/_database/deltalake/deltalake.md
      provides: Delta Lake content as subdomain entry with original_path (renamed from delta-lake.md)
    - path: content/6.maps/_database/deltalake/liquid-clustering.md
      provides: Liquid Clustering content with original_path
    - path: content/6.maps/_database/sql/postgres.md
      provides: Postgres content with original_path (from postgres/index.md)
    - path: content/6.maps/_database/datalake/datalake.md
      provides: DataLake subdomain entry with updated links
    - path: content/6.maps/_database/lakehouse/lakehouse.md
      provides: Lakehouse subdomain entry with updated links
  key_links:
    - from: content/6.maps/_database/datalake/datalake.md
      to: content/6.maps/_database/deltalake/deltalake.md
      via: internal topic link (updated path)
    - from: content/6.maps/_database/lakehouse/lakehouse.md
      to: content/6.maps/_database/deltalake/deltalake.md
      via: internal reference link (updated path)
    - from: content/6.maps/_database/sql/sql.md
      to: content/6.maps/_database/sql/postgres.md
      via: internal topic link
    - from: content/6.maps/_database/deltalake/deltalake.md
      to: content/6.maps/_database/deltalake/liquid-clustering.md
      via: internal topic link
---

# Phase 11-P02: Rename Directories and Migrate Files (COMP-01)

<objective>
Rename delta-lake/ to deltalake/ (removing hyphen), move postgres/index.md to sql/postgres.md, and update all internal links to reflect new paths.

Purpose: Standardize naming convention (no hyphens in directory names) and consolidate SQL-related content (postgres moved into sql/ subdomain).
Output: Renamed directories, migrated files with preserved metadata, and updated internal links.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_database/delta-lake/delta-lake.md
@content/6.maps/_database/delta-lake/liquid-clustering.md
@content/6.maps/_database/postgres/index.md
@content/6.maps/_database/sql/sql.md
@content/6.maps/_database/datalake/datalake.md
@content/6.maps/_database/lakehouse/lakehouse.md
</context>

<tasks>

<task type="auto">
  <name>Rename delta-lake directory to deltalake and migrate files</name>
  <files>content/6.maps/_database/deltalake/deltalake.md, content/6.maps/_database/deltalake/liquid-clustering.md</files>
  <action>
1. Create directory content/6.maps/_database/deltalake/
2. Move content/6.maps/_database/delta-lake/delta-lake.md to content/6.maps/_database/deltalake/deltalake.md
3. Update frontmatter of moved file:
   - Keep existing title: Delta Lake
   - Keep existing description
   - Add original_path: content/6.maps/_database/delta-lake/delta-lake.md
4. Preserve all original content including:
   - ## Domain section with link to liquid-clustering
5. Update internal link from `/maps/_database/delta-lake/liquid-clustering` to `./liquid-clustering`
6. Move content/6.maps/_database/delta-lake/liquid-clustering.md to content/6.maps/_database/deltalake/liquid-clustering.md
7. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_database/delta-lake/liquid-clustering.md
8. Preserve all original content including:
   - ## Brief section
   - ## Details section with all subsections
   - All H4 knowledge points about Liquid Clustering
9. Remove empty content/6.maps/_database/delta-lake/ directory after files are moved
  </action>
  <verify>
- deltalake/ directory created
- deltalake.md moved with original_path and updated internal link
- liquid-clustering.md moved with original_path
- Original delta-lake/ directory removed
  </verify>
  <done>Delta-lake directory renamed to deltalake with files migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Migrate postgres/index.md to sql/postgres.md</name>
  <files>content/6.maps/_database/sql/postgres.md</files>
  <action>
1. Move content/6.maps/_database/postgres/index.md to content/6.maps/_database/sql/postgres.md
2. Update frontmatter of moved file:
   - Keep existing title: Postgres
   - Keep existing description: PostgreSQL 是一个强大的开源关系型数据库...
   - Add original_path: content/6.maps/_database/postgres/index.md
3. Preserve all original content including:
   - ## 扩展生态 section
   - H4 knowledge point: Postgres 能替代哪些专用数据库？
   - 周刊摘录 blockquote with link to weekly-385
4. Update content/6.maps/_database/sql/sql.md to change the Postgres link:
   - From: `/maps/_database/postgres`
   - To: `./postgres`
5. Remove empty content/6.maps/_database/postgres/ directory after file is moved
  </action>
  <verify>
- postgres.md moved to sql/ directory with original_path
- sql/sql.md internal link updated to point to ./postgres
- Original postgres/ directory removed
  </verify>
  <done>Postgres content migrated to sql/ subdomain and internal links updated</done>
</task>

<task type="auto">
  <name>Update internal links in datalake and lakehouse subdomains</name>
  <files>content/6.maps/_database/datalake/datalake.md, content/6.maps/_database/lakehouse/lakehouse.md</files>
  <action>
1. Update content/6.maps/_database/datalake/datalake.md:
   - Change Delta Lake link from `/maps/_database/delta-lake/delta-lake` to `/maps/_database/deltalake/deltalake`
   - Keep other links unchanged (Lakehouse, Apache Paimon)
2. Update content/6.maps/_database/lakehouse/lakehouse.md:
   - Update any references to delta-lake paths to use deltalake
   - Check content for any hardcoded paths that need updating
3. Verify both files still have correct frontmatter and all content preserved
  </action>
  <verify>
- datalake.md has updated Delta Lake link pointing to deltalake
- lakehouse.md has any delta-lake references updated to deltalake
- All content preserved
  </verify>
  <done>Internal links in datalake and lakehouse updated to reflect new deltalake path</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_database/deltalake/ directory exists
- [ ] content/6.maps/_database/deltalake/deltalake.md exists (renamed from delta-lake.md)
- [ ] content/6.maps/_database/deltalake/deltalake.md has original_path in frontmatter
- [ ] content/6.maps/_database/deltalake/liquid-clustering.md exists
- [ ] content/6.maps/_database/deltalake/liquid-clustering.md has original_path in frontmatter
- [ ] Original delta-lake/ directory removed
- [ ] content/6.maps/_database/sql/postgres.md exists (moved from postgres/index.md)
- [ ] content/6.maps/_database/sql/postgres.md has original_path in frontmatter
- [ ] Original postgres/ directory removed
- [ ] content/6.maps/_database/sql/sql.md has updated link to ./postgres
- [ ] content/6.maps/_database/datalake/datalake.md has updated Delta Lake link
- [ ] content/6.maps/_database/lakehouse/lakehouse.md has updated references
</verification>

<success_criteria>
- delta-lake/ renamed to deltalake/ (hyphen removed)
- All files in deltalake/ have original_path metadata
- postgres/index.md moved to sql/postgres.md
- sql/sql.md internal link updated to point to postgres.md
- All internal links updated to reflect new paths
- Empty directories (delta-lake/, postgres/) removed
</success_criteria>

<output>
After completion, create `.planning/phases/11-complex-database/11-P02-SUMMARY.md`
</output>
