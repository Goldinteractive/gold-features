import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import Gallery from '../src/index'
import '../src/style.scss'

import docs from './docs.md'
import testJpg from './files/test.jpeg'
import test2Jpg from './files/test2.jpeg'
import test3Jpg from './files/test3.jpeg'
import test4Jpg from './files/test4.jpeg'

const markup = `
<style>
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
</style>
<div class="ft-gallery" data-feature="gallery" itemscope itemtype="//schema.org/ImageGallery">

      <figure class="image-container" data-figure itemprop="associatedMedia" itemscope itemtype="//schema.org/ImageObject">
        <a href="${testJpg}" class="source" data-source itemprop="contentUrl">
          <div class="ft-fit-bg">
            <img src="${testJpg}" data-thumbnail data-feature="fit" alt="test" itemprop="thumbnail">
          </div>
        </a>

        <meta data-width itemprop="width" content="3000">
        <meta data-height itemprop="height" content="2000">

        <figcaption class="caption" data-caption itemprop="caption description">
          Long description
        </figcaption>
      </figure>

      <figure class="image-container" data-figure itemprop="associatedMedia" itemscope itemtype="//schema.org/ImageObject">
        <a href="${test2Jpg}" class="source" data-source itemprop="contentUrl">
          <div class="ft-fit-bg">
            <img src="${test2Jpg}" data-thumbnail alt="test2" itemprop="thumbnail">
          </div>
        </a>

        <meta data-width itemprop="width" content="682">
        <meta data-height itemprop="height" content="1050">

        <figcaption class="caption" data-caption itemprop="caption description">
          Long description
        </figcaption>
      </figure>

      <figure class="image-container" data-figure itemprop="associatedMedia" itemscope itemtype="//schema.org/ImageObject">
        <a href="${test3Jpg}" class="source" data-source itemprop="contentUrl">
          <div class="ft-fit-bg">
            <img src="${test3Jpg}" data-thumbnail alt="test3" itemprop="thumbnail">
          </div>
        </a>

        <meta data-width itemprop="width" content="1400">
        <meta data-height itemprop="height" content="620">

        <figcaption class="caption" data-caption itemprop="caption description">
          Long description
        </figcaption>
      </figure>

      <figure class="image-container" data-figure itemprop="associatedMedia" itemscope itemtype="//schema.org/ImageObject">
        <a href="${test4Jpg}" class="source" data-source itemprop="contentUrl">
          <div class="ft-fit-bg">
            <img src="${test4Jpg}" data-thumbnail alt="test4" itemprop="thumbnail">
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
`

storiesOf('Gallery', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'gallery')
        features.add(
          'gallery',
          Gallery,
          object('options', Gallery.defaultOptions)
        )
        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: docs
      }
    }
  )
  .add('Source JS', () => {
    return styleSource({ feature: 'gallery' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'gallery', language: 'sass' })
  })
