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

    this.noResultText = this.$(
      `${this.options.noResultTextSelector}`
    )?.textContent || ''

    this.initAutocomplete()
  }

  getData = () => {
    if(this.options.endpoint){
      return this._getDataByEndpoint()
    } else {
      const result = {
        data: [
          {
            value: 'ch',
            label: 'Schweiz'
          },
          {
            value: 'de',
            label: 'Deutschland'
          },
          {
            value: 'sw',
            label: 'Schweden'
          },
        ]
      }
      return result.data // TODO: Use data-attribut values or just remove this option
    }
  }

  fetch = async () => {
    const result = await json(this.options.endpoint)
    return result.data
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
      debounceWaitMs: 200,
      ...this.options.autocompleteOptions
    })
  }
}
Autocomplete.defaultOptions = {
  endpoint: null,
  noResultTextSelector: '[data-no-result-text]',
  autocompleteOptions: {}
}

export default Autocomplete
