---
name: Demo
category: Demo
---

This Feature is only used for testing the `gold-features` workflow.

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-demo', path: 'packages/demo/lib/main.min.js' }, 'base', 'base.features'], function(Demo, base, features) {
    features.add('demo', Demo.default);
    features.init(document.body);
  });
});
```
```types.html

```

Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css
```
