---
name: Events
category: Slider
---

The slider triggers a select event to the Eventhub providing the Flickity instance. The event is fired everytime the slide changed.
This can be useful for creating a custom Navigation. (for this to be useful, the slider must have the data-slider-identifier attribute and its slides the data-slide-label attribute. See the first quote example.)

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-slider', path: 'packages/slider/lib/main.min.js' }, { name: 'feature-object-fit', path: 'packages/object-fit/lib/main.min.js' }, 'base', 'base.features'], function(Slider, ObjectFit, base, features) {
    features.add('fit', ObjectFit.default);

    base.features.add('event-slider', Slider.default, {
      contain: true,
      listeners: [
        {
          event: 'select',
          handler: (flickity) => {
            console.log('selected', flickity)
          }
        },
        {
          event: 'settle',
          handler: (flickity) => {
            console.log('settled', flickity)
          }
        }
      ]
    })

    features.init(document.body);
  });
});
```

```types.html
<h2>Slider which handles events (see console)</h2>
<div class="ft-slider -hidden -gallery" data-feature="event-slider">
  <img class="slide" src="packages/slider/docs/files/test.jpeg" alt="test">
  <img class="slide" src="packages/slider/docs/files/test2.jpeg" alt="test2">
  <img class="slide" src="packages/slider/docs/files/test3.jpeg" alt="test3">
  <img class="slide" src="packages/slider/docs/files/test4.jpeg" alt="test4">
</div>
```
Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css hidden
```