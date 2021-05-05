import { features } from '@goldinteractive/js-base'
import { utils } from '@goldinteractive/js-base'

class DynamicContentPagination extends features.Feature {
  init() {
    this.$content = this.$('[data-content]')
    this.state = {}

    this.onHub(`${this.options.namespace}:state-update`, state => this.handleStateUpdate(state))
  }

  handleStateUpdate = state => {
    // TODO: handle when filters changed reset skip
    this.state = this.options.transformDomState(state)
    this.updateContent()
  }

  updateContent = () => {
    this.options.strategy.getData(this.handleData, this.node, this.state)
  }

  handleData = data => {
    this.$content.innerHTML = data.html
    this.callPaginationStateHandler(data)
    this.callPaginationDisplayHandler(data)
  }

  callPaginationStateHandler = data => {
    Object.values(this.options.paginationStateHandler).forEach(func => {
      func(this.node, data, this.state)
    })
  }

  callPaginationDisplayHandler = data => {
    Object.values(this.options.paginationDisplayHandler).forEach(func => {
      func(this.node, data, this.state)
    })
  }
}

DynamicContentPagination.defaultOptions = {
  namespace: 'content-pagination',
  strategy: null,
  transformDomState: state => {
    return utils.url.parseQuery(state)
  },
  paginationStateHandler: {
    previous: (node, data, state) => {
      const newState = { ...state } // Avoid reference
      const $previous = node.querySelector('[data-previous]')
      const prevSkip = data.meta.skip - data.meta.take
      $previous.dataset.value = prevSkip
      newState.skip = prevSkip
      const queryString = utils.url.stringifyQuery(newState)
      const url = location.origin + location.pathname + '?' + queryString + location.hash
      $previous.href = url
    },
    next: (node, data, state) => {
      const newState = { ...state } // Avoid reference
      const $next = node.querySelector('[data-next]')
      const nextSkip = data.meta.skip + data.meta.take
      $next.dataset.value = nextSkip
      newState.skip = nextSkip
      const queryString = utils.url.stringifyQuery(newState)
      const url = location.origin + location.pathname + '?' + queryString + location.hash
      $next.href = url
    }
  },
  paginationDisplayHandler: {
    previous: (node, data) => {
      const $previous = node.querySelector('[data-previous]')
      if ($previous) {
        if (parseInt(data.meta.skip) === 0) {
          $previous.classList.add('-hide')
        } else {
          $previous.classList.remove('-hide')
        }
      }
    },
    next: (node, data) => {
      const $next = node.querySelector('[data-next]')
      if ($next) {
        if (parseInt(data.meta.skip) + parseInt(data.meta.count) >= parseInt(data.meta.totalCount)) {
          $next.classList.add('-hide')
        } else {
          $next.classList.remove('-hide')
        }
      }
    }
  }
}

export default DynamicContentPagination
