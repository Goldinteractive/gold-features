import StateHandler from './'

export default class CheckboxGroup extends StateHandler {
  static DELIMITER = ','
  static isHandledBy(node) {
    return node.dataset && node.dataset.stateHandlerType === 'checkbox-group'
  }

  getName() {
    return this.node.querySelector('input[type="checkbox"]').name
  }

  getValue() {
    const selectedCheckboxes = this.node.querySelectorAll(
      'input[type="checkbox"]:checked'
    )
    return Array.from(selectedCheckboxes)
      .map($checkbox => $checkbox.value)
      .join(CheckboxGroup.DELIMITER)
  }
}
