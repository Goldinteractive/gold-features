import { features } from '@goldinteractive/js-base'
import { json } from '@goldinteractive/js-base/src/utils/fetch'
import autocomplete from 'autocompleter'

class Autocomplete extends features.Feature {
  init() {
    this.$input = this.$('[data-input]')
    if (!this.$input) {
      throw new Error(
        `Autocomplete" ${this.name}" feature needs a data-input element`
      )
    }

    this.noResultText = this.node.dataset.noResultText || ''

    this.initAutocomplete()
  }

  getData = () => {
    if (this.options.useEndpoint) {
      return this._getDataByEndpoint()
    } else if (this.options.useValueList) {
      return this._getDataByValuesList()
    }
  }

  _getDataByEndpoint = () => {
    const url = this.node.dataset.actionUrl
    if (!url) {
      throw new Error(
        `Autocomplete" ${this.name}" feature needs an action-url data-attribute`
      )
    }
    json(url).then(result => {
      return result.data
    })
  }

  _getDataByValuesList = () => {
    const list = this.node.dataset.valueList
    if (!list) {
      throw new Error(
        `Autocomplete" ${this.name}" feature needs a value-list data-attribute`
      )
    }
    return list.split(',').map(item => {
      return { label: item.trim() }
    })
  }

  render = (item, value) => {
    let $div = document.createElement('div')
    $div.classList.add('list-item')
    const regex = new RegExp(value, 'gi')
    const text = item.label.replace(regex, match => {
      return '<span class="highlight">' + match + '</span>'
    })
    $div.innerHTML = text
    return $div
  }

  initAutocomplete = () => {
    autocomplete({
      input: this.$input,
      fetch: (value, callback) => {
        value = value.toLowerCase()
        const items = this.getData()
        const filtered = items.filter(item => {
          return item.label.toLowerCase().indexOf(value) !== -1
        })
        callback(filtered)
      },
      render: (item, value) => {
        return this.render(item, value)
      },
      onSelect: (item, input) => {
        input.value = item.label
      },
      emptyMsg: this.noResultText,
      ...this.options.autocompleteConfig
    })
  }
}

Autocomplete.defaultOptions = {
  useEndpoint: false,
  useValueList: true,
  autocompleteConfig: {}
}

export default Autocomplete
