import { features } from '@goldinteractive/js-base'

class ContentPagination extends features.Feature {
  init() {
    this.$content = this.$('[data-content]')
    this.$previous = this.$('[data-previous]')
    this.$next = this.$('[data-next]')
    this.maxItems = 20 // temp
    this.currentPage = 0
    this.maxPages = 4 // get from endpoint
    this.initial = true // temp

    this.onHub(`${this.options.namespace}:state-update`, state =>
      this.handleStateUpdate(state)
    )

    this.addEventListener(this.$previous, 'click', this.handlePrevious())
    this.addEventListener(this.$next, 'click', this.handleNext())
  }

  fetchContent(parameters = '') {
    fetch(`https://jsonplaceholder.typicode.com/posts/`)
      .then(response => response.json())
      .then(json => this.injectContent(json))
  }

  injectContent = data => {
    console.log(data)
    let counter = 0
    this.$content.innerHTML = ''
    data.forEach(item => {
      counter++
      if (counter <= this.maxItems) {
        const $div = document.createElement('div')
        $div.classList.add('item')
        const $h3 = document.createElement('h3')
        const h3text = document.createTextNode(item.title || item.email)
        $h3.appendChild(h3text)
        const $p = document.createElement('p')
        const ptext = document.createTextNode(item.body + ' ' + counter)
        $p.appendChild(ptext)
        const $pcounter = document.createElement('p')
        const pcounter = document.createTextNode(counter)
        $pcounter.appendChild(pcounter)

        $div.appendChild($h3)
        $div.appendChild($p)
        $div.appendChild($pcounter)
        this.$content.appendChild($div)
      }
    })
  }

  buildQueryParam = () => {
    const stateParameters = this.transformState()
    const pageParameters =
      this.currentPage > 0 ? `&page=${this.currentPage}` : ''
    const parameters = `${stateParameters}${pageParameters}`
  }

  handleStateUpdate = state => {
    if (this.initial) {
      this.initial = false
      return
    }
    this.state = state
    this.buildQueryParam()
  }

  handlePrevious = () => {
    if (this.currentPage > 0) {
      this.currentPage--
      this.buildQueryParam()
    }
  }

  handleNext = () => {
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
