import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features } from '@goldinteractive/js-base'

import Tabs, { TabSelectorButton, TabSelectorSelect } from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const markup = `
<style>
.tabs.-initially-hidden { opacity: 0; }
.tab { padding: 20px; border: 1px solid black; }
.tab.-active { display: block; }
.tab.-inactive { display: none; }
.btn.-active {background: blue; }
.btn.-inactive {background: transparent; }
</style>
<div>
  <button class="btn" data-feature="tab-selector-button" data-tabs-identifier="needs-analysis-form" data-tab-id="1">Tab 1</button>
  <button class="btn" data-feature="tab-selector-button" data-tabs-identifier="needs-analysis-form" data-tab-id="2" data-cy="btn-tab-2">Tab 2</button>
  <button class="btn" data-feature="tab-selector-button" data-tabs-identifier="needs-analysis-form" data-tab-id="3">Tab 3</button>
  <select class="select" data-feature="tab-selector-select" data-tabs-identifier="needs-analysis-form">
    <option value="1">Tab 1</option>
    <option value="2">Tab 2</option>
    <option value="3">Tab 3</option>
  </select>
  <div class="tabs -initially-hidden" data-feature="tabs" data-tabs-identifier="needs-analysis-form">
    <div class="tab" data-tab="1">
      1
      <button class="btn" data-feature="tab-selector-button" data-tabs-identifier="needs-analysis-form" data-tab-id="2">Tab 2</button>
    </div>
    <div class="tab" data-tab="2" data-initially-active>
      2
      <button class="btn" data-feature="tab-selector-button" data-tabs-identifier="needs-analysis-form" data-tab-id="3">Tab 3</button>
    </div>
    <div class="tab" data-tab="3">3</div>
  </div>
</div>
`

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'tabs')
        resetFeature(features, 'tab-selector-button')
        resetFeature(features, 'tab-selector-select')
        features.add('tab-selector-button', TabSelectorButton, {
          ...object(
            'tab-selecotr-button-options',
            TabSelectorButton.defaultOptions
          )
        })
        features.add('tab-selector-select', TabSelectorSelect)
        features.add('tabs', Tabs, {
          ...object('tabs-options', Tabs.defaultOptions)
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
    return styleSource({ feature: 'tabs' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'tabs', language: 'sass' })
  })
