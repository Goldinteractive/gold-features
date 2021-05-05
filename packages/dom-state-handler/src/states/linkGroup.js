import StateHandler from '.'

export default class LinkGroup extends StateHandler {
  constructor(node) {
    super(node)
    this.$hiddenInput = this.node.querySelector('input[type="hidden"]')
    if (!this.$hiddenInput) {
      throw new Error(`LinkGroup" ${this.name}" feature needs a hidden input field to store state value`)
    }
    this.$$links = Array.from(this.node.querySelectorAll('a'))
    this.$$links.forEach($link => {
      $link.addEventListener('click', e => {
        e.preventDefault()
        this.$hiddenInput.value = $link?.dataset?.value
      })
    })
  }

  static isHandledBy(node) {
    return node.dataset && node.dataset.stateHandlerType === 'link-group'
  }

  getName() {
    return this.node.querySelector('a')?.dataset?.name
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
