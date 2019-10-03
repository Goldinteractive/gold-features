class LazyVideoStrategy {
  constructor(options) {
    this.options = Object.assign({}, LazyVideoStrategy.defaultOptions, options)
    this.videoLoaded = false
    this.onNotify = this._onNotify()
  }

  _onNotify() {
    return ({ node, entry }) => {
      if (entry.isIntersecting) {
        if (!this.videoLoaded) {
          node.addEventListener('timeupdate', () => {
            console.log(node.currentTime)
          })
          node.children.forEach(child => {
            if (child.src === '') {
              child.src = child.dataset.src
            }
          })
          console.log('loaded src')
          node.load()
          this.videoLoaded = true
        } else {
          console.log('play')
          node.play()
        }
      } else {
        console.log('pause')
        node.pause()
      }
    }
  }

  // Gets called from reveal-trigger
  register(node, manager) {
    manager.register(node, this.onNotify)
  }
}

LazyVideoStrategy.defaultOptions = {}

export default LazyVideoStrategy
