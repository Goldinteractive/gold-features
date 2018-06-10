---
name: Icons
category: Icons
---

Icons

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-icons', path: 'packages/icons/lib/main.min.js' }, 'base', 'base.features'], function(Icons, base, features) {

    var icons = new Icons.IconManager({
      svgJsonFile: 'packages/icons/docs/icons.json',
      svgSpriteFile: 'packages/icons/docs/icons.svg'
    })

    icons.injectSprite(() => {
      icons.loadData(() => {
        features.add('icon', Icons.default, { manager: icons })
        features.init(document.body, 'icon');
      })
    })
  });
});
```
```types.html
<h2>Proportionally sized icon with height taken from <pre>$icons-height</pre> variable</h2>
<p>
  Lorem ipsum dolor <span data-feature="icon" data-icon="sackmesser"></span> sit amet, consetetur sadipscing elitr,
  sed diam nonumy eirmod tempor <span data-feature="icon" data-icon="company"></span> invidunt ut labore et dolore magna aliquyam erat,
  sed diam voluptua. <span data-feature="icon" data-icon="user"></span> At vero eos et accusam et justo duo dolores et ea rebum.
</p>

<h2>Equal sized icon with sizes taken from <pre>$icons-width</pre> and <pre>$icons-height</pre> variables</h2>
<ul>
  <li><span data-feature="icon" data-icon="sackmesser" data-equal></span> Lorem ipsum dolor</li>
  <li><span data-feature="icon" data-icon="company" data-equal></span> Lorem ipsum dolor</li>
  <li><span data-feature="icon" data-icon="user" data-equal></span> Lorem ipsum dolor</li>
</ul>

<h2>Original icon with sizes taken from the original svg</h2>
<p><span data-feature="icon" data-icon="sackmesser" data-original></span></p>

<h2>Responsive icon</h2>
<span data-feature="icon" data-icon="sackmesser" data-responsive></span>
```

Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css hidden
```
