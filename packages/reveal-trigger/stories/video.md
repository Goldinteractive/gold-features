# RevealTrigger - Lazy video

Using this strategy videos will only be loaded once they enter the viewport. This reduces the bloat of the initial page load and improves the perceived performance of the site. Once the video is completely out of the viewport, the video pauses at the current position. This strategy is valuable when you have multiple autoplay loop videos on your page.

## Setup

- Use the feature on your `<video>` tag and set a `data-src` attribute on the `<source>` tag. Leave the `src` attribute empty. Once the video enters the viewport, the `src` attribute is set with the source defined in the `data-src`.
- You have to set the class `-lazy` on the `<video>` tag. This tells the feature once the video enters the viewport, that the video source is not set yet. It will remove the class after.
- Set a poster image for the video to prevent an empty space if a user has a bad network connection. (optional)

### Strategy

Set `notifyOnlyWhenIntersecting` to false because we want to pause the video when it's not in the viewport.

## Notes

### IE11

Videos in our most loved browser Internet Explorer might not behave correctly. When scrolling the video might lag and skip some visuals while in the background the video plays normally.

## Poster Image

Lazy loading media can cause shifting in the layout if placeholders aren't used. Therefore using a poster image is recommended.
This can be done in two different ways:

- You use the `poster` attribute of the `<video>` tag. Note that the loaded image may not have the same dimensions as the video and layout shifting and flickering may occur. More about this below.
- Add an image normally with the `<img>` tag. The image should have a lower `z-index` than the video so you can see the video as soon as it is loaded.

### Flickering & layout shifting

Before loading the poster image, you have to make sure that the container of the video already has the desired size. This prevents layout shifting and flickering when the image is initially loaded.
After that you have to make sure that the image has the same dimensions as the video when loading a poster image or a normal image. So the image is smoothly replaced by the video once the video is loaded.

## Infos

For more infos about layout shifting or lazy loading media, checkout this article of [google developers](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video).
