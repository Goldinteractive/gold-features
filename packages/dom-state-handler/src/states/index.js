export default class StateHandler {
  constructor(node) {
    this.node = node
  }

  static isHandledBy(node, tagName) {
    return node.tagName === tagName
  }

  getNode() {
    return this.node
  }

  getChangeEventName() {
    return 'change'
  }
}
