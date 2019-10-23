class LazyVideoStrategy {
  constructor(options) {
    this.options = Object.assign({}, LazyVideoStrategy.defaultOptions, options)
    this.onNotify = this._onNotify()
  }

  _onNotify() {
    return ({ node, entry }) => {
      if (entry.isIntersecting) {
        if (node.classList.contains(this.options.previewVideoClass)) {
          node.children.forEach(child => {
            if (child.src === '') {
              child.src = child.dataset.src
            }
          })
          node.load()
          node.classList.remove(this.options.previewVideoClass)
        } else {
          node.play()
        }
      } else {
        node.pause()
      }
    }
  }

  register(node, manager) {
    manager.register(node, this.onNotify)
  }
}

LazyVideoStrategy.defaultOptions = {
  previewVideoClass: '-lazy'
}

export default LazyVideoStrategy
