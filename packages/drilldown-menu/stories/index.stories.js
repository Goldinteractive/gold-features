import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import DrilldownMenu from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const markup = `
<style>
  .drilldown__menu {
    position: relative;
    overflow: hidden;
  }
  .drilldown__submenu {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    visibility: hidden;
    background: green;
    transform: translateX(100%);
    transition: transform .3s;
  }
  .drilldown__submenu--active {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }
  .drilldown__submenu--is-closing {
    opacity: 1;
    visibility: visible;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .drilldown__static-back-btn {
    display: none;
  }
  .drilldown__static-back-btn--active {
    display: block;
  }
  .drilldown__static-title {
    display: none;
  }
  .drilldown__static-title--active {
    display: block;
  }
</style>

<div data-feature="drilldown-menu">
  <button class="drilldown__static-back-btn" data-drilldown-back-static>Back (static)</button>
  <span class="drilldown__static-title" data-drilldown-title-static>Title (static)</span>
  <ul class="drilldown__menu" data-drilldown-menu>
    <li class="drilldown__entry">
      <button data-drilldown-submenu-trigger data-drilldown-tab-target>Item 1</button>
      <ul class="drilldown__submenu" data-drilldown-submenu>
        <button data-drilldown-back data-drilldown-tab-target>Back</button>
        <span>Title lvl1</span>
        <li class="drilldown__entry"><a href="/1-1" data-drilldown-tab-target>Item 1-1</a></li>
        <li class="drilldown__entry"><a href="/1-2" data-drilldown-tab-target>Item 1-2</a></li>
        <li class="drilldown__entry">
          <button data-drilldown-submenu-trigger data-drilldown-tab-target>Item 1-3</button>
          <ul class="drilldown__submenu" data-drilldown-submenu>
            <button data-drilldown-back data-drilldown-tab-target>Back</button>
            <span>Title lvl2</span>
            <li class="drilldown__entry"><a href="/2-1" data-drilldown-tab-target>Item 2-1</a></li>
            <li class="drilldown__entry"><a href="/2-2" data-drilldown-tab-target>Item 2-2</a></li>
            <li class="drilldown__entry" data-drilldown-init-active><a href="/iframe.html" data-drilldown-tab-target>Item iframe!</a></li>
          </ul>
        </li>
        <li class="drilldown__entry"><a href="/1-2" data-drilldown-tab-target>Item 1-4</a></li>
        <li class="drilldown__entry"><a href="/1-2" data-drilldown-tab-target>Item 1-5</a></li>
        <li class="drilldown__entry"><a href="/1-2" data-drilldown-tab-target>Item 1-6</a></li>
        <li class="drilldown__entry"><a href="/1-2" data-drilldown-tab-target>Item 1-7</a></li>
        <li class="drilldown__entry"><a href="/1-2" data-drilldown-tab-target>Item 1-8</a></li>
      </ul>
    </li>
    <li class="drilldown__entry"><a href="/2" data-drilldown-tab-target>Item 2</a></li>
    <li class="drilldown__entry"><a href="/3" data-drilldown-tab-target>Item 3</a></li>
    <li class="drilldown__entry"><a href="/4" data-drilldown-tab-target>Item 4</a></li>
  </ul>
</div>
`

storiesOf('DrilldownMenu', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'drilldown-menu')
        features.add(
          'drilldown-menu',
          DrilldownMenu,
          object('options', DrilldownMenu.defaultOptions)
        )
        features.init(document.body)
        // eventHub.trigger('sample-id:open')
      })
    },
    {
      notes: {
        markdown: docs
      }
    }
  )
  .add('Source JS', () => {
    return styleSource({ feature: 'drilldown-menu' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'drilldown-menu', language: 'sass' })
  })
