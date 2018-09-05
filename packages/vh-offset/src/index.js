import { features, utils } from '@goldinteractive/js-base'

/**
 * Inspired by:
 * - https://github.com/Hiswe/vh-check
 * - https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 * - https://github.com/tylerjpeterson/ios-inner-height
 *
 * There is a known issue when opening a link in a new tab in iOS Safari **when not using watchResize**.
 * The page will actually be loaded without an active address bar,
 * therefore the offset is 0px. But Safari renders the address bar afterwards, resulting in a resize event.
 * But since the feature is not actively watching it will not update the offset.
 * Listening for the first `resize` is not an option because other browsers will not trigger the `resize` event.
 * And one must not use timeouts for such use cases.
 */
class VhOffset extends features.Feature {
  init() {
    this.handleSize = utils.fn.debounce(this._handleSize())

    if (this.options.watchResize) {
      this.addEventListener(window, 'resize', this.handleSize)
    } else {
      this.addEventListener(window, 'orientationchange', this.handleSize)
    }

    this.handleSize()
  }

  _handleSize() {
    return () => {
      this.setProperty(this.checkSize())
    }
  }

  setProperty(value) {
    // document.documentElement corresponds to the :root in CSS
    document.documentElement.style.setProperty(
      `--${this.options.propertyName}`,
      `${value}px`
    )
  }

  checkSize() {
    const vhTestElement = this.createTestElement()
    const vh = vhTestElement.offsetHeight
    const windowHeight = window.innerHeight
    const offset = vh - windowHeight
    this.removeTestElement(vhTestElement)
    return offset
  }

  createTestElement() {
    const testElement = document.createElement('div')
    testElement.style.cssText =
      'position: fixed; top: 0; height: 100vh; pointer-events: none;'
    this.node.insertBefore(testElement, this.node.firstChild)
    return testElement
  }

  removeTestElement(element) {
    this.node.removeChild(element)
  }
}

VhOffset.defaultOptions = {
  // name of the css property (will be prefixed with `--`)
  propertyName: 'vh-offset',
  // if false it will only detect orientation change but not resizes
  watchResize: false
}

export default VhOffset
