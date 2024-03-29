import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features } from '@goldinteractive/js-base'

import DrilldownMenu from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const styling = `
<style>
  .drilldown-container {
    width: 300px;
    position: relative;
  }
  .drilldown__menu {
    border: 1px solid black;
  }
  .drilldown__static-title {
    font-weight: bold;
  }
  .drilldown__title {
    font-weight: bold;
  }
</style>
`

const markupStatic = `
${styling}
<div class="drilldown-container" data-feature="drilldown-menu">
  <button class="drilldown__static-back-btn" data-drilldown-back-static>Back (static)</button>
  <span class="drilldown__static-title" data-drilldown-title-static>Title (static)</span>
  <ul class="drilldown__menu" data-drilldown-menu>
    <li class="drilldown__entry">
      <button data-drilldown-submenu-trigger data-drilldown-tab-target>Item 1</button>
      <ul class="drilldown__submenu" data-drilldown-submenu>
        <li class="drilldown__entry"><a href="#1-1" data-drilldown-tab-target>Item 1-1</a></li>
        <li class="drilldown__entry"><a href="#1-2" data-drilldown-tab-target>Item 1-2</a></li>
        <li class="drilldown__entry">
          <button data-drilldown-submenu-trigger data-drilldown-tab-target>Item 1-3</button>
          <ul class="drilldown__submenu" data-drilldown-submenu>
            <li class="drilldown__entry"><a href="#2-1" data-drilldown-tab-target>Item 2-1</a></li>
            <li class="drilldown__entry"><a href="#2-2" data-drilldown-tab-target>Item 2-2</a></li>
            <li class="drilldown__entry" data-drilldown-init-active><a href="#2-3" data-drilldown-tab-target>Item 2-3 (init active)</a></li>
          </ul>
        </li>
        <li class="drilldown__entry"><a href="#1-4" data-drilldown-tab-target>Item 1-4</a></li>
        <li class="drilldown__entry"><a href="#1-5" data-drilldown-tab-target>Item 1-5</a></li>
        <li class="drilldown__entry"><a href="#1-6" data-drilldown-tab-target>Item 1-6</a></li>
        <li class="drilldown__entry"><a href="#1-7" data-drilldown-tab-target>Item 1-7</a></li>
        <li class="drilldown__entry"><a href="#1-8" data-drilldown-tab-target>Item 1-8</a></li>
      </ul>
    </li>
    <li class="drilldown__entry"><a href="#2" data-drilldown-tab-target>Item 2</a></li>
    <li class="drilldown__entry"><a href="#3" data-drilldown-tab-target>Item 3</a></li>
    <li class="drilldown__entry"><a href="#4" data-drilldown-tab-target>Item 4</a></li>
  </ul>
</div>
`
const markupDynamic = `
${styling}
<div class="drilldown-container" data-feature="drilldown-menu">
  <ul class="drilldown__menu" data-drilldown-menu>
    <li class="drilldown__entry">
      <button data-drilldown-submenu-trigger data-drilldown-tab-target>Item 1</button>
      <ul class="drilldown__submenu" data-drilldown-submenu>
        <button data-drilldown-back data-drilldown-tab-target>Back</button>
        <span class="drilldown__title">Title lvl1</span>
        <li class="drilldown__entry"><a href="#1-1" data-drilldown-tab-target>Item 1-1</a></li>
        <li class="drilldown__entry"><a href="#1-2" data-drilldown-tab-target>Item 1-2</a></li>
        <li class="drilldown__entry">
          <button data-drilldown-submenu-trigger data-drilldown-tab-target>Item 1-3</button>
          <ul class="drilldown__submenu" data-drilldown-submenu>
            <button data-drilldown-back data-drilldown-tab-target>Back</button>
            <span class="drilldown__title">Title lvl2</span>
            <li class="drilldown__entry"><a href="#2-1" data-drilldown-tab-target>Item 2-1</a></li>
            <li class="drilldown__entry"><a href="#2-2" data-drilldown-tab-target>Item 2-2</a></li>
            <li class="drilldown__entry" data-drilldown-init-active><a href="#2-3" data-drilldown-tab-target>Item 2-3 (init active)</a></li>
          </ul>
        </li>
        <li class="drilldown__entry"><a href="#1-4" data-drilldown-tab-target>Item 1-4</a></li>
        <li class="drilldown__entry"><a href="#1-5" data-drilldown-tab-target>Item 1-5</a></li>
        <li class="drilldown__entry"><a href="#1-6" data-drilldown-tab-target>Item 1-6</a></li>
        <li class="drilldown__entry"><a href="#1-7" data-drilldown-tab-target>Item 1-7</a></li>
        <li class="drilldown__entry"><a href="#1-8" data-drilldown-tab-target>Item 1-8</a></li>
      </ul>
    </li>
    <li class="drilldown__entry"><a href="#2" data-drilldown-tab-target>Item 2</a></li>
    <li class="drilldown__entry"><a href="#3" data-drilldown-tab-target>Item 3</a></li>
    <li class="drilldown__entry"><a href="#4" data-drilldown-tab-target>Item 4</a></li>
  </ul>
</div>
`

storiesOf('DrilldownMenu', module)
  .addDecorator(withKnobs)
  .add(
    'Static',
    () => {
      return initializeDemo(markupStatic, () => {
        resetFeature(features, 'drilldown-menu')
        features.add(
          'drilldown-menu',
          DrilldownMenu,
          object('options', {
            namespace: 'drilldown-menu',
            autoHeight: true,
            staticBackBtn: true,
            staticTitle: true,
            openOnCurrentLevel: true
          })
        )
        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: docs
      }
    }
  )
  .add(
    'Dynamic',
    () => {
      return initializeDemo(markupDynamic, () => {
        resetFeature(features, 'drilldown-menu')
        features.add(
          'drilldown-menu',
          DrilldownMenu,
          object('options', {
            namespace: 'drilldown-menu',
            autoHeight: true,
            staticBackBtn: false,
            staticTitle: false,
            openOnCurrentLevel: true,
          })
        )
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
    return styleSource({ feature: 'drilldown-menu' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'drilldown-menu', language: 'sass' })
  })
