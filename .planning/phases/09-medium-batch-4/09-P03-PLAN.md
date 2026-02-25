---
phase: 09-medium-batch-4
plan: 03
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_product/product.md
  - content/6.maps/_product/gamification/gamification.md
  - content/6.maps/_product/growth/growth.md
  - content/6.maps/_product/operation/operation.md
  - content/6.maps/_product/product-hunt/product-hunt.md
  - content/6.maps/_product/product-manager/product-manager.md
  - content/6.maps/_product/user-research/user-research.md
  - content/6.maps/_product/user-research/dovetail.md
  - content/6.maps/0.index.md
autonomous: true
must_haves:
  truths:
    - _product domain entry file exists with proper frontmatter and subdomain navigation
    - gamification.md moved to gamification/ subdirectory as subdomain entry
    - growth.md moved to growth/ subdirectory as subdomain entry
    - operation.md moved to operation/ subdirectory as subdomain entry
    - product-hunt.md moved to product-hunt/ subdirectory as subdomain entry
    - product-manager.md moved to product-manager/ subdirectory as subdomain entry
    - docs/dovetail.md moved to user-research/dovetail.md with user-research.md as subdomain entry
    - original_path preserved in all moved file frontmatter
    - Internal links in product.md updated to new paths
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_product/product.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_product/gamification/gamification.md
      provides: Gamification content as subdomain entry with original_path
    - path: content/6.maps/_product/growth/growth.md
      provides: Growth content as subdomain entry with original_path
    - path: content/6.maps/_product/operation/operation.md
      provides: Operation content as subdomain entry with original_path
    - path: content/6.maps/_product/product-hunt/product-hunt.md
      provides: Product Hunt catalog as subdomain entry with original_path
    - path: content/6.maps/_product/product-manager/product-manager.md
      provides: Product manager content as subdomain entry with original_path
    - path: content/6.maps/_product/user-research/user-research.md
      provides: User research subdomain entry (new file)
    - path: content/6.maps/_product/user-research/dovetail.md
      provides: Dovetail tool content with original_path
  key_links:
    - from: content/6.maps/_product/product.md
      to: content/6.maps/_product/gamification/gamification.md
      via: subdomain navigation link
    - from: content/6.maps/_product/product.md
      to: content/6.maps/_product/user-research/dovetail.md
      via: updated internal link (from old docs/ path)
    - from: content/6.maps/_product/product.md
      to: content/6.maps/_product/product-hunt/product-hunt.md
      via: subdomain navigation link
    - from: content/6.maps/0.index.md
      to: new _product domain paths
      via: updated cross-domain links
---

# Phase 9-03: Migrate _product Domain (MED-15)

<objective>
Migrate the _product domain to the 4-layer structure by creating a domain entry file and organizing six product management discipline files into dedicated subdomains: gamification/, growth/, operation/, product-hunt/, product-manager/, and user-research/. The docs/dovetail.md file will be relocated to user-research/ subdomain to better reflect its content.

Purpose: Establish consistent domain structure for product management knowledge with clear subdomain separation for gamification, growth strategies, operations, product discovery, product management roles, and user research.
Output: Domain entry file and reorganized content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_product/product.md
@content/6.maps/_product/gamification.md
@content/6.maps/_product/growth.md
@content/6.maps/_product/operation.md
@content/6.maps/_product/product-hunt.md
@content/6.maps/_product/product-manager.md
@content/6.maps/_product/docs/dovetail.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Update _product domain entry file</name>
  <files>content/6.maps/_product/product.md</files>
  <action>
Update content/6.maps/_product/product.md to serve as the domain entry:
1. Keep existing YAML frontmatter (title: 产品)
2. Add ## 子领域 section with links to subdomains:
   * [游戏化](/maps/_product/gamification/gamification) - 游戏化设计原理
   * [增长](/maps/_product/growth/growth) - 用户增长策略
   * [运营](/maps/_product/operation/operation) - 产品运营与指标
   * [Product Hunt](/maps/_product/product-hunt/product-hunt) - 产品发现目录
   * [产品经理](/maps/_product/product-manager/product-manager) - PM 角色与职责
   * [用户研究](/maps/_product/user-research/user-research) - 用户研究方法
3. Update existing sections:
   - ## 理论 section: change `[游戏化](/maps/_product/gamification)` to `[游戏化](/maps/_product/gamification/gamification)`
   - ## 用户研究 section: change `[Dovetail](/maps/_product/docs/dovetail)` to `[Dovetail](/maps/_product/user-research/dovetail)`
   - ## 产品发现 section: change `[Product Hunt 产品集](/maps/_product/product-hunt)` to `[Product Hunt 产品集](/maps/_product/product-hunt/product-hunt)`
4. Preserve all existing content including:
   - 支付 section with拒付 information
  </action>
  <verify>Domain entry file updated with proper subdomain navigation and internal links</verify>
  <done>Domain entry file updated with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create gamification subdomain and migrate content</name>
  <files>content/6.maps/_product/gamification/gamification.md</files>
  <action>
