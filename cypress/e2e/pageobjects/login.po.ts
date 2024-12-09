import { Page } from './base.po'

export class LoginPage extends Page {
  constructor() {
    super(`login`, cy)
  }

  inputEmailAndPassword = (options: { email: string; password: string }) => {
    this.emailInputField.clear().type(options.email)
    this.passwordInputField.clear().type(options.password)
    this.loginButton.should('be.visible').click()
  }

  shouldBeLoggedIn = (options: { success: boolean }) => {
    this.loggedIn.should(options.success ? 'be.visible' : 'not.exist')
  }

  shouldErrorMessageBe = (options: { visible: boolean; withText?: string }) => {
    this.errorMessage.should(options.visible ? 'be.visible' : 'not.exist')
    options.withText && this.errorMessage.should('contain', options.withText)
  }

  get emailInputField() {
    return this.cy.get('[data-qa="login-email"]')
  }

  get passwordInputField() {
    return this.cy.get('[data-qa="login-password"]')
  }

  get loginButton() {
    return this.cy.get('[data-qa="login-button"]')
  }

  get loggedIn() {
    return this.cy.contains('Logged in as')
  }

  get errorMessage() {
    return cy.get('.login-form').find('p[style="color: red;"]')
  }
}
