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

  shouldRegistrationFormBeVisible = (options: { visible: boolean }) => {
    this.registrationForm.should(options.visible ? 'be.visible' : 'not.exist')
    // options.visible= true
    // this.registrationForm.should('be.visible')
    // options.visible=false
    // this.registrationForm.should('not.exist')
  }

  shouldSignupFormBeVisible = (options: { visible: boolean }) => {
    this.signupForm.should(options.visible ? 'be.visible' : 'not.exist')
  }

  inputFirstName = (values: { firstName: string }) => {
    this.firstNameInput.clear().type(values.firstName)
  }

  registerUser = (values: {
    title: string
    name?: string
    password: string
    dayOfBirth: number
    monthOfBirth: number
    yearOfBirth: string
    newsletter: boolean
    specialOffers: boolean
    firstName?: string
    lastName: string
    company?: string
    address: string
    country: string
    state: string
    city: string
    zipcode: string
    mobileNumber: string
  }) => {
    this.titleRadioButtons.check(values.title)
    values.name && this.nameInput.clear().type(values.name)
    /*if (values.name) { linija iznad se moze rijesiti i na ovaj komentarisani način
      this.nameInput.clear().type(values.name)
    }*/
    this.passwordInput.clear().type(values.password)
    this.dayOfBirthSelector.select(values.dayOfBirth)
    this.monthOfBirthSelector.select(values.monthOfBirth)
    this.yearOfBirthSelector.select(values.yearOfBirth)
    values.newsletter && this.newsletterCheckbox.check()
    values.specialOffers && this.specialOffersCheckbox.check()
    values.firstName && this.firstNameInput.clear().type(values.firstName)
    this.lastNameInput.clear().type(values.lastName)
    values.company && this.inputCompanyField.clear().type(values.company)
    this.inputAddress1Field.clear().type(values.address)
    this.countrySelector.select(values.country)
    this.inputStateField.clear().type(values.state)
    this.inputCityField.clear().type(values.city)
    this.inputZipCodeField.clear().type(values.zipcode)
    this.inputMobileNumberField.clear().type(values.mobileNumber)
    this.createAccountButton.should('be.visible').click()
  }

  shouldUserBeRegistered = (options: {
    success: boolean
    successMessage?: string
  }) => {
    if (options.success) {
      this.accountCreatedMessage.should('be.visible')
      options.successMessage &&
        this.accountCreatedMessage.should(
          'contain.text',
          options.successMessage
        )
    } else {
      this.accountCreatedMessage.should('not.exist')
    }
  }

  shouldErrorMessageBe = (options: {
    errorMessage: string
    onField: string
  }) => {
    this.cy
      .get(`[data-qa="${options.onField}"]`)
      .invoke('prop', 'validationMessage')
      .should('eq', options.errorMessage)
  }

  //
  //
  //
  //

  registerUserApi = (options: {
    name: string
    email: string
    password: string
    title: string
    birth_date: string
    birth_month: string
    birth_year: string
    firstName: string
    lastName: string
    company: string
    address1: string
    address2: string
    country: string
    zipCode: string
    state: string
    city: string
    mobile_number: string
  }) => {
    return cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true,
      body: {
        name: options.name,
        email: options.email,
        password: options.password,
        title: options.title,
        birth_date: options.birth_date,
        birth_month: options.birth_month,
        birth_year: options.birth_year,
        firstname: options.firstName,
        lastname: options.lastName,
        company: options.company,
        address1: options.address1,
        address2: options.address2,
        country: options.country,
        zipcode: options.zipCode,
        state: options.state,
        city: options.city,
        mobile_number: options.mobile_number,
      },
    })
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

  get registrationForm() {
    return cy.get('form[action*="signup"]')
  }

  get signupForm() {
    return cy.get('.signup-form')
  }

  get titleRadioButtons() {
    return cy.get('input[type="radio"]')
  }

  get nameInput() {
    return cy.get('[data-qa="name"]')
  }

  get passwordInput() {
    return cy.get('[data-qa="password"]')
  }

  get dayOfBirthSelector() {
    return cy.get('[data-qa="days"]')
  }

  get monthOfBirthSelector() {
    return cy.get('[data-qa="months"]')
  }

  get yearOfBirthSelector() {
    return cy.get('[data-qa="years"]')
  }

  get newsletterCheckbox() {
    return cy.get('#newsletter')
  }

  get specialOffersCheckbox() {
    return cy.get('#optin')
  }

  get firstNameInput() {
    return cy.get('[data-qa="first_name"]')
  }

  get lastNameInput() {
    return cy.get('[data-qa="last_name"]')
  }

  get inputCompanyField() {
    return cy.get('[data-qa="company"]')
  }

  get inputAddress1Field() {
    return cy.get('[data-qa="address"]')
  }

  get inputAddress2Field() {
    return cy.get('[data-qa="address2"]')
  }

  get countrySelector() {
    return cy.get('[data-qa="country"]')
  }

  get inputStateField() {
    return cy.get('[data-qa="state"]')
  }

  get inputCityField() {
    return cy.get('[data-qa="city"]')
  }

  get inputZipCodeField() {
    return cy.get('[data-qa="zipcode"]')
  }

  get inputMobileNumberField() {
    return cy.get('[data-qa="mobile_number"]')
  }

  get createAccountButton() {
    return cy.get('[data-qa="create-account"]')
  }

  get accountCreatedMessage() {
    return cy.get('[data-qa="account-created"]')
  }
}
