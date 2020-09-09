import { features, utils, eventHub } from '@goldinteractive/js-base'

export class OverflowStrategy {
  /**
   * Strategy constructor
   * @param {Object} [configuration={}] - OverflowStrategy configuration object.
   * @param {string} [configuration.classNamespace='global'] - The prefix for the applied className.
   * @param {string} [configuration.$node=document.body] - The node on which the classes shall be applied.
   */
  constructor({ classNamespace = 'global', $node = document.body } = {}) {
    this.classNamespace = classNamespace
    this.$node = $node
    this.retryOverflow = this._retryOverflow()
    eventHub.on('features:initialized', utils.fn.once(this.retryOverflow))
    window.addEventListener('resize', utils.fn.debounce(this.retryOverflow))

    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        setTimeout(utils.fn.once(this.retryOverflow))
      })
    }

    this._instances = []
  }

  _retryOverflow() {
    return () => {
      this.$node.classList.add(`${this.classNamespace}--hidden`)
      this.$node.classList.remove(`${this.classNamespace}--overflow`)
      const isAnyOverflowing = this._instances.some(instance =>
        instance.isOverflowing()
      )
      if (isAnyOverflowing) {
        this.$node.classList.add(`${this.classNamespace}--overflow`)

        // accessing the dom node forces relayout to take effect, preventing animation flickering
        this.$node.offsetHeight
      }

      this.$node.classList.remove(`${this.classNamespace}--hidden`)
    }
  }

  register(instance) {
    this._instances.push(instance)
  }
}

/**
 * Overflow Detector Feature
 *
 * currently `destroy` is not handled for this feature.
 */
class OverflowDetector extends features.Feature {
  init() {
    if (this.options.strategy === null) {
      throw new Error('Strategy must not be null, got', this.options.strategy)
    }
    this.options.strategy.register(this)
  }
  isOverflowing() {
    return this.node.scrollWidth > this.node.clientWidth
  }
}

/**
 * Feature options
 * @type {Object}
 * @property {OverflowStrategy} strategy overflow handling strategy.
 */
OverflowDetector.defaultOptions = {
  strategy: null
}

export default OverflowDetector
