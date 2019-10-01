import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import CookieDisclaimer from '../src/index'
import '../src/style.scss'

import BannerDocs from './banner.md'
import BoxDocs from './box.md'

const BannerMarkup = `
<div class="ft-cookie-disclaimer -banner-bottom -visibility-default -base-theme" data-feature="cookie-disclaimer" data-cy="disclaimer">
<p class="disclaimer-text">Disclaimer example message <a href="#">Privacy policy</a></p>
<button data-disclaimer-confirm data-cy="confirm">Got it</button>
</div>
`

const BoxMarkup = `
<div class="ft-cookie-disclaimer -box-bottom-right -visibility-default -base-theme" data-feature="cookie-disclaimer">
<p class="disclaimer-text">This website uses cookies, with the aim of ensuring that you have the best possible online experience. In using our website, you are giving your consent to the terms and conditions of our Data Protection Declaration / Privacy Statement.<a href="#">Privacy policy</a></p>
<button data-disclaimer-confirm>Got it</button>
</div>
`

storiesOf('CookieDisclaimer', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(BannerMarkup, () => {
        resetFeature(features, 'cookie-disclaimer')
        features.add(
          'cookie-disclaimer',
          CookieDisclaimer,
          object('options', CookieDisclaimer.defaultOptions)
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
    'Box',
    () => {
      return initializeDemo(BoxMarkup, () => {
        resetFeature(features, 'cookie-disclaimer')
        features.add(
          'cookie-disclaimer',
          CookieDisclaimer,
          object('options', CookieDisclaimer.defaultOptions)
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
    return styleSource({ feature: 'cookie-disclaimer' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'cookie-disclaimer', language: 'sass' })
  })
