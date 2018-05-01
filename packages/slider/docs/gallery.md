---
name: Slider Gallery
category: Slider
---

Different variations of image sliders.

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-slider', path: 'slider/lib/main.min.js' }, { name: 'feature-object-fit', path: 'object-fit/lib/main.min.js' }, 'base', 'base.features'], function(Slider, ObjectFit, base, features) {
    features.add('fit', ObjectFit.default);

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

    features.init(document.body);
  });
});
```

```types.html

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
```
