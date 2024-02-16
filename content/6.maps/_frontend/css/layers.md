---
title: CSS Layers
---

## Cheatsheet

.empty-layer > a p > a.a p > b p > b.a p

```css
p.empty-layer {}
@layer b {
  p { color: red; }
  @layer b.a {
    p { color: green; }
  }
}
@layer a {
  p { color: orange; }
  @layer a.a {
    p { color: blue; }
  }
}
```
