# Masonry

Enables the creation of auto sizing grid layouts.

There is a `.grid-sizer` element which has no content. It's purpose is to set the normal column width. In a grid system this would correspond to `gr-1`.

Make sure that all elements have the final sizes upon rendering. Image sizes should be set on the image tag to ensure proper dimensions.

This feature **does not** include a grid system - so you must use your own.

You can add a masonry-identifier as a data-attribute to trigger events via the eventhub using `'${masonryIdentifier}:${method}'`

Currently only the `appended` method is supported: `'${masonryIdentifier}:appended'`

> Please note: Gaps can occure when items are lazily added, due to masonry failing to layout everything perfectly. Consider this when designing the different item sizes. You can see those gaps when adding items multiple times in the example below.

> In case you want to add filters or pagination you should check out the example `LazyFilterGrid` for `dom-state-handler`.
