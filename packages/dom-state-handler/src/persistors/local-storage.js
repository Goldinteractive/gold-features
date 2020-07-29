import DomState from './dom-state'

class LocalStorage extends DomState {
  decodeState() {
    return JSON.parse(localStorage.getItem(this._namespace))
  }

  encodeState() {
    localStorage.setItem(this._namespace, JSON.stringify(this.getState()))
  }

  transform() {
    return this.getState()
  }
}

export default LocalStorage
