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
  .hide {
    display: none;
  }

  .list-item:hover, .list-item.selected {
    background: #81ca91;
    cursor: pointer;
  }

  .list-item > span.highlight {
    color: red;
  }
  </style>
`

const markupIntro = `
${styles}
<div class="ft-autocomplete" data-feature="autocomplete" data-value-list="Deutschland, Schweiz, Frankreich, Schweden, Spanien" data-no-result-text="No results found">
  <input class="input" type="text" id="countries" placeholder="Search for country" autocomplete="off" autofocus data-input data-cy="input">
</div>
`

storiesOf('Autocomplete', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markupIntro, () => {
        resetFeature(features, 'autocomplete')
        features.add('autocomplete', Autocomplete, {
          useValueList: true
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
    return styleSource({ feature: 'sweet-modal' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'sweet-modal', language: 'sass' })
  })
