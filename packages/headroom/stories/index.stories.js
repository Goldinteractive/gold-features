import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import Headroom from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const markup = `
<style>
.top {
  display: none;
}
.header.-top .top {
  display: block;
}
.header-in:before {
  content: 'header visible';
  position: fixed;
  right: 0;
}
</style>
<header class="header" role="banner" data-feature="headroom" data-cy="header">
    Gold Site
    <p class="top" data-cy="element">top</p>
</header>
<div style="height: 2000px;">

</div>
`

storiesOf('Headroom', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'headroom')
        features.add(
          'headroom',
          Headroom,
          object('options', Headroom.defaultOptions)
        )
        features.init(document.body)
        eventHub.trigger('sample-id:open')
      })
    },
    {
      notes: {
        markdown: docs
      }
    }
  )
  .add('Source JS', () => {
    return styleSource({ feature: 'headroom' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'headroom', language: 'sass' })
  })
