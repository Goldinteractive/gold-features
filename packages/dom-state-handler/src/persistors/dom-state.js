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

  updateState(instance) {
    this._state = this.obtainState(instance)
    this.persistState()
    this.notify()
  }

  obtainState(instance) {
    const syncName = instance?.getName()
    const syncValue = instance?.getValue()
    let states = this._stateHandlers.reduce((agg, handler) => {
      let value = '';
      //const value = handler.getName() === syncName ? syncValue : handler.getValue()
      if(handler.getName() === syncName){
        value = syncValue
        console.log(handler)
      } else {
        value = handler.getValue()
      }
      agg[handler.getName()] = value
      return agg
    }, {})
    return states
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
