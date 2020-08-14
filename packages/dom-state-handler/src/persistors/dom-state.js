import { eventHub } from '@goldinteractive/js-base'

class DomState {
  constructor({ namespace, restorePersisted = false } = {}) {
    this._namespace = namespace
    this._state = {}
    this._stateHandlers = []
    eventHub.one('features:initialized', () => {
      if (restorePersisted) {
        this.restoreState()
      }
      this.updateState()
    })
  }

  restoreState() {
    const state = this.decodeState()
    this._stateHandlers.forEach(handler => {
      const name = handler.getName()
      const value = state[name]
      if (value) {
        handler.setValue(value)
      }
    })
  }

  updateState() {
    this._state = this.obtainState()
    this.persistQuery()
    this.notify()
  }

  obtainState() {
    return this._stateHandlers.reduce((agg, handler) => {
      agg[handler.getName()] = handler.getValue()
      return agg
    }, {})
  }

  persistQuery() {
    this.encodeState()
  }

  notify() {
    eventHub.trigger(
      `${this._namespace}:state-update`,
      this.transform()
    )
  }

  registerStateHandler(stateHandler) {
    this._stateHandlers.push(stateHandler)
  }

  getState() {
    return this._state
  }

  decodeState() {
    console.error(`Called method "decodeState" in abstract class. Implement this method in child instance`)
  }

  encodeState() {
    console.error(`Called method "encodeState" in abstract class. Implement this method in child instance`)
  }

  transform() {
    console.error(`Called method "transform" in abstract class. Implement this method in child instance`)
  }

}

export default DomState
