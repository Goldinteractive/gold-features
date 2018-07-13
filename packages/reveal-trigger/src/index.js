import { features } from '@goldinteractive/js-base'

import * as strategies from './strategies'
import IntersectionManager from './intersection-manager'

class RevealTrigger extends features.Feature {
  init() {
    if (!this.options.strategy) {
      throw new Error(`RevealTrigger "${this.name}" feature needs to be initialized with a Reveal Strategy instance`)
    }

    if (!this.options.manager) {
      throw new Error(`RevealTrigger "${this.name}" feature needs to be initialized with a Reveal Manager instance`)
    }

    this.options.strategy.register(this.node, this.options.manager)
  }

}

RevealTrigger.defaultOptions = {
  strategy: null,
  manager: null
}

export {
  strategies,
  IntersectionManager
}

export default RevealTrigger
