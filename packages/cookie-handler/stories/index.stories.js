import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import CookieHandler from '../src/index'
import '../src/style.scss'

import SampleDocs from './sample.md'
import BannerDocs from './banner.md'
import BoxDocs from './box.md'

const sampleTeaser = `
<style>
.sample-teaser{
  width: 400px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
  opacity: 0;
  background-color: rgb(200,200,200);
}

.sample-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: 0px;
}

.sample-teaser.-show {
    visibility: visible;
    opacity: 1;
  }
}

</style>
<div class="sample-teaser" data-feature="cookie-handler" data-cookie-identifier="sample-teaser">
  <button class="sample-close" type="button" aria-label="Schliessen" data-dismiss>
        &times;
  </button>
  <h3>Sample Teaser</h3>
  <p>This is a sample Teaser</p>
</div>
`

const BannerMarkup = `
<div class="ft-cookie-disclaimer -banner-bottom -visibility-default -base-theme" data-feature="cookie-handler" data-cookie-identifier="disclaimer-banner" data-cy="disclaimer">
<p class="disclaimer-text">disclaimer example message <a href="#">Privacy policy</a></p>
<button data-disclaimer-confirm data-cy="confirm">Got it</button>
</div>
`

const BoxMarkup = `
<div class="ft-cookie-disclaimer -box-bottom-right -visibility-default -base-theme" data-feature="cookie-handler" data-cookie-identifier="disclaimer-box">
<p class="disclaimer-text">This website uses cookies, with the aim of ensuring that you have the best possible online experience. In using our website, you are giving your consent to the terms and conditions of our Data Protection Declaration / Privacy Statement.<a href="#">Privacy policy</a></p>
<button data-disclaimer-confirm>Got it</button>
</div>
`

const handleActivation = (
  cookieIdentifier,
  dismissButtonIdentifier,
  eventListener = false
) => {
  const cookieContainer = document.querySelector(cookieIdentifier)
  const dismissButton = cookieContainer.querySelector(dismissButtonIdentifier)

  if (eventListener) {
    setTimeout(() => {
      eventHub.trigger(`${cookieContainer.dataset.cookieIdentifier}:register`)
    }, 2000)
  }

  eventHub.on(`${cookieContainer.dataset.cookieIdentifier}:activate`, () => {
    cookieContainer.classList.add('-show')
  })
  dismissButton.addEventListener('click', () => {
    eventHub.trigger(`${cookieContainer.dataset.cookieIdentifier}:deactivate`)
    cookieContainer.classList.remove('-show')
  })
}

storiesOf('CookieHandler', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(sampleTeaser, () => {
        resetFeature(features, 'cookie-handler')
        const eventListener = true
        features.add(
          'cookie-handler',
          CookieHandler,
          object('options', {
            enableEventListener: eventListener
          })
        )

        handleActivation(
          '[data-cookie-identifier="sample-teaser"]',
          '[data-dismiss]',
          eventListener
        )

        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: SampleDocs
      }
    }
  )
  .add(
    'Cookie Disclaimer Banner',
    () => {
      return initializeDemo(BannerMarkup, () => {
        resetFeature(features, 'cookie-handler')
        features.add(
          'cookie-handler',
          CookieHandler,
          object('options', CookieHandler.defaultOptions)
        )

        handleActivation(
          '[data-cookie-identifier="disclaimer-banner"]',
          '[data-disclaimer-confirm]'
        )

        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: BannerDocs
      }
    }
  )
  .add(
    'Cookie Disclaimer Box',
    () => {
      return initializeDemo(BoxMarkup, () => {
        resetFeature(features, 'cookie-handler')
        features.add(
          'cookie-handler',
          CookieHandler,
          object('options', CookieHandler.defaultOptions)
        )

        handleActivation(
          '[data-cookie-identifier="disclaimer-box"]',
          '[data-disclaimer-confirm]'
        )

        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: BoxDocs
      }
    }
  )
  .add('Source JS', () => {
    return styleSource({ feature: 'cookie-handler' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'cookie-handler', language: 'sass' })
  })
