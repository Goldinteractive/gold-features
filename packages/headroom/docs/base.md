---
name: Headroom
category: Headroom
---

Headroom enables you to set classes on certain elements based on the scroll position. Note that due to the auto-sizing iframe behavior it's only working in the external view.

In order to set classes on other dom elements use the `customClasses` property. An example usage is demonstrated in this demo.

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-headroom', path: 'headroom/lib/main.min.js' }, 'base', 'base.features'], function(Headroom, base, features) {
    features.add('headroom', Headroom.default, {
      customClasses: [
        {
          element: base.utils.dom.$('body'),
          pinClass: 'header-in'
        }
      ]
    });
    features.init(document.body);
  });
});
```
```types.css
.top {
  display: none;
}
.header.-top .top {
  display: block;
}
.header-in:before {
  content: 'header visible';
  position: fixed;
  right: 0;
}
```
```types.html
<header class="header" role="banner" data-feature="headroom">
    Gold Site
    <p class="top">top</p>
</header>
<div style="height: 2000px;">

</div>
```