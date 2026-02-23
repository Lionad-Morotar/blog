# Testing Patterns

**Analysis Date:** 2026-02-24

## Test Framework

**Status:** No testing framework detected

**Observation:** This codebase does not currently have automated testing configured. No test files, test scripts, or testing dependencies were found.

**Package.json scripts:**
```json
{
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev --port 5995 --host",
    "serve": "pnpm dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "typecheck": "nuxt typecheck",
    "post": "npm run build && npm run upload",
    "lint": "eslint . --fix && npx case-police \"**/*.md\" --fix"
  }
}
```

**Missing Testing Infrastructure:**
- No test runner (Vitest, Jest, or Cypress)
- No test scripts in package.json
- No test files (*.test.ts, *.spec.ts, *.test.vue)
- No testing utilities (@vue/test-utils)
- No coverage reporting tools

## Recommended Testing Setup

Since this is a Nuxt 3 project, the following testing stack is recommended:

**Suggested Framework:**
- **Runner:** Vitest (natively supported by Nuxt 3)
- **Vue Testing:** @vue/test-utils
- **E2E Testing:** Playwright or Cypress

**Installation:**
```bash
# Unit testing
pnpm add -D vitest @vue/test-utils @nuxt/test-utils

# E2E testing
pnpm add -D playwright
```

**Recommended Configuration:**
```typescript
// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
  },
})
```

## Manual Testing Practices

**Current Quality Assurance:**
- TypeScript type checking: `pnpm typecheck`
- ESLint linting: `pnpm lint`
- Manual verification in development mode
- Production build verification

**Development Testing:**
```bash
# Start development server
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Production build test
pnpm build
pnpm preview
```

## Test File Organization (Recommended)

**Recommended Structure:**
```
[project-root]/
├── tests/
│   ├── unit/
│   │   ├── composables/
│   │   │   └── usePreferredLocale.test.ts
│   │   ├── utils/
│   │   │   └── locale.test.ts
│   │   └── components/
│   │       └── Header.test.ts
│   ├── integration/
│   │   ├── api/
│   │   │   └── search.test.ts
│   │   └── middleware/
│   │       └── locale-preference.test.ts
│   └── e2e/
│       ├── navigation.spec.ts
│       └── content.spec.ts
```

**Alternative Co-location Pattern:**
```
[project-root]/
├── composables/
│   ├── usePreferredLocale.ts
│   └── usePreferredLocale.test.ts
├── utils/
│   ├── locale.ts
│   └── locale.test.ts
```

## What Should Be Tested

**Critical Paths:**
1. **Locale Utilities** (`utils/locale.ts`)
   - `getLocaleFromPath()` - path parsing
   - `stripEnPrefix()` - locale prefix removal
   - `withLocalePath()` - locale path construction

2. **Middleware** (`middleware/locale-preference.global.ts`)
   - Locale redirection logic
   - Content existence checks
   - Navigation flow

3. **Composables** (`composables/usePreferredLocale.ts`)
   - LocalStorage interaction
   - State initialization
   - Locale switching

4. **API Routes** (`server/api/search.json.get.ts`)
   - Search endpoint functionality
   - Content filtering

5. **Key Components**
   - Header navigation
   - Locale switcher dropdown
   - Content rendering

## Testing Patterns (Recommended)

**Composables Testing:**
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { usePreferredLocale } from '~/composables/usePreferredLocale'

describe('usePreferredLocale', () => {
  beforeEach(() => {
    // Reset localStorage mock
    localStorage.clear()
  })

  it('should default to zh locale', () => {
    const locale = usePreferredLocale()
    expect(locale.value).toBe('zh')
  })

  it('should persist locale to localStorage', () => {
    const locale = usePreferredLocale()
    locale.value = 'en'
    expect(localStorage.getItem('preferred-locale')).toBe('en')
  })
})
```

**Utility Function Testing:**
```typescript
import { describe, it, expect } from 'vitest'
import { getLocaleFromPath, stripEnPrefix, withLocalePath } from '~/utils/locale'

describe('locale utilities', () => {
  describe('getLocaleFromPath', () => {
    it('should return zh for root path', () => {
      expect(getLocaleFromPath('/')).toBe('zh')
    })

    it('should return en for /en paths', () => {
      expect(getLocaleFromPath('/en/articles')).toBe('en')
    })

    it('should return zh for non-en paths', () => {
      expect(getLocaleFromPath('/articles')).toBe('zh')
    })
  })

  describe('stripEnPrefix', () => {
    it('should remove /en prefix', () => {
      expect(stripEnPrefix('/en/articles')).toBe('/articles')
    })

    it('should return / for /en', () => {
      expect(stripEnPrefix('/en')).toBe('/')
    })

    it('should keep non-en paths unchanged', () => {
      expect(stripEnPrefix('/articles')).toBe('/articles')
    })
  })
})
```

**Component Testing:**
```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '~/components/Header.vue'

describe('Header', () => {
  it('should render navigation links', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: ['UHeader', 'UContentSearchButton', 'UColorModeButton', 'UButton']
      }
    })
    expect(wrapper.findComponent('UHeader').exists()).toBe(true)
  })
})
```

**API Route Testing:**
```typescript
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('Search API', () => {
  await setup({
    server: true
  })

  it('should return search results', async () => {
    const response = await $fetch('/api/search.json')
    expect(Array.isArray(response)).toBe(true)
  })
})
```

## Coverage Recommendations

**Minimum Coverage Targets:**
- Statements: 70%
- Branches: 60%
- Functions: 70%
- Lines: 70%

**Priority Areas for Coverage:**
1. Locale utility functions (100% coverage recommended)
2. Middleware logic (100% coverage recommended)
3. Composables with localStorage interaction
4. API routes

## CI/CD Testing Integration

**Recommended GitHub Actions Workflow:**
```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm test:unit
      - run: pnpm test:e2e
```

## Testing Best Practices

**Do:**
- Test business logic in isolation
- Mock external dependencies (localStorage, APIs)
- Use meaningful test descriptions
- Follow AAA pattern (Arrange, Act, Assert)
- Clean up after tests

**Don't:**
- Test implementation details
- Mock Nuxt auto-imports
- Test third-party libraries
- Write tests that depend on execution order

---

*Testing analysis: 2026-02-24*

**Note:** This codebase currently lacks automated testing. Consider adding Vitest and @nuxt/test-utils to improve code reliability and prevent regressions, especially for the locale handling logic which is critical to the application's functionality.
