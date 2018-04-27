---
name: CookieDisclaimer - Banner
category: CookieDisclaimer
---

CookieDisclaimer - Banner

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-cookie-disclaimer', path: 'cookie-disclaimer/lib/main.min.js' }, 'base', 'base.features'], function(CookieDisclaimer, base, features) {
    features.add('cookie-disclaimer', CookieDisclaimer.default);
    features.init(document.body);
  });
});
```
```types.html
<div class="ft-cookie-disclaimer -banner-bottom -visibility-default" data-feature="cookie-disclaimer">
<p class="disclaimer-text">Disclaimer example message <a href="#">Privacy policy</a></p>
<a href="#" data-disclaimer-confirm>Got it</a>
</div>
```