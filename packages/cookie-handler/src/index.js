import { features } from '@goldinteractive/js-base'
import invariant from 'tiny-invariant'

import Cookies from 'js-cookie'

class CookieHandler extends features.Feature {
  init() {
    this.cookieIdentifier =
      this.node.dataset.cookieIdentifier || this.options.cookieIdentifier
    if (this.cookieIdentifier == null) {
      invariant(false, 'Cookie identifier needs to be set.')
    }
    const cookieValue = Cookies.get(this.cookieIdentifier)
    const showTeaser = cookieValue === undefined || cookieValue !== 'true'

    if (showTeaser) {
      if (this.options.enableEventListener) {
        this.onHub(`${this.cookieIdentifier}:register`, () => this.showTeaser())
      } else {
        this.showTeaser()
      }
    }
  }

  showTeaser() {
    const addEvents = () => {
      this.triggerHub(`${this.cookieIdentifier}:activate`)
      this.onHub(`${this.cookieIdentifier}:deactivate`, this.handleDismiss())
    }
    if (this.options.delayPopup <= 0) {
      addEvents()
    } else {
      setTimeout(() => {
        addEvents()
      }, this.options.delayPopup)
    }
  }

  handleDismiss() {
    return e => {
      Cookies.set(this.cookieIdentifier, true, {
        expires: this.options.daysUntilExpiration
      })
    }
  }
}

CookieHandler.defaultOptions = {
  cookieIdentifier: null,
  enableEventListener: false,
  daysUntilExpiration: 365,
  delayPopup: 0
}

export default CookieHandler
