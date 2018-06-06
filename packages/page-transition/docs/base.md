---
name: PageTransition
category: PageTransition
---

This example uses page transition.

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-page-transition', path: 'packages/page-transition/lib/main.min.js' }, 'base', 'base.features'], function(PageTransition, base, features) {
    features.add('page-transition', PageTransition.default);
    features.init(document.body);
  });
});
```
```types.html
<p>Not replaced content</p>
<div data-feature="page-transition" id="page-transition-wrapper" class="ft-page-transition">
  <div class="page-transition-container">
    Test
    <a href="page-transition-endpoint-types.html" class="smooth-transition">
      Test
    </a>
  </div>
</div>
```
Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css
```