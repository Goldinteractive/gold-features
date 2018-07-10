import BaseTransition from './base'

export default BaseTransition.extend({
  start: function() {
    Promise.all([this.newContainerLoading, this.fadeOut()]).then(
      this.fadeIn.bind(this)
    )
  },

  fadeOut: function() {
    const self = this
    return new Promise((resolve, reject) => {
      const eventListener = e => {
        // there might be multiple animations running
        if (e.target === self.oldContainer) {
          self.oldContainer.removeEventListener('animationend', eventListener)
          self.oldContainer.style.display = 'none'
          self.oldContainer.classList.remove('fade-out')
          resolve()
        }
      }
      self.oldContainer.addEventListener('animationend', eventListener)
      self.oldContainer.classList.add('fade-out')
    })
  },

  fadeIn: function() {
    const self = this
    // restore scroll position
    const { scrollX = 0, scrollY = 0 } = history.state || {}
    window.scrollTo(scrollX, scrollY)
    // barba renders the new container with visibility: hidden
    self.newContainer.style.visibility = 'visible'
    const eventListener = e => {
      // there might be multiple animations running
      if (e.target === self.newContainer) {
        self.newContainer.removeEventListener('animationend', eventListener)
        self.newContainer.classList.remove('fade-in')
        self.done()
      }
    }
    self.newContainer.addEventListener('animationend', eventListener)
    self.newContainer.classList.add('fade-in')
  }
})
