import { features } from '@goldinteractive/js-base'

import Cookies from 'js-cookie'

class CookieDisclaimer extends features.Feature {
  init() {
    this.confirmButton = this.$('[data-disclaimer-confirm]')
    const disclaimerConfirmed = Cookies.get(this.options.cookieName)

    if (disclaimerConfirmed === undefined || disclaimerConfirmed !== 'true') {
      this.node.classList.add(this.options.classShow)
    }

    this.addEventListener(this.confirmButton, 'click', this.handleDisclaimerConfirm())
  }

  handleDisclaimerConfirm() {
    return (e) => {
      Cookies.set(this.options.cookieName, true)
      this.node.classList.remove(this.options.classShow)
    }
  }

}

CookieDisclaimer.defaultOptions = {
  cookieName: 'disclaimeragreed',
  classShow: '-show'
}

export default CookieDisclaimer
