---
name: LazyFilterGrid
category: DomStateHandler
---

Creating a lazy filterable masonry grid by example.

This example uses a fake pagination to demonstrate the ability to load items lazily.

### Setup

1. `dom-state-handler` notifies a root `element-loader` about changing params.
2. root `element-loader` loads initial base markup - including Masonry setup & load more button.
3. load more button in itself is a `element-loader` which replaces itself with the next page of data.

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-dom-state-handler', path: 'packages/dom-state-handler/lib/main.min.js' }, { name: 'feature-element-loader', path: 'packages/element-loader/lib/main.min.js' }, { name: 'feature-masonry', path: 'packages/masonry/lib/main.min.js' }, 'base', 'base.features'], function(DomStateHandler, ElementLoader, Masonry, base, features) {
    function addFilterableLazyGridFeature({ namespace, baseActionUrl }) {
      features.add(`${namespace}-filter-handler`, DomStateHandler.default, {
        domState: new DomStateHandler.DomState({ namespace: `${namespace}-filter-state` })
      })
      features.add(`${namespace}-initial-loader`, ElementLoader.default, {
        loadTriggerEventMultiple: true
      })
      features.add(`${namespace}-load-more`, ElementLoader.default, {
        replaceRootElement: true
      })
      const initLoadMoreButton = () => {
        const loadMore = () => {
          base.eventHub.trigger(`${namespace}:load-more`)
          $loadMoreBtn.removeEventListener('click', loadMore)
        }
        const $loadMoreBtn = document.getElementById('load-more')
        if ($loadMoreBtn) {
          $loadMoreBtn.addEventListener('click', loadMore)
        }
      }
      base.eventHub.on(`${namespace}-load-initial:appended`, initLoadMoreButton)
      base.eventHub.on(`${namespace}:appended`, initLoadMoreButton)

      base.eventHub.on(`${namespace}-filter-state:state-update`, query => {
        base.eventHub.trigger(`${namespace}:load-items`, {
          url: `${baseActionUrl}?initialRender=true&${query}`
        })
      })
    }

    addFilterableLazyGridFeature({ namespace: 'lazy-grid', baseActionUrl: 'packages/dom-state-handler/docs/files/grid.html' })
    features.add('masonry', Masonry.default)
    features.init(document.body);
  });
});
```
```types.html
<div>
  <div data-feature="lazy-grid-filter-handler" data-state-handler-type="checkbox-group">
    <div>
      <input type="checkbox" id="option1" name="category" value="option1" />
      <label for="option1">Option 1</label>
    </div>
    <div>
      <input type="checkbox" id="option2" name="category" value="option2" />
      <label for="option2">Option 2</label>
    </div>
    <div>
      <input type="checkbox" id="option3" name="category" value="option3" />
      <label for="option3">Option 3</label>
    </div>
</div>

<div
    data-feature="lazy-grid-initial-loader"
    data-element-loader-identifier="lazy-grid-load-initial"
    data-element-loader-url="packages/dom-state-handler/docs/files/grid.html"
    data-element-loader-event="lazy-grid:load-items"
>
</div>
</div>
```
```types.css
.grid {position: relative; }
.grid-sizer { width: 33%; }
.grid-item { width: 33%; background-color: orange; height: 40px; box-shadow: inset 0 0 5px #000000; text-align: center;}
.grid-item:nth-child(even) { background-color: green; }
.grid-item--width2 { width: 66%; }
.grid-item--width3 { width: 100%; }
.grid-item--height2 { height: 80px; }
.grid-item--height3 { height: 160px; }
```

Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css
```
