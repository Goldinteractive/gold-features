import { json } from '@goldinteractive/js-base/src/utils/fetch'

class JsonHtmlEndpoint {
  getData = (callback, node) => {
    const url = node?.dataset?.actionUrl
    if (!url) {
      throw new Error(
        `JsonHtmlEndpoint strategy needs an action url attribute on the node`
      )
    }

    json(url).then(result => {
      if (callback) {
        callback(result.data)
      }
    })
  }
}

JsonHtmlEndpoint.defaultOptions = {}

export default JsonHtmlEndpoint