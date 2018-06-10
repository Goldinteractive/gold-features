---
name: PageTransitionEndpoint
category: PageTransition
---

This example *does not* use page transitions.

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-page-transition', path: 'packages/page-transition/lib/main.min.js' }, 'base', 'base.features'], function(PageTransition, base, features) {
    features.add('page-transition', PageTransition.default);
    features.init(document.body);
  });
});
```
```types.html
<div data-feature="page-transition" id="page-transition-wrapper" class="ft-page-transition">
  <div class="page-transition-container">
    <a href="page-transition-types.html">
      Full Page reload back to entry
    </a>
  </div>
</div>
```
Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css hidden
```