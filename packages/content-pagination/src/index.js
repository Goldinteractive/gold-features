import { features } from '@goldinteractive/js-base'
import { json } from '@goldinteractive/js-base/src/utils/fetch'

class ContentPagination extends features.Feature {
  init() {
    this.$content = this.$('[data-content]')
    this.$previous = this.$('[data-previous]')
    this.$next = this.$('[data-next]')
    this.currentPage = 1
    this.maxPages = 4 // get from endpoint
    this.initial = true // temp
    this.state = ''

    this.onHub(`${this.options.namespace}:state-update`, state =>
      this.handleStateUpdate(state)
    )

    this.addEventListener(this.$previous, 'click', this.handlePrevious)
    this.addEventListener(this.$next, 'click', this.handleNext)
  }

  getData(parameters = '') {
    console.log('parameters:', parameters)
    const url = './data.json'
    const data = require(`${url}`) // TODO: add paramets
    json(data).then(result => {
      this.injectContent(result.data.page[this.currentPage - 1].html) // temp
    })
  }

  injectContent = html => {
    console.log(html)
    this.$content.innerHTML = html
  }

  buildQueryParam = () => {
    const stateParameters = this.transformState()
    const pageParameters =
      this.currentPage > 1 ? `&page=${this.currentPage}` : ''
    const parameters = `${stateParameters}${pageParameters}`
    this.getData(parameters)
    // TODO: inject link to prev/next buttons
  }

  handleStateUpdate = state => {
    if (this.initial) {
      this.initial = false
      return
    }
    this.state = state
    this.buildQueryParam()
  }

  handlePrevious = e => {
    e.preventDefault()
    if (this.currentPage > 1) {
      this.currentPage--
      this.buildQueryParam()
    }
  }

  handleNext = e => {
    e.preventDefault()
    if (this.currentPage < this.maxPages) {
      this.currentPage++
      this.buildQueryParam()
    }
  }

  transformState = () => {
    const splitState = this.state.split('%2C')
    return splitState.reduce((acc, state) => `${acc}&${state}`)
  }
}

ContentPagination.defaultOptions = {
  namespace: 'content-pagination'
}
export default ContentPagination
