import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'

import { initializeDemo, styleSource, resetFeature } from '../../../helpers/story'

import { features, eventHub, utils } from '@goldinteractive/js-base'

import DynamicContentPagination from '../src/index'
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
    <p>skip 0, take 3, count 3, totalCount 7, color: "", fruit: apple</p>
    <h4>Item 2</h4>
    <p>skip 3, take 3, count 3, totalCount 7, color: "", fruit: apple</p>
    <h4>Item 3</h4>
    <p>skip 6, take 3, count 1, totalCount 7, color: "", fruit: apple</p>
    <h4>Item 4</h4>
    <p>skip 0, take 3, count 3, totalCount 3, color: "violet", fruit: apple</p>
    <h4>Item 5</h4>
    <p>skip 0, take 3, count 3, totalCount 3, color: "violet,orange", fruit: mango</p>
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
  <div data-feature="dynamic-content-pagination">
    <div data-content>
      Init
    </div>
    <div class="flex" data-feature="dom-state-handler" data-state-handler-type="link-group">
      <input type="hidden" name="skip" value="0">
      <a data-previous href="" data-name="skip" data-value="0">Previous</a>
      <a data-next href="" data-name="skip" data-value="0">Next</a>
    </div>
  </div>
</div>
`

storiesOf('DynamicContentPagination', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markupIntro, () => {
        resetFeature(features, 'dynamic-content-pagination')
        resetFeature(features, 'dom-state-handler')
        features.add(
          'dynamic-content-pagination',
          DynamicContentPagination,
          object('options', {
            strategy: new StaticStrategy(),
            resetSkipState: (node, oldState, newState) => {
              const resetState = utils.url.parseQuery(newState)
              /**
               * Check if skip is the same which means an other state was changed
               * Check if skip is not already 0
               * Check if skip state is not empty which is the inital state
               */
              if (
                parseInt(oldState.skip) === parseInt(resetState.skip) &&
                parseInt(oldState.skip) !== 0 &&
                oldState.skip !== ''
              ) {
                resetState.skip = 0
                const queryString = utils.url.stringifyQuery(resetState)
                const url =
                  location.origin +
                  location.pathname +
                  '?id=dynamiccontentpagination--intro&' +
                  queryString +
                  location.hash
                utils.url.replaceState(url)
                const $skip = node.querySelector('input[name="skip"]')
                $skip.value = 0
              }
              return resetState
            },
            paginationStateHandler: {
              previous: (node, data, state) => {
                const newState = { ...state } // Avoid reference
                const $previous = node.querySelector('[data-previous]')
                const prevSkip = data.meta.skip - data.meta.take
                $previous.dataset.value = prevSkip
                newState.skip = prevSkip
                const queryString = utils.url.stringifyQuery(newState)
                const url = location.origin + location.pathname + '?' + queryString + location.hash
                $previous.href = url
              },
              next: (node, data, state) => {
                const newState = { ...state } // Avoid reference
                const $next = node.querySelector('[data-next]')
                const nextSkip = data.meta.skip + data.meta.take
                $next.dataset.value = nextSkip
                newState.skip = nextSkip
                const queryString = utils.url.stringifyQuery(newState)
                const url = location.origin + location.pathname + '?' + queryString + location.hash
                $next.href = url
              }
            },
            paginationDisplayHandler: {
              previous: (node, data) => {
                const $previous = node.querySelector('[data-previous]')
                if ($previous) {
                  if (parseInt(data.meta.skip) === 0) {
                    $previous.classList.add('-hide')
                  } else {
                    $previous.classList.remove('-hide')
                  }
                }
              },
              next: (node, data) => {
                const $next = node.querySelector('[data-next]')
                if ($next) {
                  if (parseInt(data.meta.skip) + parseInt(data.meta.count) >= parseInt(data.meta.totalCount)) {
                    $next.classList.add('-hide')
                  } else {
                    $next.classList.remove('-hide')
                  }
                }
              }
            }
          })
        )
        features.add('dom-state-handler', DomStateHandler, {
          domState: new UrlParameter(
            object('domStateOptions', {
              namespace: 'dynamic-content-pagination',
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
    return styleSource({ feature: 'dynamic-content-pagination' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'dynamic-content-pagination', language: 'sass' })
  })
