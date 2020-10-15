import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'

import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features } from '@goldinteractive/js-base'

import Autocomplete from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const styles = `
  <style>
  </style>
`

const markupIntro = `
${styles}
<div class="ft-autocomplete" data-feature="autocomplete">
  <label for="countries" class="">Countries</label>
  <input class="input" type="text" id="countries" placeholder="Search for country" autocomplete="off" data-input>
  <ul data-result-list>

  </ul>
</div>
`


storiesOf('Autocomplete', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markupIntro, () => {
        resetFeature(features, 'autocomplete')
        features.add('autocomplete', Autocomplete)
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
    return styleSource({ feature: 'sweet-modal' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'sweet-modal', language: 'sass' })
  })
