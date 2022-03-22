import { features } from '@goldinteractive/js-base'
import { utils } from '@goldinteractive/js-base'

import Handorgel from 'handorgel'

const ric =
  window.requestIdleCallback ||
  window.requestAnimationFrame ||
  (func => setTimeout(func, 100))

/**
 * Accordion feature class.
 */
class Accordion extends features.Feature {
  init() {
    this.handorgel = new Handorgel(this.node, this.options)

    if (this.options.initialOpenTransition) {
      window.setTimeout(() => {
        this._init(true)
      }, this.options.initialOpenTransitionDelay || Handorgel.defaultOptions.initialOpenTransitionDelay)
    } else {
      this._init(false)
    }

    this.accordionIdentifier = this.node.dataset.accordionIdentifier
    this.connectToEventHub = !!this.accordionIdentifier

    if (this.connectToEventHub) {
      this.registerEventHub()
    }

    const hash = location.hash
    this.openEntryByUrl(hash)
  }

  registerEventHub() {
    const open = this.actOnFold('open')
    const close = this.actOnFold('close')
    const toggle = this.actOnFold('toggle')

    this.onHub(`accordion:${this.accordionIdentifier}:open`, open)
    this.onHub(`accordion:${this.accordionIdentifier}:close`, close)
    this.onHub(`accordion:${this.accordionIdentifier}:toggle`, toggle)

    this.options.watchedAccordionEvents.forEach(event => {
      this.handorgel.on(event, (...params) =>
        this.triggerAccordionToEventHub(event, params)
      )
    })
  }

  triggerAccordionToEventHub = (event, ...params) => {
    this.triggerHub(
      this.options.createEventName(this.accordionIdentifier, event),
      { params }
    )
  }

  actOnFold(method) {
    return ({ foldId, params = [] }) => {
      const fold = this.getFoldById(foldId)
      if (fold) {
        fold[method](...params)
      } else {
        console.warn(
          `no fold found with id: '${foldId}' in accordion with id: '${
            this.accordionIdentifier
          }'`
        )
      }
    }
  }

  getFoldById(foldId) {
    return (
      this.handorgel.folds.filter(fold =>
        this.options.findFoldById(fold, foldId)
      )[0] || null
    )
  }

  update(transition = true) {
    var hash = utils.url.hash()

    if (hash.indexOf('/') === 0) {
      var id = hash.substr(1)
      var $header = this.$(`[data-accordion-scroll-id="${id}"]`)

      if ($header && $header.handorgelFold) {
        if (this.options.cleanHashAfterScrolling) {
          history.replaceState(
            '',
            document.title,
            window.location.pathname + window.location.search
          )
        }

        if ($header.handorgelFold.expanded) {
          // fold is open
          // scroll directly to it
          this.scrollToHeader($header)
        } else {
          // scroll to fold after it has opened
          this.handorgel.once('fold:opened', () => {
            this.scrollToHeader($header)
          })

          $header.handorgelFold.open(transition)
        }
      }
    }
  }

  scrollToHeader($header) {
    if (!this.options.scroller) {
      return
    }

    this.options.scroller.toElement($header, {
      // focus fold when scrolling has finished
      cb: () => {
        $header.handorgelFold.focus()
      }
    })
  }

  destroy() {
    super.destroy()
    this.handorgel.destroy()
  }

  _init(transition) {
    this.update(transition)
    this.addEventListener(window, 'hashchange', this._hashChanged())
  }

  _hashChanged() {
    return e => {
      this.update()
    }
  }

  openEntryByUrl(hash) {
    if (!hash) return

    const slug = hash.slice(1)
    const fold = this.getFoldById(slug)
    if (fold) {
      ric(() => {
        if (window.pageYOffset === 0 && this.options.scroller) {
          const onFoldOpened = () => {
            window.addEventListener('load', () => {
              this.options.scroller.toElement(fold.button)
            })
            this.options.scroller.toElement(fold.button)
            this.handorgel.off('fold:opened', onFoldOpened)
          }
          this.handorgel.on('fold:opened', onFoldOpened)
        }
        fold.open()
      })
    } else {
      console.warn('no fold found with given hash', hash)
    }
  }
}

Accordion.defaultOptions = {
  scroller: null,
  cleanHashAfterScrolling: true,
  // handorgel options
  initialOpenTransition: true,
  createEventName: (id, event) => {
    return `accordion:${id}:eventTriggered:${event}`
  },
  findFoldById: (currentFold, foldId) => {
    return currentFold.header.dataset.foldId === foldId
  },
  watchedAccordionEvents: [
    'fold:open',
    'fold:opened',
    'fold:close',
    'fold:closed',
    'fold:focus',
    'fold:blur'
  ]
}

export default Accordion
