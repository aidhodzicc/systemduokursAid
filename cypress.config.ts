import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  screenshotOnRunFailure: true,

  env: {},
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    responseTimeout: 60000,
    defaultCommandTimeout: 12000,
  },
})
