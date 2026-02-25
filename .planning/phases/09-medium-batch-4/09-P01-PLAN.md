---
phase: 09-medium-batch-4
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_science/science.md
  - content/6.maps/_science/complex-science/complex-science.md
  - content/6.maps/_science/complex-science/systems-theory.md
  - content/6.maps/_science/cosmos/cosmos.md
  - content/6.maps/_science/entropy/entropy.md
  - content/6.maps/_science/environment/environment.md
  - content/6.maps/_science/neuroscience/neuroscience.md
  - content/6.maps/_science/quantum/quantum.md
  - content/6.maps/0.index.md
autonomous: true
must_haves:
  truths:
    - _science domain entry file exists with proper frontmatter and subdomain navigation
    - complex-science.md moved to complex-science/ subdirectory as subdomain entry
    - systems-theory.md moved under complex-science/ as nested topic
    - cosmos.md moved to cosmos/ subdirectory as subdomain entry
    - entropy.md moved to entropy/ subdirectory as subdomain entry
    - environment.md moved to environment/ subdirectory as subdomain entry
    - neuroscience.md moved to neuroscience/ subdirectory as subdomain entry
    - quantum.md moved to quantum/ subdirectory as subdomain entry
    - original_path preserved in all moved file frontmatter
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_science/science.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_science/complex-science/complex-science.md
      provides: Complex science content as subdomain entry with original_path
    - path: content/6.maps/_science/complex-science/systems-theory.md
      provides: Systems theory content nested under complex-science with original_path
    - path: content/6.maps/_science/cosmos/cosmos.md
      provides: Cosmology content as subdomain entry with original_path
    - path: content/6.maps/_science/entropy/entropy.md
      provides: Entropy/thermodynamics content as subdomain entry with original_path
    - path: content/6.maps/_science/environment/environment.md
      provides: Environmental science content as subdomain entry with original_path
    - path: content/6.maps/_science/neuroscience/neuroscience.md
      provides: Neuroscience content as subdomain entry with original_path
    - path: content/6.maps/_science/quantum/quantum.md
      provides: Quantum mechanics content as subdomain entry with original_path
  key_links:
    - from: content/6.maps/_science/science.md
      to: content/6.maps/_science/complex-science/complex-science.md
      via: subdomain navigation link
    - from: content/6.maps/_science/science.md
      to: content/6.maps/_science/cosmos/cosmos.md
      via: subdomain navigation link
    - from: content/6.maps/_science/science.md
      to: content/6.maps/_science/entropy/entropy.md
      via: subdomain navigation link
    - from: content/6.maps/_science/science.md
      to: content/6.maps/_science/environment/environment.md
      via: subdomain navigation link
    - from: content/6.maps/_science/science.md
      to: content/6.maps/_science/neuroscience/neuroscience.md
      via: subdomain navigation link
    - from: content/6.maps/_science/science.md
      to: content/6.maps/_science/quantum/quantum.md
      via: subdomain navigation link
    - from: content/6.maps/_science/complex-science/complex-science.md
      to: content/6.maps/_science/complex-science/systems-theory.md
      via: internal topic link
    - from: content/6.maps/0.index.md
      to: new _science domain paths
      via: updated cross-domain links
---

# Phase 9-01: Migrate _science Domain (MED-16)

<objective>
Migrate the _science domain to the 4-layer structure by creating a domain entry file and organizing six scientific discipline files into dedicated subdomains: complex-science/, cosmos/, entropy/, environment/, neuroscience/, and quantum/.

Purpose: Establish consistent domain structure for scientific knowledge with clear subdomain separation for complex systems, cosmology, thermodynamics, environmental science, neuroscience, and quantum mechanics.
Output: Domain entry file and reorganized content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_science/complex-science.md
@content/6.maps/_science/cosmos.md
@content/6.maps/_science/entropy.md
@content/6.maps/_science/environment.md
@content/6.maps/_science/neuroscience.md
@content/6.maps/_science/quantum.md
@content/6.maps/_science/systems-theory.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Create _science domain entry file</name>
  <files>content/6.maps/_science/science.md</files>
  <action>
Create content/6.maps/_science/science.md as the domain entry file with:
1. YAML frontmatter:
   - title: 科学
   - description: 科学知识图谱，涵盖复杂科学、宇宙学、热力学、环境科学、神经科学和量子力学等领域
2. ## 子领域 section with links to subdomains:
   * [复杂科学](/maps/_science/complex-science/complex-science) - 复杂系统研究
   * [宇宙学](/maps/_science/cosmos/cosmos) - 宇宙起源与演化
   * [熵](/maps/_science/entropy/entropy) - 热力学与熵概念
   * [环境科学](/maps/_science/environment/environment) - 环境科学与低碳技术
   * [神经科学](/maps/_science/neuroscience/neuroscience) - 大脑科学与神经研究
   * [量子力学](/maps/_science/quantum/quantum) - 量子物理基础
3. ## 概述 section with brief domain overview
4. No existing content to preserve (creating new domain entry)
  </action>
  <verify>File exists with proper frontmatter and subdomain navigation</verify>
  <done>Domain entry file created with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create complex-science subdomain and migrate content</name>
  <files>content/6.maps/_science/complex-science/complex-science.md, content/6.maps/_science/complex-science/systems-theory.md</files>
  <action>
