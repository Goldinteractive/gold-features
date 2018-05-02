import { features } from '@goldinteractive/js-base'

import Barba from 'barba.js'

/**
 * Enables smooth page transitions using barba.js
 */
class PageTransition extends features.Feature {
  init() {
    const self = this
    if (this.options.usePrefetch) {
      Barba.Prefetch.init()
    }
    Barba.Pjax.Dom.wrapperId = this.options.wrapperId
    Barba.Pjax.Dom.containerClass = this.options.containerClass
    const preventCheck = Barba.Pjax.preventCheck
    // true means use Pjax, false means fallback to default behavior
    const hasClass = (element, className) => {
      return element.classList.contains(className)
    }
    Barba.Pjax.preventCheck = function(evt, element) {
      return (
        preventCheck.call(this, evt, element) &&
        hasClass(element, self.options.transitionClass)
      )
    }
    // triggered for each new added container
    Barba.Dispatcher.on('newPageReady', (currentStatus, prevStatus, htmlElementContainer, newPageRawHTML) => {
      features.init(htmlElementContainer)
   })
   // triggered when url structure has been updated (but new content has not been loaded yet)
   Barba.Dispatcher.on('initStateChange', (currentStatus) => {
     features.destroy(this.node, undefined, { justChildNodes: true })
   })
    Barba.Pjax.start()
  }
}

PageTransition.defaultOptions = {
  wrapperId: 'page-transition-wrapper',
  containerClass: 'page-transition-container',
  // set this class on anchor tags in order to enable Smooth Page Transition for this link
  transitionClass: 'smooth-transition',
  usePrefetch: true
}

export default PageTransition
