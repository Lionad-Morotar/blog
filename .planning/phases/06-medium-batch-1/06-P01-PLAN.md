---
phase: 06-medium-batch-1
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_business/business.md
  - content/6.maps/_business/analysis/business-analysis.md
  - content/6.maps/_business/analysis/business-examples.md
  - content/6.maps/_business/venture-capital/venture-capital.md
autonomous: true
must_haves:
  truths:
    - _business domain entry file exists with proper frontmatter and subdomain navigation
    - business-analysis.md and business-examples.md consolidated under analysis/ subdomain
    - venture-capital.md moved to venture-capital/ subdomain
    - original_path preserved in all moved file frontmatter
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_business/business.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_business/analysis/business-analysis.md
      provides: Business analysis content with original_path
    - path: content/6.maps/_business/analysis/business-examples.md
      provides: Business examples content with original_path
    - path: content/6.maps/_business/venture-capital/venture-capital.md
      provides: Venture capital content with original_path
  key_links:
    - from: content/6.maps/_business/business.md
      to: content/6.maps/_business/analysis/business-analysis.md
      via: subdomain navigation link
    - from: content/6.maps/_business/business.md
      to: content/6.maps/_business/venture-capital/venture-capital.md
      via: subdomain navigation link
    - from: content/6.maps/0.index.md
      to: new business domain paths
      via: updated cross-domain links
---

# Phase 6-01: Migrate _business Domain

<objective>
Migrate the _business domain to the 4-layer structure by creating a domain entry file and organizing content into two subdomains: analysis/ (consolidating business-analysis.md and business-examples.md) and venture-capital/ (distinct topic).

Purpose: Establish consistent domain structure for business knowledge with clear subdomain separation.
Output: Domain entry file and reorganized content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_business/business-analysis.md
@content/6.maps/_business/business-examples.md
@content/6.maps/_business/venture-capital.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _business domain entry file</name>
  <files>content/6.maps/_business/business.md</files>
  <action>
Create content/6.maps/_business/business.md as the domain entry file with:
1. YAML frontmatter:
   - title: 商业
   - description: 商业分析、风险投资及商业思维
2. ## 子领域 section with links to subdomains:
   * [商业分析](/maps/_business/analysis/business-analysis)
   * [风险投资](/maps/_business/venture-capital/venture-capital)
3. ## 概述 section with brief domain overview mentioning business analysis frameworks and venture capital
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create analysis subdomain and migrate content</name>
  <files>
    content/6.maps/_business/analysis/business-analysis.md
    content/6.maps/_business/analysis/business-examples.md
  </files>
  <action>
1. Create directory content/6.maps/_business/analysis/
2. Move original content/6.maps/_business/business-analysis.md to content/6.maps/_business/analysis/business-analysis.md
3. Move original content/6.maps/_business/business-examples.md to content/6.maps/_business/analysis/business-examples.md
4. Update frontmatter of both moved files to add:
   - original_path: content/6.maps/_business/business-analysis.md (or business-examples.md)
5. Preserve all original content including:
   - business-analysis.md: 商业分析 models, 分析框架, AI创业护城河矩阵
   - business-examples.md: 商业思维案例笔记
  </action>
  <verify>
- Directory created
- Both files moved with content preserved
- original_path in frontmatter of both files
  </verify>
  <done>Analysis subdomain created with both files migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create venture-capital subdomain and migrate content</name>
  <files>content/6.maps/_business/venture-capital/venture-capital.md</files>
  <action>
1. Create directory content/6.maps/_business/venture-capital/
2. Move original content/6.maps/_business/venture-capital.md to content/6.maps/_business/venture-capital/venture-capital.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_business/venture-capital.md
4. Preserve all original content including:
   - 风险投资的基本运作流程
   - 风投环境遇冷的原因
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Venture-capital subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the links in 0.index.md under ## 商业 section:
- Change `[商业分析](/maps/_business/business-analysis)` to `[商业分析](/maps/_business/analysis/business-analysis)`
- Change `[风险投资](/maps/_business/venture-capital)` to `[风险投资](/maps/_business/venture-capital/venture-capital)`
  </action>
  <verify>Links in 0.index.md point to new paths</verify>
  <done>Cross-domain links updated to reflect new structure</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_business/business.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to both subdomains
- [ ] content/6.maps/_business/analysis/business-analysis.md exists with original content
- [ ] content/6.maps/_business/analysis/business-examples.md exists with original content
- [ ] content/6.maps/_business/venture-capital/venture-capital.md exists with original content
- [ ] All moved files have original_path in frontmatter
- [ ] 0.index.md links updated to new paths
- [ ] All original content preserved
</verification>

<success_criteria>
- _business domain follows 4-layer structure with 2 subdomains
- Domain entry provides clear navigation to both subdomains
- Original content accessible at new locations with preserved history
- Cross-domain links in 0.index.md point to correct new paths
</success_criteria>

<output>
After completion, create `.planning/phases/06-medium-batch-1/06-P01-SUMMARY.md`
</output>
