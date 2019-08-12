class LazyImageStrategy {
  constructor(options) {
    this.options = Object.assign({}, LazyImageStrategy.defaultOptions, options)
    this.onNotify = this._onNotify()
  }

  addImage(node) {
    requestAnimationFrame(() => {
      if (node.dataset) {
        node.srcset = node.dataset.srcset || ''
        node.sizes = node.dataset.sizes || ''
      }
      node.src = node.dataset.src
      node.classList.remove(this.options.previewImageClass)
    })
  }

  _onNotify() {
    var self = this
    return ({ node, manager }) => {
      manager.unregister(node)
      const img = new Image()
      if (node.dataset) {
        img.srcset = node.dataset.srcset || ''
        img.sizes = node.dataset.sizes || ''
      }
      img.src = node.dataset.src
      if (img.complete) {
        self.addImage(node)
      } else {
        img.onload = () => {
          self.addImage(node)
        }
      }
    }
  }

  register(node, manager) {
    manager.register(node, this.onNotify)
  }
}

LazyImageStrategy.defaultOptions = {
  previewImageClass: '-preview'
}

export default LazyImageStrategy
