import { features } from '@goldinteractive/js-base'

class SweetModalTrigger extends features.Feature {
  init() {
    this.modalIdentifier = this.node.dataset.modalIdentifier
    if (!this.modalIdentifier) {
      throw new Error(
        `SweetModalTrigger" ${
          this.name
        }" feature needs to be initialized with a modal-identifier`
      )
    }
    this.addEventListener(this.node, 'click', this._clickHandler)
  }

  _clickHandler = e => {
    e.preventDefault() // do not change scroll position or follow link
    this.triggerHub(`${this.modalIdentifier}:open`, {})
  }
}

export default SweetModalTrigger
