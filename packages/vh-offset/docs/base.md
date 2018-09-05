---
name: VhOffset
category: VhOffset
---

Using 100vh to create intro visuals is a rather common use case. Unfortunately it does not work as expected on mobile devices (iOS Safari & Android Chrome), because it does not remove the height of the address bar.

This feature calculates the height of the address bar and provides it as a CSS Custom Property - the offset.

Install the feature and create an instance.
`features.add('vh-offset', VhOffset);` is the right setup for most use cases.

> in case you want the vh to update on scrolling you must set `watchResize` to true. It's also possible to use multiple instances on one site.

Initialize the feature on `body` tag: `data-feature="vh-offset"`.

Remember to set an initial value for the Custom Property in your CSS:

```
:root {
  --vh-offset: 0px;
}
```

Then you can use the offset as part of any calculation:

```
.vh100-element {
  /* This is required for IE11 */
  height: 100vh;
  /* Subtract the offset of the address bar from the initial containing block (ICB) */
  height: calc(100vh - var(--vh-offset));
}
```

> Custom Properties do not work in IE11 - but fortunately there are no mobile devices using IE11, hence the issue does not exist in environments using IE11.

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-vh-offset', path: 'packages/vh-offset/lib/main.min.js' }, 'base', 'base.features'], function(VhOffset, base, features) {
    features.add('vh-offset', VhOffset.default);

    features.add('vh-offset-dynamic', VhOffset.default, {
      watchResize: true,
      propertyName: 'vh-offset-dynamic'
    });
    features.init(document.body);
  });
});
```
```types.html
<div class="container" data-feature="vh-offset, vh-offset-dynamic">
  <div class="element natural-vh">
    <p>really important</p>
  </div>
  <div class="element fix-vh">
    <p>really important</p>
  </div>
  <div class="element dynamic-vh">
    <p>really important</p>
  </div>
</div>
```
```types.css
:root {
  --vh-offset: 0px;
  --vh-offset-dynamic: 0px;
}
body {
  padding: 0;
  margin: 0;
}

.container {
  width: 100%;
  display: flex;
  height: 3000px;
}

.element {
  position: relative;
  flex-grow: 1;
}

.element p {
    position: absolute;
    bottom: 0;
    padding: 0;
    margin: 0;
}

.natural-vh {
  height: 100vh;
  background-color: green;
}

.fix-vh {
  height: 100vh;
  height: calc(100vh - var(--vh-offset));
  background-color: red;
}

.dynamic-vh {
  height: 100vh;
  height: calc(100vh - var(--vh-offset-dynamic));
  background-color: yellow;
}
```

Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css
```
