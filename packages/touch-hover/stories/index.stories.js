import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import TouchHover from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const markup = `
<style>
p {
  text-align: center;
  margin: 20px 70px;
}

h2 {
  margin-top: 50px;
}

@import '../src/style';

ul {
  list-style: none;
  padding-left: 0;
}

ul li {
  padding: 4px 0;
}

ul li ul {
  display: none;
  padding-left: 20px;
}

ul li a {
  display: block;
  text-decoration: none;
  padding: 2px 5px;
  color: #fff;
  background-color: brown;
}

ul li.-active ul {
  display: block;
  margin: 0;
}

ul li.-clicked a {
  color: red;
}

@media (max-width: 400px) {
  ul li.-current ul {
    display: block;
  }
}
</style>

<ul>
  <li class="ft-touch-hover" data-feature="touch-hover">
      <a href="http://example.com" target="_blank">Test (initially closed)</a>
      <ul>
          <li>
            <a href="http://google.com" target="_blank">Test 1.1</a>
          </li>
      </ul>
  </li>
  <li class="ft-touch-hover -active" data-feature="touch-hover">
    <a href="http://example.com" target="_blank">Test 2 (initially opened with active class)</a>
    <ul>
      <li>
        <a href="http://google.com" target="_blank">Test 2.1</a>
      </li>
    </ul>
  </li>
  <li>
    <a href="http://example.com" target="_blank">Test 3 (menu item without submenu)</a>
  </li>
  <li class="ft-touch-hover -current" data-feature="touch-hover">
    <a href="http://example.com" target="_blank">Test 4 (initially opened without active class just on mobile)</a>
    <ul>
      <li>
        <a href="http://google.com" target="_blank">Test 4.1</a>
      </li>
    </ul>
  </li>
</ul>
`

storiesOf('TouchHover', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'touch-hover')
        features.add(
          'touch-hover',
          TouchHover,
          object('options', TouchHover.defaultOptions)
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
    return styleSource({ feature: 'touch-hover' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'touch-hover', language: 'sass' })
  })
