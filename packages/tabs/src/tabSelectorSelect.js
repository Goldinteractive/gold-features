import { features } from '@goldinteractive/js-base'

/**
 * TabSelectorButton feature
 * Of no use if not used in combination with the Tabs feature
 * Selects a tab in the corresponding tabs list
 */
class TabSelectorSelect extends features.Feature {
  init() {
    this.$$tabs = this.$$('[data-tab]')

    this.onHub(
      `tabs-${this.node.dataset.tabsIdentifier}:tab-selected`,
      ({ tabId }) => this.tabSelected(tabId)
    )

    this.addEventListener(this.node, 'change', this.handleSelect)
  }

  handleSelect = e => {
    this.selectTab()
  }

  selectTab = () => {
    this.triggerHub(`tabs-${this.node.dataset.tabsIdentifier}:select-tab`, {
      tabId: this.node.value
    })
  }

  tabSelected = tabId => {
    this.node.value = tabId
  }
}

export default TabSelectorSelect
