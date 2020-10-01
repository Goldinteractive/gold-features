import { utils } from '@goldinteractive/js-base'
import DomState from './dom-state'

class UrlFragment extends DomState {

  retrieveState() {
    return utils.url.parseQuery(this.getFragmentQuery(location.hash))
  }

  persistState() {
    const state = this.getState()
    if (Object.keys(state).length > 0) {
      const fragmentQueryObj = Object.assign(
        {},
        utils.url.parseQuery(this.getFragmentQuery(location.hash)),
        state
      )
      const fragmentPath = this.getFragmentPath(location.hash)
      const fragmentQuery = utils.url.stringifyQuery(fragmentQueryObj)
      const url =
        location.origin + location.pathname + location.search + '#' + fragmentPath + '?' + fragmentQuery
      utils.url.replaceState(url)
    }
  }

  transform(state) {
    return utils.url.stringifyQuery(state)
  }

  getFragmentQuery(hash) {
    const i = hash.indexOf('?')
    return hash.slice(i + 1)
  }

  getFragmentPath(hash) {
    const i = hash.indexOf('?')
    return hash.substring(1, i)
  }
}

export default UrlFragment
