# RevealTrigger - Lazy image

Using this strategy images will only be loaded once they enter the viewport. This reduces the bloat of the initial page load and improves the perceived performance of the site.

In order to use the feature set `data` attributes for `src`, `srcset` and `sizes`.
Once the image is within the viewport it will start loading the images defined with the `data-attributes`. Once the images have been loaded it will then replace the current `attributes` with the `data-attributes` and therefore replace the image.

So the image defined in `src` will be loaded on initial page load. If you include a default image you should set the `-preview` class in order to enable animations

> It is not required to set a default src.

In order to prevent scroll flickering you must guarantee, that the `img` tag won't change the dimensions after the real image has been loaded. This can be done by setting a fix-ratio, using `inline styles` (`style="width: ???px"`) or the `width` attribute (`width="???"`).

#### Animation Strategies

| Class | Effect                                                                                         |
| ----- | ---------------------------------------------------------------------------------------------- |
| -blur | the default image will be blurred, then the image is being replaced and the blur is fading out |
