/// <reference types="cypress" />

import { registrationPage, contactUsPage } from '../../utils/initialize'

describe('Registration tests', () => {
  let newEmail
  beforeEach('Navigate to automationexercise', () => {
    newEmail = `aid${Date.now()}@example.com`
    cy.visit('/')
  })

  it('Navigate to registration form', () => {
    // When
    registrationPage.getNavigation().visit()

    // Then
    cy.get('.signup-form').should('be.visible')

    // When
    registrationPage.populateEmailandName({ email: newEmail, name: 'Aid' })

    // Then
    cy.get('form[action*="signup"]').should('be.visible')
  })

  it('Succesfull registration', () => {
    // When
    registrationPage.getNavigation().visit()

    // Then
    cy.get('.signup-form').should('be.visible')

    // When
    registrationPage.populateEmailandName({ email: newEmail, name: 'Aid' })

    // Then
    cy.get('form[action*="signup"]').should('be.visible')

    // When
    cy.get('input[type="radio"]').should('be.visible').check('Mr')
    cy.get('[data-qa="email"]')
      .should('be.disabled')
      .and('have.attr', 'value', newEmail)
    cy.get('[data-qa="password"]').clear().type('Test123')
    cy.get('[data-qa="days"]').select(13)
    cy.get('[data-qa="months"]').select(2)
    cy.get('[data-qa="years"]').select('1997')
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('[data-qa="first_name"]').clear().type('Aid')
    cy.get('[data-qa="last_name"]').clear().type('Hodzic')
    cy.get('[data-qa="company"]').clear().type('QA')
    cy.get('[data-qa="address"]').clear().type('Adresa')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').clear().type('Sarajevo')
    cy.get('[data-qa="city"]').clear().type('Sarajevo')
    cy.get('[data-qa="zipcode"]').clear().type('71000')
    cy.get('[data-qa="mobile_number"]').clear().type('123456789')

    cy.get('[data-qa="create-account"]').should('be.visible').click()

    // Then
    cy.get('[data-qa="account-created"]')
      .should('be.visible')
      .and('contain.text', 'Account Created!')
  })

  it('Succesfull login after registration', () => {
    // When
    registrationPage.getNavigation().visit()

    // Then
    cy.get('.signup-form').should('be.visible')

    // When
    registrationPage.populateEmailandName({ email: newEmail, name: 'Aid' })

    // Then
    cy.get('form[action*="signup"]').should('be.visible')

    // When
    cy.get('input[type="radio"]').should('be.visible').check('Mr')
    cy.get('[data-qa="email"]')
      .should('be.disabled')
      .and('have.attr', 'value', newEmail)
    cy.get('[data-qa="password"]').clear().type('Test123')
    cy.get('[data-qa="days"]').select(13)
    cy.get('[data-qa="months"]').select(2)
    cy.get('[data-qa="years"]').select('1997')
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('[data-qa="first_name"]').clear().type('Aid')
    cy.get('[data-qa="last_name"]').clear().type('Hodzic')
    cy.get('[data-qa="company"]').clear().type('QA')
    cy.get('[data-qa="address"]').clear().type('Adresa')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').clear().type('Sarajevo')
    cy.get('[data-qa="city"]').clear().type('Sarajevo')
    cy.get('[data-qa="zipcode"]').clear().type('71000')
    cy.get('[data-qa="mobile_number"]').clear().type('123456789')

    cy.get('[data-qa="create-account"]').should('be.visible').click()

    // Then
    cy.get('[data-qa="account-created"]')
      .should('be.visible')
      .and('contain.text', 'Account Created!')

    // When
    cy.get('[data-qa="continue-button"]').should('be.visible').click()
    cy.get('a[href="/logout"').should('be.visible').click()
    cy.get('a[href*="login"]').should('be.visible').click()
    cy.get('[data-qa="login-email"]').clear().type(newEmail)
    cy.get('[data-qa="login-password"]').clear().type('Test123')
    cy.get('[data-qa="login-button"]').should('be.visible').click()

    // Then
    cy.get('a').contains('Logged in as Aid')
    cy.get('a[href="/logout"]').should('be.visible')
  })

  it('Registration with empty one of the required fields', () => {
    // When
    registrationPage.getNavigation().visit()

    // Then
    cy.get('.signup-form').should('be.visible')

    // When
    registrationPage.populateEmailandName({ email: newEmail, name: 'Aid' })

    // Then
    cy.get('form[action*="signup"]').should('be.visible')

    // When
    cy.get('input[type="radio"]').should('be.visible').check('Mr')
    cy.get('[data-qa="email"]')
      .should('be.disabled')
      .and('have.attr', 'value', newEmail)
    cy.get('[data-qa="password"]').clear().type('Test123')
    cy.get('[data-qa="days"]').select(13)
    cy.get('[data-qa="months"]').select(2)
    cy.get('[data-qa="years"]').select('1997')
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('[data-qa="last_name"]').clear().type('Hodzic')
    cy.get('[data-qa="company"]').clear().type('QA')
    cy.get('[data-qa="address"]').clear().type('Adresa')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').clear().type('Sarajevo')
    cy.get('[data-qa="city"]').clear().type('Sarajevo')
    cy.get('[data-qa="zipcode"]').clear().type('71000')
    cy.get('[data-qa="mobile_number"]').clear().type('123456789')

    cy.get('[data-qa="create-account"]').should('be.visible').click()

    // Then
    cy.get('[data-qa="first_name"]')
      .invoke('prop', 'validationMessage')
      .should('eq', 'Please fill out this field.')
  })
})
