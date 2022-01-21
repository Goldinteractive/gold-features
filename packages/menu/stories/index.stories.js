import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features } from '@goldinteractive/js-base'

import Menu from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const styling = `
<style>
  .menu {
    padding: none;
    margin: none;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    background: gray;
  }
  .menu__content {
    opacity: 0;
    visibility: hidden;
    background: green;
    transform: translateY(10px);
    transition: .3s;
  }
  .menu__content.-active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
</style>
`

const markupStatic = `
${styling}
<ul class="menu">
  <li class="menu__item" data-feature="menu" data-menu-identifier="menu-1">
    <button class="menu__trigger" data-menu-trigger>
      Item 1
    </button>
    <ul class="menu__content" data-menu-menu>
      <span class="menu__title">Item 1</span>
      <div class="close-icon">
          <span class="icon close-icon" data-feature="icon" data-icon="close" data-menu-close-button></span>
      </div>
      <li class="menu__entry">
        <a class="menu__link" href="#1">Subitem 1</a>
      </li>
      <li class="menu__entry">
        <a class="menu__link" href="#2">Subitem 2</a>
      </li>
      <li class="menu__entry">
        <a class="menu__link" href="#3">Subitem 3</a>
      </li>
    </ul>
  </li>
  <li class="menu__item" data-feature="menu" data-menu-identifier="menu-2">
    <button class="menu__trigger" data-menu-trigger>
      Item 2
    </button>
    <ul class="menu__content" data-menu-menu>
      <span class="menu__title">Item 2</span>
      <div class="close-icon">
          <span class="icon close-icon" data-feature="icon" data-icon="close" data-menu-close-button></span>
      </div>
      <li class="menu__entry">
        <a class="menu__link" href="#1">Subitem 1</a>
      </li>
      <li class="menu__entry">
        <a class="menu__link" href="#2">Subitem 2</a>
      </li>
      <li class="menu__entry">
        <a class="menu__link" href="#3">Subitem 3</a>
      </li>
    </ul>
  </li>
  <li class="menu__item" data-feature="menu" data-menu-identifier="menu-3">
    <button class="menu__trigger" data-menu-trigger>
      Item 3
    </button>
    <ul class="menu__content" data-menu-menu>
      <span class="menu__title">Item 3</span>
      <div class="close-icon">
          <span class="icon close-icon" data-feature="icon" data-icon="close" data-menu-close-button></span>
      </div>
      <li class="menu__entry">
        <a class="menu__link" href="#1">Subitem 1</a>
      </li>
      <li class="menu__entry">
        <a class="menu__link" href="#2">Subitem 2</a>
      </li>
      <li class="menu__entry">
        <a class="menu__link" href="#3">Subitem 3</a>
      </li>
    </ul>
  </li>
</ul>
`

storiesOf('Menu', module)
  .addDecorator(withKnobs)
  .add(
    'Static',
    () => {
      return initializeDemo(markupStatic, () => {
        resetFeature(features, 'menu')
        features.add(
          'menu',
          Menu,
          object('options', {
            // namespace: 'drilldown-menu',
            // autoHeight: true,
            // staticBackBtn: true,
            // staticTitle: true,
            // openOnCurrentLevel: true
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
    return styleSource({ feature: 'menu' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'menu', language: 'sass' })
  })
