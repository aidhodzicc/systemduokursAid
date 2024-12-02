import { Page } from '../pageobjects/base.po'

export class RegistrationPage extends Page {
  constructor() {
    super(`login`, cy)
  }

  populateEmailandName = (values: { email: string; name: string }) => {
    this.nameInputRegistration.clear().type(values.name)
    this.emailInputRegistration.clear().type(values.email)
    this.signupButton.click()
  }

  get emailInputRegistration() {
    return cy.get('[data-qa="signup-email"]')
  }

  get nameInputRegistration() {
    return this.cy.get('[data-qa="signup-name"]')
  }

  get signupButton() {
    return this.cy.get('[data-qa="signup-button"]')
  }
}
