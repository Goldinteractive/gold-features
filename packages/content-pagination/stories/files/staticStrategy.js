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
    })
    if (!matchingParameters) {
      callback({
        html: '<h2> No results found </h2>',
        meta: {
          skip: parseInt(parameters.skip),
          take: 3,
          amount: 12
        }
      })
    }
  }
}

StaticStrategy.defaultOptions = {}

export default StaticStrategy
