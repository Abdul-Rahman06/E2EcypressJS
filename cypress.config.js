const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const fs = require('fs');
const path = require('path');

// Function to get timestamp for report naming
function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-').split('T')[0] + '_' + 
         now.toTimeString().replace(/[:.]/g, '-').split(' ')[0];
}

// Function to create report directories
function createReportDirectories() {
  const timestamp = getTimestamp();
  const newReportDir = `cypress/reports/new/${timestamp}`;
  const dirs = [
    `${newReportDir}/html`,
    `${newReportDir}/json`,
    `${newReportDir}/screenshots`,
    `${newReportDir}/videos`
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  return timestamp;
}

async function setupNodeEvents(on, config) {
  // Create report directories
  const timestamp = createReportDirectories();
  
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default()],
    })
  );

  // Configure reporters
  config.reporter = 'cypress-multi-reporters';
  config.reporterOptions = {
    reporterEnabled: 'mochawesome, spec',
    mochawesomeReporterOptions: {
      reportDir: `cypress/reports/new/${timestamp}/html`,
      overwrite: false,
      html: true,
      json: true,
      reportTitle: `Test Execution Report - ${timestamp}`,
      reportPageTitle: 'Cypress Test Results',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false
    }
  };

  // Configure video and screenshot paths
  config.videosFolder = `cypress/reports/new/${timestamp}/videos`;
  config.screenshotsFolder = `cypress/reports/new/${timestamp}/screenshots`;

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents,
    baseUrl: 'https://demoqa.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: false, // Changed to false to preserve reports
    experimentalStudio: true,
    chromeWebSecurity: false,
    env: {
      environment: 'staging',
      apiBaseUrl: 'https://demoqa.com',
      timeout: 10000,
      reportTimestamp: getTimestamp()
    },
    retries: {
      runMode: 2,
      openMode: 0
    }
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
}); 