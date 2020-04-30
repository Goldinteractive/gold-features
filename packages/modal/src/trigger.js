import { features, eventHub } from '@goldinteractive/js-base'

/**
 * trigger modal open event
 *
 * @extends {module:base/features~Feature}
 */
class ModalTrigger extends features.Feature {
  init() {
    this.clickListener = this._clickListener()

    this.addEventListener(this.node, 'click', this.clickListener)
  }

  _clickListener() {
    return event => {
      this.open()
      event.preventDefault() // do not change scroll position or follow link
    }
  }

  open() {
    eventHub.trigger(`${this.node.dataset.modalIdentifier}:open`, {})
  }
}

export default ModalTrigger
