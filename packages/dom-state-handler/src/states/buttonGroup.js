import StateHandler from '.'

export default class ButtonGroup extends StateHandler {
  constructor(node) {
    super(node)
    this.$hiddenInput = this.node.querySelector('input[type="hidden"]')
    if (!this.$hiddenInput) {
      throw new Error(`ButtomGroup" ${this.name}" feature needs a hidden input field to store state value`)
    }
    this.$$buttons = Array.from(this.node.querySelectorAll('button'))
    this.$$buttons.forEach($button => {
      $button.addEventListener('click', () => (this.$hiddenInput.value = $button.value))
    })
  }

  static isHandledBy(node) {
    return node.dataset && node.dataset.stateHandlerType === 'button-group'
  }

  getName() {
    return this.node.querySelector('button').name
  }

  getValue() {
    return this.$hiddenInput.value
  }

  setValue(value) {
    this.$hiddenInput.value = value
  }

  getChangeEventName() {
    return 'click'
  }
}
