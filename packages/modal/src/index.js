import A11yDialog from 'a11y-dialog'
import { features } from '@goldinteractive/js-base'

/** 
 * Modal expects data-modal-identifier to be present on the modal
 */
class Modal extends features.Feature {

  init() {
    this.dialog = new A11yDialog(this.node)
    this.openListener = this._openListener()

    this.dialog.on('hide', () => this.triggerHub('ft-modal:hide'))
    this.dialog.on('show', () => this.triggerHub('ft-modal:show'))
    this.onHub(`${this.node.dataset.modalIdentifier}:open`, this.openListener)
  }

  _openListener() {
    return () => {
      this.open()
    }
  }

  open() {
    this.dialog.show()
  }

  destroy() {
    super.destroy()
    this.dialog.destroy()
  }

}

export default Modal
