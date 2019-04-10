import { features, utils } from '@goldinteractive/js-base'

class ElementLoader extends features.Feature {
  init() {
    this.handleTrigger()
  }
  handleTrigger() {
    const eventName =
      this.node.dataset.elementLoaderEvent || this.options.loadTriggerEvent
    if (eventName === null) {
      // load fragment instantly
      this.loadElement()
    } else {
      this.onHub(
        eventName,
        utils.fn.once(() => {
          this.loadElement()
        })
      )
    }
  }
  loadElement() {
    const url = this.node.dataset.elementLoaderUrl || this.options.elementUrl
    if (url === null) {
      throw new Error(
        `ElementLoader "${
          this.name
        }" feature needs to be initialized with a data-element-loader-url or options.elementUrl`
      )
    }
    this.fetchEndpoint({ url })
      .then(html => {
        this.replaceHtml({ html })
      })
      .catch(error => {
        this.errorHandler({ error })
      })
  }
  fetchEndpoint({ url }) {
    return utils.fetch.text(url, utils.fetch.defaultOptions)
  }
  replaceHtml({ html }) {
    if (this.options.replaceRootElement) {
      const previousNeighbor = this.node.nextElementSibling
      this.node.insertAdjacentHTML('afterend', html)
      let sibling = this.node.nextElementSibling
      const nodeReference = this.node
      features.destroy(this.node)
      // IE11 does not support `remove`
      // consequence of using removeChild: lazily loaded content must be set in a dom hierarchy
      nodeReference.parentElement.removeChild(nodeReference)
      const nodes = this._getNodesBetween(sibling, previousNeighbor)
      nodes.forEach(node => {
        features.init(node)
      })
    } else {
      this.node.innerHTML = html
      features.init(this.node, null, {
        justChildNodes: true
      })
    }
  }
  errorHandler({ error }) {
    console.error(error)
  }

  /**
   * Get nodes between start (inclusive) and end (exclusive)
   * @param {Element} start
   * @param {Element} end
   */
  _getNodesBetween(start, end) {
    let sibling = start
    const nodes = []
    while (sibling !== end) {
      nodes.push(sibling)
      sibling = sibling.nextElementSibling
    }
    return nodes
  }
}

/**
 * Feature options
 * @type {Object}
 * @property {Boolean} replaceRootElement=false
 *   Replace the element which loaded the template? By default the content
 *   will be inlined.
 * @property {String} elementUrl=null
 *   As an alternative to setting the url in html using `data-element-loader-url`.
 * @property {String} loadTriggerEvent=null
 *   As an alternative to setting the event name in html using `data-element-loader-event`.
 */
ElementLoader.defaultOptions = {
  replaceRootElement: false,
  elementUrl: null,
  loadTriggerEvent: null
}

export default ElementLoader
