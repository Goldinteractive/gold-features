import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'

import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import SweetModal, { contentStrategies, SweetModalTrigger } from '../src/index'
import 'sweetalert2/src/sweetalert2.scss'
import '../src/style.scss'

import docs from './docs.md'
import testJpg from './files/test.jpeg'

const styles = `
  <style>
    .hide {
      display: none;
    }

    h2 {
      font-size: 25px;
      color: blue;
    }

    .swal2-content {
      text-align: left;
    }

    .iframe {
      width: 100%;
      height: 20vh;
    }
  </style>
`

const markupIntro = `
${styles}
<div class="hide">
  <div class="content" data-feature="sweet-modal" data-sweet-modal-content data-modal-identifier="sample-id">
    <div data-cy="sweet-modal-content">
      <h2>Sweet Modal</h2>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
      <img src="${testJpg}" width="200" />
    </div>
  </div>
</div>
<button data-feature="sweet-modal-trigger" data-modal-identifier="sample-id" data-cy="trigger">Trigger</button>
<div data-modal-state>
  <h3>States log:</h3>
</div>
`

const markupOpenOnLoad = `
${styles}
<div class="hide">
  <div class="content" data-feature="sweet-modal" data-modal-identifier="sample-id">
    <h2>Open on load by delay</h2>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
    <img src="${testJpg}" width="200" />
  </div>
</div>
<div data-modal-state>
  <h3>States log:</h3>
</div>
`

const markupVideo = `
${styles}
<div data-feature="sweet-modal" data-modal-identifier="sample-id1" data-video-url="https://www.youtube.com/embed/ScMzIvxBSi4?rel=0"></div>
<div data-feature="sweet-modal" data-modal-identifier="sample-id2" data-video-url="https://www.youtube.com/embed/y2Ky3Wo37AY?rel=0"></div>
<div data-feature="sweet-modal" data-modal-identifier="sample-id3" data-video-url="https://www.youtube.com/embed/zlRl8sJU_4I?rel=0"></div>

<button data-feature="sweet-modal-trigger" data-modal-identifier="sample-id1">Video 1</button>
<button data-feature="sweet-modal-trigger" data-modal-identifier="sample-id2">Video 2</button>
<button data-feature="sweet-modal-trigger" data-modal-identifier="sample-id3">Video 3</button>
`

storiesOf('SweetModal', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markupIntro, () => {
        resetFeature(features, 'sweet-modal')
        resetFeature(features, 'sweet-modal-trigger')
        features.add('sweet-modal', SweetModal, object('options', {
          strategy: new contentStrategies.HtmlTemplate({
            contentSelector: '[data-sweet-modal-content]',
          })})
        )
        features.add('sweet-modal-trigger', SweetModalTrigger)
        features.init(document.body)
        initEvents()
      })
    },
    {
      notes: {
        markdown: docs
      }
    }
  )
  .add(
    'OpenOnLoadWithDelay',
    () => {
      return initializeDemo(markupOpenOnLoad, () => {
        resetFeature(features, 'sweet-modal')
        features.add('sweet-modal', SweetModal, object('options', {
          strategy: new contentStrategies.HtmlTemplate(),
          openOnLoad: true,
          delay: 2000
        }))
        features.init(document.body)

        setTimeout(() => {
          eventHub.trigger('sample-id:close')
        }, 6000);
        initEvents()
      })
    },
    {
      notes: {
        markdown: docs
      }
    }
  )
  .add(
    'Video',
    () => {
      return initializeDemo(markupVideo, () => {
        resetFeature(features, 'sweet-modal')
        resetFeature(features, 'sweet-modal-trigger')
        features.add('sweet-modal', SweetModal, object('options', {
          strategy: new contentStrategies.Video(),
          swalConfig: {
            width: 'auto',
          }
        }))
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

  const initEvents = () => {
    const $modalState = document.querySelector('[data-modal-state]')
    eventHub.on('sample-id:open',() => {
      let p = document.createElement("p");
      p.textContent = 'open'
      $modalState.appendChild(p)
    })
    eventHub.on('sample-id:close',() => {
      let p = document.createElement("p");
      p.textContent = 'close'
      $modalState.appendChild(p)
    })
    eventHub.on('sample-id:will-open',() => {
      let p = document.createElement("p");
      p.textContent = 'will-open'
      $modalState.appendChild(p)
    })
    eventHub.on('sample-id:did-open',() => {
      let p = document.createElement("p");
      p.textContent = 'did-open'
      $modalState.appendChild(p)
    })
    eventHub.on('sample-id:will-close',() => {
      let p = document.createElement("p");
      p.textContent = 'will-close'
      $modalState.appendChild(p)
    })
    eventHub.on('sample-id:did-close',() => {
      let p = document.createElement("p");
      p.textContent = 'did-close'
      $modalState.appendChild(p)
    })
    eventHub.on('sample-id:did-render',() => {
      let p = document.createElement("p");
      p.textContent = 'did-render'
      $modalState.appendChild(p)
    })
    eventHub.on('sample-id:did-destroy',() => {
      let p = document.createElement("p");
      p.textContent = 'did-destroy'
      $modalState.appendChild(p)
    })
  }
