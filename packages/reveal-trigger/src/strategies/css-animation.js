class CSSAnimationStrategy {
  constructor(options) {
    this.options = Object.assign(
      {},
      CSSAnimationStrategy.defaultOptions,
      options
    )
    this.onNotify = this._onNotify()
  }

  _onNotify() {
    return ({ node }) => {
      node.classList.add(this.options.revealClassName)
    }
  }

  register(node, manager) {
    manager.register(node, this.onNotify)
  }
}

CSSAnimationStrategy.defaultOptions = {
  revealClassName: '-in'
}

export default CSSAnimationStrategy
