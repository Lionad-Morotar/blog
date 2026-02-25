---
phase: 11-complex-database
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_database/database.md
  - content/6.maps/_database/nosql/redis.md
  - content/6.maps/_database/redis.md
  - content/6.maps/_database/graphql/graphql.md
  - content/6.maps/_database/graphql.md
  - content/6.maps/_database/graphql/ai/graphql-for-llm.md
autonomous: true
must_haves:
  truths:
    - _database domain entry file exists with proper frontmatter and subdomain navigation
    - nosql/ subdirectory created with redis.md as subdomain entry (moved from root)
    - graphql/ subdirectory created with graphql.md as subdomain entry (moved from root)
    - graphql-for-llm.md flattened from graphql/ai/ to graphql/ directory
    - original_path preserved in all moved file frontmatter
    - Old redis.md and graphql.md files removed after migration
    - Empty graphql/ai/ directory removed after flattening
  artifacts:
    - path: content/6.maps/_database/database.md
      provides: Domain entry with subdomain navigation for all 6 subdomains
    - path: content/6.maps/_database/nosql/redis.md
      provides: Redis content as subdomain entry with original_path (from root redis.md)
    - path: content/6.maps/_database/graphql/graphql.md
      provides: GraphQL content as subdomain entry with original_path (from root graphql.md)
    - path: content/6.maps/_database/graphql/graphql-for-llm.md
      provides: GraphQL for LLM content with original_path (from graphql/ai/)
  key_links:
    - from: content/6.maps/_database/database.md
      to: content/6.maps/_database/nosql/redis.md
      via: subdomain navigation link
    - from: content/6.maps/_database/database.md
      to: content/6.maps/_database/graphql/graphql.md
      via: subdomain navigation link
    - from: content/6.maps/_database/graphql/graphql.md
      to: content/6.maps/_database/graphql/graphql-for-llm.md
      via: internal topic link
---

# Phase 11-P01: Create Domain Entry and Migrate Root Files (COMP-01)

<objective>
Create the _database domain entry file and migrate root-level files (redis.md, graphql.md) to proper subdomains. Flatten the nested graphql/ai/ structure into graphql/ directory.

Purpose: Establish the 4-layer hierarchy foundation for the _database domain by creating the domain entry and reorganizing root-level content into nosql/ and graphql/ subdomains.
Output: Domain entry file and reorganized root content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_database/redis.md
@content/6.maps/_database/graphql.md
@content/6.maps/_database/graphql/ai/graphql-for-llm.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _database domain entry file</name>
  <files>content/6.maps/_database/database.md</files>
  <action>
Create content/6.maps/_database/database.md as the domain entry file with:
1. YAML frontmatter:
   - title: 数据库
   - description: 数据库技术，包括关系型数据库、NoSQL、数据湖、Lakehouse、GraphQL 等
2. ## 子领域 section with links to all 6 subdomains:
   * [NoSQL](/maps/_database/nosql/redis) - Redis 缓存与数据结构
   * [DataLake](/maps/_database/datalake/datalake) - 数据湖与大数据存储
   * [DeltaLake](/maps/_database/deltalake/deltalake) - Delta Lake 存储层与优化
   * [Lakehouse](/maps/_database/lakehouse/lakehouse) - 湖仓一体架构
   * [SQL](/maps/_database/sql/sql) - SQL 查询与关系型数据库
   * [GraphQL](/maps/_database/graphql/graphql) - GraphQL 查询语言与数据访问
3. ## 概述 section with brief domain overview about database technologies
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation covering all 6 subdomains</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create nosql subdomain and migrate redis.md</name>
  <files>content/6.maps/_database/nosql/redis.md</files>
  <action>
1. Create directory content/6.maps/_database/nosql/
2. Move original content/6.maps/_database/redis.md to content/6.maps/_database/nosql/redis.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_database/redis.md
4. Preserve all original content including:
   - ## 数据结构及其操作 section
   - All H4 knowledge points (NX/XX 记忆、键名风格、GETRANGE vs slice 对比)
   - Code examples and explanations
5. Ensure all knowledge points remain as H4 headings
6. Delete original content/6.maps/_database/redis.md after successful move
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
- Original file removed
  </verify>
  <done>NoSQL subdomain created with redis.md migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create graphql subdomain and flatten nested structure</name>
  <files>content/6.maps/_database/graphql/graphql.md, content/6.maps/_database/graphql/graphql-for-llm.md</files>
  <action>
1. Create directory content/6.maps/_database/graphql/ (if not exists)
2. Move original content/6.maps/_database/graphql.md to content/6.maps/_database/graphql/graphql.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_database/graphql.md
4. Preserve all original content including:
   - ## Domain section with link to graphql-for-llm
5. Move content/6.maps/_database/graphql/ai/graphql-for-llm.md to content/6.maps/_database/graphql/graphql-for-llm.md
6. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_database/graphql/ai/graphql-for-llm.md
7. Preserve all original content including:
   - ## Brief section
   - ## Details section with all subsections
   - All H4 knowledge points about GraphQL for LLM
8. Update internal link in graphql.md from `/maps/_database/graphql/ai/graphql-for-llm` to `./graphql-for-llm`
9. Delete original content/6.maps/_database/graphql.md after successful move
10. Remove empty content/6.maps/_database/graphql/ai/ directory after file is moved
  </action>
  <verify>
- graphql.md moved to graphql/ directory with original_path
- graphql-for-llm.md flattened to graphql/ directory with original_path
- Internal link updated in graphql.md
- Original files removed
- Empty ai/ directory removed
  </verify>
  <done>GraphQL subdomain created with flattened structure and metadata preserved</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_database/database.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to all 6 subdomains
- [ ] content/6.maps/_database/nosql/redis.md exists (migrated from root)
- [ ] content/6.maps/_database/nosql/redis.md has original_path in frontmatter
- [ ] content/6.maps/_database/graphql/graphql.md exists (moved from root)
- [ ] content/6.maps/_database/graphql/graphql.md has original_path in frontmatter
- [ ] content/6.maps/_database/graphql/graphql-for-llm.md exists (flattened from ai/)
- [ ] content/6.maps/_database/graphql/graphql-for-llm.md has original_path in frontmatter
- [ ] Original root files (redis.md, graphql.md) removed
- [ ] Empty graphql/ai/ directory removed
- [ ] Internal link in graphql.md updated to point to flattened path
</verification>

<success_criteria>
- _database domain entry exists with navigation to all 6 subdomains
- nosql/ subdomain created with redis.md as entry
- graphql/ subdomain created with flattened structure (no nested ai/ directory)
- graphql-for-llm.md moved from graphql/ai/ to graphql/
- Original content accessible at new locations with preserved history
- All moved files have original_path metadata
</success_criteria>

<output>
After completion, create `.planning/phases/11-complex-database/11-P01-SUMMARY.md`
</output>
