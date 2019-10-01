import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'

import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import Modal from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const markup = `
<div class="ft-modal -default -animated" aria-hidden="true" data-feature="modal" data-modal-identifier="sample-id"">

  <!--
    Overlay related notes:
    - It has to have the \`tabindex="-1"\` attribute.
    - It doesn’t have to have the \`data-a11y-dialog-hide\` attribute, however this is recommended. It hides the dialog when clicking outside of it.
  -->
  <div class="dialog-overlay" tabindex="-1" data-a11y-dialog-hide></div>

  <!--
    Dialog window content related notes:
    - It is the actual visual dialog element.
    - It has to have the \`role="dialog"\` attribute.
    - It doesn’t have to have the \`aria-labelledby\` attribute however this is recommended. It should match the \`id\` of the dialog title.
    - It doesn’t have to have a direct child with the \`role="document"\`, however this is recommended.
  -->
  <div role="dialog" class="dialog-content" data-cy="modal-content">
    <div role="document">
      <!--
        Closing button related notes:
        - It does have to have the \`type="button"\` attribute.
        - It does have to have the \`data-a11y-dialog-hide\` attribute.
        - It does have to have an aria-label attribute if you use an icon as content.
      -->
      <button class="dialog-close" type="button" data-a11y-dialog-hide aria-label="Schliessen" data-cy="modal-close">
        &times;
      </button>

      <!--
        Dialog title related notes:
        - It should have a different content than \`Dialog Title\`.
        - It can have a different id than \`dialog-title\`.
      -->
      Content which can use multiple divs
      <!--
        Here lives the main content of the dialog.
      -->
    </div>
  </div>
</div>
`

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'modal')
        features.add('modal', Modal, object('options', Modal.defaultOptions))
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
    return styleSource({ feature: 'modal' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'modal', language: 'sass' })
  })
