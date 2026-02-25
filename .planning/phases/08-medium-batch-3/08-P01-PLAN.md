---
phase: 08-medium-batch-3
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_products/products.md
  - content/6.maps/_products/bit/bit.md
  - content/6.maps/_products/budibase/budibase.md
  - content/6.maps/_products/dynamo/dynamo.md
  - content/6.maps/_products/zapier/zapier.md
autonomous: true
must_haves:
  truths:
    - _products domain entry file exists with proper frontmatter and subdomain navigation
    - bit.md moved to bit/ subdirectory as subdomain entry
    - budibase.md moved to budibase/ subdirectory as subdomain entry
    - dynamo.md moved to dynamo/ subdirectory as subdomain entry
    - zapier.md moved to zapier/ subdirectory as subdomain entry
    - original_path preserved in all moved file frontmatter
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_products/products.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_products/bit/bit.md
      provides: Bit component platform content as subdomain entry with original_path
    - path: content/6.maps/_products/budibase/budibase.md
      provides: Budibase low-code platform content as subdomain entry with original_path
    - path: content/6.maps/_products/dynamo/dynamo.md
      provides: Dynamo visual programming content as subdomain entry with original_path
    - path: content/6.maps/_products/zapier/zapier.md
      provides: Zapier integration platform content as subdomain entry with original_path
  key_links:
    - from: content/6.maps/_products/products.md
      to: content/6.maps/_products/bit/bit.md
      via: subdomain navigation link
    - from: content/6.maps/_products/products.md
      to: content/6.maps/_products/budibase/budibase.md
      via: subdomain navigation link
    - from: content/6.maps/_products/products.md
      to: content/6.maps/_products/dynamo/dynamo.md
      via: subdomain navigation link
    - from: content/6.maps/_products/products.md
      to: content/6.maps/_products/zapier/zapier.md
      via: subdomain navigation link
    - from: content/6.maps/0.index.md
      to: new _products domain paths
      via: updated cross-domain links
---

# Phase 8-01: Migrate _products Domain (MED-09)

<objective>
Migrate the _products domain to the 4-layer structure by creating a domain entry file and organizing four product-related content files into dedicated subdomains: bit/, budibase/, dynamo/, and zapier/.

Purpose: Establish consistent domain structure for product tools and platforms knowledge with clear subdomain separation for component-driven development, low-code platforms, visual programming, and integration tools.
Output: Domain entry file and reorganized content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_products/bit.md
@content/6.maps/_products/budibase.md
@content/6.maps/_products/dynamo.md
@content/6.maps/_products/zapier.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _products domain entry file</name>
  <files>content/6.maps/_products/products.md</files>
  <action>
Create content/6.maps/_products/products.md as the domain entry file with:
1. YAML frontmatter:
   - title: 产品工具
   - description: 产品开发工具、低代码平台、可视化编程和集成工具
2. ## 子领域 section with links to subdomains:
   * [Bit](/maps/_products/bit/bit) - 组件驱动的开发工具
   * [Budibase](/maps/_products/budibase/budibase) - 低代码平台
   * [Dynamo](/maps/_products/dynamo/dynamo) - 可视化编程工具
   * [Zapier](/maps/_products/zapier/zapier) - 应用集成平台
3. ## 概述 section with brief domain overview mentioning:
   - Component-driven development with Bit
   - Low-code/no-code platforms for rapid application development
   - Visual programming for designers and non-programmers
   - Integration platforms for connecting applications
4. No existing content to preserve (creating new domain entry)
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create bit subdomain and migrate content</name>
  <files>content/6.maps/_products/bit/bit.md</files>
  <action>
1. Create directory content/6.maps/_products/bit/
2. Move original content/6.maps/_products/bit.md to content/6.maps/_products/bit/bit.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_products/bit.md
4. Preserve all original content including:
   - 博客 section (十周年和 Harmony, 开发流程)
   - 点评 section (多个引用和评论)
   - 推荐阅读 section
   - TODO section
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Bit subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create budibase subdomain and migrate content</name>
  <files>content/6.maps/_products/budibase/budibase.md</files>
  <action>
1. Create directory content/6.maps/_products/budibase/
2. Move original content/6.maps/_products/budibase.md to content/6.maps/_products/budibase/budibase.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_products/budibase.md
4. Preserve all original content including:
   - Twitter timeline section (2020-2024 updates)
   - 定制化软件开发讨论
   - 图表功能和界面展示
   - 开源社区和融资信息
   - 产品转型讨论
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Budibase subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create dynamo subdomain and migrate content</name>
  <files>content/6.maps/_products/dynamo/dynamo.md</files>
  <action>
1. Create directory content/6.maps/_products/dynamo/
2. Move original content/6.maps/_products/dynamo.md to content/6.maps/_products/dynamo/dynamo.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_products/dynamo.md
4. Preserve all original content including:
   - Dynamo Primer reference
   - 界面 section (节点分类、布局算法)
   - 几何体 section (数据类型、节点冻结)
   - 数据结构 section (列表操作、代码转换)
   - 扩展 section (Data Shapes, BIMORPH Nodes)
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Dynamo subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create zapier subdomain and migrate content</name>
  <files>content/6.maps/_products/zapier/zapier.md</files>
  <action>
1. Create directory content/6.maps/_products/zapier/
2. Move original content/6.maps/_products/zapier.md to content/6.maps/_products/zapier/zapier.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_products/zapier.md
4. Preserve all original content including:
   - 简介 section with link
   - 评价 section with Herb Caudill quote
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Zapier subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Check 0.index.md for any direct links to _products domain files. Currently there are no direct links to bit, budibase, dynamo, or zapier in 0.index.md. The products domain is not currently listed as a category, so no updates needed for existing links.

If any links exist, update them to point to the new subdomain paths:
- `/maps/_products/bit` -> `/maps/_products/bit/bit`
- `/maps/_products/budibase` -> `/maps/_products/budibase/budibase`
- `/maps/_products/dynamo` -> `/maps/_products/dynamo/dynamo`
- `/maps/_products/zapier` -> `/maps/_products/zapier/zapier`
  </action>
  <verify>Links in 0.index.md are verified (no direct links to update)</verify>
  <done>Cross-domain links verified (no changes needed)</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_products/products.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to all four subdomains
- [ ] content/6.maps/_products/bit/bit.md exists with original content
- [ ] content/6.maps/_products/budibase/budibase.md exists with original content
- [ ] content/6.maps/_products/dynamo/dynamo.md exists with original content
- [ ] content/6.maps/_products/zapier/zapier.md exists with original content
- [ ] All moved files have original_path in frontmatter
- [ ] All original content preserved
</verification>

<success_criteria>
- _products domain follows 4-layer structure with 4 subdomains
- Domain entry provides clear navigation to all subdomains
- Original content accessible at new locations with preserved history
- Each subdomain has proper entry file with original_path metadata
</success_criteria>

<output>
After completion, create `.planning/phases/08-medium-batch-3/08-P01-SUMMARY.md`
</output>
