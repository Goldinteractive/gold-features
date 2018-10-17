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
<p class="disclaimer-text">This website uses cookies, with the aim of ensuring that you have the best possible online experience. In using our website, you are giving your consent to the terms and conditions of our Data Protection Declaration / Privacy Statement.<a href="#">Privacy policy</a></p>
<button data-disclaimer-confirm>Got it</button>
</div>
```
Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css hidden
```