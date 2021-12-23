import { features } from '@goldinteractive/js-base'

class DrilldownMenu extends features.Feature {
  // TODO
  // accessibility with keyboard
  // static vs dynamic back-buttons/title
  // navigate to current level on open
  // active indicators on all the parent-menus
  // show/hide etc. as hub events?
  // calculate heights if autoheight=true
  // hide static back/title on top-level

  init() {
    this.$staticBackBtn = this.$(`[${this.options.attributes.staticBackBtn}]`)
    this.$staticTitle = this.$(`[${this.options.attributes.staticTitle}]`)
    this.$$backBtns = this.$$(`[${this.options.attributes.backBtn}]`)
    this.$menu = this.$(`[${this.options.attributes.menu}]`)
    this.$$submenus = this.$$(`[${this.options.attributes.submenu}]`)
    this.$$listItems = this.$$('li')

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
    this.$currentMenu = submenu
    submenu.classList.add(this.options.classes.submenuActive)
    this.toggleStatics()
  }

  hide(submenu) {
    submenu.classList.remove(this.options.classes.submenuActive)

    const parentLi = submenu.parentElement
    const parentMenu = parentLi ? parentLi.parentElement : null
    if (parentMenu) {
      this.$currentMenu = parentMenu
      this.toggleStatics()
    }
  }

  openOnCurrentLevel() {
    const path = location.pathname
    const li = this.$$listItems.find(li => {
      return li.firstChild && li.firstChild.href && li.firstChild.href.includes(path)
    })

    if (li) {
      // TODO show all parentMenus until the correct menu
      // const parentMenu = li.parentElement
      // this.show(parentMenu)
    }
  }

  toggleStatics() {
    if (this.options.staticBackBtn && this.$currentMenu !== this.$menu) {
      this.$staticBackBtn.classList.add(this.options.classes.staticBackBtnActive)
    } else {
      this.$staticBackBtn.classList.remove(this.options.classes.staticBackBtnActive)
    }

    if (this.options.staticTitle && this.$currentMenu !== this.$menu) {
      this.$staticTitle.classList.add(this.options.classes.staticTitleActive)
      // TODO where to get the title from? (data-drilldown-title attribute or innerText of clicked Link?)
      // this.updateStaticTitle()
    } else {
      this.$staticTitle.classList.remove(this.options.classes.staticTitleActive)
    }
  }

  updateStaticTitle(title) {
    if (this.options.staticTitle) {
      this.$staticTitle.innerText = title
    }
  }
}

DrilldownMenu.defaultOptions = {
  autoHeight: false,
  staticBackBtn: true,
  staticTitle: false,
  openOnCurrentLevel: true,
  attributes: {
    staticBackBtn: 'data-drilldown-back-static',
    staticTitle: 'data-drilldown-title-static',
    backBtn: 'data-drilldown-back',
    title: 'data-drilldown-title',
    menu: 'data-drilldown-menu',
    submenu: 'data-drilldown-submenu',
    submenuTrigger: 'data-drilldown-submenu-trigger',
  },
  classes: {
    submenuActive: 'submenu--active',
    staticBackBtnActive: 'static-back-btn--active',
    staticTitleActive: 'static-title--active'
  }
}

export default DrilldownMenu