1. Create directory content/6.maps/_science/complex-science/
2. Move original content/6.maps/_science/complex-science.md to content/6.maps/_science/complex-science/complex-science.md
3. Move original content/6.maps/_science/systems-theory.md to content/6.maps/_science/complex-science/systems-theory.md
4. Update frontmatter of moved files to add:
   - original_path: content/6.maps/_science/complex-science.md (for complex-science.md)
   - original_path: content/6.maps/_science/systems-theory.md (for systems-theory.md)
5. Update internal link in complex-science.md:
   - Change `[系统论](/maps/_science/systems-theory)` to `[系统论](/maps/_science/complex-science/systems-theory)`
6. Preserve all original content including:
   - Components section with systems-theory link
   - 阅读 section with Bilibili video reference
  </action>
  <verify>
- Directory created
- Both files moved with content preserved
- original_path in frontmatter of both files
- Internal link updated correctly
  </verify>
  <done>Complex-science subdomain created with files migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create cosmos subdomain and migrate content</name>
  <files>content/6.maps/_science/cosmos/cosmos.md</files>
  <action>
1. Create directory content/6.maps/_science/cosmos/
2. Move original content/6.maps/_science/cosmos.md to content/6.maps/_science/cosmos/cosmos.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_science/cosmos.md
4. Preserve all original content including:
   - 地心说 to 日心说 historical progression
   - 宇宙历史 section
   - Cross-domain links to _person domain (verify targets exist)
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Cosmos subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create entropy subdomain and migrate content</name>
  <files>content/6.maps/_science/entropy/entropy.md</files>
  <action>
1. Create directory content/6.maps/_science/entropy/
2. Move original content/6.maps/_science/entropy.md to content/6.maps/_science/entropy/entropy.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_science/entropy.md
4. Preserve all original content including:
   - Book references and quotes
   - Entropy concepts from multiple sources
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Entropy subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create environment subdomain and migrate content</name>
  <files>content/6.maps/_science/environment/environment.md</files>
  <action>
1. Create directory content/6.maps/_science/environment/
2. Move original content/6.maps/_science/environment.md to content/6.maps/_science/environment/environment.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_science/environment.md
4. Preserve all original content including:
   - Low-carbon web practices
   - CO2 measurement information
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Environment subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create neuroscience subdomain and migrate content</name>
  <files>content/6.maps/_science/neuroscience/neuroscience.md</files>
  <action>
1. Create directory content/6.maps/_science/neuroscience/
2. Move original content/6.maps/_science/neuroscience.md to content/6.maps/_science/neuroscience/neuroscience.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_science/neuroscience.md
4. Preserve all original content including:
   - Neuroscience history timeline
   - Brain research milestones
   - Misophonia section
   - Cross-domain links to _person and _books domains
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Neuroscience subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create quantum subdomain and migrate content</name>
  <files>content/6.maps/_science/quantum/quantum.md</files>
  <action>
1. Create directory content/6.maps/_science/quantum/
2. Move original content/6.maps/_science/quantum.md to content/6.maps/_science/quantum/quantum.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_science/quantum.md
4. Preserve all original content including:
   - Quantum mechanics basics
   - EPR paradox
   - Bell's inequality
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Quantum subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the ## 科学 section in 0.index.md to point to new subdomain paths:
- `/maps/_science/neuroscience` -> `/maps/_science/neuroscience/neuroscience`
- `/maps/_science/entropy` -> `/maps/_science/entropy/entropy`
- `/maps/_science/cosmos` -> `/maps/_science/cosmos/cosmos`
- `/maps/_science/quantum` -> `/maps/_science/quantum/quantum`
- `/maps/_science/complex-science` -> `/maps/_science/complex-science/complex-science`
- `/maps/_science/environment` -> `/maps/_science/environment/environment`

Keep the link text (神经科学, 熵, 宇宙, 量子, 复杂科学, 环保) unchanged.
  </action>
  <verify>All 6 links in ## 科学 section updated to new paths</verify>
  <done>Cross-domain links updated in 0.index.md</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_science/science.md exists with proper frontmatter
- [ ] Domain entry has ## 子领域 section linking to all six subdomains
- [ ] content/6.maps/_science/complex-science/complex-science.md exists with original content
- [ ] content/6.maps/_science/complex-science/systems-theory.md exists with original content
- [ ] content/6.maps/_science/cosmos/cosmos.md exists with original content
- [ ] content/6.maps/_science/entropy/entropy.md exists with original content
- [ ] content/6.maps/_science/environment/environment.md exists with original content
- [ ] content/6.maps/_science/neuroscience/neuroscience.md exists with original content
- [ ] content/6.maps/_science/quantum/quantum.md exists with original content
- [ ] All moved files have original_path in frontmatter
- [ ] Internal link in complex-science.md updated to point to systems-theory.md
- [ ] All 6 links in 0.index.md ## 科学 section updated
</verification>

<success_criteria>
- _science domain follows 4-layer structure with 6 subdomains
- Domain entry provides clear navigation to all subdomains
- Original content accessible at new locations with preserved history
- Each subdomain has proper entry file with original_path metadata
- systems-theory.md properly nested under complex-science/
- Cross-domain links in 0.index.md point to correct new paths
</success_criteria>

<output>
After completion, create `.planning/phases/09-medium-batch-4/09-P01-SUMMARY.md`
</output>
