import { features } from '@goldinteractive/js-base'

/**
 * TabSelectorButton feature
 * Of no use if not used in combination with the Tabs feature
 * Selects a tab in the corresponding tabs list
 */
class TabSelectorButton extends features.Feature {
  init() {
    this.$$tabs = this.$$('[data-tab]')

    this.onHub(
      `tabs-${this.node.dataset.tabsIdentifier}:tab-selected`,
      ({ tabId }) => this.tabSelected(tabId)
    )

    this.addEventListener(this.node, 'click', this.handleClick)
  }

  handleClick = e => {
    this.selectTab()
  }

  selectTab = () => {
    this.triggerHub(`tabs-${this.node.dataset.tabsIdentifier}:select-tab`, {
      tabId: this.node.dataset.tabId
    })
  }

  tabSelected = tabId => {
    if (this.node.dataset.tabId === tabId) {
      this.node.classList.add(this.options.activeClass)
      this.node.classList.remove(this.options.inactiveClass)
    } else {
      this.node.classList.remove(this.options.activeClass)
      this.node.classList.add(this.options.inactiveClass)
    }
  }
}

/**
 * Feature options
 * @type {Object}
 * @property {String} activeClass Class set when active
 * @property {String} inactiveClass Class set when inactive
 */

TabSelectorButton.defaultOptions = {
  activeClass: '-active',
  inactiveClass: '-inactive'
}

export default TabSelectorButton
