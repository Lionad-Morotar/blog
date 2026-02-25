---
phase: 11-complex-database
plan: 03
type: execute
wave: 3
depends_on: ['11-P02']
files_modified:
  - content/6.maps/0.index.md
  - content/6.maps/_database/sql/sql.md
  - content/6.maps/_database/datalake/datalake.md
  - content/6.maps/_database/nosql/nosql.md
  - content/6.maps/_database/deltalake/deltalake.md
autonomous: true
must_haves:
  truths:
    - Cross-domain links in 0.index.md updated to new _database paths
    - sql/sql.md has proper subdomain entry structure with links to topics
    - datalake/datalake.md has proper subdomain entry structure
    - All 6 subdomains have consistent entry file patterns
    - No broken internal links in _database domain
  artifacts:
    - path: content/6.maps/0.index.md
      provides: Updated cross-domain links pointing to new _database paths
    - path: content/6.maps/_database/sql/sql.md
      provides: SQL subdomain entry with links to text-to-sql and postgres
    - path: content/6.maps/_database/datalake/datalake.md
      provides: DataLake subdomain entry with links to related topics
    - path: content/6.maps/_database/nosql/nosql.md
      provides: NoSQL subdomain entry with link to redis
    - path: content/6.maps/_database/deltalake/deltalake.md
      provides: DeltaLake subdomain entry with link to liquid-clustering
  key_links:
    - from: content/6.maps/0.index.md
      to: content/6.maps/_database/nosql/redis.md
      via: updated cross-domain link
    - from: content/6.maps/0.index.md
      to: content/6.maps/_database/datalake/datalake.md
      via: updated cross-domain link
    - from: content/6.maps/0.index.md
      to: content/6.maps/_database/graphql/graphql.md
      via: updated cross-domain link
    - from: content/6.maps/0.index.md
      to: content/6.maps/_database/sql/sql.md
      via: updated cross-domain link
    - from: content/6.maps/_database/sql/sql.md
      to: content/6.maps/_database/sql/text-to-sql.md
      via: internal topic link
    - from: content/6.maps/_database/sql/sql.md
      to: content/6.maps/_database/sql/postgres.md
      via: internal topic link
---

# Phase 11-P03: Finalize Subdomain Entries and Update Cross-Domain Links (COMP-01)

<objective>
Finalize subdomain entry files for nosql/, datalake/, deltalake/, and sql/ subdomains. Update cross-domain links in 0.index.md to reflect new _database paths.

Purpose: Complete the 4-layer hierarchy by ensuring all subdomains have proper entry files with topic navigation, and update external references to point to new locations.
Output: Consistent subdomain entry files and updated cross-domain navigation.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/0.index.md
@content/6.maps/_database/sql/sql.md
@content/6.maps/_database/datalake/datalake.md
@content/6.maps/_database/nosql/redis.md
@content/6.maps/_database/deltalake/deltalake.md
@content/6.maps/_database/lakehouse/lakehouse.md
@content/6.maps/_database/graphql/graphql.md
</context>

<tasks>

<task type="auto">
  <name>Create nosql subdomain entry file</name>
  <files>content/6.maps/_database/nosql/nosql.md</files>
  <action>
Create content/6.maps/_database/nosql/nosql.md as the subdomain entry file with:
1. YAML frontmatter:
   - title: NoSQL
   - description: 非关系型数据库技术，包括 Redis 缓存与数据结构
2. ## 主题 section with link to topic:
   * [Redis](./redis) - 内存数据结构存储与缓存技术
3. ## 概述 section with brief description of NoSQL domain
   Note: This file serves as the subdomain entry, while redis.md contains the actual content.
  </action>
  <verify>File exists with proper frontmatter and topic navigation</verify>
  <done>NoSQL subdomain entry file created with correct structure</done>
</task>

<task type="auto">
  <name>Update sql/sql.md as subdomain entry</name>
  <files>content/6.maps/_database/sql/sql.md</files>
  <action>
Update content/6.maps/_database/sql/sql.md to serve as proper subdomain entry:
1. Keep existing frontmatter:
   - title: SQL
   - description: SQL（Structured Query Language，结构化查询语言）...
2. Update ## Domain section to ## 主题 with links:
   * [Text to SQL](./text-to-sql) - 自然语言到 SQL 的转换技术与风险
   * [Postgres](./postgres) - PostgreSQL 扩展生态与多场景应用
3. Preserve any existing content after the topic links
4. Ensure internal links use relative paths (./text-to-sql, ./postgres)
  </action>
  <verify>
- sql.md has ## 主题 section with links to text-to-sql and postgres
- Internal links use relative paths
- All original content preserved
  </verify>
  <done>SQL subdomain entry updated with proper topic navigation</done>
</task>

<task type="auto">
  <name>Update datalake/datalake.md as subdomain entry</name>
  <files>content/6.maps/_database/datalake/datalake.md</files>
  <action>
Update content/6.maps/_database/datalake/datalake.md to serve as proper subdomain entry:
1. Keep existing frontmatter:
   - title: Data Lake
   - description: 一种用于存储大量原始数据的系统...
