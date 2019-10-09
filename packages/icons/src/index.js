import { features } from '@goldinteractive/js-base'
import { IconManager } from './icon-manager'

const USER_AGENT = navigator.userAgent
const IE11_OR_OLDER =
  USER_AGENT.indexOf('MSIE ') > -1 || USER_AGENT.indexOf('Trident/') > -1

const NS_SVG = 'http://www.w3.org/2000/svg'
const NS_XLINK = 'http://www.w3.org/1999/xlink'

/**
 * Icon feature class.
 */
export class Icon extends features.Feature {
  init() {
    this.id = this.node.getAttribute('data-icon')
    this.polyfilled = false

    if (!this.options.manager) {
      throw new Error(
        `Icon "${
          this.id
        }" feature needs to be initialized with a IconManager instance!`
      )
    }

    if (!this.id) {
      console.error('No "data-icon" attribute defined', this.node)
      return false
    }

    var $icon =
      this.node.querySelector('svg') || document.createElementNS(NS_SVG, 'svg')

    var manager = this.options.manager
    var managerOpts = this.options.manager.options

    var responsive = this.node.getAttribute('data-responsive')
    this.responsive = responsive !== null ? true : managerOpts.responsive

    var equal = this.node.getAttribute('data-equal')
    this.equal = equal !== null ? true : managerOpts.equal

    var accessible = this.node.getAttribute('data-accessible')
    this.accessible = accessible !== null ? true : managerOpts.accessible

    var original = this.node.getAttribute('data-original')
    this.original = original !== null ? true : managerOpts.original

    var attributes = manager.getIconFromData(this.id).attributes
    var $iconNodes = [...manager.getIconFromSprite(this.id).childNodes]

    if (!$iconNodes) {
      console.error(
        `Icon "${this.id}" has no child nodes in svg sprite!`,
        this.node
      )
      return false
    }

    $icon.setAttribute('role', 'img')
    $icon.setAttribute('aria-hidden', this.accessible ? 'false' : 'true')

    var width = attributes.width ? parseFloat(attributes.width) : null
    var height = attributes.height ? parseFloat(attributes.height) : null

    // take over original attributes
    for (let attribute in attributes) {
      if (attributes.hasOwnProperty(attribute)) {
        if ((attribute != 'width' && attribute != 'height') || this.original) {
          $icon.setAttribute(attribute, attributes[attribute])
        }
      }
    }

    // using setAttribute because ie11 and below doesn't support classList or setting className on svg
    $icon.setAttribute(
      'class',
      `${managerOpts.iconClass} ${managerOpts.prefixClass}${this.id}`
    )

    this.node.classList.add(managerOpts.wrapClass)
    this.node.classList.add(managerOpts.prefixClass + this.id)

    // set classes and attributes based on settings
    if (this.original) {
      this.node.classList.add('-original')
      this.node.style.width = width + 'px'
      this.node.style.height = height + 'px'
    }

    if (this.equal) {
      this.node.classList.add('-equal')
    }

    if (this.responsive) {
      var ratioPadding = (height / width) * 100
      this.node.style.paddingBottom = `${ratioPadding}%`
      this.node.classList.add(managerOpts.responsiveClass)
    } else {
      // using to keep svg ratio for ie (http://nicolasgallagher.com/canvas-fix-svg-scaling-in-internet-explorer/)
      var $canvas = document.createElement('canvas')
      $canvas.classList.add('icon-canvas')
      $canvas.setAttribute('width', width)
      $canvas.setAttribute('height', height)
      $canvas.setAttribute('aria-hidden', 'true')
      this.node.appendChild($canvas)
    }

    if (IE11_OR_OLDER) {
      // polyfill ie11 and older with appending icon paths directly
      $iconNodes.forEach($iconNode => {
        $icon.appendChild($iconNode.cloneNode(true))
      })

      this.polyfilled = true
    } else {
      // create use element to use svg from sprite
      this.$use = document.createElementNS(NS_SVG, 'use')
      this.updateUseLink()

      // change link of use tag if state has changed
      this.onHub('statechange', () => {
        this.updateUseLink()
      })

      this.onHub('icons:update', () => {
        this.updateUseLink()
      })

      $icon.appendChild(this.$use)
    }

    this.node.appendChild($icon)
  }

  updateUseLink() {
    if (!this.$use) return
    // in case of empty hash or fragment location properties are empty
    // therefore they must be stripped manually from the location.href
    var currentDomain = window.location.href.replace(window.location.hash, '')
    if (currentDomain.slice(-1) === '#') {
      currentDomain = currentDomain.substring(0, currentDomain.length - 1)
    }
    var currentHash = `${currentDomain}#${
      this.options.manager.options.prefixId
    }${this.id}`
    this.$use.setAttribute('href', currentHash)
    this.$use.setAttributeNS(NS_XLINK, 'xlink:href', currentHash)
  }
}

/**
 * Default options for icon feature.
 *
 * @type {Object}
 * @property {IconManager} manager - IconManager instance.
 */
Icon.defaultOptions = {
  manager: null
}

export { IconManager }

export default Icon
