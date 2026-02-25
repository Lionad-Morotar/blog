---
status: investigating
trigger: "nuxt-dev-emfile: EMFILE: too many open files error when running `nuxt dev`"
created: 2026-02-25T00:00:00Z
updated: 2026-02-25T00:00:00Z
---

## Current Focus

hypothesis: Nuxt's file watcher is watching node_modules (53,694 files) or other large directories without proper ignore configuration

test: Run nuxt dev to reproduce the error and examine the watcher configuration

expecting: EMFILE error during startup, confirming watcher is watching too many files

next_action: Run pnpm dev and capture the full error output

## Symptoms

expected: Nuxt dev server starts successfully and watches files for changes
actual: EMFILE: too many open files, watch error during startup
errors: |
  EMFILE: too many open files, watch
  at FSWatcher._handle.onchange (node:internal/fs/watchers:207:21)
  at FSEvent.callbackTrampoline (node:internal/async_hooks:130:17)
  ELIFECYCLE Command failed with exit code 1
reproduction: Run `nuxt dev` or `pnpm dev` command
started: Unknown

## Eliminated

- hypothesis: 6.maps directory has too many files causing EMFILE
  evidence: 6.maps has only 404 files and 219 directories - not enough to cause EMFILE on its own
  timestamp: 2026-02-25

## Evidence

- timestamp: 2026-02-25
  checked: nuxt.config.ts
  found: No explicit watcher configuration (no watch, ignore, or chokidar settings)
  implication: Nuxt is using default watcher settings which may watch too many files

- timestamp: 2026-02-25
  checked: Project file counts
  found: |
    Total files: 163,738
    node_modules: 53,694 files
    content directory: 620 files
    6.maps directory: 404 files, 219 directories
    .nuxt directory: 2 files
  implication: node_modules is the largest directory; if being watched, it would cause EMFILE

- timestamp: 2026-02-25
  checked: macOS file limits
  found: launchctl limit maxfiles = 524288 (soft), unlimited (hard)
  implication: System limits should be sufficient, but per-process limits or watcher implementation may be the issue

## Resolution

root_cause:
fix:
verification:
files_changed: []
