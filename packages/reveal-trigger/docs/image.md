---
name: Lazy Image
category: RevealTrigger
---

```types.js
require(['featurify'], function(featurify) {
  featurify([
    { name: 'feature-reveal-trigger', path: 'packages/reveal-trigger/lib/main.min.js' },
    { name: 'feature-object-fit', path: 'packages/object-fit/lib/main.min.js' },
    'base', 'base.features'], function(RevealTrigger, ObjectFit, base, features) {

    features.add('fit', ObjectFit.default);

    features.add('reveal-trigger', RevealTrigger.default, {
      strategy: new RevealTrigger.strategies.LazyImageStrategy(),
      manager: new RevealTrigger.IntersectionManager()
    });
    features.init(document.body);
  });
});
```
```types.html
<h1>Using standard src</h1>
<div class="section -filled">
  <img src="packages/reveal-trigger/docs/files/metropolitano_thumb.jpg"
  class="ft-reveal-trigger-image -preview -blur"
  data-src="packages/reveal-trigger/docs/files/metropolitano.jpg"
  data-feature="reveal-trigger"
  />
</div>
<div class="section -filled">
<h1>Using Sizes & Srcset</h1>
<p>Quick notice: this obviously won't work in IE</p>
  <img
  class="ft-reveal-trigger-image -preview -blur"
  src="packages/reveal-trigger/docs/files/plaza_thumb.jpg"
  data-srcset="packages/reveal-trigger/docs/files/plaza.jpg?srcset320 320w,
             packages/reveal-trigger/docs/files/plaza.jpg?srcset480 480w,
             packages/reveal-trigger/docs/files/plaza.jpg?srcset800 800w"
  data-sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
  data-feature="reveal-trigger"
  />
</div>
<div class="section -filled">
  <h1>Using Sizes & Srcset & Src & <b>Object Fit</b></h1>
  <p>If you use object fit make sure to set a default src</p>

  <div class="container">
    <div class="ft-fit-bg">
      <img class="ft-reveal-trigger-image -preview -blur" src="packages/reveal-trigger/docs/files/plaza_thumb.jpg?fit" data-src="packages/reveal-trigger/docs/files/plaza.jpg?fit" data-feature="fit, reveal-trigger">
    </div>
  </div>
</div>
<div class="section -filled">
<h1>Using Sizes & Srcset & Src</h1>
<p>In Browsers which support srcset, it will render the Metropolitano Stadium - in others it will fall back to the Plaza</p>
  <img
  class="ft-reveal-trigger-image -preview -blur"
  src="packages/reveal-trigger/docs/files/plaza_thumb.jpg"
  data-src="packages/reveal-trigger/docs/files/plaza.jpg"
  data-srcset="packages/reveal-trigger/docs/files/metropolitano.jpg 320w,
             packages/reveal-trigger/docs/files/metropolitano.jpg 480w,
             packages/reveal-trigger/docs/files/metropolitano.jpg 800w"
  data-sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
  data-feature="reveal-trigger"
  />
</div>
```
```types.css
.section {
  height: 1000px;
  width: 100%;
  position: relative;
}

.section img {
  width: 100%;
}

.-filled {
  background-color: beige;
}

.container {
  position: relative;
  width: 50%;
  height: 800px;
}
```

Inspect Sources:
```src:../src/strategies/lazy-image.js
```
```types:../lib/style.css
```
