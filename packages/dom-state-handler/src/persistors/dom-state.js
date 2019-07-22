import { eventHub, utils } from '@goldinteractive/js-base'

class DomState {
  constructor({ namespace } = {}) {
    this._namespace = namespace
    this._state = {}
    this._stateHandlers = []
    eventHub.one('features:initialized', () => {
      this.updateState()
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
    const query = Object.assign(
      {},
      utils.url.parseQuery(location.search, { ignoreQueryPrefix: true }),
      this.getState()
    )
    const url =
      location.origin +
      location.pathname +
      '?' +
      utils.url.stringifyQuery(query) +
      location.hash
    utils.url.replaceState(url)
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
