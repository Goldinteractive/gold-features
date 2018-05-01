---
name: Content
category: Slider
---

Content and Image Slider using Flickity.
Slider can be orchestrated by swiping, clicking the default dots or creating a custom slider navigation.

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-slider', path: 'slider/lib/main.min.js' }, { name: 'feature-object-fit', path: 'object-fit/lib/main.min.js' }, 'base', 'base.features'], function(Slider, ObjectFit, base, features) {
    base.features.add('slider', Slider.default, {
      contain: true,
      prevNextButtons: false
    })

    features.init(document.body);
  });
});
```

```types.html
<h2>Content Slider</h2>

<div class="ft-slider -hidden" data-feature="slider" data-slider-indentifier="quotes-slider">
  <div class="slide" data-slide-label="waseemi">
    <p>Think twice, code once ― Waseem Latif</p>
  </div>
  <div class="slide" data-slide-label="martini">
    <p>'Truth can only be found in one place: the code. ― Robert C. Martin</p>
  </div>
  <div class="slide" data-slide-label="waseemi">
    <p>Programming isn't about what you know; it's about what you can figure out. ― Chris Pine</p>
  </div>
</div>
```
