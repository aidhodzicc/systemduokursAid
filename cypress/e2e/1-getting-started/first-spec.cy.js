/// <reference types="cypress" />

describe('Example tests', () => {
  beforeEach('Visit page', () => {
    cy.visit('https://automationexercise.com/')
  })

  it('Navigate to login page', () => {
    cy.get('a[href="/login"]').should('be.visible').click()
    cy.url().should('contain', 'login')
    cy.get('[data-qa="login-email"]')
      .should('be.visible')
      .and('not.be.disabled')

    cy.get('[data-qa="signup-name"]')
      .should('be.visible')
      .and('not.be.disabled')
  })

  it.only('Navigate to contact us form', () => {
    cy.get('a[href*="contact"]').should('be.visible').click()
    cy.url().should('contain', 'contact_us')
    cy.contains('h2', 'contact us', { matchCase: false }).should('be.visible')
    cy.get('div.bg').find('h2').contains('contact us', { matchCase: false })
    cy.get('h2').first().should('be.visible') // Contact us element
    cy.get('h2').eq(1).should('be.visible') // get in touch element
  })
})
