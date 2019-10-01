import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import PageTransition from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const markup = `
<p>Not replaced content</p>
<div data-feature="page-transition" id="page-transition-wrapper" class="ft-page-transition">
  <!-- Note that you should not include other content here, because this is where Barba acts -->
  <div class="page-transition-container">
    Test
    <a href="page-transition-destination.html" class="smooth-transition">
      Test
    </a>
  </div>
</div>

<p>This example <b>does not</b> use page transitions.</p>

<div data-feature="page-transition" id="page-transition-wrapper" class="ft-page-transition">
  <div class="page-transition-container">
    <a href="page-transition-types.html">
      Full Page reload back to entry
    </a>
  </div>
</div>
`

storiesOf('PageTransition', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'page-transition')
        features.add(
          'page-transition',
          PageTransition,
          object('options', PageTransition.defaultOptions)
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
    return styleSource({ feature: 'page-transition' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'page-transition', language: 'sass' })
  })
