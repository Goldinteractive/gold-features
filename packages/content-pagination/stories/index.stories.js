import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'

import { initializeDemo, styleSource, resetFeature } from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import ContentPagination, { ContentStrategies } from '../src/index'
import DomStateHandler from '../../dom-state-handler/src/index'
import { UrlParameter } from '../../dom-state-handler/src/persistors/index'
import '../src/style.scss'

import docs from './docs.md'

const dataPage1 = {
  html:
    '<div class="item"><h3>Titel 1</h3><p>test 1</p></div><div class="item"><h3>Titel 2</h3><p>test 2</p></div><div class="item"><h3>Titel 3</h3><p>test 3</p></div>',
  meta: {
    skip: 0,
    take: 3,
    total: 13
  }
}
const dataPage2 = {
  html:
    '<div class="item"><h3>Titel 4</h3><p>test 4</p></div><div class="item"><h3>Titel 5</h3><p>test 5</p></div><div class="item"><h3>Titel 6</h3><p>test 6</p></div>',
  meta: {
    skip: 3,
    take: 3,
    total: 13
  }
}
const dataPage3 = {
  html:
    '<div class="item"><h3>Titel 7</h3><p>test 7</p></div><div class="item"><h3>Titel 8</h3><p>test 8</p></div><div class="item"><h3>Titel 9</h3><p>test 9</p></div>',
  meta: {
    skip: 6,
    take: 3,
    total: 13
  }
}
const dataPage4 = {
  html:
    '<div class="item"><h3>Titel 10</h3><p>test 10</p></div><div class="item"><h3>Titel 11</h3><p>test 11</p></div><div class="item"><h3>Titel 12</h3><p>test 12</p></div>',
  meta: {
    skip: 9,
    take: 3,
    total: 13
  }
}
const dataPage5 = {
  html: '<div class="item"><h3>Titel 13</h3><p>test 13</p></div>',
  meta: {
    skip: 12,
    take: 3,
    total: 13
  }
}

export const allData = [dataPage1, dataPage2, dataPage3, dataPage4, dataPage5]

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
    .-hide {
      opacity: 0;
      visibilty: hidden;
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
      Init
    </div>
    <div class="flex" data-feature="dom-state-handler" data-state-handler-type="button-group">
     <button data-previous type="submit" name="skip" value="minus">Previous</button>
     <button data-next type="submit" name="skip" value="plus">Next</button>
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
            strategy: null
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
