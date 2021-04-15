import { features } from '@goldinteractive/js-base'

class ContentPagination extends features.Feature {
  init() {
    this.fetchContent()

    this.onHub(`${this.options.namespace}:state-update`, state =>
      this.handleStateUpdate(state)
    )
  }

  fetchContent() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => this.injectContent(json))
  }

  injectContent = data => {
    console.log(data)
    data.forEach(item => {
      if (item.userId == 1) {
        const $div = document.createElement('div')
        $div.classList.add('item')
        const $h3 = document.createElement('h3')
        const h3text = document.createTextNode(item.title)
        $h3.appendChild(h3text)
        const $p = document.createElement('p')
        const ptext = document.createTextNode(item.body)
        $p.appendChild(ptext)

        $div.appendChild($h3)
        $div.appendChild($p)
        this.node.appendChild($div)
      }
    })
  }

  handleStateUpdate = state => {
    console.log('state-update', state)
    const option = state.split('=')[1]
    console.log(option)
    const id = option.split('-')[1]
    console.log(id)
  }
}

ContentPagination.defaultOptions = {
  namespace: 'content-pagination'
}
export default ContentPagination
