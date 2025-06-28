// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Import custom utilities
import './utils/assertions';
import './utils/helpers';
import './utils/api-helpers';

// Import page objects
import './pages/common';

// Import reporting utilities
import './reporting';

// Configure global behavior
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // for uncaught exceptions that are not related to our tests
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  if (err.message.includes('Script error')) {
    return false;
  }
  return true;
});

// Global before hook
beforeEach(() => {
  // Clear cookies and localStorage before each test
  cy.clearCookies();
  cy.clearLocalStorage();
  
  // Set viewport
  cy.viewport(1920, 1080);
  
  // Capture test metadata for reporting
  cy.captureTestMetadata();
});

// Global after hook
afterEach(() => {
  // Take screenshot on failure
  if (Cypress.currentTest.state === 'failed') {
    cy.screenshot(`${Cypress.currentTest.title}-failed`);
  }
  
  // Capture performance metrics and generate summary for successful tests
  if (Cypress.currentTest.state === 'passed') {
    cy.capturePerformance();
    cy.generateTestSummary();
  }
}); 