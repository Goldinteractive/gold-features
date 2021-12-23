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
    background: green;
    transform: translateX(100%);
    transition: transform .3s;
  }
  .drilldown__submenu--active {
    opacity: 1;
    transform: translateX(0);

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
    <li>
      <a data-drilldown-submenu-trigger>Item 1</a>
      <ul class="drilldown__submenu" data-drilldown-submenu="1">
        <button data-drilldown-back>Back</button>
        <span>Title lvl1</span>
        <li><a href="/1-1">Item 1-1</a></li>
        <li><a href="/1-2">Item 1-2</a></li>
        <li>
          <a data-drilldown-submenu-trigger>Item 1-3</a>
          <ul class="drilldown__submenu" data-drilldown-submenu="1">
            <button data-drilldown-back>Back</button>
            <span>Title lvl2</span>
            <li><a href="/2-1">Item 2-1</a></li>
            <li><a href="/2-2">Item 2-2</a></li>
            <li><a href="/iframe.html">Item iframe!</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="/2">Item 2</a></li>
    <li><a href="/3">Item 3</a></li>
    <li><a href="/4">Item 4</a></li>
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
