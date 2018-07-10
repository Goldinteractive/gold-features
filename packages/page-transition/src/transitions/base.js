import Barba from 'barba.js'

import { features } from '@goldinteractive/js-base'

export default Barba.BaseTransition.extend({
  done: function() {
    features.destroy(this.oldContainer, undefined, { justChildNodes: true })
    Barba.BaseTransition.done.call(this)
  }
})
