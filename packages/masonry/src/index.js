import { features } from '@goldinteractive/js-base'

import MasonryLayout from 'masonry-layout'

class Masonry extends features.Feature {
  init() {
    this.node.classList.remove(this.options.hiddenClassName)
    this.identifier = this.node.dataset.masonryIdentifier
    const masonryOptions = Object.assign(
      {},
      Masonry.defaultOptions.masonryOptions,
      this.options.masonryOptions
    )
    this.masonry = new MasonryLayout(this.node, masonryOptions)

    if (this.identifier) {
      this.onHub(`${this.identifier}:appended`, $$items => {
        this.masonry.appended($$items)
      })
    }
  }

  destroy() {
    super.destroy()
    this.masonry.destroy()
  }
}

Masonry.defaultOptions = {
  hiddenClassName: '-hidden',
  masonryOptions: {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
  }
}

export default Masonry
