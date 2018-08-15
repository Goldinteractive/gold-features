import { features } from '@goldinteractive/js-base'

import Headroomjs from 'headroom.js'

class Headroom extends features.Feature {

  /**
   * Initializer
   * @param {*} custom options in case of extending 
   */
  init(options = this.options) {

    let onPin = options.onPin;
    let onUnpin = options.onUnpin;
    if (options.customClasses.length > 0) {
      onPin = () => {
        options.customClasses.forEach(option => {
          option.element.classList.add(option.pinClass);
        });
        options.onPin();
      };
      onUnpin = () => {
        options.customClasses.forEach(option => {
          option.element.classList.remove(option.pinClass);
        });
        options.onUnpin();
      }
    }

    this.headroom = new Headroomjs(this.node, {
      offset: options.offset,
      tolerance: options.tolerance,
      classes: options.classes,
      onNotTop: options.onNotTop,
      onTop: options.onTop,
      onPin: onPin,
      onUnpin: onUnpin,
      scroller: options.scroller
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
