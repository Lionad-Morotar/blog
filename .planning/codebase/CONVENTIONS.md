# Coding Conventions

**Analysis Date:** 2026-02-24

## Naming Patterns

**Files:**
- Vue components: PascalCase (e.g., `Header.vue`, `Mermaid.vue`)
- Composables: camelCase with `use` prefix (e.g., `usePreferredLocale.ts`)
- Utilities: camelCase (e.g., `locale.ts`)
- Middleware: camelCase with `.global` suffix for global middleware (e.g., `locale-preference.global.ts`)
- Style files: lowercase (e.g., `index.styl`, `setting.styl`)

**Components:**
- PascalCase for component names (e.g., `Header.vue`, `Footer.vue`)
- Multi-word component names allowed (e.g., `TextHighlightPlayground.vue`)
- Index files for complex components in subdirectories (e.g., `components/AspectRatio/index.vue`)

**Functions:**
- camelCase for regular functions (e.g., `getLocaleFromPath`, `stripEnPrefix`)
- Composables must use `use` prefix (e.g., `usePreferredLocale`)
- Event handlers prefixed with action verbs (e.g., `changeSlide`, `applyHighlight`)

**Variables:**
- camelCase for variables and constants
- Descriptive naming (e.g., `preferredLocale`, `contentExistsState`)
- Boolean variables often use state verbs (e.g., `hasEnglish`, `isSm`)

**Types:**
- PascalCase for type definitions (e.g., `PreferredLocale`)
- Descriptive type names in type definitions

## Code Style

**Formatting:**
- ESLint with `@nuxt/eslint-config` base
- No semicolons (enforced by ESLint rule `semi: ['error', 'never']`)
- Single quotes for strings (enforced by ESLint rule `quotes: ['error', 'single']`)
- Quote props as needed (enforced by ESLint rule `quote-props: ['error', 'as-needed']`)
- No Prettier configuration detected

**ESLint Configuration:**
```javascript
// .eslintrc.cjs
module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    'vue/multi-word-component-names': 0,
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 0
  }
}
```

**Vue-specific Rules:**
- Multi-word component names not enforced (disabled)
- Max attributes per line rule disabled (allows flexible formatting)
- v-html allowed (no restriction)

**Indentation:**
- 2 spaces for indentation (observed in source files)

## Import Organization

**Order:**
1. Type imports first (e.g., `import type { ParsedContent } from '@nuxt/content'`)
2. Vue/Nuxt auto-imports (no explicit imports needed for composables like `ref`, `computed`)
3. Third-party imports
4. Local utility imports using `~/` alias

**Path Aliases:**
- `~/` for project root (e.g., `~/utils/locale`)
- `#content/server` for content server utilities
- `#app` for Nuxt app types

**Examples:**
```typescript
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { NuxtError } from '#app'
import { serverQueryContent } from '#content/server'
import { getLocaleFromPath } from '~/utils/locale'
```

## Error Handling

**Patterns:**
- Try-catch blocks for async operations
- Error creation with `createError` for fatal errors
- Graceful fallbacks with default values

**Examples:**
```typescript
// Error throwing for missing pages
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// Try-catch for content queries
try {
  await queryContent(basePath).only(['_path']).findOne()
  contentExistsState.value.zh = true
} catch {
  contentExistsState.value.zh = false
}

// Default values for async data
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', {
  default: () => [],
  server: false,
})
```

## Logging

**Framework:** Console-based (no dedicated logging library detected)

**Patterns:**
- Minimal console usage in production code
- Commented-out console logs for debugging
- Format: `console.log('[info] Page:', page.value.title, page.value)`

## Comments

**When to Comment:**
- Chinese comments for explaining "why" not "what"
- Section headers in style files
- Links to external resources and documentation
- TODO markers for future improvements

**Examples:**
```typescript
// * online editor
// https://mermaid-js.github.io/mermaid-live-editor/

// * source code
// see https://github.com/nuxt/content/issues/1866

// 移动端的 Header 会被快链撑开，直接隐藏
// (Mobile header will be stretched by quick links, hide directly)
```

**JSDoc/TSDoc:**
- Not widely used
- Type annotations preferred over JSDoc
- Inline comments for complex logic

## Function Design

**Size:**
- Small to medium functions (generally under 50 lines)
- Composables extracted for reusable logic
- Callbacks defined inline for event handlers

**Parameters:**
- Destructuring for options objects
- Type annotations for function parameters
- Default values where appropriate

**Return Values:**
- Explicit return types on shared utilities
- Implicit returns for Vue composables
- Consistent return types within functions

**Examples:**
```typescript
// Utility with explicit types
export function getLocaleFromPath(path: string): PreferredLocale {
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'zh'
}

// Composable returning state
export function usePreferredLocale() {
  const locale = useState<PreferredLocale>('preferred-locale', () => 'zh')
  // ... logic
  return locale
}
```

## Module Design

**Exports:**
- Named exports for utilities and types
- Default exports for page and layout components
- Barrel pattern for component directories

**Examples:**
```typescript
// Named exports
export type { PreferredLocale }
export function getLocaleFromPath() { }
export function stripEnPrefix() { }

// Default exports for pages/layouts
export default defineNuxtConfig({})
export default defineAppConfig({})
```

**Barrel Files:**
- Not explicitly used
- Components auto-imported by Nuxt
- Utilities imported directly from source files

## Vue-specific Conventions

**Component Structure:**
```vue
<script setup lang="ts">
// Types imports first
// Props/Emits definitions
// Reactive state
// Computed properties
// Methods
// Lifecycle hooks
</script>

<template>
  <!-- Template content -->
</template>

<style scoped>
/* Component styles */
</style>
```

**Props:**
- Type-based declarations using `<script setup lang="ts">`
- Default values using `withDefaults` macro (when needed)
- Descriptive prop names

**Events:**
- Inline event handlers for simple cases
- Method references for complex logic
- Native event modifiers used (e.g., `.stop`, `.prevent`)

**Reactivity:**
- `ref()` for primitive values
- `reactive()` for objects (less common)
- `computed()` for derived state
- `watch()` for side effects

## Style Conventions

**Stylus-specific:**
- Indentation-based nesting (2 spaces)
- BEM-like naming for CSS classes
- Media queries nested within selectors

**Examples:**
```stylus
.mermaid {
  margin: auto;

  svg {
    max-width: 100%;
    height: auto;
  }

  &.is-sm {
    max-width: 30%;
  }
}
```

**Tailwind Usage:**
- Utility classes in templates
- `@apply` directive in style blocks
- Custom colors defined in `tailwind.config.ts`

---

*Convention analysis: 2026-02-24*
