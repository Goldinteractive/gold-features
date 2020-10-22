import { features } from '@goldinteractive/js-base'
import Swal from 'sweetalert2'
import * as strategies from './strategies'

class SweetModal extends features.Feature {
  init() {
    this.modalIdentifier =
      this.node.dataset.modalIdentifier || this.options.modalIdentifier
    if (!this.modalIdentifier) {
      throw new Error(
        `SweetModal" ${
          this.name
        }" feature needs to be initialized with a modal-identifier`
      )
    }
    this.html = ''

    this.registerEvents()
    this.handleOpenOnLoad()
  }

  registerEvents = () => {
    this.addEventListener(this.node, 'click', this.clickHandler)
    this.onHub(`${this.modalIdentifier}:open`, this.openHandler)
    this.onHub(`${this.modalIdentifier}:close`, this.closeHandler)
  }

  clickHandler = e => {
    e.preventDefault()
    this.triggerHub(`${this.node.dataset.modalIdentifier}:open`)
  }

  handleOpenOnLoad = () => {
    if (this.options.openOnLoad) {
      this.triggerHub(`${this.modalIdentifier}:open`)
    }
  }

  openHandler = () => {
    this.options.strategy.getData(this._open, this.modalIdentifier, this.node)
  }

  _open = (html) => {
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
    Swal.fire({
      html: this.html,
      showConfirmButton: false,
      showCloseButton: true,
      willOpen: () => {
        this.triggerHub(`${this.modalIdentifier}:will-open`)
      },
      didOpen: () => {
        this.triggerHub(`${this.modalIdentifier}:did-open`)
      },
      willClose: () => {
        this.triggerHub(`${this.modalIdentifier}:will-close`)
      },
      didClose: () => {
        this.triggerHub(`${this.modalIdentifier}:did-close`)
      },
      didRender: () => {
        this.triggerHub(`${this.modalIdentifier}:did-render`)
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

export { strategies }

export default SweetModal
