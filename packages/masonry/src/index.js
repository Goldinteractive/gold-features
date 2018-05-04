import { features } from '@goldinteractive/js-base'

import MasonryLayout from 'masonry-layout'

class Masonry extends features.Feature {

  init() {
    this.masonry = new MasonryLayout(this.node, {
      itemSelector: this.options.itemSelector,
      columnWidth: this.options.columnWidth,
      percentPosition: this.options.percentPosition
    })
  }

  destroy() {
    super.destroy()
    this.masonry.destroy()
  }

}

Masonry.defaultOptions = {
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
}

export default Masonry
