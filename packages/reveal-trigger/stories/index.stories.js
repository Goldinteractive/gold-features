import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'
import '@goldinteractive/js-base/src/polyfills/intersection-observer'

import ObjectFit from '../../object-fit/src/index'
import RevealTrigger, { IntersectionManager, strategies } from '../src/index'
import '../src/style.scss'

import docs from './docs.md'
import CssDocs from './css.md'
import ImageDocs from './image.md'
import VideoDocs from './video.md'

import metro from './files/metropolitano.jpg'
import metroThumb from './files/metropolitano_thumb.jpg'
import plaza from './files/plaza.jpg'
import plazaThumb from './files/plaza_thumb.jpg'
import video from './files/video-1.mp4'
import video2 from './files/video-2.mp4'

const markup = `<h1>Check Out the notes to get more information.</h1>`
const CssMarkup = `
<style>
.section {
  height: 800px;
  width: 100%;
  opacity: 0;
  position: relative;

  transition: opacity .5s ease-in;
}

.item {
  display: inline-block;
  width: 150px;
  height: 150px;
  background-color: white;

  transition: opacity .5s ease-in;
  opacity: 0;
}

.item.-in {
  opacity: 1;
}

[data-trigger] {
  position: absolute;
  top: 300px;
}

.section.-in {
  opacity: 1;
}

.-red {
  background-color: red;
}
</style>

<div class="section">
  Scroll down to see the reveal trigger in action
</div>
<div class="section -red" data-feature="reveal-trigger" data-cy="timed">
  <div class="item" data-feature="reveal-trigger" data-delay="500" data-cy="fivehundred">500ms delayed</div>
  <div class="item" data-feature="reveal-trigger" data-delay="1000">1000ms delayed</div>
  <div class="item" data-feature="reveal-trigger" data-delay="1500">1500ms delayed</div>
  <div class="item" data-feature="reveal-trigger" data-delay="5000">5000ms delayed</div>
  <div class="item" data-feature="reveal-trigger" data-delay="cinco">NaN delayed (should log an error)</div>
</div>
<div class="section" data-feature="reveal-trigger" data-cy="reveal-after">
  Blanco
</div>
<div class="section -red" data-feature="reveal-trigger">
  Rojo
  <div data-trigger>
    Only fade in, when this is visible
  </div>
</div>
`
const ImageMarkup = `
<style>
.section {
  height: 1000px;
  width: 100%;
  position: relative;
}

.section img {
  width: 100%;
}

.-filled {
  background-color: beige;
}

.container {
  position: relative;
  width: 50%;
  height: 800px;
}
</style>

<h1>Using standard src</h1>
<div class="section -filled">
  <img src="${metroThumb}"
  class="ft-reveal-trigger-image -preview -blur"
  data-src="${metro}"
  data-feature="reveal-trigger"
  />
</div>
<div class="section -filled">
<h1>Using Sizes & Srcset</h1>
<p>Quick notice: this obviously won't work in IE</p>
  <img
  class="ft-reveal-trigger-image -preview -blur"
  src="${plazaThumb}"
  data-srcset="${plaza}?srcset320 320w,
             ${plaza}?srcset480 480w,
             ${plaza}?srcset800 800w"
  data-sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
  data-feature="reveal-trigger"
  />
</div>
<div class="section -filled">
  <h1>Using Sizes & Srcset & Src & <b>Object Fit</b></h1>
  <p>If you use object fit make sure to set a default src</p>

  <div class="container">
    <div class="ft-fit-bg">
      <img class="ft-reveal-trigger-image -preview -blur" src="${plazaThumb}?fit" data-src="${plaza}?fit" data-feature="fit, reveal-trigger">
    </div>
  </div>
</div>
<div class="section -filled">
<h1>Using Sizes & Srcset & Src</h1>
<p>In Browsers which support srcset, it will render the Metropolitano Stadium - in others it will fall back to the Plaza</p>
  <img
  class="ft-reveal-trigger-image -preview -blur"
  src="${plazaThumb}"
  data-src="${plaza}"
  data-srcset="${metro} 320w,
             ${metro} 480w,
             ${metro} 800w"
  data-sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
  data-feature="reveal-trigger"
  />
</div>
`

const VideoMarkup = `
<style>
  .container {
    background: lightgreen;
    position: relative;
    width: 100%;
    padding-top: 1500px;
  }

  .video-container {
    background: lightcoral;
    position: relative;
    height: 1000px;
    width: 1000px;
  }
</style>

<h1>Lazy Video</h1>
<div class="container">
  <div class="video-container">
    <video class="-lazy" width="100%" autoplay muted loop playsinline poster="${plazaThumb}" data-feature="reveal-trigger">
      <source data-src="${video}" type="video/mp4" />
      <source data-src="${video}" type="video/mp4" />
    </video>
  </div>
  <div class="video-container">
    <video class="-lazy" width="100%" autoplay muted loop playsinline poster="${plazaThumb}" data-feature="reveal-trigger">
      <source data-src="${video2}" type="video/mp4" />
      <source data-src="${video2}" type="video/mp4" />
    </video>
  </div>
</div>
`

storiesOf('RevealTrigger', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {})
    },
    {
      notes: {
        markdown: docs
      }
    }
  )
  .add(
    'CSS Animation',
    () => {
      return initializeDemo(CssMarkup, () => {
        resetFeature(features, 'reveal-trigger')
        features.add('reveal-trigger', RevealTrigger, {
          strategy: new strategies.CSSAnimationStrategy(),
          manager: new IntersectionManager()
        })
        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: CssDocs
      }
    }
  )
  .add(
    'Lazy Image',
    () => {
      return initializeDemo(ImageMarkup, () => {
        resetFeature(features, 'reveal-trigger')
        resetFeature(features, 'fit')
        features.add('fit', ObjectFit)

        features.add('reveal-trigger', RevealTrigger, {
          strategy: new strategies.LazyImageStrategy(),
          manager: new IntersectionManager()
        })
        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: ImageDocs
      }
    }
  )
  .add(
    'Lazy Video',
    () => {
      return initializeDemo(VideoMarkup, () => {
        resetFeature(features, 'reveal-trigger')
        features.add('reveal-trigger', RevealTrigger, {
          strategy: new strategies.LazyVideoStrategy(),
          manager: new IntersectionManager({
            notifyOnlyWhenIntersecting: false
          })
        })
        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: VideoDocs
      }
    }
  )
  .add('Source JS', () => {
    return styleSource({ feature: 'reveal-trigger' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'reveal-trigger', language: 'sass' })
  })
