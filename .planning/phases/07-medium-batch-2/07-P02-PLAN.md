---
phase: 07-medium-batch-2
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_visual/visual.md
  - content/6.maps/_visual/info-design/info-design.md
  - content/6.maps/_visual/visualization/visualization.md
  - content/6.maps/_visual/gis/gis.md
autonomous: true
must_haves:
  truths:
    - _visual domain entry file exists with proper frontmatter and subdomain navigation
    - info-design.md moved to info-design/ subdirectory as subdomain entry
    - visualization.md moved to visualization/ subdirectory as subdomain entry
    - gis.md remains in gis/ subdirectory as subdomain entry (formalized)
    - original_path preserved in all moved file frontmatter
    - Internal links in visualization.md updated to new subdomain paths
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_visual/visual.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_visual/info-design/info-design.md
      provides: Information design content as subdomain entry with original_path
    - path: content/6.maps/_visual/visualization/visualization.md
      provides: Visualization content as subdomain entry with original_path
    - path: content/6.maps/_visual/gis/gis.md
      provides: GIS content as subdomain entry
  key_links:
    - from: content/6.maps/_visual/visual.md
      to: content/6.maps/_visual/info-design/info-design.md
      via: subdomain navigation link
    - from: content/6.maps/_visual/visual.md
      to: content/6.maps/_visual/visualization/visualization.md
      via: subdomain navigation link
    - from: content/6.maps/_visual/visual.md
      to: content/6.maps/_visual/gis/gis.md
      via: subdomain navigation link
    - from: content/6.maps/_visual/visualization/visualization.md
      to: content/6.maps/_visual/gis/gis.md
      via: internal domain link
    - from: content/6.maps/0.index.md
      to: new _visual domain paths
      via: updated cross-domain links
---

# Phase 7-02: Migrate _visual Domain

<objective>
Migrate the _visual domain to the 4-layer structure by creating a domain entry file and organizing content into three subdomains: info-design/, visualization/, and gis/ (preserving existing structure).

Purpose: Establish consistent domain structure for visualization knowledge with clear subdomain separation for information design, technical visualization, and geographic information systems.
Output: Domain entry file and reorganized content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_visual/info-design.md
@content/6.maps/_visual/visualization.md
@content/6.maps/_visual/gis/gis.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _visual domain entry file</name>
  <files>content/6.maps/_visual/visual.md</files>
  <action>
Create content/6.maps/_visual/visual.md as the domain entry file with:
1. YAML frontmatter:
   - title: 可视化
   - description: 可视化技术、信息设计与地理信息系统
2. ## 子领域 section with links to subdomains:
   * [信息设计](/maps/_visual/info-design/info-design)
   * [可视化技术](/maps/_visual/visualization/visualization)
   * [GIS](/maps/_visual/gis/gis)
3. ## 概述 section with brief domain overview mentioning:
   - Information design principles and data presentation
   - Technical visualization techniques and visual perception
   - Geographic Information Systems for spatial data
4. Update internal link in visualization.md: change `/maps/_visual/gis/gis` to `/maps/_visual/gis/gis` (verify path is correct)
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create info-design subdomain and migrate content</name>
  <files>content/6.maps/_visual/info-design/info-design.md</files>
  <action>
1. Create directory content/6.maps/_visual/info-design/
2. Move original content/6.maps/_visual/info-design.md to content/6.maps/_visual/info-design/info-design.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_visual/info-design.md
4. Preserve all original content including:
   - Information design concepts and theory
   - ISUX big data visualization series
   - Data visualization iteration process (mermaid diagram)
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Info-design subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create visualization subdomain and migrate content</name>
  <files>content/6.maps/_visual/visualization/visualization.md</files>
  <action>
1. Create directory content/6.maps/_visual/visualization/
2. Move original content/6.maps/_visual/visualization.md to content/6.maps/_visual/visualization/visualization.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_visual/visualization.md
4. Preserve all original content including:
   - Domain section with GIS link
   - 技术 section (模糊效果的实现)
   - 概念 section (视错觉的形成原理)
5. Verify internal link to GIS: `/maps/_visual/gis/gis` should remain correct
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
- Internal links preserved
  </verify>
  <done>Visualization subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Formalize gis subdomain</name>
  <files>content/6.maps/_visual/gis/gis.md</files>
  <action>
1. Verify directory content/6.maps/_visual/gis/ exists
2. Verify file content/6.maps/_visual/gis/gis.md exists with proper content
3. Add to frontmatter if not present:
   - description: 地理信息系统（Geographic Information System）是一种用于捕获、存储、管理、分析和展示地理空间数据的计算机系统
4. Preserve all original content including:
   - Tour section with video links
  </action>
  <verify>
- Directory exists
- File exists with proper frontmatter
- Content preserved
  </verify>
  <done>GIS subdomain formalized with proper structure</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the links in 0.index.md under ## 可视化 section:
- Change `[可视化](/maps/_visual/visualization)` to `[可视化](/maps/_visual/visualization/visualization)`
- Change `[信息设计](/maps/_visual/info-design)` to `[信息设计](/maps/_visual/info-design/info-design)`
  </action>
  <verify>Links in 0.index.md point to new paths</verify>
  <done>Cross-domain links updated to reflect new structure</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_visual/visual.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to all three subdomains
- [ ] content/6.maps/_visual/info-design/info-design.md exists with original content
- [ ] content/6.maps/_visual/visualization/visualization.md exists with original content
- [ ] content/6.maps/_visual/gis/gis.md exists with proper frontmatter
- [ ] All moved files have original_path in frontmatter
- [ ] Internal links in visualization.md preserved
- [ ] 0.index.md links updated to new paths
- [ ] All original content preserved
</verification>

<success_criteria>
- _visual domain follows 4-layer structure with 3 subdomains
- Domain entry provides clear navigation to all subdomains
- Original content accessible at new locations with preserved history
- Cross-domain links in 0.index.md point to correct new paths
</success_criteria>

<output>
After completion, create `.planning/phases/07-medium-batch-2/07-P02-SUMMARY.md`
</output>
