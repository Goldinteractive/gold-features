import { features } from '@goldinteractive/js-base'
import { utils } from '@goldinteractive/js-base'
import { noop } from '@goldinteractive/js-base/src/utils/fn'

class DynamicContentPagination extends features.Feature {
  init() {
    if (!this.options.strategy) {
      throw new Error(
        `DynamicContentPagination "${this.name}" feature needs to be initialized with a Strategy instance`
      )
    }

    this.$content = this.$(this.options.contentSelector)
    if (!this.$content) {
      throw new Error(
        `DynamicContentPagination "${this.name}" feature cannot find node element with ${this.options.contentSelector}`
      )
    }

    this.state = {}

    this.onHub(`${this.options.namespace}:state-update`, state => this.handleStateUpdate(state))
  }

  handleStateUpdate = state => {
    const resetState = this.options.resetSkipState(this.node, this.state, state)
    this.state = this.options.transformDomState(resetState)
    this.updateContent()
  }

  updateContent = () => {
    this.options.onLoadContent({ node: this.node })
    this.options.strategy.getData(this.handleData, this.node, this.state)
  }

  handleData = data => {
    this.$content.innerHTML = data.html
    this.options.onLoadedContent({ node: this.node })
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
  namespace: 'dynamic-content-pagination',
  strategy: null,
  contentSelector: '[data-content]',
  transformDomState: state => {
    return utils.url.parseQuery(state)
  },
  resetSkipState: (node, oldState, newState) => {
    return oldState
  },
  onLoadContent: noop,
  onLoadedContent: noop,
  paginationStateHandler: {},
  paginationDisplayHandler: {}
}

export default DynamicContentPagination
