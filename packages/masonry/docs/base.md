---
name: Masonry
category: Masonry
---

Enables the creation of auto sizing grid layouts.

There is a `.grid-sizer` element which has no content. It's purpose is to set the normal column width. In a grid system this would correspond to `gr-1`.

Make sure that all elements have the final sizes upon rendering. Image sizes should be set on the image tag to ensure proper dimensions.

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-masonry', path: 'masonry/lib/main.min.js' }, 'base', 'base.features'], function(Masonry, base, features) {
    features.add('masonry', Masonry.default);
    features.init(document.body);
  });
});
```
```types.html
<div class="grid" data-feature="masonry">
  <div class="grid-sizer"></div>
  <div class="grid-item">1 - ...</div>
  <div class="grid-item grid-item--width2">2 - Wide</div>
  <div class="grid-item grid-item--height2">3 - Tall</div>
  <div class="grid-item">4 - ...</div>
  <div class="grid-item grid-item--height3">5 - Taller</div>
  <div class="grid-item">5 - ...</div>
  <div class="grid-item grid-item--height2">6 - Tall</div>
  <div class="grid-item grid-item--height3">5 - Taller</div>
  <div class="grid-item grid-item--height2">7 - Tall</div>
  <div class="grid-item">8 - ...</div>
  <div class="grid-item grid-item--width2">9 - Wide</div>
</div>
```
```types.css
.grid {position: relative; }
.grid-sizer { width: 33%; }
.grid-item { width: 33%; background-color: orange; height: 40px; box-shadow: inset 0 0 5px #000000; text-align: center;}
.grid-item:nth-child(even) { background-color: green; }
.grid-item--width2 { width: 66%; }
.grid-item--height2 { height: 80px; }
.grid-item--height3 { height: 160px; }
```
