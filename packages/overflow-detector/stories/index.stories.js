import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import OverflowDetector, { OverflowStrategy } from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const markup = `
<style>
@font-face {
  font-family: 'Kufam';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/kufam/v2/C8c-4cY7pG7w_oSJDszBXsKCcBH3lqkLrgqIPPEgYw.woff2)
    format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

.overflow-container.custom-namespace--hidden {
  opacity: 0;
}

.overflow-container.custom-namespace--overflow::after {
  content: 'Overflow detected';
}

.overflowed-element {
  width: 450px;
  overflow: hidden;
  white-space: nowrap;
  border: 1px solid black;
  font-family: Kufam;
}
</style>

<div class="overflow-container" class="custom-namespace--hidden" data-cy="overflow-container">
  <div class="overflowed-element" data-feature="overflow-detector">
    Wenn alle Fonts geladen sind, sollte ein Overflow erkennt werden.
  </div>
</div>
`

storiesOf('OverflowDetector', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'overflow-detector')
        features.add('overflow-detector', OverflowDetector, {
          ...object('options', OverflowDetector.defaultOptions),
          strategy: new OverflowStrategy({
            ...object('strategyOptions', {
              classNamespace: 'custom-namespace'
            }),
            $node: document.querySelector('.overflow-container')
          })
        })
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
    return styleSource({ feature: 'overflow-detector' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'overflow-detector', language: 'sass' })
  })
