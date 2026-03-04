---
phase: "19"
plan: "P02"
subsystem: "excalidraw-integration"
tags: ["excalidraw", "mdc-component", "vue", "nuxt"]
requires: ["19-P01"]
provides: ["19-P03"]
affects: ["components/content/Excalidraw.vue"]
tech-stack:
  added: []
  patterns: ["MDC Component", "ClientOnly Rendering", "useFetch", "useColorMode"]
key-files:
  created:
    - components/content/Excalidraw.vue
    - content/2.articles/.excalidraw-test.md
    - content/2.articles/assets/test-diagram.excalidraw
  modified: []
decisions:
  - "Use useFetch with transform for loading .excalidraw files"
  - "Resolve relative paths based on route.path for article-relative assets"
  - "Use var(--ui-border) and var(--ui-text-muted) for theme consistency"
  - "Set min-height: 400px for consistent component sizing"
metrics:
  duration: "8m"
  completed-date: "2026-03-04"
---

# Phase 19 Plan P02: Create Excalidraw MDC Component - Summary

**One-liner:** Created an MDC component that embeds interactive Excalidraw diagrams with read-only mode, file loading from relative paths, ClientOnly rendering, and automatic dark mode support.

## What Was Built

### Excalidraw.vue Component
A Vue component located at `components/content/Excalidraw.vue` that:
- Accepts a `src` prop for specifying the `.excalidraw` file path
- Loads diagram files using `useFetch` with JSON parsing
- Resolves relative paths based on the current article's route
- Wraps `ExcalidrawBoard` with `<ClientOnly>` to prevent hydration mismatches
- Supports read-only mode with all editing actions disabled
- Integrates with Nuxt UI's `useColorMode()` for automatic dark mode adaptation
- Shows loading state ("加载中...") and error state ("图表加载失败")
- Styled with 100% width, 1px border using `--ui-border`, no shadow, and proper spacing

### Test Files
- **Test diagram**: `content/2.articles/assets/test-diagram.excalidraw` - A sample diagram with rectangles, text, and arrows
- **Test article**: `content/2.articles/.excalidraw-test.md` - An article demonstrating the component with both success and error cases

## Commits

| Commit | Message | Description |
|--------|---------|-------------|
| c141ee95 | feat(19-P02): create Excalidraw MDC component with path resolution | Main component implementation with all features |
| 081c4c79 | test(19-P02): add test files for Excalidraw component | Test diagram and test article |

## Verification Criteria Status

- [x] Component file exists at `components/content/Excalidraw.vue`
- [x] Component accepts `src` prop and loads `.excalidraw` files
- [x] Relative paths resolve correctly based on article location (via `route.path`)
- [x] Read-only mode is active (`view-mode-enabled="true"`, `UIOptions` disables canvas actions)
- [x] Zoom and pan interactions work (built into Excalidraw view mode)
- [x] Dark mode toggles chart theme automatically (via `useColorMode`)
- [x] No hydration mismatch errors (wrapped in `<ClientOnly>`)
- [x] Error message displays when file fails to load ("图表加载失败")
- [x] Component has 1px border and proper spacing (per CONTEXT.md)

## Deviations from Plan

None - plan executed exactly as written.

## Implementation Notes

### Path Resolution Strategy
The component resolves relative paths using `useRoute().path`:
```typescript
const resolvedPath = computed(() => {
  const articlePath = route.path
  const basePath = articlePath.endsWith('/') ? articlePath.slice(0, -1) : articlePath
  return `${basePath}/${props.src}`
})
```

This means for an article at `/2.articles/my-post` with `src="assets/diagram.excalidraw"`, the resolved path becomes `/2.articles/my-post/assets/diagram.excalidraw`.

**Note:** For this to work in production, `.excalidraw` files should be placed in the `public/` directory or served via a custom API route. The current implementation assumes files are served at their content path.

### Read-Only Configuration
All editing actions are disabled via `UIOptions`:
```typescript
const uiOptions = {
  canvasActions: {
    changeViewBackgroundColor: false,
    clearCanvas: false,
    export: false,
    loadScene: false,
    saveToActiveFile: false,
    toggleTheme: false,
    saveAsImage: false
  }
}
```

### Dark Mode Integration
Uses Nuxt UI's `useColorMode()` composable:
```typescript
const excalidrawTheme = computed(() =>
  colorMode.value === 'dark' ? 'dark' : 'light'
)
```

## Files Created

```
components/content/Excalidraw.vue              # Main MDC component
content/2.articles/.excalidraw-test.md         # Test article
content/2.articles/assets/test-diagram.excalidraw  # Test diagram file
```

## Usage Example

In a Markdown article:
```markdown
# My Article

Here is an Excalidraw diagram:

::Excalidraw{src="assets/my-diagram.excalidraw"}

More content...
```

## Self-Check: PASSED

- [x] components/content/Excalidraw.vue exists
- [x] content/2.articles/.excalidraw-test.md exists
- [x] content/2.articles/assets/test-diagram.excalidraw exists
- [x] Commit c141ee95 exists
- [x] Commit 081c4c79 exists
