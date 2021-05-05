import { json } from '@goldinteractive/js-base/src/utils/fetch'
import { stringifyQuery } from '@goldinteractive/js-base/src/utils/url'

class JsonHtmlEndpoint {
  getData = (callback, node, state) => {
    const actionUrl = node?.dataset?.actionUrl
    if (!actionUrl) {
      throw new Error(`JsonHtmlEndpoint strategy needs an action url attribute on the node`)
    }

    const queryString = stringifyQuery(state)
    const url = `${actionUrl}?${queryString}`

    json(url).then(result => {
      if (callback) {
        callback(result.data)
      }
    })
  }
}

JsonHtmlEndpoint.defaultOptions = {}

export default JsonHtmlEndpoint
