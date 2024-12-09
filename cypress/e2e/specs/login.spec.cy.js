import { registrationPage, loginPage } from '../../utils/initialize'

describe('Login tests', () => {
  let email

  beforeEach(() => {
    email = `aid${Date.now()}@example.com`
    cy.visit('/')
    // When
    registrationPage.getNavigation().visit()

    // Then
    registrationPage.shouldSignupFormBeVisible({ visible: true })
    // When
    registrationPage.populateEmailandName({ email: newEmail, name: 'Aid' })

    // Then
    registrationPage.shouldRegistrationFormBeVisible({ visible: true })

    // When
    registrationPage.registerUser({
      title: 'Mr',
      password: 'Test123',
      dayOfBirth: 13,
      monthOfBirth: 2,
      yearOfBirth: '1997',
      newsletter: true,
      specialOffers: true,
      firstName: 'Aid',
      lastName: 'Hodzic',
      company: 'SystemDuo',
      address: 'Zmaja od Bosne',
      country: 'Canada',
      state: 'Sarajevo',
      city: 'Sarajevo',
      zipcode: '71000',
      mobileNumber: '061123123',
    })
    // Then
    registrationPage.shouldUserBeRegistered({
      success: true,
      successMessage: 'Account Created!',
    })
    cy.get('[data-qa="continue-button"]').should('be.visible').click()
    cy.get('a[href="/logout"').should('be.visible').click()
    cy.get('a[href*="login"]').should('be.visible').click()
  })

  it('Login', () => {
    // When
    cy.get('[data-qa="login-email"]').clear().type(email)
    cy.get('[data-qa="login-password"]').clear().type('Test123')
    cy.get('[data-qa="login-button"]').should('be.visible').click()

    // Then
    cy.get('a').contains('Logged in as Aid')
    cy.get('a[href="/logout"]').should('be.visible')
  })

  it('Login unsuccesfull', () => {
    // When
    cy.get('[data-qa="login-email"]').clear().type(email)
    cy.get('[data-qa="login-password"]').clear().type('Test')
    cy.get('[data-qa="login-button"]').should('be.visible').click()

    // Then
    cy.get('.login-form')
      .find('p[style="color: red;"]')
      .should('be.visible')
      .and('contain', 'Your email or password is incorrect!')
  })
})
