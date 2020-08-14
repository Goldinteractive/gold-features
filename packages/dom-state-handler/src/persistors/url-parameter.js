import { utils } from '@goldinteractive/js-base'
import DomState from './dom-state'

class UrlParameter extends DomState {

  retrieveState() {
    return utils.url.parseQuery(location.search.slice(1))
  }

  persistState() {
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

  transform(state) {
    return utils.url.stringifyQuery(state)
  }
}

export default UrlParameter
