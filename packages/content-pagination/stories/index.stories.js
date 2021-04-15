import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'

import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import ContentPagination from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const styles = `
  <style>

  </style>
`

const markupIntro = `
${styles}
<div>
</div>
`

storiesOf('ContentPagination', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markupIntro, () => {
        resetFeature(features, 'content-pagination')
        features.add(
          'content-pagination',
          ContentPagination,
          object('options', {
            test: ''
          })
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
    return styleSource({ feature: 'content-pagination' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'content-pagination', language: 'sass' })
  })

