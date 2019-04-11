/**
 * Icon manager class.
 *
 * @param {Object} options
 *   Overwrite the [default options]{@link IconManager.defaultOptions}.
 */
export class IconManager {
  constructor(options) {
    this.options = Object.assign({}, IconManager.defaultOptions, options)

    if (!this.options.svgJsonFile) {
      throw new Error('No SVG json data file given!')
    }

    if (!this.options.svgSpriteFile) {
      throw new Error('No SVG sprite file given!')
    }

    this.$svgSprite = document.createElement('div')
  }

  /**
   * Inject markup of svg sprite into the page.
   * @param {Function} cb - Callback when finished.
   * @param {Function} [polyfillAlreadyLoadedIcons=true] - Whether already loaded icons should be polyfilled (ie11)
   */
  injectSprite(cb, polyfillAlreadyLoadedIcons = true) {
    var request = new XMLHttpRequest()

    request.open('GET', this.options.svgSpriteFile, true)
    request.send()
    request.onload = e => {
      this.$svgSprite.innerHTML = request.responseText
      document.body.insertBefore(this.$svgSprite, document.body.childNodes[0])
      cb(this, e)
    }
  }

  /**
   * Load icon metadata.
   * @param {Function} cb - Callback when finished.
   */
  loadData(cb) {
    var request = new XMLHttpRequest()

    request.open('GET', this.options.svgJsonFile, true)
    request.send()
    request.onload = e => {
      this.iconsData = JSON.parse(request.responseText)
      cb(this, e)
    }
  }

  /**
   * Return metadata of given icon.
   *
   * @param   {String} iconId - Icon id to return metadata from.
   * @returns {Object}
   */
  getIconFromData(iconId) {
    var iconData = this.iconsData.icons[iconId]
    if (!iconData)
      throw new Error(
        `No icon "${iconId}" found in icon json data file "${
          this.options.svgJsonFile
        }"!`
      )
    return this.iconsData.icons[iconId]
  }

  /**
   * Return svg element from sprite.
   *
   * @param   {String} iconId - Icon id of the element to return.
   * @returns {Element}
   */
  getIconFromSprite(iconId) {
    var $spriteIcon = this.$svgSprite.querySelector(
      `#${this.options.prefixId}${iconId}`
    )
    if (!$spriteIcon)
      throw new Error(
        `No icon "${iconId}" found in svg sprite file "${
          this.options.svgSpriteFile
        }"!`
      )
    return $spriteIcon
  }
}

/**
 * Default options for icon manager.
 *
 * @type {Object}
 * @property {String}  svgJsonFile - JSON file with icon metadata (attributes).
 * @property {String}  svgSpriteFile - SVG sprite file with all the icons.
 * @property {Boolean} [equal=false] - Whether the icons should have the same sizes by default.
 * @property {Boolean} [original=false] - Whether the icons should have their `width` and `height` attributes from the original svg by default.
 * @property {String}  [prefixId='icon-'] - Prefix used for the icon ids.
 * @property {String}  [prefixClass='-icon-'] - Prefix used for the icon classes.
 * @property {String}  [iconClass='icon-svg'] - Class used for icons.
 * @property {String}  [wrapClass='icon-box'] - Class used for wrapper.
 * @property {Boolean} [responsive=false] - Whether the icons should be responsive by default.
 * @property {String}  [responsiveClass='-responsive'] - Class used for responsive icons.
 * @property {Number}  [width=200] - Default width when original is used if no width has been defined.
 * @property {Number}  [height=200] - Default height when original is if no height has been defined.
 */
IconManager.defaultOptions = {
  svgJsonFile: null,
  svgSpriteFile: null,
  equal: false,
  original: false,
  prefixId: 'icon-',
  prefixClass: '-icon-',
  iconClass: 'icon-svg',
  wrapClass: 'icon-box',
  accessible: false,
  responsive: false,
  responsiveClass: '-responsive',
  width: 200,
  height: 200
}
