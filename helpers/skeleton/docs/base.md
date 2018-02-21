---
name: ${FEATURE_NAME_CAMEL}
category: ${FEATURE_NAME_CAMEL}
---

${FEATURE_NAME_CAMEL}

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-${FEATURE_NAME}', path: '${FEATURE_NAME}/lib/main.min.js' }, 'base', 'base.features'], function(${FEATURE_NAME_CAMEL}, base, features) {
    features.add('${FEATURE_NAME}', ${FEATURE_NAME_CAMEL}.default);
    features.init(document.body);
  });
});
```
```types.html

```