2. Update ## Domain section to ## 主题 with links:
   * [Delta Lake](/maps/_database/deltalake/deltalake) - 为数据湖提供 ACID 事务支持的存储层
   * [Lakehouse](/maps/_database/lakehouse/lakehouse) - 湖仓一体架构
   * [Apache Paimon](./paimon) - 湖仓一体中的可变数据与实时更新
3. Add ## 概述 section with brief description of DataLake domain if not exists
4. Ensure internal links use appropriate paths (absolute for cross-subdomain, relative for same-subdomain)
  </action>
  <verify>
- datalake.md has ## 主题 section with links to Delta Lake, Lakehouse, and Paimon
- Links use correct paths
- All original content preserved
  </verify>
  <done>DataLake subdomain entry updated with proper topic navigation</done>
</task>

<task type="auto">
  <name>Update deltalake/deltalake.md as subdomain entry</name>
  <files>content/6.maps/_database/deltalake/deltalake.md</files>
  <action>
Update content/6.maps/_database/deltalake/deltalake.md to serve as proper subdomain entry:
1. Keep existing frontmatter with original_path
2. Update ## Domain section to ## 主题 with link:
   * [Delta Lake Liquid Clustering](./liquid-clustering) - 动态数据布局优化技术
3. Add ## 概述 section with brief description of DeltaLake domain if not exists
4. Ensure internal link uses relative path (./liquid-clustering)
  </action>
  <verify>
- deltalake.md has ## 主题 section with link to liquid-clustering
- Internal link uses relative path
- All original content preserved
  </verify>
  <done>DeltaLake subdomain entry updated with proper topic navigation</done>
</task>

<task type="auto">
  <name>Update lakehouse/lakehouse.md as subdomain entry</name>
  <files>content/6.maps/_database/lakehouse/lakehouse.md</files>
  <action>
Update content/6.maps/_database/lakehouse/lakehouse.md to serve as proper subdomain entry:
1. Keep existing frontmatter
2. Update ## Domain section to ## 主题 with link:
   * [Delta Sharing](./delta-sharing) - 跨平台安全数据共享的开放协议
3. Keep existing ## Arch section with all H4 knowledge points
4. Ensure internal link uses relative path (./delta-sharing)
  </action>
  <verify>
- lakehouse.md has ## 主题 section with link to delta-sharing
- Internal link uses relative path
- All original Arch content preserved
  </verify>
  <done>Lakehouse subdomain entry updated with proper topic navigation</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the ## 数据库 section in 0.index.md to point to new subdomain paths:
- `/maps/_database/redis` -> `/maps/_database/nosql/redis`
- `/maps/_database/datalake/datalake` -> `/maps/_database/datalake/datalake` (unchanged)
- `/maps/_database/graphql` -> `/maps/_database/graphql/graphql`
- `/maps/_database/sql/sql` -> `/maps/_database/sql/sql` (unchanged)

Replace the existing 4 links with 6 links covering all subdomains:
* [NoSQL](/maps/_database/nosql/redis) - Redis 缓存与数据结构
* [DataLake](/maps/_database/datalake/datalake) - 数据湖与大数据存储
* [DeltaLake](/maps/_database/deltalake/deltalake) - Delta Lake 存储层与优化
* [Lakehouse](/maps/_database/lakehouse/lakehouse) - 湖仓一体架构
* [SQL](/maps/_database/sql/sql) - SQL 查询与关系型数据库
* [GraphQL](/maps/_database/graphql/graphql) - GraphQL 查询语言与数据访问

Keep the link text descriptive and consistent with other sections.
  </action>
  <verify>All 6 links in ## 数据库 section updated to new paths</verify>
  <done>Cross-domain links updated in 0.index.md</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_database/nosql/nosql.md exists with ## 主题 section
- [ ] content/6.maps/_database/sql/sql.md has ## 主题 section with links to text-to-sql and postgres
- [ ] content/6.maps/_database/datalake/datalake.md has ## 主题 section with links to Delta Lake, Lakehouse, Paimon
- [ ] content/6.maps/_database/deltalake/deltalake.md has ## 主题 section with link to liquid-clustering
- [ ] content/6.maps/_database/lakehouse/lakehouse.md has ## 主题 section with link to delta-sharing
- [ ] content/6.maps/_database/graphql/graphql.md has ## Domain section (or ## 主题)
- [ ] content/6.maps/0.index.md has 6 updated links in ## 数据库 section
- [ ] All internal links use relative paths where appropriate
- [ ] All original content preserved in migrated files
</verification>

<success_criteria>
- All 6 subdomains have proper entry files with ## 主题 navigation
- Cross-domain links in 0.index.md point to correct new paths
- Internal links within _database domain use relative paths
- No broken links between subdomains
- Consistent entry file pattern across all subdomains
</success_criteria>

<output>
After completion, create `.planning/phases/11-complex-database/11-P03-SUMMARY.md`
</output>
