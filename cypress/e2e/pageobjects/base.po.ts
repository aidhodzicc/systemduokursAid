import { Navigation } from './components/navigation.component'

class CypressPageObject {
  cy: any
  constructor(cy: any) {
    this.cy = cy
  }
}

export class Page extends CypressPageObject {
  cy: any
  url: any
  navigation: Navigation
  constructor(url: any, cy: any) {
    super(cy)
    this.url = url
  }

  public getNavigation() {
    if (this.navigation == undefined) {
      this.navigation = new Navigation(this.url)
    }
    return this.navigation
  }

  public logoutIfLoggedIn() {
    this.navigationBar.then(($logged) => {
      if ($logged.find('.fa-user').length > 0) {
        this.logoutButton.should('be.visible').click()
      }
    })
  }

  public shouldToastBe(options: {
    visible: boolean
    success: boolean
    withText?: string
  }) {
    if (options.success) {
      this.cy
        .get('.toast-success')
        .should(options.visible ? 'be.visible' : 'not.exist')
      options.withText &&
        this.cy.get('.toast-sucess').should('contain.text', options.withText)
    } else if (!options.success) {
      this.cy
        .get('.toast-error')
        .should(options.visible ? 'be.visible' : 'not.exist')
      options.withText &&
        this.cy.get('.toast-error').should('contain.text', options.withText)
    }
  }

  get navigationBar() {
    return cy.get('.navbar-nav')
  }

  get logoutButton() {
    return cy.get('a[href="/logout"]')
  }
}
