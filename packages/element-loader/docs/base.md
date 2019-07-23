---
name: ElementLoader
category: ElementLoader
---

ElementLoader enables loading html content into the DOM. They can either be loaded instantly or deferred by calling an event (e.g. for handling modal content).

This feature can be used for:
- loading non-cacheable fragments (such as Login or query parameter based input)
- lazy loading content (such as modal or pagination)

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-element-loader', path: 'packages/element-loader/lib/main.min.js' }, 'base', 'base.features'], function(ElementLoader, base, features) {
    features.add('element-loader', ElementLoader.default, {
      replaceRootElement: true
    });
    features.add('element-loader-inline', ElementLoader.default, {
      contentExitAnimation: function(args) {
        console.log('animating exit for', args.node)
        return new Promise(function (resolve) {
          setTimeout(function() {
            resolve()
          }, 2000)
        })
      },
      loadTriggerEventMultiple: true
    });
    features.init(document.body);
    
    document.getElementById('load-element').addEventListener('click', function() {
      base.eventHub.trigger('sample-id:open');
      base.eventHub.trigger('sample-id:open-custom-url', {
        url: 'packages/element-loader/docs/files/inline-loaded-deferred.html'
      });
    })
  });
});
```
```types.html
<ul>
  <li>Static</li>
  <li data-feature="element-loader" data-element-loader-url="packages/element-loader/docs/files/lazily-loaded.html">
    <span data-cy="loader">Loading...</span>
  </li>
  <li data-feature="element-loader-inline" data-element-loader-url="packages/element-loader/docs/files/inline-loaded.html"></li>
  <li>Static</li>
  <li data-feature="element-loader-inline" data-element-loader-url="packages/element-loader/docs/files/inline-loaded-deferred.html" data-element-loader-event="sample-id:open">loaded when button gets clicked</li>
  <li data-feature="element-loader-inline" data-element-loader-event="sample-id:open-custom-url">loaded when button gets clicked using custom url</li>
</ul>
<button id="load-element" data-cy="load-element">Load element</button>
```

Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css
```
