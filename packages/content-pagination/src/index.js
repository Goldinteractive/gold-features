import { features } from '@goldinteractive/js-base'
import { utils } from '@goldinteractive/js-base'

class ContentPagination extends features.Feature {
  init() {
    this.$content = this.$('[data-content]')
    this.$previous = this.$('[data-previous]')
    this.$next = this.$('[data-next]')
    this.currentPage = 1
    this.maxPages = 4 // get from endpoint
    this.initial = true // temp
    this.state = ''

    this.onHub(`${this.options.namespace}:state-update`, state => this.handleStateUpdate(state))

    this.addEventListener(this.$previous, 'click', this.handlePrevious)
    this.addEventListener(this.$next, 'click', this.handleNext)

    this.handlePreviousNextButtonsDisplay()
  }

  getData(parameters = '') {
    console.log('parameters:', parameters)
    const url = './data.json'
    const data = require(`${url}`) // TODO: add parameters
    utils.fetch.json(data).then(result => {
      this.injectContent(result.data.page[this.currentPage - 1].html) // temp
    })
  }

  injectContent = html => {
    this.$content.innerHTML = html
  }

  buildPreviousNextLinks = () => {
    console.log('currentpage:', this.currentPage)
    const queryString = this.persistState()
    
    const previousPageString = `&page=${this.currentPage - 1}`
    const nextPage = `&page=${this.currentPage + 1}`
    const previousPageUrl = location.origin + location.pathname + '?' + queryString + previousPageString + location.hash
    const nextPageUrl = location.origin + location.pathname + '?' + queryString + nextPage + location.hash

    this.$previous.href = previousPageUrl
    this.$next.href = nextPageUrl
  }

  persistState = () => {
    let queryString = ''
    if (Object.keys(this.state).length > 0) {
      const query = Object.assign({}, utils.url.parseQuery(location.search, { ignoreQueryPrefix: true }), this.state)
      queryString = utils.url.stringifyQuery(query)
    }
    return queryString
  }

  buildQueryParam = () => {
    const queryString = this.persistState()
    const pageParameters = this.currentPage > 1 ? `&page=${this.currentPage}` : ''
    const parameters = `${queryString}${pageParameters}`
    this.getData(parameters)
  }

  handleStateUpdate = state => {
    if (this.initial) {
      this.initial = false
      return
    }
    this.state = this.transformState(state)
    this.buildQueryParam()
    this.buildPreviousNextLinks()
    this.handlePreviousNextButtonsDisplay()
  }

  handlePrevious = e => {
    e.preventDefault()
    if (this.currentPage > 1) {
      this.currentPage--
      this.buildQueryParam()
      this.buildPreviousNextLinks()
      this.handlePreviousNextButtonsDisplay()
    }
  }

  handleNext = e => {
    e.preventDefault()
    if (this.currentPage < this.maxPages) {
      this.currentPage++
      this.buildQueryParam()
      this.buildPreviousNextLinks()
      this.handlePreviousNextButtonsDisplay()
    }
  }

  transformState = (state) => {
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
  namespace: 'content-pagination'
}
export default ContentPagination
