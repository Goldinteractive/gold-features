import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub, utils } from '@goldinteractive/js-base'

import DomStateHandler from '../src/index'
import DomState from '../src/persistors/dom-state'
import '../src/style.scss'
import Masonry from '../../masonry/src/index'
import ElementLoader from '../../element-loader/src/index'

import DomStateHandlerDocs from './domStateHandler.md'
import LazyFilterGridDocs from './lazyFilterGrid.md'

import grid from '!file-loader!./files/grid.html'
import grid2 from '!file-loader!./files/grid2.html'

const DomStatehandlerMarkup = `
<div>
  <select name="option-name" data-feature="dom-state-handler">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>
  <select name="option-other" data-feature="dom-state-handler">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>
  <div data-feature="dom-state-handler" data-state-handler-type="checkbox-group">
    <div>
      <input type="checkbox" id="option3-1" name="option3" value="option3-1" checked />
      <label for="option3-1">Option 1</label>
    </div>

    <div>
      <input type="checkbox" id="option3-2" name="option3" value="option3-2" />
      <label for="option3-2">Option 2</label>
    </div>
  <div>

  <div data-feature="dom-state-handler" data-state-handler-type="radio-group">
    <input type="radio" name="option4" value="orange"/>
    <input type="radio" name="option4" value="violet" selected="true"/>
    <input type="radio" name="option4" value="yellow"/>
  </div>
</div>
`

const LazyFilterGridMarkup = `
<style>
.grid {position: relative; }
.grid-sizer { width: 33%; }
.grid-item { width: 33%; background-color: orange; height: 40px; box-shadow: inset 0 0 5px #000000; text-align: center;}
.grid-item:nth-child(even) { background-color: green; }
.grid-item--width2 { width: 66%; }
.grid-item--width3 { width: 100%; }
.grid-item--height2 { height: 80px; }
.grid-item--height3 { height: 160px; }
</style>
<div>
  <div data-feature="lazy-grid-filter-handler" data-state-handler-type="checkbox-group">
    <div>
      <input type="checkbox" id="option1" name="category" value="option1" />
      <label for="option1">Option 1</label>
    </div>
    <div>
      <input type="checkbox" id="option2" name="category" value="option2" />
      <label for="option2">Option 2</label>
    </div>
    <div>
      <input type="checkbox" id="option3" name="category" value="option3" />
      <label for="option3">Option 3</label>
    </div>
  </div>

  <div
    data-feature="lazy-grid-initial-loader"
    data-element-loader-identifier="lazy-grid-load-initial"
    data-element-loader-url="${grid}"
    data-element-loader-event="lazy-grid:load-items"
  >
  </div>
</div>
`

storiesOf('DomStateHandler', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(DomStatehandlerMarkup, () => {
        resetFeature(features, 'dom-state-handler')
        features.add('dom-state-handler', DomStateHandler, {
          domState: new DomState(
            object('domStateOptions', { namespace: 'default-namespace' })
          )
        })
        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: DomStateHandlerDocs
      }
    }
  )
  .add(
    'LazyFilterGrid',
    () => {
      return initializeDemo(LazyFilterGridMarkup, () => {
        resetFeature(features, 'dom-state-handler')
        function addFilterableLazyGridFeature({ namespace, baseActionUrl }) {
          resetFeature(features, `${namespace}-filter-handler`)
          features.add(`${namespace}-filter-handler`, DomStateHandler, {
            domState: new DomState({
              namespace: `${namespace}-filter-state`
            })
          })

          // This is only required because in jekyll (Github Pages) no server side logic is possible
          // The alternative would be to extend webpack to transform html files and resolve URLs
          class CustomElementLoader extends ElementLoader {
            fetchHtml({ url }) {
              return utils.fetch
                .text(url, utils.fetch.defaultOptions)
                .then(html =>
                  html.replace('__ELEMENT_LOADER_DATA_URL__', grid2)
                )
            }
          }
          resetFeature(features, `${namespace}-initial-loader`)
          features.add(`${namespace}-initial-loader`, CustomElementLoader, {
            loadTriggerEventMultiple: true
          })

          resetFeature(features, `${namespace}-load-more`)
          features.add(`${namespace}-load-more`, ElementLoader, {
            replaceRootElement: true
          })
          const initLoadMoreButton = () => {
            const loadMore = () => {
              eventHub.trigger(`${namespace}:load-more`)
              $loadMoreBtn.removeEventListener('click', loadMore)
            }
            const $loadMoreBtn = document.getElementById('load-more')
            if ($loadMoreBtn) {
              $loadMoreBtn.addEventListener('click', loadMore)
            }
          }

          // TODO: currently these events won't get removed in storybook upon destruction (resulting in re-init)
          eventHub.on(`${namespace}-load-initial:appended`, initLoadMoreButton)
          eventHub.on(`${namespace}:appended`, initLoadMoreButton)

          eventHub.on(`${namespace}-filter-state:state-update`, query => {
            eventHub.trigger(`${namespace}:load-items`, {
              url: `${baseActionUrl}?initialRender=true&${query}`
            })
          })
        }

        addFilterableLazyGridFeature({
          namespace: 'lazy-grid',
          baseActionUrl: grid
        })
        resetFeature(features, 'masonry')
        features.add('masonry', Masonry)
        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: LazyFilterGridDocs
      }
    }
  )
  .add('Source JS', () => {
    return styleSource({ feature: 'dom-state-handler' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'dom-state-handler', language: 'sass' })
  })