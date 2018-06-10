---
name: Map
category: Map
---

>Make sure to load Google Maps globally.

>Known issues:
Dragging a map in an iframe is not working properly.

>TODO:
check whether there is a way to load GMaps API as part of feature-map

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-map', path: 'packages/map/lib/main.min.js' }, 'base', 'base.features'], function(Map, base, features) {
    features.add('map', Map.default, {
      assetLocation: 'packages/map/assets/features/map',
      markers: [
        {}
      ]
    });
    features.init(document.body);
  });
});
```
```types.css
.wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 55%;
  background-color: #eee;
}
```
```types.html
<div class="wrapper">
  <div
    class="ft-map"
    data-feature="map"
    data-lat="47.387784"
    data-lng="8.493927"
    data-zoom="12">
  </div>
</div>

<script src="//maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyAtOJRO17DPX-JK2Vps9RYCY756RogmoAA"></script>
```

Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css hidden
```
