import { json } from '@goldinteractive/js-base/src/utils/fetch'

class Endpoint {
  getData = (callback, node) => {
    const url = node?.dataset?.actionUrl
    if (!url) {
      throw new Error(
        `Endpoint strategy needs an action url attribute on the node`
      )
    }

    json(url).then(result => {
      if (callback) {
        callback(result.data.html)
      }
    })
  }
}

Endpoint.defaultOptions = {}

export default Endpoint
