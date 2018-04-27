---
name: PageTransitionEndpoint
category: PageTransition
---

This example *does* not use page transitions.

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-page-transition', path: 'page-transition/lib/main.min.js' }, 'base', 'base.features'], function(PageTransition, base, features) {
    features.add('page-transition', PageTransition.default);
    features.init(document.body);
  });
});
```
```types.html
<div data-feature="page-transition" id="page-transition-wrapper">
  <div class="page-transition-container">
    <a href="page-transition-types.html">
      Full Page reload back to entry
    </a>
  </div>
</div>
```
