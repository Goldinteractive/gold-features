---
name: CSS Animation
category: RevealTrigger
---

This Strategy adds a class when an element enters the viewport for the first time.

```types.js
require(['featurify'], function(featurify) {
  featurify([
    { name: 'feature-reveal-trigger', path: 'packages/reveal-trigger/lib/main.min.js' },
    'base', 'base.features'], function(RevealTrigger, base, features) {
    features.add('reveal-trigger', RevealTrigger.default, {
      strategy: new RevealTrigger.strategies.CSSAnimationStrategy(),
      manager: new RevealTrigger.IntersectionManager()
    });
    features.init(document.body);
  });
});
```
```types.html
<div class="section -red" data-feature="reveal-trigger">
  Rojo
</div>
<div class="section" data-feature="reveal-trigger">
  Blanco
</div>
<div class="section -red" data-feature="reveal-trigger">
  Rojo
  <div data-trigger>
    Only fade in, when this is visible
  </div>
</div>
```
```types.css
.section {
  height: 800px;
  width: 100%;
  opacity: 0;
  position: relative;

  transition: opacity .5s ease-in;
}

[data-trigger] {
  position: absolute;
  top: 300px;
}

.section.-in {
  opacity: 1;
}

.-red {
  background-color: red;
}
```

Inspect Sources:
```src:../src/strategies/css-animation.js
```
```types:../lib/style.css
```
