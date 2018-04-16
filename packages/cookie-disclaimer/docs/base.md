---
name: CookieDisclaimer
category: CookieDisclaimer
---

CookieDisclaimer

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
Disclaimer example message
<a href="#" data-disclaimer-confirm>Got it</a>
</div>
```