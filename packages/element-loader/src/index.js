import { features, utils } from '@goldinteractive/js-base'

/**
 * Feature to load dynamic content.
 */
class ElementLoader extends features.Feature {
  init() {
    this.identifier = this.node.dataset.elementLoaderIdentifier
    this.url = this.node.dataset.elementLoaderUrl || this.options.elementUrl

    this.runningAnimation = null
    this.fetchCallbacks = []

    this.handleTrigger()
  }
  handleTrigger() {
    const eventName =
      this.node.dataset.elementLoaderEvent || this.options.loadTriggerEvent
    if (eventName === null) {
      // load fragment instantly
      this.loadElement(this.url)
    } else {
      const loadElementCallback = ({ url = this.url } = {}) => {
        this.loadElement(url)
      }
      const callback = this.options.loadTriggerEventMultiple
        ? loadElementCallback
        : utils.fn.once(loadElementCallback)
      this.onHub(eventName, callback)
    }
  }
  loadElement(url) {
    if (url === null) {
      throw new Error(
        `ElementLoader "${
          this.name
        }" feature needs to be initialized with a data-element-loader-url, options.elementUrl or url must be set in loadTriggerEvent event.`
      )
    }
    const fetchHtml = this.fetchHtml({ url })
    this.fetchCallbacks.push(fetchHtml)
    // Only the first callback must start the contentExitAnimation
    // subsequent calls must reuse the same animation promise.
    // This prevents animation race-conditions.
    const isOnlyRunningCallback = this.fetchCallbacks.length === 1
    if (isOnlyRunningCallback) {
      this.runningAnimation = this.options.contentExitAnimation({
        node: this.node
      })
    }
    // handles feature destruction notification
    let cancelled = false
    this.on('destroy', () => {
      cancelled = true
    })
    Promise.all([fetchHtml, this.runningAnimation])
      .then(([html]) => {
        // The request might have been cancelled in which case nothing should happen
        if (cancelled) {
          // reset references
          this.runningAnimation = null
          this.fetchCallbacks = []
        } else {
          // Only in case the current transaction actually is the last callback in the chain
          // do we want to reset the state - ready for the next transaction set to start.
          if (
            this.fetchCallbacks[this.fetchCallbacks.length - 1] === fetchHtml
          ) {
            this.runningAnimation = null
            this.fetchCallbacks = []
            this.replaceHtml({ html })
          }
        }
      })
      .catch(error => {
        this.runningAnimation = null
        this.errorHandler({ error })
      })
  }
  fetchHtml({ url }) {
    return utils.fetch.text(url, utils.fetch.defaultOptions)
  }
  replaceHtml({ html }) {
    let nodes = null
    if (this.options.replaceRootElement) {
      const previousNeighbor = this.node.nextElementSibling
      this.node.insertAdjacentHTML('afterend', html)
      let sibling = this.node.nextElementSibling
      const nodeReference = this.node
      features.destroy(this.node)
      // IE11 does not support `remove`
      // consequence of using removeChild: lazily loaded content must be set in a dom hierarchy
      nodeReference.parentElement.removeChild(nodeReference)
      nodes = this._getNodesBetween(sibling, previousNeighbor)
      nodes.forEach(node => {
        features.init(node)
      })
    } else {
      this.node.innerHTML = html
      nodes = utils.dom.children(this.node)
      features.init(this.node, null, {
        justChildNodes: true
      })
    }
    this.notifyAppended(nodes)
  }
  notifyAppended(nodes) {
    if (this.identifier) {
      this.triggerHub(`${this.identifier}:appended`, nodes)
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
 *   When no event name is set, the element will be loaded instantly.
 * @property {Boolean} loadTriggerEventMultiple=false
 *   Should the element-loader listen to multiple event triggers (and then reload the fragment)
 * @property {Function} contentExitAnimation
 *   Function to be called for custom content exit animation, per default it will simply resolve
 *   instantly. The function receives an object with the active node.
 */
ElementLoader.defaultOptions = {
  replaceRootElement: false,
  elementUrl: null,
  loadTriggerEvent: null,
  loadTriggerEventMultiple: false,
  contentExitAnimation: ({ node }) => new Promise(resolve => resolve())
}

export default ElementLoader
