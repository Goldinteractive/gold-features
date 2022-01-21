import { features } from '@goldinteractive/js-base'

class Menu extends features.Feature {
  init() {
    this.$trigger = this.$(`[${this.options.attributes.trigger}]`)
    this.$closeBtn = this.$(`[${this.options.attributes.closeBtn}]`)
    this.$menu = this.$(`[${this.options.attributes.menu}]`)
    this.$$menus = Array.from(document.querySelectorAll(`[${this.options.attributes.menu}]`))
    this.$$triggers = Array.from(document.querySelectorAll(`[${this.options.attributes.trigger}]`))
    this.identifier = this.node.dataset.menuIdentifier

    if (!this.$trigger) {
      console.error(`The menu feature cannot be initialized without a [${this.options.attributes.trigger}] element.`)
      return
    }
    if (!this.$menu) {
      console.error(`The menu feature cannot be initialized without a [${this.options.attributes.menu}] element.`)
      return
    }
    if (!this.identifier) {
      console.error(`The menu feature cannot be initialized without a [data-menu-identifier] attribute.`)
      return
    }

    this.onHub(`${this.identifier}:open`, () => {
      this.show(this.$menu)
    })

    this.initListeners()
  }

  initListeners() {
    if (this.options.triggerOnHover) {
      this.addEventListener(this.$trigger, 'mouseenter', () => {
        this.show(this.$menu)
      })
    } else {
      this.addEventListener(this.$trigger, 'click', e => {
        e.stopPropagation()
        if (this.$menu.classList.contains(this.options.activeClass) && this.options.closeOnTriggerClick) {
          this.hide(this.$menu)
        } else {
          this.show(this.$menu)
        }
      })
    }

    if (this.$closeBtn) {
      this.addEventListener(this.$closeBtn, 'click', e => {
        e.stopPropagation()
        this.hide(this.$menu)
      })
    }
  }

  hide(menu) {
    menu.classList.remove(this.options.activeClass)
    menu.classList.add(this.options.closingClass)

    const hideAnimCallback = () => {
      menu.classList.remove(this.options.closingClass)
      menu.removeEventListener('transitionend', hideAnimCallback)
    }
    menu.addEventListener('transitionend', hideAnimCallback)

    this.removeListeners(menu)
  }

  show(menu) {
    this.$$menus.forEach(m => {
      if (m.classList.contains(this.options.activeClass)) {
        this.hide(m)
      }
    })
    menu.classList.add(this.options.activeClass)
    this.handleClicks(menu)
    this.handleKeydowns()
    this.handleHovers()
  }

  handleClicks(menu) {
    document.addEventListener('click', this.handleOutsideClicks)
    menu.addEventListener('click', this.handleInsideClicks)
  }

  handleKeydowns() {
    document.addEventListener('keydown', this.handleEsc)
  }

  handleHovers() {
    if (this.options.triggerOnHoverWhenOpen) {
      this.$$triggers.forEach(trigger => {
        if (trigger !== this.$trigger) {
          trigger.addEventListener('mouseenter', this.handleHoverOpen)
        }
      })
    }
  }

  removeListeners(menu) {
    document.removeEventListener('click', this.handleOutsideClicks)
    document.removeEventListener('keydown', this.handleEsc)
    menu.removeEventListener('click', this.handleInsideClicks)
    this.$$triggers.forEach(trigger => {
      trigger.removeEventListener('mouseenter', this.handleHoverOpen)
    })
  }

  // Callback Helpers
  handleOutsideClicks = () => {
    this.hide(this.$menu)
  }
  handleInsideClicks = e => {
    e.stopPropagation()
  }
  handleEsc = e => {
    if (e.keyCode == '27' /* escape key */) {
      this.hide(this.$menu)
    }
  }
  handleHoverOpen = e => {
    this.hide(this.$menu)
    const identifier = e.target.parentElement.dataset.menuIdentifier
    this.triggerHub(`${identifier}:open`)
  }
}

Menu.defaultOptions = {
  triggerOnHover: true,
  triggerOnHoverWhenOpen: true,
  closeOnTriggerClick: false,
  activeClass: '-active',
  closingClass: '-closing',
  attributes: {
    menu: 'data-menu-menu',
    trigger: 'data-menu-trigger',
    closeBtn: 'data-menu-close-button'
  }
}

export default Menu
