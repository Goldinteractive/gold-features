import { features } from '@goldinteractive/js-base'

import Headroomjs from 'headroom.js'

class Headroom extends features.Feature {
  init() {
    const { onPin, onUnpin } = this.getPinHandlers()

    this.headroom = new Headroomjs(this.node, {
      offset: this.options.offset,
      tolerance: this.options.tolerance,
      classes: this.options.classes,
      onNotTop: this.options.onNotTop,
      onTop: this.options.onTop,
      onPin: onPin,
      onUnpin: onUnpin,
      scroller: this.options.scroller
    })

    this.headroom.init()
  }

  getPinHandlers() {
    let onPin = this.options.onPin
    let onUnpin = this.options.onUnpin
    if (this.options.customClasses.length > 0) {
      onPin = () => {
        this.options.customClasses.forEach(option => {
          option.element.classList.add(option.pinClass)
        })
        this.options.onPin()
      }
      onUnpin = () => {
        this.options.customClasses.forEach(option => {
          option.element.classList.remove(option.pinClass)
        })
        this.options.onUnpin()
      }
    }
    return { onPin, onUnpin }
  }

  update() {
    this.headroom.update()
  }

  destroy() {
    super.destroy()
    this.headroom.destroy()
  }
}

/**
 * See headroom.js options
 */
Headroom.defaultOptions = {
  scroller: undefined,
  offset: 0,
  tolerance: 0,
  classes: {
    // when element is initialised
    initial: 'headroom',
    // when scrolling up
    pinned: '-pinned',
    // when scrolling down
    unpinned: '-unpinned',
    // when above offset
    top: '-top',
    // when below offset
    notTop: '-not-top',
    // when at bottom of scoll areaia
    bottom: '-bottom',
    // when not at bottom of scroll area
    notBottom: '-not-bottom'
  },
  onNotTop: () => {},
  onTop: () => {},
  onPin: () => {},
  onUnpin: () => {},
  // array of {element: domElement, pinClass: class set on pin}
  customClasses: [
    /**
     * {
     *    element: $('body'),
     *    pinClass: 'header-in'
     * }
     */
  ]
}

export default Headroom
