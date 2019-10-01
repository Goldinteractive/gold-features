# LazyFilterGrid

Creating a lazy filterable masonry grid by example.

This example uses a fake pagination to demonstrate the ability to load items lazily.

### Setup

1. `dom-state-handler` notifies a root `element-loader` about changing params.
2. root `element-loader` loads initial base markup - including Masonry setup & load more button.
3. load more button in itself is a `element-loader` which replaces itself with the next page of data.
