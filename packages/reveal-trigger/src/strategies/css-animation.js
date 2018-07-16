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
      if (this.options.enableDelay && node.dataset.delay) {
        // timeout is used so that the css implementation is independent
        // it does not matter whether you're using transitions or animations
        // if this leads to performance issues one could use inline-styling
        const number = parseInt(node.dataset.delay, 10)
        if (isNaN(number)) {
          console.error('the specified delay is not a number, got', node.dataset.delay)
          console.info('check this node:', node)
          return
        }
        window.setTimeout(() => {
          node.classList.add(this.options.revealClassName)
        }, number)
      } else {
        node.classList.add(this.options.revealClassName)
      }
    }
  }

  register(node, manager) {
    manager.register(node, this.onNotify)
  }
}

CSSAnimationStrategy.defaultOptions = {
  revealClassName: '-in',
  enableDelay: true
}

export default CSSAnimationStrategy
