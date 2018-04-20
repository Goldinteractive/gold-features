import { features } from '@goldinteractive/js-base'

import Headroomjs from 'headroom.js'

class Headroom extends features.Feature {

  /**
   * Initializer
   * @param {*} custom options in case of extending 
   */
  init(options = this.options) {
    this.headroom = new Headroomjs(this.node, {
      ...this.options
    })

    this.headroom.init()
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
  onUnpin: () => {}
}

export default Headroom
