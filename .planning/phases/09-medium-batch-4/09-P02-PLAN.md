---
phase: 09-medium-batch-4
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - content/6.maps/_cloud-native/cloud-native.md
  - content/6.maps/_cloud-native/kubernetes/kubernetes.md
  - content/6.maps/_cloud-native/serverless/serverless.md
  - content/6.maps/_cloud-native/hardware/hardware.md
  - content/6.maps/_cloud-native/hardware/arm-on-cloud-native.md
  - content/6.maps/_cloud-native/sidecar/sidecar.md
  - content/6.maps/_cloud-native/sidecar/service-mesh-without-sidecar.md
  - content/6.maps/0.index.md
autonomous: true
must_haves:
  truths:
    - _cloud-native domain entry file exists with proper frontmatter and subdomain navigation
    - kubernetes.md moved to kubernetes/ subdirectory as subdomain entry
    - serverless.md moved to serverless/ subdirectory as subdomain entry
    - hardware/arm-on-cloud-native.md relocated under hardware/ with hardware.md as subdomain entry
    - sidecar/sidecar.md and sidecar/service-mesh-without-sidecar.md kept in place with proper structure
    - original_path preserved in all moved file frontmatter
    - Internal links in cloud-native.md updated to new paths
    - Cross-domain links in 0.index.md updated to new paths
  artifacts:
    - path: content/6.maps/_cloud-native/cloud-native.md
      provides: Domain entry with subdomain navigation
    - path: content/6.maps/_cloud-native/kubernetes/kubernetes.md
      provides: Kubernetes content as subdomain entry with original_path
    - path: content/6.maps/_cloud-native/serverless/serverless.md
      provides: Serverless content as subdomain entry with original_path
    - path: content/6.maps/_cloud-native/hardware/hardware.md
      provides: Hardware subdomain entry (new file)
    - path: content/6.maps/_cloud-native/hardware/arm-on-cloud-native.md
      provides: Arm on cloud native content with original_path
    - path: content/6.maps/_cloud-native/sidecar/sidecar.md
      provides: Sidecar pattern content as subdomain entry
    - path: content/6.maps/_cloud-native/sidecar/service-mesh-without-sidecar.md
      provides: Sidecarless service mesh content
  key_links:
    - from: content/6.maps/_cloud-native/cloud-native.md
      to: content/6.maps/_cloud-native/kubernetes/kubernetes.md
      via: subdomain navigation link
    - from: content/6.maps/_cloud-native/cloud-native.md
      to: content/6.maps/_cloud-native/serverless/serverless.md
      via: subdomain navigation link
    - from: content/6.maps/_cloud-native/cloud-native.md
      to: content/6.maps/_cloud-native/hardware/hardware.md
      via: subdomain navigation link
    - from: content/6.maps/_cloud-native/cloud-native.md
      to: content/6.maps/_cloud-native/sidecar/sidecar.md
      via: subdomain navigation link
    - from: content/6.maps/_cloud-native/sidecar/sidecar.md
      to: content/6.maps/_cloud-native/sidecar/service-mesh-without-sidecar.md
      via: internal topic link
    - from: content/6.maps/0.index.md
      to: new _cloud-native domain paths
      via: updated cross-domain links
---

# Phase 9-02: Migrate _cloud-native Domain (MED-13)

<objective>
Migrate the _cloud-native domain to the 4-layer structure by formalizing existing subdirectories and creating new subdomains for kubernetes/, serverless/, hardware/, and sidecar/. The hardware/ and sidecar/ directories already exist and need formalization with subdomain entry files.

Purpose: Establish consistent domain structure for cloud-native technologies with clear subdomain separation for container orchestration, serverless computing, hardware architecture, and service mesh patterns.
Output: Domain entry file and reorganized content with preserved metadata.
</objective>

