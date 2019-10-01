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
.overflow-container.custom-namespace--hidden {
  opacity: 0;
}

.overflow-container.custom-namespace--overflow::after {
  content: 'Overflow detected';
}

.overflowed-element {
  width: 20px;
  overflow: hidden;
  white-space: nowrap;
}
</style>

<div class="overflow-container" class="custom-namespace--hidden">
  <div class="overflowed-element" data-feature="overflow-detector">
    Lorem ipsum dolor sit amet…
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
