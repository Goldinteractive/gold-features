---
name: Gallery
category: Gallery
---

There is an issue running Gallery in the Stylemark iframe. Open up the `external view` which works properly

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-gallery', path: 'packages/gallery/lib/main.min.js' }, { name: 'feature-object-fit', path: 'packages/object-fit/lib/main.min.js' }, 'base', 'base.features'], function(Gallery, ObjectFit, base, features) {
    features.add('fit', ObjectFit.default);

    features.add('gallery', Gallery.default);
    features.init(document.body);
  });
});
```
```types.css
.ft-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.image-container {
  flex-grow: 1;
}

.source {
  height: 200px;
  min-width: 200px;
}
```
```types.html
<h2>Gallery</h2>

    <div class="ft-gallery" data-feature="gallery" itemscope itemtype="//schema.org/ImageGallery">

      <figure class="image-container" data-figure itemprop="associatedMedia" itemscope itemtype="//schema.org/ImageObject">
        <a href="packages/slider/docs/files/test.jpeg" class="source" data-source itemprop="contentUrl">
          <div class="ft-fit-bg">
            <img src="packages/slider/docs/files/test.jpeg" data-thumbnail data-feature="fit" alt="test" itemprop="thumbnail">
          </div>
        </a>

        <meta data-width itemprop="width" content="3000">
        <meta data-height itemprop="height" content="2000">

        <figcaption class="caption" data-caption itemprop="caption description">
          Long description
        </figcaption>
      </figure>

      <figure class="image-container" data-figure itemprop="associatedMedia" itemscope itemtype="//schema.org/ImageObject">
        <a href="packages/slider/docs/files/test2.jpeg" class="source" data-source itemprop="contentUrl">
          <div class="ft-fit-bg">
            <img src="packages/slider/docs/files/test2.jpeg" data-thumbnail alt="test2" itemprop="thumbnail">
          </div>
        </a>

        <meta data-width itemprop="width" content="682">
        <meta data-height itemprop="height" content="1050">

        <figcaption class="caption" data-caption itemprop="caption description">
          Long description
        </figcaption>
      </figure>

      <figure class="image-container" data-figure itemprop="associatedMedia" itemscope itemtype="//schema.org/ImageObject">
        <a href="packages/slider/docs/files/test3.jpeg" class="source" data-source itemprop="contentUrl">
          <div class="ft-fit-bg">
            <img src="packages/slider/docs/files/test3.jpeg" data-thumbnail alt="test3" itemprop="thumbnail">
          </div>
        </a>

        <meta data-width itemprop="width" content="1400">
        <meta data-height itemprop="height" content="620">

        <figcaption class="caption" data-caption itemprop="caption description">
          Long description
        </figcaption>
      </figure>

      <figure class="image-container" data-figure itemprop="associatedMedia" itemscope itemtype="//schema.org/ImageObject">
        <a href="packages/slider/docs/files/test4.jpeg" class="source" data-source itemprop="contentUrl">
          <div class="ft-fit-bg">
            <img src="packages/slider/docs/files/test4.jpeg" data-thumbnail alt="test4" itemprop="thumbnail">
          </div>
        </a>

        <meta data-width itemprop="width" content="2400">
        <meta data-height itemprop="height" content="1600">

        <figcaption class="caption" data-caption itemprop="caption description">
          Long description
        </figcaption>
      </figure>

    </div>



    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" data-pswp>

      <!-- Background of PhotoSwipe.
          It's a separate element as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>

      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">

        <!-- Container that holds slides.
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

          <div class="pswp__top-bar">

            <!--  Controls are self-explanatory. Order can be changed. -->

            <div class="pswp__counter"></div>

            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

            <button class="pswp__button pswp__button--share" title="Share"></button>

            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

            <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
            <!-- element will get class pswp__preloader--active when preloader is running -->
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div class="pswp__share-tooltip"></div>
          </div>

          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
          </button>

          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
          </button>

          <div class="pswp__caption">
              <div class="pswp__caption__center"></div>
          </div>

        </div>

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
