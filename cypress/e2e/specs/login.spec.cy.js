import { registrationPage, loginPage } from '../../utils/initialize'

describe('Login tests', () => {
  let newEmail
  let credentials

  beforeEach(() => {
    newEmail = `aid${Date.now()}@example.com`
    credentials = Cypress.env('credentials')
    cy.visit('/')
    registrationPage
      .registerUserApi({
        name: 'Aid',
        email: newEmail,
        password: credentials.password,
        title: 'Mr',
        birth_date: 13,
        birth_month: 2,
        birth_year: '1997',
        firstName: 'Aid',
        lastName: 'Hodzic',
        company: 'SystemDuo',
        address1: 'Zmaja od Bosne',
        address2: 'Test',
        country: 'Canada',
        zipCode: '71000',
        state: 'Sarajevo',
        city: 'Sarajevo',
        mobile_number: '12234341',
      })
      .then(($data) => {
        expect(JSON.parse($data.body).responseCode).to.eq(201)
        expect(JSON.parse($data.body).message).to.eq('User created!')
      })
    loginPage.getNavigation().visit()
  })

  it('Login', () => {
    // When
    loginPage.inputEmailAndPassword({
      email: newEmail,
      password: credentials.password,
    })

    // Then
    loginPage.shouldBeLoggedIn({ success: true })
  })

  it('Login unsuccesfull', () => {
    // When
    loginPage.inputEmailAndPassword({
      email: newEmail,
      password: 'Test',
    })

    // Then
    loginPage.shouldBeLoggedIn({ success: false })
    loginPage.shouldErrorMessageBe({
      visible: true,
      withText: 'Your email or password is incorrect!',
    })
  })
})
