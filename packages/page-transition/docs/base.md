---
name: PageTransition
category: PageTransition
---

This example uses page transition.

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-page-transition', path: 'page-transition/lib/main.min.js' }, 'base', 'base.features'], function(PageTransition, base, features) {
    features.add('page-transition', PageTransition.default);
    features.init(document.body);
  });
});
```
```types.html
<p>Not replaced content</p>
<div data-feature="page-transition" id="page-transition-wrapper">
  <div class="page-transition-container">
    Test
    <a href="page-transition-endpoint-types.html" class="smooth-transition">
      Test
    </a>
  </div>
</div>
```