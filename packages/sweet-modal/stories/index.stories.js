import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'

import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import SweetModal from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const markup = `<div class="ft-sweet-modal" data-feature="sweet-modal" data-sweet-modal-identifier="sample-id"">
  <div class="content" data-content>
    <h2>Sweet Modal</h2>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
  </div>
</div>
`

storiesOf('SweetModal', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'sweet-modal')
        features.add('sweet-modal', SweetModal, object('options', SweetModal.defaultOptions))
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
