import { features } from '@goldinteractive/js-base'

/**
 * Tabs feature
 */
class Tabs extends features.Feature {
  init() {
    this.$$tabs = this.$$(this.options.tabsSelector)

    this.onHub(
      `tabs-${this.node.dataset.tabsIdentifier}:select-tab`,
      ({ tabId }) => this.setActiveTab(tabId)
    )

    // delay setup to wait for all tab-buttons / -selects to be initialized
    setTimeout(() => {
      this.setup()
    }, 0)
  }

  setup() {
    this.handleInitialState()
    this.node.classList.remove(this.options.initiallyHiddenClass)
  }

  handleInitialState() {
    const $activeTab =
      this.$$tabs.find($tab => $tab.dataset.initiallyActive !== undefined) ||
      this.$$tabs[0]
    this.setActiveTab($activeTab.dataset.tab)
  }

  setActiveTab(id) {
    this.$$tabs.forEach($tab => {
      if ($tab.dataset.tab === id) {
        $tab.classList.add(this.options.activeClass)
        $tab.classList.remove(this.options.inactiveClass)
      } else {
        $tab.classList.remove(this.options.activeClass)
        $tab.classList.add(this.options.inactiveClass)
      }
    })

    this.triggerHub(`tabs-${this.node.dataset.tabsIdentifier}:tab-selected`, {
      tabId: id
    })
  }
}

/**
 * Feature options
 * @type {Object}
 * @property {String} tabsSelector CSS Selector for all the tabs
 * @property {String} initiallyHiddenClass Hide class until tabs are setup
 * @property {String} activeClass Class set on active tab
 * @property {String} inactiveClass Class set on all inactive tabs
 */
Tabs.defaultOptions = {
  tabsSelector: '[data-tab]',
  initiallyHiddenClass: '-initially-hidden',
  activeClass: '-active',
  inactiveClass: '-inactive'
}

export default Tabs

export { default as TabSelectorButton } from './tabSelectorButton'
export { default as TabSelectorSelect } from './tabSelectorSelect'
