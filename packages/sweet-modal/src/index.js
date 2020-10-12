import { features } from '@goldinteractive/js-base'
import { json } from '@goldinteractive/js-base/src/utils/fetch'
import SweetModalTrigger from './trigger'
import Swal from 'sweetalert2'; //import Swal from 'sweetalert2/dist/sweetalert2.js'

class SweetModal extends features.Feature {

  init() {
    this.modalIdentifier = this.node.dataset.modalIdentifier || this.options.modalIdentifier
    if(!this.modalIdentifier) {
      throw new Error(`SweetModal" ${this.name}" feature needs to be initialized with a modal-identifier`
      )
    }
    this.title = ''
    this.type = ''
    this.html = ''

    this.registerEvents()
    this.handleOpenOnLoad()
  }

  registerEvents = () => {
    this.onHub(`${this.modalIdentifier}:open`, this.openHandler)
  }

  handleOpenOnLoad = () => {
    if(this.options.openOnLoad){
      this.triggerHub(`${this.modalIdentifier}:open`)
    }
  }

  getData = () => {
    if(this.options.htmlContentSelector){
      return this._getHtmlByTemplate()
    } else if(this.options.endpoint){
      this._getHtmlByEndpoint()
    }
  }

  _getHtmlByTemplate = () => {
    this.$content = document.querySelector(`${this.options.htmlContentSelector}`)
    if(!this.$content) {
      throw new Error(`SweetModal" ${this.name}": html content element not found`
      )
    }
    this.html = this.$content.innerHTML
  }

  _getHtmlByEndpoint = async () => {
    const result = await json(this.options.endpoint)
    this.title = result.title
    this.type = result.type
    this.html = result.html
  }

  openHandler = () => {
    this.getData()
    if (this.options.delay <= 0) {
      this.open()
    } else {
      setTimeout(() => {
        this.open()
      }, this.options.delay)
    }
  }

  open = () => {
    Swal.fire({
      title: this.title,
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
}

SweetModal.defaultOptions = {
  htmlContentSelector: '[data-sweet-modal-content]',
  endpoint: null,
  modalIdentifier: null,
  openOnLoad: false,
  delay: 0,
  swalConfig: {}
}

export default SweetModal
export { SweetModalTrigger }
