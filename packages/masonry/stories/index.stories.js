import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import Masonry from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const markup = `
<style>
.grid {position: relative; }
.grid-sizer { width: 33%; }
.grid-item { width: 33%; background-color: orange; height: 40px; box-shadow: inset 0 0 5px #000000; text-align: center;}
.grid-item:nth-child(even) { background-color: green; }
.grid-item--width2 { width: 66%; }
.grid-item--height2 { height: 80px; }
.grid-item--height3 { height: 160px; }
</style>

<div class="ft-masonry -hidden grid" data-feature="masonry" data-masonry-identifier="sample-id">
  <div class="grid-sizer"></div>
  <div class="grid-item">1 - ...</div>
  <div class="grid-item grid-item--width2">2 - Wide</div>
  <div class="grid-item grid-item--height2">3 - Tall</div>
  <div class="grid-item" id="resizer">4 - ...</div>
  <div class="grid-item grid-item--height3">5 - Taller</div>
  <div class="grid-item">5 - ...</div>
  <div class="grid-item grid-item--height2">6 - Tall</div>
  <div class="grid-item grid-item--height3">5 - Taller</div>
  <div class="grid-item grid-item--height3">7 - Tall</div>
  <div class="grid-item">8 - ...</div>
  <div class="grid-item grid-item--width2">9 - ...</div>
</div>
<button id="append">Append items</button>
`

storiesOf('Masonry', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'masonry')
        features.add(
          'masonry',
          Masonry,
          object('options', Masonry.defaultOptions)
        )
        features.init(document.body)

        document.getElementById('append').addEventListener('click', function() {
          const div1 = document.createElement('div')
          const div2 = document.createElement('div')
          const div3 = document.createElement('div')
          div1.className = 'grid-item'
          div2.className = 'grid-item grid-item--height3'
          div3.className = 'grid-item grid-item--width2 grid-item--height3'

          const masonryContainer = document.querySelector(
            '[data-feature="masonry"]'
          )

          masonryContainer.appendChild(div1)
          masonryContainer.appendChild(div2)
          masonryContainer.appendChild(div3)

          eventHub.trigger('sample-id:appended', [div1, div2, div3])
        })
      })
    },
    {
      notes: {
        markdown: docs
      }
    }
  )
  .add('Source JS', () => {
    return styleSource({ feature: 'masonry' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'masonry', language: 'sass' })
  })
