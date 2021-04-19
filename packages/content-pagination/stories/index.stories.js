import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'

import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import ContentPagination from '../src/index'
import DomStateHandler from '../../dom-state-handler/src/index'
import { UrlParameter } from '../../dom-state-handler/src/persistors/index'
import '../src/style.scss'

import docs from './docs.md'

const styles = `
  <style>
    .item {
      padding: 15px;
      border-bottom: 1px solid grey;
    }

    h3 {
      margin: 0;
      margin-bottom: 10px;
    }
    .filters {
      margin-bottom: 20px;
    }
    .flex {
      display: flex;
      justify-content: space-between;
      width: 300px;
      margin-top: 50px;
    }
  </style>
`

const markupIntro = `
${styles}
<div>
  <h2>Content Pagination</h2>
  <div class="filters" data-feature="dom-state-handler" data-state-handler-type="checkbox-group">
    <div>
      <input type="checkbox" id="option-1" name="option" value="option-1"/>
      <label for="option-1">Option 1</label>
    </div>
    <div>
      <input type="checkbox" id="option-2" name="option" value="option-2">
      <label for="option-2">Option 2</label>
    </div>
    <div>
      <input type="checkbox" id="option-3" name="option" value="option-3">
      <label for="option-3">Option 2</label>
    </div>
  </div>
  <div class="filters" data-feature="dom-state-handler" data-state-handler-type="radio-group">
    <input id="orange" type="radio" name="fruit" value="orange" />
    <label for="orange">orange</label>
    <input id="violet" type="radio" name="fruit" value="violet" />
    <label for="violet">violet</label>
    <input id="yellow" type="radio" name="fruit" value="yellow" />
    <label for="yellow">yellow</label>
  </div>
  <div data-feature="content-pagination">
    <div data-content>
      <h2>Initial Content</h2>
      <p>Lorem Impsum initial</p>
    </div>
    <div class="flex">
      <a data-previous href="#zurueck">Zurück</a>
      <a data-next href="#vorwärts">Vorwärts</a>
    </div>
  </div>
</div>
`

storiesOf('ContentPagination', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markupIntro, () => {
        resetFeature(features, 'content-pagination')
        resetFeature(features, 'dom-state-handler')
        features.add(
          'content-pagination',
          ContentPagination,
          object('options', {
            test: ''
          })
        )
        features.add('dom-state-handler', DomStateHandler, {
          domState: new UrlParameter(
            object('domStateOptions', {
              namespace: 'content-pagination',
              restorePersisted: true
            })
          )
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
    return styleSource({ feature: 'content-pagination' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'content-pagination', language: 'sass' })
  })
