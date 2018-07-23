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
| select   | `${slider-identifier}:select`   | `{ slideIdentifier: string, isWrapped: boolean, isInstant: boolean }` |
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

    // Trigger various events to demonstrate the event handling

    setTimeout(() => {
      base.eventHub.trigger('event-slider:next', { isInstant: true })
    }, 2000)
    setTimeout(() => {
      base.eventHub.trigger('event-slider:select', { slideIdentifier: 'slide-four', isInstant: true })
    }, 4000)
    setTimeout(() => {
      base.eventHub.trigger('event-slider:previous')
    }, 6000)
    features.init(document.body);
  });
});
```

```types.html
<h2>Slider which handles events (see console)</h2>
<p>Various events are fired and therefore the slider changes slides three times automatically. (See the js code to see how to fire specific events)</p>
<div class="ft-slider -hidden -gallery" data-feature="event-slider" data-slider-identifier="event-slider" >
  <div class="slide" style="width: 100%;" data-slide-identifier="slide-one">#1 I am the first slide</div>
  <div class="slide" style="width: 100%;" data-slide-identifier="slide-two">#2 I am the next slide (selected after two seconds)</div>
  <div class="slide" style="width: 100%;" data-slide-identifier="slide-three">#3 I am the previous slide (selected after six seconds)</div>
  <div class="slide" style="width: 100%;" data-slide-identifier="slide-four">#4 I got specifically and instantly selected (selected after four seconds)</div>
</div>
```

```types.css
.slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css hidden
```
