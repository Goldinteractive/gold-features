import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'

import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import SweetModal, { SweetModalTrigger } from '../src/index'
import '../src/style.scss'

import docs from './docs.md'
import testJpg from './files/test.jpeg'

const markup = `<div class="ft-sweet-modal" data-feature="sweet-modal" data-modal-identifier="sample-id">
  <div class="content" data-sweet-modal-content>
    <h2>Sweet Modal</h2>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
  </div>
  <img src="${testJpg}" width="200" />
  <button data-feature="sweet-modal-trigger" data-modal-identifier="sample-id" data-cy="trigger">Trigger</button>
</div>
`

storiesOf('SweetModal', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'sweet-modal')
        features.add('sweet-modal', SweetModal)
        features.add('sweet-modal-trigger', SweetModalTrigger)
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
    return styleSource({ feature: 'sweet-modal' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'sweet-modal', language: 'sass' })
  })
