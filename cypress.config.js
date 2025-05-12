const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    supportFile: false,
    specPattern: 'frontend/cypress/e2e/**/*.cy.{js,jsx}',
    viewportWidth: 1280,
    viewportHeight: 800,
    video: false,
    screenshotOnRunFailure: true,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
    retries: {
      runMode: 1,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'edge') {
          launchOptions.args.push('--disable-dev-shm-usage');
          return launchOptions;
        }
        return launchOptions;
      });
    }
  }
}) 