<execution_context>
@/Users/lionad/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@content/6.maps/_cloud-native/cloud-native.md
@content/6.maps/_cloud-native/kubernetes.md
@content/6.maps/_cloud-native/serverless.md
@content/6.maps/_cloud-native/hardware/arm-on-cloud-native.md
@content/6.maps/_cloud-native/sidecar/sidecar.md
@content/6.maps/_cloud-native/sidecar/service-mesh-without-sidecar.md
@content/6.maps/0.index.md
</context>

<tasks>

<task type="auto">
  <name>Update _cloud-native domain entry file</name>
  <files>content/6.maps/_cloud-native/cloud-native.md</files>
  <action>
Update content/6.maps/_cloud-native/cloud-native.md to serve as the domain entry:
1. Keep existing YAML frontmatter (title: CloudNative, description: 云原生技术概论)
2. Add ## 子领域 section with links to subdomains:
   * [Kubernetes](/maps/_cloud-native/kubernetes/kubernetes) - 容器编排平台
   * [Serverless](/maps/_cloud-native/serverless/serverless) - 无服务器计算
   * [硬件架构](/maps/_cloud-native/hardware/hardware) - 云原生硬件与 Arm 架构
   * [Sidecar](/maps/_cloud-native/sidecar/sidecar) - 服务网格与 Sidecar 模式
3. Update existing Domain section links:
   - Change `[Sidecar](/maps/_cloud-native/sidecar/sidecar)` (keep - already correct)
   - Change `[Arm on Cloud Native](/maps/_cloud-native/hardware/arm-on-cloud-native)` (keep - already correct)
4. Update Components section link:
   - Change `[Kubernetes](/maps/_cloud-native/kubernetes)` to `[Kubernetes](/maps/_cloud-native/kubernetes/kubernetes)`
5. Preserve all existing content including:
   - Overview section with CNCF landscape
   - 云原生技术概论 section
   - Quick Question section with all Q&A
  </action>
  <verify>Domain entry file updated with proper subdomain navigation and internal links</verify>
  <done>Domain entry file updated with correct structure and navigation</done>
</task>

<task type="auto">
  <name>Create kubernetes subdomain and migrate content</name>
  <files>content/6.maps/_cloud-native/kubernetes/kubernetes.md</files>
  <action>
1. Create directory content/6.maps/_cloud-native/kubernetes/
2. Move original content/6.maps/_cloud-native/kubernetes.md to content/6.maps/_cloud-native/kubernetes/kubernetes.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_cloud-native/kubernetes.md
4. Preserve all original content including:
   - Kubernetes basics and architecture
   - Commands and usage information
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Kubernetes subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Create serverless subdomain and migrate content</name>
  <files>content/6.maps/_cloud-native/serverless/serverless.md</files>
  <action>
1. Create directory content/6.maps/_cloud-native/serverless/
2. Move original content/6.maps/_cloud-native/serverless.md to content/6.maps/_cloud-native/serverless/serverless.md
3. Update frontmatter of moved file to add:
   - original_path: content/6.maps/_cloud-native/serverless.md
4. Preserve all original content (minimal TODO placeholder content)
  </action>
  <verify>
- Directory created
- File moved with content preserved
- original_path in frontmatter
  </verify>
  <done>Serverless subdomain created with file migrated and metadata preserved</done>
</task>

<task type="auto">
  <name>Formalize hardware subdomain with entry file</name>
  <files>content/6.maps/_cloud-native/hardware/hardware.md, content/6.maps/_cloud-native/hardware/arm-on-cloud-native.md</files>
  <action>
1. Hardware directory already exists at content/6.maps/_cloud-native/hardware/
2. Create content/6.maps/_cloud-native/hardware/hardware.md as subdomain entry with:
   - YAML frontmatter:
     - title: 云原生硬件
     - description: 云原生环境下的硬件架构选择，包括 Arm 架构应用
   - ## 主题 section with link to arm-on-cloud-native:
     * [Arm on Cloud Native](/maps/_cloud-native/hardware/arm-on-cloud-native) - Arm 架构作为云原生默认选择
   - ## 概述 section with brief description of hardware considerations in cloud-native environments
