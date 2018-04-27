---
name: Slider
category: Slider
---

# Slider
Content and Image Slider using Flickity.
Slider can be orchestrated by swiping, clicking the default dots or creating a custom slider navigation.


The slider triggers a select event to the Eventhub providing the Flickity instance. The event is fired everytime the slide changed.
This can be useful for creating a custom Navigation. (for this to be useful, the slider must have the data-slider-identifier attribute and its slides the data-slide-label attribute. See the first quote example.)



```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-slider', path: 'slider/lib/main.min.js' }, { name: 'feature-object-fit', path: 'object-fit/lib/main.min.js' }, 'base', 'base.features'], function(Slider, ObjectFit, base, features) {
    features.add('fit', ObjectFit.default);

    base.features.add('slider', Slider.default, {
      contain: true,
      prevNextButtons: false
    })

    base.features.add('gallery-slider', Slider.default, {
      imagesLoaded: true,
      percentPosition: false,
      contain: true,
      cellAlign: 'left',
      pageDots: false,
      freeScroll: true
    })

    base.features.add('fw-gallery-slider', Slider.default, {
      imagesLoaded: true,
      contain: true
    })

    base.features.add('cover-slider', Slider.default, {
      contain: true,
      cellAlign: 'left',
      pageDots: false,
      freeScroll: true
    })

    base.features.add('fw-cover-slider', Slider.default, {
      contain: true
    })

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

<h2>Gallery Slider (Slide width from images and fixed height)</h2>

<div class="ft-slider -hidden -gallery" data-feature="gallery-slider">
  <img class="slide" src="slider/docs/files/test.jpeg" alt="test">
  <img class="slide" src="slider/docs/files/test2.jpeg" alt="test2">
  <img class="slide" src="slider/docs/files/test3.jpeg" alt="test3">
  <img class="slide" src="slider/docs/files/test4.jpeg" alt="test4">
</div>

<h2>Fullwidth Gallery Slider (Slider height from tallest image)</h2>

<div class="ft-slider -hidden -gallery -fullwidth" data-feature="fw-gallery-slider">
  <img class="slide" src="slider/docs/files/test.jpeg" alt="test">
  <img class="slide" src="slider/docs/files/test2.jpeg" alt="test2">
  <img class="slide" src="slider/docs/files/test3.jpeg" alt="test3">
  <img class="slide" src="slider/docs/files/test4.jpeg" alt="test4">
</div>

<h2>Cover Slider (Slide widths in percentage and fixed height) - <a href="https://github.com/Goldinteractive/feature-object-fit">object-fit</a> feature used to cover area with image)</h2>

<div class="ft-slider -hidden -gallery -cover" data-feature="cover-slider">
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="slider/docs/files/test.jpeg" data-feature="fit" alt="test">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="slider/docs/files/test2.jpeg" data-feature="fit" alt="test2">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="slider/docs/files/test3.jpeg" data-feature="fit" alt="test3">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="slider/docs/files/test4.jpeg" data-feature="fit" alt="test4">
    </div>
  </div>
</div>

<h2>Cover Fullwidth Slider (Slide widths in percentage and fixed height) - <a href="https://github.com/Goldinteractive/feature-object-fit">object-fit</a> feature used to cover area with image)</h2>

<div class="ft-slider -hidden -cover -fullwidth" data-feature="fw-cover-slider">
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="slider/docs/files/test.jpeg" data-feature="fit" alt="test">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="slider/docs/files/test2.jpeg" data-feature="fit" alt="test2">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="slider/docs/files/test3.jpeg" data-feature="fit" alt="test3">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="slider/docs/files/test4.jpeg" data-feature="fit" alt="test4">
    </div>
  </div>
</div>

<h2>Cover Fullwidth Slider (Slide widths in percentage and ratio height)- <a href="https://github.com/Goldinteractive/feature-object-fit">object-fit</a> feature used to cover area with image)</h2>

<div class="ft-slider -hidden -cover -ratio -fullwidth" data-feature="fw-cover-slider">
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="slider/docs/files/test.jpeg" data-feature="fit" alt="test">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="slider/docs/files/test2.jpeg" data-feature="fit" alt="test2">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="slider/docs/files/test3.jpeg" data-feature="fit" alt="test3">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="slider/docs/files/test4.jpeg" data-feature="fit" alt="test4">
    </div>
  </div>
</div>

<h2>Slider which handles events (see console)</h2>
<div class="ft-slider -hidden -gallery" data-feature="event-slider">
  <img class="slide" src="slider/docs/files/test.jpeg" alt="test">
  <img class="slide" src="slider/docs/files/test2.jpeg" alt="test2">
  <img class="slide" src="slider/docs/files/test3.jpeg" alt="test3">
  <img class="slide" src="slider/docs/files/test4.jpeg" alt="test4">
</div>
```