1. Create directory content/6.maps/_product/gamification/
2. Move original content/6.maps/_product/gamification.md to content/6.maps/_product/gamification/gamification.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_product/gamification.md
4. Preserve all original content including:
   - Gamification design principles
   - FourSquare case study
   - Multiple sections on gamification theory and practice
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Gamification subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create growth subdomain and migrate content</name>
  <files>content/6.maps/_product/growth/growth.md</files>
  <action>
1. Create directory content/6.maps/_product/growth/
2. Move original content/6.maps/_product/growth.md to content/6.maps/_product/growth/growth.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_product/growth.md
4. Preserve all original content including:
   - Growth methods overview
   - Links to SEO (cross-domain link - verify after migration)
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Growth subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create operation subdomain and migrate content</name>
  <files>content/6.maps/_product/operation/operation.md</files>
  <action>
1. Create directory content/6.maps/_product/operation/
2. Move original content/6.maps/_product/operation.md to content/6.maps/_product/operation/operation.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_product/operation.md
4. Preserve all original content including:
   - NPS (Net Promoter Score) information
   - Advertising strategies (CPM, CPC, oCPM)
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Operation subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create product-hunt subdomain and migrate content</name>
  <files>content/6.maps/_product/product-hunt/product-hunt.md</files>
  <action>
1. Create directory content/6.maps/_product/product-hunt/
2. Move original content/6.maps/_product/product-hunt.md to content/6.maps/_product/product-hunt/product-hunt.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_product/product-hunt.md
4. Preserve all original content including:
   - 20+ product categories
   - 100+ individual product listings
   - Extensive catalog structure (1000+ lines)

Note: This is a large file (1011 lines). Keep as single file for Phase 9, consider splitting by category in future phase.
  </action>
  <verify>
- Directory created
- File moved with all content preserved
- original_path in frontmatter
  </verify>
  <done>Product-hunt subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create product-manager subdomain and migrate content</name>
  <files>content/6.maps/_product/product-manager/product-manager.md</files>
  <action>
1. Create directory content/6.maps/_product/product-manager/
2. Move original content/6.maps/_product/product-manager.md to content/6.maps/_product/product-manager/product-manager.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_product/product-manager.md
4. Preserve all original content including:
   - Product manager role definition
   - PM responsibilities
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Product-manager subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create user-research subdomain and migrate dovetail</name>
  <files>content/6.maps/_product/user-research/user-research.md, content/6.maps/_product/user-research/dovetail.md</files>
  <action>
1. Create directory content/6.maps/_product/user-research/
2. Move original content/6.maps/_product/docs/dovetail.md to content/6.maps/_product/user-research/dovetail.md
3. Create content/6.maps/_product/user-research/user-research.md as subdomain entry with:
   - YAML frontmatter:
     - title: 用户研究
     - description: 用户研究方法、工具和实践
   - ## 主题 section with link to dovetail:
     * [Dovetail](/maps/_product/user-research/dovetail) - 定性研究平台
   - ## 概述 section with brief description of user research methods and tools
4. Update frontmatter of moved dovetail.md to add:
   - original_path: content/6.maps/_product/docs/dovetail.md
5. Preserve all original content in dovetail.md including:
   - Dovetail platform description
   - Qualitative research features
  </action>
  <verify>
- Directory created
- dovetail.md moved with content preserved
- Subdomain entry file created
- original_path in dovetail.md frontmatter
  </verify>
  <done>User-research subdomain created with dovetail migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the ## 产品 section in 0.index.md to point to new subdomain paths:
- `/maps/_product/product-manager` -> `/maps/_product/product-manager/product-manager`
- `/maps/_product/product` -> keep as is (domain entry)
- `/maps/_product/operation` -> `/maps/_product/operation/operation`
- `/maps/_product/growth` -> `/maps/_product/growth/growth`

Keep the link text (产品经理, 产品设计, 运营, 增长) unchanged.
  </action>
  <verify>All 4 product-related links in ## 产品 section updated to new paths</verify>
  <done>Cross-domain links updated in 0.index.md</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_product/product.md updated with ## 子领域 section
- [ ] Domain entry has links to all six subdomains
- [ ] content/6.maps/_product/gamification/gamification.md exists with original content
- [ ] content/6.maps/_product/growth/growth.md exists with original content
- [ ] content/6.maps/_product/operation/operation.md exists with original content
- [ ] content/6.maps/_product/product-hunt/product-hunt.md exists with original content
- [ ] content/6.maps/_product/product-manager/product-manager.md exists with original content
- [ ] content/6.maps/_product/user-research/user-research.md exists as subdomain entry
- [ ] content/6.maps/_product/user-research/dovetail.md exists with original content
- [ ] All moved files have original_path in frontmatter
- [ ] Internal links in product.md updated to point to new paths
- [ ] All 4 links in 0.index.md ## 产品 section updated
</verification>

<success_criteria>
- _product domain follows 4-layer structure with 6 subdomains
- Domain entry provides clear navigation to all subdomains
- Original content accessible at new locations with preserved history
- Each subdomain has proper entry file with original_path metadata
- docs/dovetail.md successfully relocated to user-research/ subdomain
- Cross-domain links in 0.index.md point to correct new paths
</success_criteria>

<output>
After completion, create `.planning/phases/09-medium-batch-4/09-P03-SUMMARY.md`
</output>
