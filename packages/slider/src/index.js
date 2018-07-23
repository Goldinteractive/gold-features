import { features } from '@goldinteractive/js-base'

import Flickity from 'flickity'
import 'flickity-imagesloaded'

/**
 * Slider feature class.
 */
class Slider extends features.Feature {

  init() {
    this.node.classList.add('-hidden')

    this.slides = this.$$(this.options.cellSelector)

    if (this.options.hideNavElementsWhenJustOneSlide && this.slides.length <= 1) {
      this.options.prevNextButtons = false
      this.options.pageDots = false
      this.options.draggable = false
    }

    window.setTimeout(() => {
      // fade in for no FOUC
      this.node.classList.remove('-hidden')
      // trigger redraw for transition
      this.node.offsetHeight

      this.flickity = new Flickity(this.node, this.options)

      this.options.listeners.forEach(listener => {
        this.flickity.on(listener.event, () => {
          listener.handler(this.flickity)
        })
      })


      if (this.node.dataset.sliderIdentifier) {
        this.selectListener = this._selectListener();
        this.nextSlide = this._nextSlide();
        this.previousSlide = this._previousSlide();

        this.flickity.on('select', () => {
          this.triggerHub(`${this.node.dataset.sliderIdentifier}:selected`, this.flickity)
        })
        this.onHub(`${this.node.dataset.sliderIdentifier}:select`, this.selectListener)
        this.onHub(`${this.node.dataset.sliderIdentifier}:previous`, this.previousSlide)
        this.onHub(`${this.node.dataset.sliderIdentifier}:next`, this.nextSlide)
      }

      // execute initial resize/reposition to make slides fit
      this.flickity.resize()
      this.flickity.reposition()
    }, 0)
  }

  _nextSlide() {
    return (...args) => {
      this.flickity.next(...args)
    }
  }
  _previousSlide() {
    return (...args) => {
      this.flickity.previous(...args)
    }
  }

  _selectListener() {
    return ({ slideLabel, isWrapped, isInstant, label }) => {
      const $slideToSelect = this._getBySliderLabel(slideLabel || label); // support legacy label property
      const $slides = this.node.querySelectorAll('.slide');
      const indexOfSelectedSlide = Array.from($slides).indexOf($slideToSelect)
      this.flickity.select(indexOfSelectedSlide, isWrapped, isInstant );
    }
  }

  _getBySliderLabel(label) {
    const $slide = this.$(`[data-slider-label=${label}]`)
    if (!$slide) {
      console.warn(`there is no slide with label: ${label} inside this slider: ${this._name}`)
    }
    return $slide;
  }

  destroy() {
    super.destroy()
    this.flickity.destroy()
  }

}


/**
 * Default feature options (also used to initialize flickity library).
 *
 * listeners: [
 *   {
 *     event: 'eventName',
 *     handler: function() {}
 *   }
 * ]
 * @see http://flickity.metafizzy.co/
 */
Slider.defaultOptions = {
  cellSelector: '.slide',
  hideNavElementsWhenJustOneSlide: true,
  listeners: [

  ]
}

export default Slider
