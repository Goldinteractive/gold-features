import { features, utils } from '@goldinteractive/js-base'

const ATTR_FORCE_PRIMARY_CLICK = 'data-force'

const POINTER_TOUCH = 'touch'
const POINTER_PEN = 'pen'

const IE10_POINTER_TOUCH = 2
const IE10_POINTER_PEN = 3

let current = null
let instances = []
let touchUsed = false
let keyboardUsed = false
let clicked = false

document.addEventListener('touchend', function(e) {
  touchUsed = true
})

document.addEventListener('pointerdown', function(e) {
  touchUsed = e.pointerType === POINTER_TOUCH || e.pointerType === POINTER_PEN
})

document.addEventListener('MSPointerDown', function(e) {
  touchUsed = e.pointerType === IE10_POINTER_TOUCH || e.pointerType === IE10_POINTER_PEN
})

document.addEventListener('keydown', function(e) {
  keyboardUsed = true
})

document.addEventListener('click', function(e) {
  if (!clicked) {
    instances.forEach((instance) => {
      instance._blur(e)
    })
  }

  // reset flags
  touchUsed = false
  keyboardUsed = false
  clicked = false
})

class TouchHover extends features.Feature {

  init() {
    instances.push(this)

    this.openedByTouch = false
    this.openedByMouseenter = false

    this.initialActive = this.node.classList.contains(this.options.classActive)

    this.addEventListener(this.node, 'mouseenter', this._mouseenterListener())
    this.addEventListener(this.node, 'mouseleave', this._mouseleaveListener())
    this.addEventListener(this.node, 'click', this._clickListener())
  }

  _blur(e) {
    let event = document.createEvent('CustomEvent')
    event.initCustomEvent('touch:blur', true, true, {
      originalEvent: e
    })

    if (!this.node.dispatchEvent(event)) {
      return false
    }

    this.openedByTouch = false
    this.openedByMouseenter = false

    if (utils.check.isFunction(this.options.resetOpen)
        && (this.options.resetOpenOnMouseBlur
            && ((e.type === 'mouseleave' || e.type === 'mouseenter')
                || (e.type === 'click' && e.currentTarget !== document && this.options.resetOpenOnClickBlur)
                || (e.type === 'click' && e.currentTarget === document && this.options.resetOpenOnOuterClickBlur)))
    ) {
      this.options.resetOpen.call(this)
    }

    if ((this.options.resetActiveOnMouseBlur
         && ((e.type === 'mouseleave' || e.type === 'mouseenter'))
             || (e.type === 'click' && e.currentTarget !== document && this.options.resetActiveOnClickBlur)
             || (e.type === 'click' && e.currentTarget === document && this.options.resetActiveOnOuterClickBlur))
    ) {
      this.initialActive = false
      this.node.classList.remove(this.options.classActive)
    }

    this.node.classList.remove(this.options.classClicked)
  }

  _hover(e) {
    let event = document.createEvent('CustomEvent')
    event.initCustomEvent('touch:hover', true, true, {
      originalEvent: e
    })

    if (!this.node.dispatchEvent(event)) {
      return false
    }

    current = this

    instances.forEach((instance) => {
      if (this !== instance) {
        instance._blur(e)
      }
    })

    this.node.classList.remove(this.options.classClicked)
    this.node.classList.add(this.options.classActive)
  }

  _primaryClick(e) {
    let event = document.createEvent('CustomEvent')
    event.initCustomEvent('touch:click', true, true, {
      originalEvent: e
    })

    if (!this.node.dispatchEvent(event)) {
      return false
    }

    this.initialActive = false
    this.openedByTouch = false
    this.openedByMouseenter = false

    if (utils.check.isFunction(this.options.resetOpen)) {
      this.options.resetOpen.call(this)
    }

    this.node.classList.remove(this.options.classActive)
    this.node.classList.add(this.options.classClicked)
  }

  _mouseenterListener() {
    return (e) => {
      if (!touchUsed) {
        this.openedByMouseenter = true
        this._hover(e)
      }
    }
  }

  _mouseleaveListener() {
    return (e) => {
      if (this.openedByMouseenter) {
         this._blur(e)
      }
    }
  }

  _clickListener() {
    return (e) => {
      clicked = true

      let isOpen = (utils.check.isFunction(this.options.openCheck)
                    && this.options.openCheck.call(this))

      if (this.node.getAttribute(ATTR_FORCE_PRIMARY_CLICK) !== null
          || (utils.check.isFunction(this.options.forcePrimaryClick)
             ? this.options.forcePrimaryClick.call(this) : this.options.forcePrimaryClick)
          || ((this.node.classList.contains(this.options.classActive) || isOpen)
              && (!touchUsed
                  || (touchUsed && this.openedByTouch)
                  || this.initialActive
                  || (isOpen && !this.openedByTouch && !this.openedByMouseenter))
          )
      ) {
        this._primaryClick(e)
      } else {
        e.preventDefault()

        if (!this.openedByMouseenter) { // not already opened by mouseenter
          this._hover(e)
        }

        if (touchUsed) {
          this.openedByTouch = true
          this.openedByMouseenter = false
        }
      }

    }
  }

}

TouchHover.defaultOptions = {
  classActive: '-active',
  classClicked: '-clicked',
  forcePrimaryClick: null,
  openCheck: null,
  resetOpen: null,
  resetOpenOnMouseBlur: true,
  resetOpenOnClickBlur: true,
  resetOpenOnOuterClickBlur: false,
  resetActiveOnMouseBlur: true,
  resetActiveOnClickBlur: true,
  resetActiveOnOuterClickBlur: true
}

export default TouchHover
