---
name: CSS Animation
category: RevealTrigger
---

This Strategy adds a class when an element enters the viewport for the first time. The default classname is `-in`.

You can use `data-delay` in order to set a custom timeout. Just set it on the same node as you register the feature instance.

```html
<div data-feature="reveal-trigger" data-delay="500">500ms delayed</div>
```

If you want to hide a container when it's not in the viewport you may implement your own strategy.

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
  <div class="item" data-feature="reveal-trigger" data-delay="500">500ms delayed</div>
  <div class="item" data-feature="reveal-trigger" data-delay="1000">1000ms delayed</div>
  <div class="item" data-feature="reveal-trigger" data-delay="1500">1500ms delayed</div>
  <div class="item" data-feature="reveal-trigger" data-delay="5000">5000ms delayed</div>
  <div class="item" data-feature="reveal-trigger" data-delay="cinco">NaN delayed (should log an error)</div>
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

.item {
  display: inline-block;
  width: 150px;
  height: 150px;
  background-color: white;

  transition: opacity .5s ease-in;
  opacity: 0;
}

.item.-in {
  opacity: 1;
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
