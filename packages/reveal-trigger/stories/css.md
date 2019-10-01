# RevealTrigger - CSS Animation

This Strategy adds a class when an element enters the viewport for the first time. The default classname is `-in`.

You can use `data-delay` in order to set a custom timeout. Just set it on the same node as you register the feature instance.

```html
<div data-feature="reveal-trigger" data-delay="500">500ms delayed</div>
```

If you want to hide a container when it's not in the viewport you may implement your own strategy.
