import { json } from '@goldinteractive/js-base/src/utils/fetch'

class StaticStrategy {
  getData = (callback, node, parameters) => {
    const data = require('./staticData')
    let matchingParameters = false
    json(data).then(result => {
      result.forEach(entry => {
        if (
          entry.meta.skip == parameters.skip &&
          parameters['color'] == entry._testing['color'] &&
          parameters['fruit'] == entry._testing['fruit']
        ) {
          matchingParameters = true
          callback(entry)
          return
        }
      })
      if (!matchingParameters) {
        callback({
          html: '<h2> No results found </h2>',
          meta: {
            skip: 0,
            take: 0,
            count: 0,
            totalCount: 0
          }
        })
      }
    })
  }
}

StaticStrategy.defaultOptions = {}

export default StaticStrategy
