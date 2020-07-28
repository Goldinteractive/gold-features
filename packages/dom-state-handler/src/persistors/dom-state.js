import { eventHub, utils } from '@goldinteractive/js-base'

class DomState {
  constructor({ namespace, restorePersisted = false } = {}) {
    this._namespace = namespace
    this._state = {}
    this._stateHandlers = []
    eventHub.one('features:initialized', () => {
      if (restorePersisted) {
        this.restore()
      }
      this.updateState()
    })
  }

  restore() {
    const state = utils.url.parseQuery(location.search.slice(1))
    this._stateHandlers.forEach(handler => {
      const name = handler.getName()
      const value = state[name]
      if (value) {
        handler.setValue(value)
      }
    })
  }

  transform() {
    return utils.url.stringifyQuery(this.getState())
  }

  registerStateHandler(stateHandler) {
    this._stateHandlers.push(stateHandler)
  }

  updateState() {
    this._state = this.obtainState()
    this.persistQuery()
    this.notify()
  }

  persistQuery() {
    const state = this.getState()
    if (Object.keys(state).length > 0) {
      const query = Object.assign(
        {},
        utils.url.parseQuery(location.search, { ignoreQueryPrefix: true }),
        state
      )
      const queryString = utils.url.stringifyQuery(query)
      const url =
        location.origin + location.pathname + '?' + queryString + location.hash
      utils.url.replaceState(url)
    }
  }

  obtainState() {
    return this._stateHandlers.reduce((agg, handler) => {
      agg[handler.getName()] = handler.getValue()
      return agg
    }, {})
  }

  notify() {
    eventHub.trigger(
      `${this._namespace}:state-update`,
      this.transform(this.getState())
    )
  }

  getState() {
    return this._state
  }
}

export default DomState
