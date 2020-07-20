# ElementLoader

ElementLoader enables loading html content into the DOM. They can either be loaded instantly or deferred by calling an event (e.g. for handling modal content).

This feature can be used for:

- loading non-cacheable fragments (such as Login or query parameter based input)
- lazy loading content (such as modal or pagination)

As of version 1.0.1 there exists a possibility to hook inside the fetch calls.
The following callbacks are supported: `onLoadElement`, `onLoadedElement`, `onFetchError`.
This may be used to remove the child nodes while loading or add a custom loading class.
