class IntersectionManager {
  constructor(options) {
    this.options = Object.assign(
      {},
      IntersectionManager.defaultOptions,
      options
    )

    this.onIntersect = this._onIntersect()
    this.map = new Map()
    this.observer = new IntersectionObserver(this.onIntersect, {
      root: this.options.root,
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold
    })
  }

  _onIntersect() {
    return entries => {
      requestAnimationFrame(() => {
        entries.forEach(entry => {
          if (
            !this.options.notifyOnlyWhenIntersecting ||
            entry.isIntersecting
          ) {
            const { callback, node } = this.map.get(entry.target)
            callback({ node, entry, manager: this })
          }
        })
      })
    }
  }

  register(node, callback) {
    if (!this.options.ignoreTriggerAttribute) {
      const $triggerElement = node.querySelector(
        `[${this.options.triggerAttribute}]`
      )
      if ($triggerElement !== null) {
        this.observe($triggerElement, {
          callback,
          node
        })
        return
      }
    }
    this.observe(node, {
      callback,
      node
    })
  }

  unregister(node) {
    this.map.delete(node)
    this.observer.unobserve(node)
  }

  observe(node, callback) {
    this.map.set(node, callback)
    this.observer.observe(node)
  }
}

IntersectionManager.defaultOptions = {
  triggerAttribute: 'data-trigger',
  ignoreTriggerAttribute: false,
  notifyOnlyWhenIntersecting: true,
  root: null,
  rootMargin: '0px',
  threshold: 0
}

export default IntersectionManager
