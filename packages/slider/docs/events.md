---
name: Events
category: Slider
---

The slider triggers and listens to various events. This can be useful for creating a custom Navigation. (for this to be useful, the slider must have the data-slider-identifier attribute and its slides the data-slide-label attribute. See the first quote example.)

#### Events firing
| Event    | Eventname                       | Provided values   |
|----------|---------------------------------|-------------------|
| selected | `${slider-identifier}:selected` | flickity instance |


#### Events listening
| Event    | Eventname                       | Options             |
|----------|---------------------------------|---------------------|
| select   | `${slider-identifier}:select`   | `{ label: string }` |
| next     | `${slider-identifier}:next`     | `{ isWrapped: boolean, isInstant: boolean }` |
| previous | `${slider-identifier}:previous` | `{ isWrapped: boolean, isInstant: boolean }` |

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
<div class="ft-slider -hidden -gallery" data-feature="event-slider" data-slider-identifier="event-slider" >
  <img class="slide" src="packages/slider/docs/files/test.jpeg" alt="test" data-slider-label="label-one">
  <img class="slide" src="packages/slider/docs/files/test2.jpeg" alt="test2" data-slider-label="label-two">
  <img class="slide" src="packages/slider/docs/files/test3.jpeg" alt="test3" data-slider-label="label-three">
  <img class="slide" src="packages/slider/docs/files/test4.jpeg" alt="test4" data-slider-label="label-four">
</div>
```
Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css hidden
```
