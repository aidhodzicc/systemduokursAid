import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  screenshotOnRunFailure: true,

  env: {
    credentials: {
      admin: {
        email: 'test',
        password: 'test',
      },
      email: 'aid@exaple.com',
      password: 'Test123',
    },
    creditCardInfo: {
      cardNumber: '4242424242424242',
      cvv: '123',
      dateOfExpiration: '10/30',
    },
  },
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    responseTimeout: 60000,
    defaultCommandTimeout: 12000,
  },
})
