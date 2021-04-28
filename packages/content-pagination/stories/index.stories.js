import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'

import { initializeDemo, styleSource, resetFeature } from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import ContentPagination from '../src/index'
import StaticStrategy from './files/staticStrategy'
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
    h4 {
      margin: 0;
    }
    p {
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
  <h3>Static Data</h3>
  <div>
    <h4>Item 1</h4>
    <p>skip 0, color: "", fruit: apple</p>
    <h4>Item 2</h4>
    <p>skip 3, color: "violet", fruit: grapes</p>
    <h4>Item 3</h4>
    <p>skip 6, color: "violet", fruit: apple</p>
    <h4>Item 4</h4>
    <p>skip 9, color: "violet,orange", fruit: mango</p>
    <h4>Item 5</h4>
    <p>skip 12, color: "yellow", fruit: grapes</p>
  </div>
  <h3>Filters</h3>
  <div class="filters" data-feature="dom-state-handler" data-state-handler-type="checkbox-group">
    <div>
      <input type="checkbox" id="violet" name="color" value="violet"/>
      <label for="violet">Violet</label>
    </div>
    <div>
      <input type="checkbox" id="orange" name="color" value="orange">
      <label for="orange">Orange</label>
    </div>
    <div>
      <input type="checkbox" id="yellow" name="color" value="yellow">
      <label for="yellow">Yellow</label>
    </div>
  </div>
  <div class="filters" data-feature="dom-state-handler" data-state-handler-type="radio-group">
    <input id="apple" type="radio" name="fruit" value="apple" />
    <label for="apple">Apple</label>
    <input id="mango" type="radio" name="fruit" value="mango" />
    <label for="mango">Mango</label>
    <input id="grapes" type="radio" name="fruit" value="grapes" />
    <label for="grapes">Grapes</label>
  </div>
  <div data-feature="content-pagination">
    <div data-content>
      Init
    </div>
    <div class="flex" data-feature="dom-state-handler" data-state-handler-type="button-group">
     <button data-previous type="submit" name="skip" value="0">Previous</button>
     <button data-dom-state-handler-master type="submit" name="skip" value="0">Current</button>
     <button data-next type="submit" name="skip" value="0">Next</button>
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
            strategy: new StaticStrategy()
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
