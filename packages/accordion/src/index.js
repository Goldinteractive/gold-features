import { features } from '@goldinteractive/js-base'
import { utils } from '@goldinteractive/js-base'

import Handorgel from 'handorgel'

console.log(Handorgel);

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
  }

  update(transition = true) {
    var hash = utils.url.hash()

    if (hash.indexOf('/') === 0) {
      var id = hash.substr(1)
      var $header = this.$(`[data-accordion-scroll-id="${id}"]`)

      if ($header && $header.handorgelFold) {
        if (this.options.cleanHashAfterScrolling) {
          history.replaceState('', document.title, window.location.pathname + window.location.search)
        }

        if ($header.handorgelFold.expanded) { // fold is open
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
    return (e) => {
      this.update()
    }
  }

}

Accordion.defaultOptions = {
  scroller: null,
  cleanHashAfterScrolling: true,
  // handorgel options
  initialOpenTransition: true
}

export default Accordion
