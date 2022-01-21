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
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    border: 1px solid black;
  }
  .menu__item {
    position: relative;
    margin-right: 15px;
  }
  .menu__content {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: .3s;
    border: 1px solid black;
    padding: 15px;
    margin: 0;
    list-style-type: none;
  }
  .menu__content.-active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .menu__content.-active {
    opacity: 1;
    visibility: visible;
  }
  .menu__entry {
    margin-bottom: 8px;
  }
  .menu__link {
    white-space: nowrap;
  }
  .close-icon {
    margin-bottom: 8px;
    cursor: pointer;
  }
</style>
`

const markup = `
${styling}
<ul class="menu">
  <li class="menu__item" data-feature="menu" data-menu-identifier="menu-1">
    <button class="menu__trigger" data-menu-trigger>
      Item 1
    </button>
    <ul class="menu__content" data-menu-menu>
      <div class="close-icon" data-menu-close-button>
        X
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
      <div class="close-icon" data-menu-close-button>
          X
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
      <div class="close-icon" data-menu-close-button>
          X
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
    'Hover',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'menu')
        features.add(
          'menu',
          Menu,
          object('options', {
            triggerOnHover: true,
            triggerOnHoverWhenOpen: true,
            closeOnTriggerClick: false,
            closeOnOutsideClick: true,
            activeClass: '-active',
            closingClass: '-closing',
            attributes: {
              menu: 'data-menu-menu',
              trigger: 'data-menu-trigger',
              closeBtn: 'data-menu-close-button'
            }
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
    'Click',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'menu')
        features.add(
          'menu',
          Menu,
          object('options', {
            triggerOnHover: false,
            triggerOnHoverWhenOpen: true,
            closeOnTriggerClick: false,
            closeOnOutsideClick: true,
            activeClass: '-active',
            closingClass: '-closing',
            attributes: {
              menu: 'data-menu-menu',
              trigger: 'data-menu-trigger',
              closeBtn: 'data-menu-close-button'
            }
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
