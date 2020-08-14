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
    const state = this.retrieveState()
    this._stateHandlers.forEach(handler => {
      const name = handler.getName()
      const value = state[name]
      if (value) {
        handler.setValue(value)
      }
    })
  }

  retrieveState() {
    console.error(
      `Called method "retrieveState" in abstract class. Implement this method in child instance`
    )
  }

  updateState() {
    this._state = this.obtainState()
    this.persistState()
    this.notify()
  }

  obtainState() {
    return this._stateHandlers.reduce((agg, handler) => {
      agg[handler.getName()] = handler.getValue()
      return agg
    }, {})
  }

  persistState() {
    console.error(
      `Called method "persistState" in abstract class. Implement this method in child instance`
    )
  }

  notify() {
    eventHub.trigger(`${this._namespace}:state-update`, this.transform(this.getState()))
  }

  transform() {
    console.error(
      `Called method "transform" in abstract class. Implement this method in child instance`
    )
  }

  registerStateHandler(stateHandler) {
    this._stateHandlers.push(stateHandler)
  }

  getState() {
    return this._state
  }
}

export default DomState
