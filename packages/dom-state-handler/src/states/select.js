import StateHandler from './'

export default class Select extends StateHandler {
  static isHandledBy(node) {
    return StateHandler.isHandledBy(node, 'SELECT')
  }
  getName() {
    return this.node.name
  }

  getValue() {
    return this.node.value
  }

  setValue(value) {
    this.node.value = value
  }
}
