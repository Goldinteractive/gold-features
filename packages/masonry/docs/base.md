---
name: Masonry
category: Masonry
---

Enables the creation of auto sizing grid layouts.

There is a `.grid-sizer` element which has no content. It's purpose is to set the normal column width. In a grid system this would correspond to `gr-1`.

Make sure that all elements have the final sizes upon rendering. Image sizes should be set on the image tag to ensure proper dimensions.

This feature **does not** include a grid system - so you must use your own.

You can add a masonry-identifier as a data-attribute to trigger events via the eventhub using `'${masonryIdentifier}:${method}'`

Currently only the `appended` method is supported: `'${masonryIdentifier}:appended'`
> Please note: Gaps can occure when items are lazily added, due to masonry failing to layout everything perfectly. Consider this when designing the different item sizes. You can see those gaps when adding items multiple times in the example below.

> In case you want to add filters you should check out either [Isotope](https://isotope.metafizzy.co/) or use a combination of `element-loader`, `dom-state-handler` and `masonry`.

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-masonry', path: 'packages/masonry/lib/main.min.js' }, 'base', 'base.features'], function(Masonry, base, features) {
    features.add('masonry', Masonry.default);
    features.init(document.body);

    document.getElementById('append').addEventListener('click', function() {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      div1.className = "grid-item"
      div2.className = "grid-item grid-item--height3"
      div3.className = "grid-item grid-item--width2 grid-item--height3"

      const masonryContainer = document.querySelector('[data-feature="masonry"]')

      masonryContainer.appendChild(div1);
      masonryContainer.appendChild(div2);
      masonryContainer.appendChild(div3);

      base.eventHub.trigger('sample-id:appended', [div1, div2, div3]);
    })
  });
});
```
```types.html
<div class="ft-masonry -hidden grid" data-feature="masonry" data-masonry-identifier="sample-id">
  <div class="grid-sizer"></div>
  <div class="grid-item">1 - ...</div>
  <div class="grid-item grid-item--width2">2 - Wide</div>
  <div class="grid-item grid-item--height2">3 - Tall</div>
  <div class="grid-item" id="resizer">4 - ...</div>
  <div class="grid-item grid-item--height3">5 - Taller</div>
  <div class="grid-item">5 - ...</div>
  <div class="grid-item grid-item--height2">6 - Tall</div>
  <div class="grid-item grid-item--height3">5 - Taller</div>
  <div class="grid-item grid-item--height3">7 - Tall</div>
  <div class="grid-item">8 - ...</div>
  <div class="grid-item grid-item--width2">9 - ...</div>
</div>
<button id="append">Append items</button>
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
Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css hidden
```
