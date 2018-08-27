import { features } from '@goldinteractive/js-base'

import Cookies from 'js-cookie'

class CookieDisclaimer extends features.Feature {
  init() {
    this.confirmButton = this.$('[data-disclaimer-confirm]')
    const disclaimerConfirmedString = Cookies.get(this.options.cookieName)
    const isDisclaimerPending = disclaimerConfirmedString === undefined || disclaimerConfirmedString !== 'true'

    if (isDisclaimerPending) {
      this.node.classList.add(this.options.classShow)

      if (this.confirmButton !== null) {
        this.addEventListener(this.confirmButton, 'click', this.handleDisclaimerConfirm())
      }
    }
  }

  handleDisclaimerConfirm() {
    return (e) => {
      Cookies.set(this.options.cookieName, true, { expires: this.options.daysUntilExpiration })
      this.node.classList.remove(this.options.classShow)
    }
  }

}

CookieDisclaimer.defaultOptions = {
  cookieName: 'disclaimeragreed',
  classShow: '-show',
  daysUntilExpiration: 365
}

export default CookieDisclaimer
