import A11yDialog from 'a11y-dialog'
import { Feature } from 'gi-js-base/src/features'

class Modal extends Feature {

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
