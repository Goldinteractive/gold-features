import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import ObjectFit from '../../object-fit/src/index'
import Slider from '../src/index'
import '../src/style.scss'

import content from './content.md'
import events from './events.md'
import gallery from './gallery.md'
import testJpg from './files/test.jpeg'
import test2Jpg from './files/test2.jpeg'
import test3Jpg from './files/test3.jpeg'
import test4Jpg from './files/test4.jpeg'

const ContentMarkup = `
<div class="ft-slider -hidden" data-feature="slider" data-slider-indentifier="quotes-slider">
  <div class="slide" data-slide-label="waseemi">
    <p>Think twice, code once ― Waseem Latif</p>
  </div>
  <div class="slide" data-slide-label="martini">
    <p>'Truth can only be found in one place: the code. ― Robert C. Martin</p>
  </div>
  <div class="slide" data-slide-label="waseemi">
    <p>Programming isn't about what you know; it's about what you can figure out. ― Chris Pine</p>
  </div>
</div>
`
const EventsMarkup = `
<style>
.slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<h2>Slider which handles events (see console)</h2>
<p>Various events are fired and therefore the slider changes slides three times automatically. (See the js code to see how to fire specific events)</p>
<div class="ft-slider -hidden -gallery" data-feature="event-slider" data-slider-identifier="event-slider" >
  <div class="slide" style="width: 100%;" data-slide-identifier="slide-one">#1 I am the first slide</div>
  <div class="slide" style="width: 100%;" data-slide-identifier="slide-two">#2 I am the next slide (selected after two seconds)</div>
  <div class="slide" style="width: 100%;" data-slide-identifier="slide-three">#3 I am the previous slide (selected after six seconds)</div>
  <div class="slide" style="width: 100%;" data-slide-identifier="slide-four">#4 I got specifically and instantly selected (selected after four seconds)</div>
</div>
`
const GalleryMarkup = `
<h2>Gallery Slider (Slide width from images and fixed height)</h2>

<div class="ft-slider -hidden -gallery" data-feature="gallery-slider">
  <img class="slide" src="${testJpg}" alt="test">
  <img class="slide" src="${test2Jpg}" alt="test2">
  <img class="slide" src="${test3Jpg}" alt="test3">
  <img class="slide" src="${test4Jpg}" alt="test4">
</div>

<h2>Fullwidth Gallery Slider (Slider height from tallest image)</h2>

<div class="ft-slider -hidden -gallery -fullwidth" data-feature="fw-gallery-slider">
  <img class="slide" src="${testJpg}" alt="test">
  <img class="slide" src="${test2Jpg}" alt="test2">
  <img class="slide" src="${test3Jpg}" alt="test3">
  <img class="slide" src="${test4Jpg}" alt="test4">
</div>

<h2>Cover Slider (Slide widths in percentage and fixed height) - <a href="https://github.com/Goldinteractive/feature-object-fit">object-fit</a> feature used to cover area with image)</h2>

<div class="ft-slider -hidden -gallery -cover" data-feature="cover-slider">
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="${testJpg}" data-feature="fit" alt="test">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="${test2Jpg}" data-feature="fit" alt="test2">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="${test3Jpg}" data-feature="fit" alt="test3">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="${test4Jpg}" data-feature="fit" alt="test4">
    </div>
  </div>
</div>

<h2>Cover Fullwidth Slider (Slide widths in percentage and fixed height) - <a href="https://github.com/Goldinteractive/feature-object-fit">object-fit</a> feature used to cover area with image)</h2>

<div class="ft-slider -hidden -cover -fullwidth" data-feature="fw-cover-slider">
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="${testJpg}" data-feature="fit" alt="test">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="${test2Jpg}" data-feature="fit" alt="test2">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="${test3Jpg}" data-feature="fit" alt="test3">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="${test4Jpg}" data-feature="fit" alt="test4">
    </div>
  </div>
</div>

<h2>Cover Fullwidth Slider (Slide widths in percentage and ratio height)- <a href="https://github.com/Goldinteractive/feature-object-fit">object-fit</a> feature used to cover area with image)</h2>

<div class="ft-slider -hidden -cover -ratio -fullwidth" data-feature="fw-cover-slider">
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="${testJpg}" data-feature="fit" alt="test">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="${test2Jpg}" data-feature="fit" alt="test2">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="${test3Jpg}" data-feature="fit" alt="test3">
    </div>
  </div>
  <div class="slide">
    <div class="ft-fit-bg">
      <img src="${test4Jpg}" data-feature="fit" alt="test4">
    </div>
  </div>
</div>
`

storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add(
    'Content',
    () => {
      return initializeDemo(ContentMarkup, () => {
        resetFeature(features, 'slider')
        features.add('slider', Slider, object('options', Slider.defaultOptions))
        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: content
      }
    }
  )
  .add(
    'Events',
    () => {
      return initializeDemo(EventsMarkup, () => {
        resetFeature(features, 'event-slider')
        features.add('event-slider', Slider, {
          contain: true,
          listeners: [
            {
              event: 'select',
              handler: flickity => {
                action('selected')(flickity)
              }
            },
            {
              event: 'settle',
              handler: flickity => {
                action('settled')(flickity)
              }
            }
          ]
        })

        // Trigger various events to demonstrate the event handling

        setTimeout(() => {
          eventHub.trigger('event-slider:next', { isInstant: true })
        }, 2000)
        setTimeout(() => {
          eventHub.trigger('event-slider:select', {
            slideIdentifier: 'slide-four',
            isInstant: true
          })
        }, 4000)
        setTimeout(() => {
          eventHub.trigger('event-slider:previous')
        }, 6000)
        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: events
      }
    }
  )
  .add(
    'Gallery',
    () => {
      return initializeDemo(GalleryMarkup, () => {
        resetFeature(features, 'gallery-slider')
        resetFeature(features, 'fw-gallery-slider')
        resetFeature(features, 'cover-slider')
        resetFeature(features, 'fw-cover-slider')
        resetFeature(features, 'fit')
        features.add('fit', ObjectFit)

        features.add('gallery-slider', Slider, {
          imagesLoaded: true,
          percentPosition: false,
          contain: true,
          cellAlign: 'left',
          pageDots: false,
          freeScroll: true
        })

        features.add('fw-gallery-slider', Slider, {
          imagesLoaded: true,
          contain: true
        })

        features.add('cover-slider', Slider, {
          contain: true,
          cellAlign: 'left',
          pageDots: false,
          freeScroll: true
        })

        features.add('fw-cover-slider', Slider, {
          contain: true
        })
        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: gallery
      }
    }
  )
  .add('Source JS', () => {
    return styleSource({ feature: 'slider' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'slider', language: 'sass' })
  })
