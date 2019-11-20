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

import BannerDocs from './banner.md'
import BoxDocs from './box.md'

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

storiesOf('CookieHandler', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(BannerMarkup, () => {
        resetFeature(features, 'cookie-handler')
        features.add(
          'cookie-handler',
          CookieHandler,
          object('options', CookieHandler.defaultOptions)
        )

        const cookieContainer = document.querySelector(
          '[data-cookie-identifier="disclaimer-banner"]'
        )
        eventHub.on(
          `${cookieContainer.dataset.cookieIdentifier}:activate`,
          () => {
            cookieContainer.classList.add('-show')
          }
        )
        const dismissButton = cookieContainer.querySelector(
          '[data-disclaimer-confirm]'
        )
        dismissButton.addEventListener('click', () => {
          eventHub.trigger(
            `${cookieContainer.dataset.cookieIdentifier}:deactivate`
          )
          cookieContainer.classList.remove('-show')
        })
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
        const cookieContainer = document.querySelector(
          '[data-cookie-identifier="disclaimer-box"]'
        )
        eventHub.on(
          `${cookieContainer.dataset.cookieIdentifier}:activate`,
          () => {
            cookieContainer.classList.add('-show')
          }
        )
        const dismissButton = cookieContainer.querySelector(
          '[data-disclaimer-confirm]'
        )
        dismissButton.addEventListener('click', () => {
          eventHub.trigger(
            `${cookieContainer.dataset.cookieIdentifier}:deactivate`
          )
          cookieContainer.classList.remove('-show')
        })
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