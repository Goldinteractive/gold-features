import StateHandler from '.'

export default class ButtonGroup extends StateHandler {
  constructor(node) {
    super(node)
    this.$master = this.node.querySelector('[data-dom-state-handler-master]')
    if (!this.$master) {
      throw new Error(
        `ButtomGroup" ${this.name}" feature needs a "data-dom-state-handler-master" property to handle the current state`
      )
    }
    this.$$buttons = Array.from(this.node.querySelectorAll('button'))
    
    this.value = this.$master.value
    this.$$buttons.forEach($button => {
      $button.addEventListener('click', () => (this.value = $button.value))
    })
  }

  static isHandledBy(node) {
    return node.dataset && node.dataset.stateHandlerType === 'button-group'
  }

  getName() {
    return this.node.querySelector('button').name
  }

  getValue() {
    return this.value
  }

  setValue(value) {
    this.$$buttons.forEach($button => {
      $button.value = value
    })
  }

  getChangeEventName() {
    return 'click'
  }
}
