class HtmlTemplate {
  constructor({ contentSelector }) {
    this.contentSelector = contentSelector
    if (!this.contentSelector) {
      throw new Error(
        `HtmlTemplate strategy needs to be initialized with an content selector`
      )
    }
  }

  getData = (callback, node, modalIdentifier) => {
    this.$content = document.querySelector(
      `${this.contentSelector}[data-modal-identifier="${modalIdentifier}"]`
    )

    if (!this.$content) {
      throw new Error(
        `SweetModal" ${this.name}": html content element not found`
      )
    }

    callback(this.$content.innerHTML)
  }
}

HtmlTemplate.defaultOptions = {}

export default HtmlTemplate
