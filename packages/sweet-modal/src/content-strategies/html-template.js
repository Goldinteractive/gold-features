class HtmlTemplate {
  constructor({ contentSelector } = {}) {
    this.contentSelector = contentSelector
  }

  getData = (callback, node, modalIdentifier) => {
    if (this.contentSelector) {
      this.$content = document.querySelector(
        `${this.contentSelector}[data-modal-identifier="${modalIdentifier}"]`
      )
    } else {
      this.$content = node
    }

    if (!this.$content) {
      throw new Error(`HtmlTemplate strategy: html content element not found`)
    }

    callback(this.$content.innerHTML)
  }
}

HtmlTemplate.defaultOptions = {}

export default HtmlTemplate
