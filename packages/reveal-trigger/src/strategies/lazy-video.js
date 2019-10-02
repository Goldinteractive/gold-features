class LazyVideoStrategy {
  constructor(options) {
    this.options = Object.assign({}, LazyVideoStrategy.defaultOptions, options)
    this.onNotify = this._onNotify()
  }

  _onNotify() {
    return ({ node }) => {
      console.log(node)
    }
  }

  // Gets called from reveal-trigger
  register(node, manager) {
    manager.register(node, this.onNotify)
  }
}

LazyVideoStrategy.defaultOptions = {}

export default LazyVideoStrategy
