const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    specPattern: 'cypress/e2e/**/*.spec.js',
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: false,
    experimentalStudio: true,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    env: {
      environment: 'staging',
      apiBaseUrl: 'https://www.saucedemo.com',
      timeout: 10000,
    },
    retries: {
      runMode: 2,
      openMode: 0,
    },
    reporter: 'mochawesome',
    reporterOptions: {
      mochawesomeReporterOptions: {
        reportDir: 'reports',
        overwrite: false,
        html: true,
        json: true,
        timestamp: 'yyyy-mm-dd_HH-MM-ss'
      }
    }
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
