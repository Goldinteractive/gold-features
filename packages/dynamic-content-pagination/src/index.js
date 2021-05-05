import { features } from '@goldinteractive/js-base'
import { utils } from '@goldinteractive/js-base'

class DynamicContentPagination extends features.Feature {
  init() {
    this.$content = this.$('[data-content]')
    this.state = ''
    this.queryString = ''

    this.onHub(`${this.options.namespace}:state-update`, state => this.handleStateUpdate(state))
  }

  handleStateUpdate = state => {
    // TODO: handle when filters changed reset skip
    this.state = this.transformState(state)
    this.queryString = state
    this.updateContent()
  }

  transformState = state => {
    return utils.url.parseQuery(state)
  }

  updateContent = () => {
    // TODO maybe send queryString or stringify state in strategy (better)
    this.options.strategy.getData(this.handleData, this.node, this.state)
  }

  handleData = data => {
    this.$content.innerHTML = data.html
    this.callButtonStateHandler(data)
    this.callButtonDisplayHandler(data)
  }

  callButtonStateHandler = data => {
    Object.values(this.options.buttonStateHandler).forEach(func => {
      func(this.node, data)
    })
  }

  callButtonDisplayHandler = data => {
    Object.values(this.options.buttonDisplayHandler).forEach(func => {
      func(this.node, data)
    })
  }
}

DynamicContentPagination.defaultOptions = {
  namespace: 'content-pagination',
  strategy: null,
  buttonStateHandler: {
    previous: (node, data) => {
      const $previous = node.querySelector('[data-previous]')
      $previous.value = data.meta.skip - data.meta.take
    },
    next: (node, data) => {
      const $next = node.querySelector('[data-next]')
      $next.value = data.meta.skip + data.meta.take
    }
  },
  buttonDisplayHandler: {
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