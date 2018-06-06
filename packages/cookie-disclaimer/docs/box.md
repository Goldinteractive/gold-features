---
name: CookieDisclaimer - Box
category: CookieDisclaimer
---

CookieDisclaimer - Box

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-cookie-disclaimer', path: 'packages/cookie-disclaimer/lib/main.min.js' }, 'base', 'base.features'], function(CookieDisclaimer, base, features) {
    features.add('cookie-disclaimer', CookieDisclaimer.default);
    features.init(document.body);
  });
});
```
```types.html
<div class="ft-cookie-disclaimer -box-bottom-right -visibility-default -base-theme" data-feature="cookie-disclaimer">
<p class="disclaimer-text">Disclaimer example message <a href="#">Privacy policy</a></p>
<button data-disclaimer-confirm>Got it</button>
</div>
```
Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css
```