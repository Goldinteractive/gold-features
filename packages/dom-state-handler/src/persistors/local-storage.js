import DomState from './dom-state'

class LocalStorage extends DomState {

  retrieveState() {
    return this.decodeState(localStorage.getItem(this._namespace))
  }

  decodeState(state) {
    return JSON.parse(state)
  }

  persistState() {
    localStorage.setItem(this._namespace, this.encodeState(this.getState()))
  }

  encodeState(state) {
    return JSON.stringify(state)
  }

  transform(state) {
    return state
  }
}

export default LocalStorage
