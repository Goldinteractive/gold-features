import { features } from '@goldinteractive/js-base'

class DrilldownMenu extends features.Feature {

  init() {
    this.$staticBackBtn = this.$(`[${this.options.attributes.staticBackBtn}]`)
    this.$staticTitle = this.$(`[${this.options.attributes.staticTitle}]`)
    this.$$backBtns = this.$$(`[${this.options.attributes.backBtn}]`)
    this.$menu = this.$(`[${this.options.attributes.menu}]`)
    this.$$submenus = this.$$(`[${this.options.attributes.submenu}]`)
    this.$$listItems = this.$$('li')

    this.currentLevel = 0

    if (this.options.openOnCurrentLevel) {
      // TODO navigate to current level on init
    }

    this.addListeners()
  }

  addListeners() {
    this.$$listItems.forEach(li => {
      const link = li.querySelector(`[${this.options.attributes.submenuTrigger}]`)
      const submenu = li.querySelector(`[${this.options.attributes.submenu}]`)
      if (submenu && link) {
        link.addEventListener('click', () => {
          this.goDown(submenu)
        })
      }
    })

    // TODO check if static back button or not
    this.$$backBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const submenu = btn.parentElement
        this.goUp(submenu)
      })
    })
  }

  goDown(submenu) {
    this.currentLevel++
    this.show(submenu)
  }

  goUp(submenu) {
    this.currentLevel--
    this.hide(submenu)
  }

  show(submenu) {
    submenu.classList.add(this.options.classes.submenuActive)
  }

  hide(submenu) {
    submenu.classList.remove(this.options.classes.submenuActive)
  }
}

DrilldownMenu.defaultOptions = {
  autoHeight: false,
  staticBackBtn: false,
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
    submenuActive: 'submenu--active'
  }
}

export default DrilldownMenu
