import { features } from '@goldinteractive/js-base'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as contentStrategies from './strategies'
import SweetModalTrigger from './trigger'

class SweetModal extends features.Feature {
  init() {
    this.modalIdentifier =
      this.node.dataset.modalIdentifier || this.options.modalIdentifier
    this.strategy = this.options.strategy
    if (!this.modalIdentifier || !this.strategy) {
      throw new Error(
        `SweetModal" ${
          this.name
        }" feature needs to be initialized with a modal-identifier and a content strategy`
      )
    }
    this.html = ''

    this.registerEvents()
    this.handleOpenOnLoad()
  }

  registerEvents = () => {
    this.onHub(`${this.modalIdentifier}:open`, this.openHandler)
    this.onHub(`${this.modalIdentifier}:close`, this.closeHandler)
  }

  handleOpenOnLoad = () => {
    if (this.options.openOnLoad) {
      this.triggerHub(`${this.modalIdentifier}:open`)
    }
  }

  openHandler = () => {
    this.options.strategy.getData(this._open, this.node, this.modalIdentifier)
  }

  _open = html => {
    this.html = html
    if (this.options.delay <= 0) {
      this._fireModal()
    } else {
      setTimeout(() => {
        this._fireModal()
      }, this.options.delay)
    }
  }

  _fireModal = () => {
    const instances = {
      instance: this,
      Swal: Swal
    }

    Swal.fire({
      html: this.html,
      customClass: {
        container: 'ft-sweet-modal-container',
        popup: 'ft-sweet-modal-popup',
        content: 'ft-sweet-modal-content',
        closeButton: 'ft-sweet-modal-close'
      },
      showClass: {
        popup: '-ft-sweet-modal-show'
      },
      hideClass: {
        popup: '-ft-sweet-modal-hide'
      },
      showConfirmButton: false,
      showCloseButton: true,
      willOpen: () => {
        this.triggerHub(`${this.modalIdentifier}:will-open`, instances)
      },
      didOpen: () => {
        this.triggerHub(`${this.modalIdentifier}:did-open`, instances)
      },
      willClose: () => {
        this.triggerHub(`${this.modalIdentifier}:will-close`, instances)
      },
      didClose: () => {
        this.triggerHub(`${this.modalIdentifier}:did-close`, instances)
      },
      didRender: () => {
        this.triggerHub(`${this.modalIdentifier}:did-render`, instances)
      },
      didDestroy: () => {
        this.triggerHub(`${this.modalIdentifier}:did-destroy`, instances)
      },
      ...this.options.swalConfig
    })
  }

  closeHandler = () => {
    Swal.close()
  }
}

SweetModal.defaultOptions = {
  strategy: null,
  modalIdentifier: null,
  openOnLoad: false,
  delay: 0,
  swalConfig: {}
}

export default SweetModal
export { contentStrategies }
export { SweetModalTrigger }
