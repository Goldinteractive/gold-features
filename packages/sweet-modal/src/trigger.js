import { features } from '@goldinteractive/js-base'


class SweetModalTrigger extends features.Feature {
  init() {
    this.addEventListener(this.node, 'click', this._clickHandler)
  }

  _clickHandler = (event) => {
    event.preventDefault() // do not change scroll position or follow link
    this.triggerHub(`${this.node.dataset.modalIdentifier}:open`, {})
  }
}

export default SweetModalTrigger
