import StateHandler from '.'

export default class ButtonGroup extends StateHandler {
  constructor(node) {
    super(node)
    this.value = ''
    this.$$buttons = Array.from(this.node.querySelectorAll('button'))
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
    return
  }

  getChangeEventName() {
    return 'click'
  }
}
