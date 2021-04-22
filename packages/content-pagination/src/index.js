import { features } from '@goldinteractive/js-base'
import { utils } from '@goldinteractive/js-base'
import { allData } from '../stories/index.stories'

class ContentPagination extends features.Feature {
  init() {
    this.$content = this.$('[data-content]')
    this.$previous = this.$('[data-previous]')
    this.$next = this.$('[data-next]')
    this.skip = 0
    this.maxPages = 4 // get from endpoint
    this.initial = true // temp
    this.state = ''
    this.queryString = ''

    this.onHub(`${this.options.namespace}:state-update`, state => this.handleStateUpdate(state))

    this.handlePreviousNextButtonsDisplay()
  }

  // Temp
  manuallyHandleContent = () => {
    return allData.filter(item => item.meta.skip === this.skip)
  }

  updateContent = () => {
    console.log('parameters:', this.queryString)
    const data = this.manuallyHandleContent()
    console.log('data received', data)
    this.injectContent(data[0])
  }

  injectContent = data => {
    this.$content.innerHTML = data.html
  }

  persistState = () => {
    let queryString = ''
    if (Object.keys(this.state).length > 0) {
      const query = Object.assign({}, utils.url.parseQuery(location.search, { ignoreQueryPrefix: true }), this.state)
      queryString = utils.url.stringifyQuery(query)
    }
    return queryString
  }

  handleSkipState = () => {
    console.log(this.state)
    if (this.state.skip === 'plus') {
      this.skip += 3
    } else if (this.state.skip === 'minus') {
      this.skip -= 3
    } else {
      this.skip = 0
    }
  }

  handleStateUpdate = state => {
    this.state = this.transformState(state)
    this.queryString = state
    this.handleSkipState()
    this.updateContent()
    this.handlePreviousNextButtonsDisplay()
  }

  transformState = state => {
    return utils.url.parseQuery(state)
  }

  handlePreviousNextButtonsDisplay = () => {
    if (this.currentPage == 1) {
      this.$previous.classList.add('-hide')
    } else {
      this.$previous.classList.remove('-hide')
    }
    if (this.currentPage == this.maxPages) {
      this.$next.classList.add('-hide')
    } else {
      this.$next.classList.remove('-hide')
    }
  }
}

ContentPagination.defaultOptions = {
  namespace: 'content-pagination',
  strategy: null
}
export default ContentPagination

export { default as ContentStrategies } from './strategies'
