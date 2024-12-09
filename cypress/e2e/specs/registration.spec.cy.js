/// <reference types="cypress" />

import {
  registrationPage,
  contactUsPage,
  loginPage,
} from '../../utils/initialize'

describe('Registration tests', () => {
  let newEmail
  let invalidEmail
  let credentials
  let adminCredentials
  let creditCardInfo
  let englishData
  let spanishData
  let germanData
  beforeEach('Navigate to automationexercise', () => {
    adminCredentials = Cypress.env('credentials').admin
    creditCardInfo = Cypress.env('credentials').creditCardInfo
    // adminCredentials.password pristup admin password vrijednosti
    // adminCredentials.email pristup admin email vrijednosti
    // creditCardInfo.cardNumber pristup broju kartice iz cypress config.ts
    cy.fixture('account-created-lang.json').then(($data) => {
      englishData = $data['English']
      spanishData = $data['Spanish']
      germanData = $data['German']
    })
    credentials = Cypress.env('credentials')
    newEmail = `aid${Date.now()}@example.com`
    invalidEmail = `aid${Date.now()}gmail.com`
    cy.visit('/')
  })

  it('Navigate to registration form', () => {
    // When
    registrationPage.getNavigation().visit()

    // Then
    registrationPage.shouldSignupFormBeVisible({ visible: true })

    // When
    registrationPage.populateEmailandName({ email: newEmail, name: 'Aid' })

    // Then
    registrationPage.shouldRegistrationFormBeVisible({ visible: true })
  })

  it('Succesfull registration', () => {
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
      password: credentials.password,
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
      successMessage: englishData.accountCreated,
    })
  })

  it('Succesfull login after registration', () => {
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

    // When
    registrationPage.confimRegistration()
    registrationPage.logoutIfLoggedIn()
    loginPage.getNavigation().visit()
    loginPage.inputEmailAndPassword({
      email: newEmail,
      password: credentials.password,
    })

    // Then
    loginPage.shouldBeLoggedIn({ success: true })
  })

  it('Registration with empty one of the required fields', () => {
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
    registrationPage.shouldErrorMessageBe({
      errorMessage: 'Please fill out this field.',
      onField: 'first_name',
    })
  })

  it('Try to access registration form with invalid email format', () => {
    // When
    registrationPage.getNavigation().visit()

    // Then
    registrationPage.shouldSignupFormBeVisible({ visible: true })
    // When
    registrationPage.populateEmailandName({ email: invalidEmail, name: 'Aid' })

    // Then
    registrationPage.shouldErrorMessageBe({
      errorMessage: `Please include an '@' in the email address. '${invalidEmail}' is missing an '@'.`,
      onField: 'signup-email',
    })
  })
})
