---
title: Multi-Screen Window Placement
---

## Cheatsheet

```js
// Detect if the device has more than one screen.
if (window.screen.isExtended) {
  // Request information required to place content on specific screens.
  const screenDetails = await window.getScreenDetails();
  // Detect when a screen is added or removed.
  screenDetails.addEventListener('screenschange', onScreensChange);
  // Detect when the current <code data-opaque bs-autolink-syntax='`ScreenDetailed`'>ScreenDetailed</code> or an attribute thereof changes.
  screenDetails.addEventListener('currentscreenchange', onCurrentScreenChange);
  // Find the primary screen, show some content fullscreen there.
  const primaryScreen = screenDetails.screens.find(s => s.isPrimary);
  document.documentElement.requestFullscreen({screen : primaryScreen});
  // Find a different screen, fill its available area with a new window.
  const otherScreen = screenDetails.screens.find(s => s !== primaryScreen);
  window.open(url, '_blank', `left=${otherScreen.availLeft},` +
                             `top=${otherScreen.availTop},` +
                             `width=${otherScreen.availWidth},` +
                             `height=${otherScreen.availHeight}`);
} else {
  // Detect when an attribute of the legacy <code data-opaque bs-autolink-syntax='`Screen`'>Screen</code> interface changes.
  window.screen.addEventListener('change', onScreenChange);
  // Arrange content within the traditional single-screen environment...
}
```

Working Draft，见：[MSWP](https://www.w3.org/TR/window-placement/)
