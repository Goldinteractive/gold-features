import { features } from '@goldinteractive/js-base'

import objectFitImage from 'object-fit-images'
import objectFitVideo from 'object-fit-videos'
import enableInlineVideo from 'iphone-inline-video'

const CLASS_FEATURE = '.ft-fit-bg'
const NETWORK_IDLE = 1

/**
 * Object fit feature class.
 */
class ObjectFit extends features.Feature {

  init() {
    this._objectFit = this.node.getAttribute('data-object-fit')
    this._objectPosition = this.node.getAttribute('data-object-position')

    if (this._objectFit && this._objectPosition) {
      this.node.style.objectFit = this._objectFit
      this.node.style.objectPosition = this._objectPosition
      this.node.style.fontFamily = `"object-fit: ${this._objectFit}; object-position: ${this._objectPosition}"`
    } else if (this._objectFit) {
      this.node.style.objectFit = this._objectFit
      this.node.style.fontFamily = `"object-fit: ${this._objectFit}; object-position: ${this.options.defaultObjectPosition}"`
    } else  if (this._objectPosition) {
      this.node.style.objectPosition = this._objectPosition
      this.node.style.fontFamily = `"object-fit: ${this.options.defaultObjectFit}; object-position: ${this._objectPosition}"`
    }

    if (this.node.nodeName.toLowerCase() == 'video') {
      objectFitVideo(this.node)
      enableInlineVideo(this.node, {
          iPad: this.options.iPad
      })

      const unregisterAndHide = () => {
        this._removeInitialHide()
        this.removeEventListener(this.node, 'loadeddata', onload)
        this.removeEventListener(this.node, 'loadedmetadata', onload)
      }

      const autoplay = () => {
        if (this.node.autoplay) {
          this.node.play()
        }
      }

      let onload = () => {
        if (this.node.readyState >= this.node.HAVE_CURRENT_DATA) {
          unregisterAndHide()
          autoplay()
        } else if (this.node.networkState === NETWORK_IDLE) {
          // if network is idle, which means, that nothing is being requested, the content is "ready"
          unregisterAndHide()
        }
      }

      if (this.node.readyState >= this.node.HAVE_CURRENT_DATA || !this.options.waitForMediaLoaded) {
        this._removeInitialHide()
        autoplay()
      } else {
        this.addEventListener(this.node, 'loadeddata', onload)
        this.addEventListener(this.node, 'loadedmetadata', onload)
      }
    } else {
      objectFitImage(this.node, {
        watchMQ: this.options.watchMQ
      })

      if (this.node.naturalWidth || !this.options.waitForMediaLoaded) {
        this._removeInitialHide()
      } else {
        let onload = () => {
          this.removeEventListener(this.node, 'load', onload)
          this._removeInitialHide()
        }

        this.addEventListener(this.node, 'load', onload)
      }
    }
  }

  _removeInitialHide() {
    window.setTimeout(() => {
      if (this.node.parentElement.tagName.toLowerCase() === 'object-fit') {
        this.node.parentElement.style.visibility = 'inherit'
        this.node.parentElement.style.opacity = 'inherit'
      }

      let featureParent = this.node.closest(CLASS_FEATURE)

      if (featureParent) {
        featureParent.classList.remove(this.options.classInitialHide)
      }
    }, 0)
  }

}

/**
 * Default feature options (also used to initialize object-fit-images and iphone-inline-video library).
 *
 * @see https://github.com/bfred-it/object-fit-images
 *
 * @type {Object}
 * @property {Boolean} watchMQ=false
 *   This enables the automatic re-fix of the selected images when the window resizes.
 *   You only need it in some cases
 * @property {Boolean} waitForMediaLoaded=true
 *   Enable to remove initialHideClass after media has been loaded.
 *   Set false to wait only for polyfill initialization.
 * @property {String} defaultObjectFit='cover'
 *   Default object fit used when only `data-object-position` is defined
 * @property {String} defaultObjectPosition='center center'
 *   Default object position used when only `data-object-fit` is defined
 */
ObjectFit.defaultOptions = {
  iPad: true,
  watchMQ: false,
  waitForMediaLoaded: true,
  defaultObjectFit: 'cover',
  defaultObjectPosition: 'center center',
  classInitialHide: '-initial-hide'
}

export default ObjectFit