3. Update frontmatter of existing content/6.maps/_cloud-native/hardware/arm-on-cloud-native.md to add:
   - original_path: content/6.maps/_cloud-native/hardware/arm-on-cloud-native.md
4. Preserve all original content in arm-on-cloud-native.md
  </action>
  <verify>
- Subdomain entry file created
- original_path added to arm-on-cloud-native.md frontmatter
- All original content preserved
  </verify>
  <done>Hardware subdomain formalized with entry file and metadata preserved</done>
</task>

<task type="auto">
  <name>Formalize sidecar subdomain with entry file</name>
  <files>content/6.maps/_cloud-native/sidecar/sidecar.md, content/6.maps/_cloud-native/sidecar/service-mesh-without-sidecar.md</files>
  <action>
1. Sidecar directory already exists at content/6.maps/_cloud-native/sidecar/
2. Update existing content/6.maps/_cloud-native/sidecar/sidecar.md:
   - Add original_path: content/6.maps/_cloud-native/sidecar/sidecar.md to frontmatter
   - Ensure it has ## 主题 section linking to service-mesh-without-sidecar.md:
     * [Service Mesh Without Sidecar](/maps/_cloud-native/sidecar/service-mesh-without-sidecar) - Istio Ambient 模式
   - Preserve all existing content
3. Update frontmatter of existing content/6.maps/_cloud-native/sidecar/service-mesh-without-sidecar.md to add:
   - original_path: content/6.maps/_cloud-native/sidecar/service-mesh-without-sidecar.md
4. Preserve all original content in service-mesh-without-sidecar.md
  </action>
  <verify>
- Sidecar subdomain entry has original_path in frontmatter
- service-mesh-without-sidecar.md has original_path in frontmatter
- Internal link from sidecar.md to service-mesh-without-sidecar.md exists
- All original content preserved
  </verify>
  <done>Sidecar subdomain formalized with metadata preserved</done>
</task>

<task type="auto">
  <name>Update cross-domain links in 0.index.md</name>
  <files>content/6.maps/0.index.md</files>
  <action>
Update the ## 架构 section in 0.index.md to point to new subdomain paths:
- `/maps/_cloud-native/cloud-native` -> keep as is (domain entry path unchanged)
- `/maps/_cloud-native/serverless` -> `/maps/_cloud-native/serverless/serverless`

The cloud-native link already points to the domain entry which is correct.
  </action>
  <verify>Serverless link in ## 架构 section updated to new path</verify>
  <done>Cross-domain links updated in 0.index.md</done>
</task>

</tasks>

<verification>
- [ ] content/6.maps/_cloud-native/cloud-native.md updated with ## 子领域 section
- [ ] Domain entry has links to all four subdomains
- [ ] content/6.maps/_cloud-native/kubernetes/kubernetes.md exists with original content
- [ ] content/6.maps/_cloud-native/serverless/serverless.md exists with original content
- [ ] content/6.maps/_cloud-native/hardware/hardware.md exists as subdomain entry
- [ ] content/6.maps/_cloud-native/hardware/arm-on-cloud-native.md has original_path
- [ ] content/6.maps/_cloud-native/sidecar/sidecar.md has original_path
- [ ] content/6.maps/_cloud-native/sidecar/service-mesh-without-sidecar.md has original_path
- [ ] All moved files have original_path in frontmatter
- [ ] Internal links in cloud-native.md updated to point to new paths
- [ ] Serverless link in 0.index.md updated
</verification>

<success_criteria>
- _cloud-native domain follows 4-layer structure with 4 subdomains
- Domain entry provides clear navigation to all subdomains
- Original content accessible at new locations with preserved history
- Each subdomain has proper entry file with original_path metadata
- Existing hardware/ and sidecar/ subdirectories formalized
- Cross-domain links in 0.index.md point to correct new paths
</success_criteria>

<output>
After completion, create `.planning/phases/09-medium-batch-4/09-P02-SUMMARY.md`
</output>
