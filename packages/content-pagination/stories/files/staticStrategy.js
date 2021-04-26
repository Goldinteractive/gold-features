import { json } from '@goldinteractive/js-base/src/utils/fetch'

const NO_RESULTS = {
  html: '<h2> No results found </h2>',
  meta: {
    current: 0,
    take: 1,
    amount: 12
  }
}

class StaticStrategy {
  getData = (callback, node, parameters) => {
    console.log('called')
    const data = require('./staticData')
    json(data).then(result => {
      const page = result[parameters.skip]
      if (parameters['color'] == page._testing['color'] && parameters['fruit'] == page._testing['fruit']) {
        callback(page)
      } else {
        callback(NO_RESULTS)
      }
    })
  }
}

StaticStrategy.defaultOptions = {}

export default StaticStrategy
