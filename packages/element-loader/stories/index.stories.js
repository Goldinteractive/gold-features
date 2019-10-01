import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import ElementLoader from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

import lazilyLoaded from '!file-loader!./files/lazily-loaded.html'
import inlineLoaded from '!file-loader!./files/inline-loaded.html'
import inlineLoadedDeferred from '!file-loader!./files/inline-loaded-deferred.html'

const markup = `
<ul>
  <li>Static</li>
  <li data-feature="element-loader" data-element-loader-url="${lazilyLoaded}">
    <span data-cy="loader">Loading...</span>
  </li>
  <li data-feature="element-loader-inline" data-element-loader-url="${inlineLoaded}"></li>
  <li>Static</li>
  <li data-feature="element-loader-inline" data-element-loader-url="${inlineLoadedDeferred}" data-element-loader-event="sample-id:open">loaded when button gets clicked</li>
  <li data-feature="element-loader-inline" data-element-loader-event="sample-id:open-custom-url">loaded when button gets clicked using custom url</li>
</ul>
<button id="load-element" data-cy="load-element">Load element</button>
`

storiesOf('ElementLoader', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'element-loader')
        resetFeature(features, 'element-loader-inline')
        features.add('element-loader', ElementLoader, {
          replaceRootElement: true
        })
        features.add('element-loader-inline', ElementLoader, {
          ...object('options', ElementLoader.defaultOptions),
          contentExitAnimation: function(args) {
            action('exit animation start')(args)
            return new Promise(function(resolve) {
              setTimeout(function() {
                resolve()
              }, 2000)
            })
          }
        })
        features.init(document.body)

        document
          .getElementById('load-element')
          .addEventListener('click', function() {
            eventHub.trigger('sample-id:open')
            eventHub.trigger('sample-id:open-custom-url', {
              url: inlineLoadedDeferred
            })
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
    return styleSource({ feature: 'element-loader' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'element-loader', language: 'sass' })
  })
