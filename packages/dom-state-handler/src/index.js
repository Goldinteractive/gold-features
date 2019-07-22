import { features } from '@goldinteractive/js-base'
import Select from './states/select'
import CheckboxGroup from './states/checkboxGroup'
import RadioGroup from './states/radioGroup'

export * from './persistors'

/**
 * Feature for dom state handling.
 *
 * Important: currently destruction is not handled.
 */
class DomStateHandler extends features.Feature {
  init() {
    const Prototype = this.options.statePrototypes.find(Prototype =>
      Prototype.isHandledBy(this.node)
    )
    if (Prototype === undefined) {
      throw new Error(
        `No matching Prototype found for ${this.node.tagName} `,
        this.node,
        ' in ',
        this.options.statePrototypes
      )
    }
    if (this.options.domState === null) {
      throw new Error(
        `Must be initialized with a proper domState instance`,
        this.options.domState
      )
    }
    this.instance = new Prototype(this.node)
    this.options.domState.registerStateHandler(this.instance)
    this.addEventListener(this.node, this.instance.getChangeEventName(), () => {
      this.options.domState.updateState()
    })
  }
}

/**
 * Feature options
 * @type {Object}
 * @property {DomState} domState state handling instance
 * @property {Array} statePrototypes=[Select]
 *   Defines which filter state handling prototypes to check for.
 */
DomStateHandler.defaultOptions = {
  domState: null,
  statePrototypes: [Select, CheckboxGroup, RadioGroup]
}

export default DomStateHandler
