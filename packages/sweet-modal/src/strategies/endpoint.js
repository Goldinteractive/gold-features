import { json } from '@goldinteractive/js-base/src/utils/fetch'

class Endpoint {
  constructor({ url }) {
    this.url = url
    if (!this.url) {
      throw new Error(
        `Endpoint strategy needs to be initialized with an endpoint url`
      )
    }
  }

  getData = (callback)  => {
    json(this.url).then(result => {
      if(callback){
        callback(result.data.html)
      }
    })
  }
}

Endpoint.defaultOptions = {}

export default Endpoint
