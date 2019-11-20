import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import CookiePopup from '../src/index'
import '../src/style.scss'

import BannerDocs from './banner.md'

const BannerMarkup = `
<div class="ft-cookie-disclaimer -banner-bottom -visibility-default -base-theme" data-feature="cookie-handler" data-cookie-identifier="disclaimer-banner" data-cy="disclaimer">
<p class="disclaimer-text">disclaimer example message <a href="#">Privacy policy</a></p>
<button data-disclaimer-confirm data-cy="confirm">Got it</button>
</div>
`

storiesOf('CookiePopup', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(BannerMarkup, () => {
        resetFeature(features, 'cookie-handler')
        features.add(
          'cookie-handler',
          CookiePopup,
          object('options', CookiePopup.defaultOptions)
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
        const dismissButton = document.querySelector(
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
  .add('Source JS', () => {
    return styleSource({ feature: 'cookie-handler' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'cookie-handler', language: 'sass' })
  })
