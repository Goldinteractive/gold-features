# RevealTrigger - Lazy video

Using this strategy videos will only be loaded once they enter the viewport. This reduces the bloat of the initial page load and improves the perceived performance of the site. Once the video is completely out of the viewport, the video pauses at the current position. This strategy is valuable when you have multiple autoplay loop videos on your page.

### Setup

- Use the feature on your `<video>` tag and set a `data-src` attribute on the `<source>` tag. Leave the `src` attribute empty. Once the video enters the viewport, the `src` attribute is set with the source defined in the `data-src`.
- You have to set the class `-lazy` on the `<video>` tag. This tells the feature once the video enters the viewport, that the video source is not set yet. It will remove the class after.
- Set a poster image for the video to prevent an empty space if a user has a bad network connection. (optional)

### Strategy

Set `notifyOnlyWhenIntersecting` to false because we want to pause the video when it's not in the viewport.

### IE11

Videos in our most loved browser Internet Explorer might not behave correctly. When scrolling the video might lag and skip some visuals while in the background the video plays normally.

### Flickering

#### Manual poster image

You can also use a manual `<img>` tag with a smaller `z-index` than the `<video>`. Then the image is loaded at first and when the video is loaded, it is displayed on top of the image. Also make sure that they have the same aspect ratio and/or the same size-styling as the video. Use `position:absolute` to place them on top of each other.
Tipp: Use the _lazy-image_ strategy to avoid an huge inital page load.

#### Poster image attribute

If you use a poster image, the screen might flicker when the poster image is loaded, because the container doesn't contain anything yet, so the browser injects the image and the container is pulled open.
To prevent this, make sure that the size of the container of the `<video` tag is set.

When the video is loaded, it might flicker again, because the image has a different aspect ratio than the video. To prevent this, make sure that the image has the same aspect ratio and/or the same size-styling as the video. Set the same `width` and use the `object-fit` attribute.
