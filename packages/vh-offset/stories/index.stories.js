import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import VhOffset from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const markup = `
<style>
:root {
  --vh-offset: 0px;
  --vh-offset-dynamic: 0px;
}
body {
  padding: 0;
  margin: 0;
}

.container {
  width: 100%;
  display: flex;
  height: 3000px;
}

.element {
  position: relative;
  flex-grow: 1;
}

.element p {
    position: absolute;
    bottom: 0;
    padding: 0;
    margin: 0;
}

.natural-vh {
  height: 100vh;
  background-color: green;
}

.fix-vh {
  height: 100vh;
  height: calc(100vh - var(--vh-offset));
  background-color: red;
}

.dynamic-vh {
  height: 100vh;
  height: calc(100vh - var(--vh-offset-dynamic));
  background-color: yellow;
}
</style>

<div class="container" data-feature="vh-offset, vh-offset-dynamic">
  <div class="element natural-vh">
    <p>really important</p>
  </div>
  <div class="element fix-vh">
    <p>really important</p>
  </div>
  <div class="element dynamic-vh">
    <p>really important</p>
  </div>
</div>
`

storiesOf('VhOffset', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'vh-offset')
        features.add(
          'vh-offset',
          VhOffset,
          object('options', VhOffset.defaultOptions)
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
    return styleSource({ feature: 'vh-offset' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'vh-offset', language: 'sass' })
  })
