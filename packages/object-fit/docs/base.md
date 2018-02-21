---
name: ObjectFit
category: ObjectFit
---

ObjectFit

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-object-fit', path: 'object-fit/lib/main.min.js' }, 'base', 'base.features'], function(ObjectFit, base, features) {
    features.add('fit', ObjectFit.default);
    features.init(document.body);
  });
});
```
```types.html
<div class="wrapper">

  <div class="ft-fit-bg -initial-hide">
    <img src="object-fit/docs/files/sample.jpeg" data-feature="fit">
  </div>

  <span class="info">Cover</span>
</div>

<div class="wrapper">

  <div class="ft-fit-bg -initial-hide">
    <img src="object-fit/docs/files/sample.jpeg" data-feature="fit" data-object-position="right bottom">
  </div>

  <span class="info">Cover (right/bottom)</span>
</div>

<div class="wrapper">

  <div class="ft-fit-bg -initial-hide -contain">
    <img src="object-fit/docs/files/sample.jpeg" data-feature="fit">
  </div>

  <span class="info">Contain</span>
</div>

<div class="wrapper">

  <div class="ft-fit-bg -initial-hide -fill">
    <img src="object-fit/docs/files/sample.jpeg" data-feature="fit">
  </div>

  <span class="info">Fill</span>
</div>

<div class="wrapper">

  <div class="ft-fit-bg -initial-hide -video">
    <video autoplay muted playsinline loop data-feature="fit">
      <source src="object-fit/docs/files/big_buck_bunny.mp4" type="video/mp4">
    </video>
  </div>

  <span class="info">Video Cover</span>
</div>

<div class="wrapper">

  <div class="ft-fit-bg -initial-hide -video">
    <video autoplay muted playsinline loop data-feature="fit" data-object-position="right bottom">
      <source src="object-fit/docs/files/big_buck_bunny.mp4" type="video/mp4">
    </video>
  </div>

  <span class="info">Video Cover (right/bottom)</span>
</div>

<div class="wrapper">

  <div class="ft-fit-bg -initial-hide -video -contain">
    <video autoplay muted playsinline loop data-feature="fit">
      <source src="object-fit/docs/files/big_buck_bunny.mp4" type="video/mp4">
    </video>
  </div>

  <span class="info">Video Contain</span>
</div>
```
```types.css
.wrapper {
  position: relative;
  float: left;
  margin-right: 30px;
  margin-bottom: 30px;
  width: 460px;
  height: 200px;
  background-color: #eee;
}
.wrapper > .info {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  padding: 15px 20px;
  background-color: rgba(0,0,0,0.45);
  color: #fff;
  transform: translate(-50%,-50%);
  will-change: opacity;
  backface-visibility: hidden;
}
```