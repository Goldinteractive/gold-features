import invariant from 'tiny-invariant'

class LazyVideoStrategy {
  constructor(options) {
    this.options = Object.assign({}, LazyVideoStrategy.defaultOptions, options)
    this.onNotify = this._onNotify()
  }

  _onNotify() {
    return ({ node, entry }) => {
      if (entry.isIntersecting) {
        if (node.classList.contains(this.options.previewVideoClass)) {
          if (node.children.length > 0) {
            Array.from(node.children).forEach(child => {
              if (child.tagName === 'SOURCE') {
                child.src = child.dataset.src
              }
            })
          } else if (node.dataset.src !== undefined) {
            node.src = node.dataset.src
          } else {
            invariant(
              false,
              'Video node needs at least one source child node or a data-src attribute.'
            )
          }
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
