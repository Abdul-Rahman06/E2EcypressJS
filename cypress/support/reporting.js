// Reporting utilities for Cypress tests

// Custom command to capture test metadata
Cypress.Commands.add('captureTestMetadata', (metadata = {}) => {
  const testMetadata = {
    timestamp: new Date().toISOString(),
    testName: Cypress.currentTest.title,
    specFile: Cypress.spec.name,
    browser: Cypress.browser.name,
    version: Cypress.browser.version,
    viewport: `${Cypress.config('viewportWidth')}x${Cypress.config('viewportHeight')}`,
    ...metadata
  };

  // Store metadata for reporting
  cy.wrap(testMetadata).as('testMetadata');
});

// Custom command to log test step with screenshot
Cypress.Commands.add('logStep', (stepName, takeScreenshot = false) => {
  cy.log(`Step: ${stepName}`);
  
  if (takeScreenshot) {
    cy.screenshot(`${stepName.replace(/\s+/g, '-').toLowerCase()}`);
  }
});

// Custom command to capture performance metrics
Cypress.Commands.add('capturePerformance', () => {
  cy.window().then((win) => {
    const performance = win.performance;
    const navigation = performance.getEntriesByType('navigation')[0];
    
    const metrics = {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
    };

    cy.wrap(metrics).as('performanceMetrics');
  });
});

// Custom command to generate test summary
Cypress.Commands.add('generateTestSummary', () => {
  cy.get('@testMetadata').then((metadata) => {
    cy.get('@performanceMetrics').then((metrics) => {
      const summary = {
        ...metadata,
        performance: metrics,
        duration: Cypress.currentTest.duration || 0,
        state: Cypress.currentTest.state
      };

      // Log summary for reporting
      cy.log('Test Summary:', JSON.stringify(summary, null, 2));
    });
  });
});

// Hook to capture test metadata automatically
beforeEach(() => {
  cy.captureTestMetadata();
});

// Hook to capture performance metrics after page load
afterEach(() => {
  if (Cypress.currentTest.state === 'passed') {
    cy.capturePerformance();
    cy.generateTestSummary();
  }
});

// Export for use in other files
export default {
  captureTestMetadata: Cypress.Commands._commands.captureTestMetadata,
  logStep: Cypress.Commands._commands.logStep,
  capturePerformance: Cypress.Commands._commands.capturePerformance,
  generateTestSummary: Cypress.Commands._commands.generateTestSummary
}; 