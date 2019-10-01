import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import Demo from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const markup = `

`

storiesOf('Demo', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'demo')
        features.add('demo', Demo, object('options', Demo.defaultOptions))
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
    return styleSource({ feature: 'demo' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'demo', language: 'sass' })
  })
