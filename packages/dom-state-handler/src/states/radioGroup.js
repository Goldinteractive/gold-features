import StateHandler from './'

export default class RadioGroup extends StateHandler {
  static isHandledBy(node) {
    return node.dataset && node.dataset.stateHandlerType === 'radio-group'
  }

  getName() {
    return this.node.querySelector('input[type="radio"]').name
  }

  getValue() {
    const selectedRadio = this.node.querySelector('input[type="radio"]:checked')
    return selectedRadio ? selectedRadio.value : undefined
  }
  setValue(value) {
    const $$radios = [...this.node.querySelectorAll('input[type="radio"]')]
    $$radios.forEach($radio => {
      $radio.checked = $radio.value === value
    })
  }
}
