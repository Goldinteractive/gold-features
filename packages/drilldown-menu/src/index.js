import { features, eventHub } from '@goldinteractive/js-base'

class DrilldownMenu extends features.Feature {
  init() {
    this.$staticBackBtn = this.$(`[${this.options.attributes.staticBackBtn}]`)
    this.$staticTitle = this.$(`[${this.options.attributes.staticTitle}]`)
    this.$$backBtns = this.$$(`[${this.options.attributes.backBtn}]`)
    this.$menu = this.$(`[${this.options.attributes.menu}]`)
    this.$$submenus = this.$$(`[${this.options.attributes.submenu}]`)
    this.$$listItems = this.$$('li')
    this.$$tabTargets = this.$$(`[${this.options.attributes.tabTarget}]`)
    this.$currentMenu = this.$menu

    if (this.options.openOnCurrentLevel) {
      this.openOnCurrentLevel()
    }

    this.addListeners()
  }

  addListeners() {
    // Submenu Triggers
    this.$$listItems.forEach(li => {
      const link = li.querySelector(`[${this.options.attributes.submenuTrigger}]`)
      const submenu = li.querySelector(`[${this.options.attributes.submenu}]`)
      if (submenu && link) {
        link.addEventListener('click', () => {
          this.show(submenu)
        })
      }
    })

    // Back Button
    if (this.options.staticBackBtn) {
      this.$staticBackBtn.addEventListener('click', () => {
        this.hide(this.$currentMenu)
      })
    } else {
      this.$$backBtns.forEach(btn => {
        btn.addEventListener('click', e => {
          const submenu = btn.parentElement
          this.hide(submenu)
        })
      })
    }
  }

  show(submenu) {
    eventHub.trigger(`${this.options.namespace}:beforeShow`, {
      submenu: submenu
    })

    this.$currentMenu = submenu
    submenu.classList.add(this.options.classes.submenuActive)
    this.toggleStatics()
    this.handleTabindex(submenu)

    if (this.options.autoHeight) {
      this.setHeight(submenu === this.$menu ? null : submenu)
    }

    eventHub.trigger(`${this.options.namespace}:afterShow`, {
      submenu: submenu
    })
  }

  showDeep(el) {
    el.classList.add(this.options.classes.itemActive)
    let parent = el.parentElement
    while (parent.hasAttribute(this.options.attributes.submenu)) {
      this.show(parent)
      const parentEntry = parent.parentElement
      if (parent.hasAttribute(this.options.attributes.submenuTrigger)) {
        parentEntry.classList.add(this.options.classes.itemDeepActive)
      }
      parent = parentEntry.parentElement
    }
    this.$currentMenu = el.parentElement
    this.show(el.parentElement)
  }

  hide(submenu) {
    eventHub.trigger(`${this.options.namespace}:beforeHide`, {
      submenu: submenu
    })

    submenu.classList.remove(this.options.classes.submenuActive)
    submenu.classList.add(this.options.classes.submenuClosing)

    const hideAnimCallback = () => {
      submenu.classList.remove(this.options.classes.submenuClosing)
      submenu.removeEventListener('transitionend', hideAnimCallback)
    }
    submenu.addEventListener('transitionend', hideAnimCallback)

    eventHub.trigger(`${this.options.namespace}:afterHide`, {
      submenu: submenu
    })

    const parentLi = submenu.parentElement
    const parentMenu = parentLi ? parentLi.parentElement : null
    if (parentMenu) {
      this.show(parentMenu)
    }
  }

  openOnCurrentLevel() {
    const activeEl = this.$(`[${this.options.attributes.initActive}]`)

    if (activeEl) {
      this.showDeep(activeEl)
    }
  }

  handleTabindex(submenu) {
    this.$$tabTargets.forEach(target => {
      target.setAttribute('tabindex', -1)
    })
    const subTargets = submenu.querySelectorAll(`[${this.options.attributes.tabTarget}]`)
    if (subTargets) {
      Array.from(subTargets).forEach(subTarget => {
        subTarget.setAttribute('tabindex', 0)
      })
    }
  }

  setHeight(submenu) {
    const height = submenu ? submenu.offsetHeight : undefined
    if (height) {
      this.$menu.setAttribute('style', `height:${height}px`)
    } else {
      this.$menu.setAttribute('style', 'height:auto')
    }
  }

  toggleStatics() {
    if (this.options.staticBackBtn && this.$staticBackBtn) {
      if (this.$currentMenu !== this.$menu) {
        this.$staticBackBtn.classList.add(this.options.classes.staticBackBtnActive)
      } else {
        this.$staticBackBtn.classList.remove(this.options.classes.staticBackBtnActive)
      }
    }

    if (this.options.staticTitle && this.$staticTitle) {
      if (this.$currentMenu !== this.$menu) {
        this.$staticTitle.classList.add(this.options.classes.staticTitleActive)
        const parent = this.$currentMenu
        const siblingLink = parent ? parent.previousElementSibling : null
        this.updateStaticTitle(siblingLink ? siblingLink.innerText : '')
      } else {
        this.$staticTitle.classList.remove(this.options.classes.staticTitleActive)
      }
    }
  }

  updateStaticTitle(title) {
    this.$staticTitle.innerText = title
  }
}

DrilldownMenu.defaultOptions = {
  namespace: 'drilldown-menu',
  autoHeight: true,
  staticBackBtn: true,
  staticTitle: true,
  openOnCurrentLevel: true,
  attributes: {
    staticBackBtn: 'data-drilldown-back-static',
    staticTitle: 'data-drilldown-title-static',
    backBtn: 'data-drilldown-back',
    title: 'data-drilldown-title',
    menu: 'data-drilldown-menu',
    submenu: 'data-drilldown-submenu',
    submenuTrigger: 'data-drilldown-submenu-trigger',
    initActive: 'data-drilldown-init-active',
    tabTarget: 'data-drilldown-tab-target'
  },
  classes: {
    submenuActive: 'drilldown__submenu--active',
    submenuClosing: 'drilldown__submenu--is-closing',
    staticBackBtnActive: 'drilldown__static-back-btn--active',
    staticTitleActive: 'drilldown__static-title--active',
    itemActive: 'drilldown__entry--active',
    itemDeepActive: 'drilldown__entry--deep-active'
  }
}

export default DrilldownMenu
