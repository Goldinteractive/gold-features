import { features } from '@goldinteractive/js-base'
import { utils } from '@goldinteractive/js-base'
import { allData } from '../stories/index.stories'

class ContentPagination extends features.Feature {
  init() {
    this.$content = this.$('[data-content]')
    this.state = ''
    this.queryString = ''

    this.onHub(`${this.options.namespace}:state-update`, state => this.handleStateUpdate(state))
  }

  handleStateUpdate = state => {
    this.state = this.transformState(state)
    this.queryString = state
    this.updateContent()
  }

  transformState = state => {
    return utils.url.parseQuery(state)
  }

  updateContent = () => {
    this.options.strategy.getData(this.injectContent, this.node, this.state)
  }

  injectContent = data => {
    console.log('received', data)
    this.$content.innerHTML = data.html
    this.updateButtonHandler(data)
  }

  updateButtonHandler = data => {
    Object.values(this.options.buttonUpdateHandler).forEach(func => {
      func(this.node, data)
    })
  }
}

ContentPagination.defaultOptions = {
  namespace: 'content-pagination',
  strategy: null,
  buttonUpdateHandler: {
    previous: (node, data) => {
      const $previous = node.querySelector('[data-previous]')
      $previous.value = data.meta.current - data.meta.take
    },
    next: (node, data) => {
      const $next = node.querySelector('[data-next]')
      $next.value = data.meta.current + data.meta.take
    }
  }
}

export default ContentPagination
