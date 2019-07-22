---
name: DomStateHandler
category: DomStateHandler
---

Maps dom state to a serializable format.

This feature can be used for:
- Filters

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-dom-state-handler', path: 'packages/dom-state-handler/lib/main.min.js' }, 'base', 'base.features'], function(DomStateHandler, base, features) {
    base.eventHub.on('default-namespace:state-update', (query) => {
      console.log(query)
    })
    features.add('dom-state-handler', DomStateHandler.default, {
      domState: new DomStateHandler.DomState({namespace: 'default-namespace'})
    });
    features.init(document.body);
  });
});
```
```types.html
<div>
  <select name="option-name" data-feature="dom-state-handler">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>
  <select name="option-other" data-feature="dom-state-handler">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>
  <div data-feature="dom-state-handler" data-state-handler-type="checkbox-group">
    <div>
      <input type="checkbox" id="option3-1" name="option3" value="option3-1" checked />
      <label for="option3-1">Option 1</label>
    </div>

    <div>
      <input type="checkbox" id="option3-2" name="option3" value="option3-2" />
      <label for="option3-2">Option 2</label>
    </div>
  <div>
  
  <div data-feature="dom-state-handler" data-state-handler-type="radio-group">
    <input type="radio" name="option4" value="orange"/>
    <input type="radio" name="option4" value="violet" selected="true"/>
    <input type="radio" name="option4" value="yellow"/>
  </div>
</div>
```

Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css
```
