// Custom command to capture test metadata
Cypress.Commands.add('captureTestMetadata', function (metadata = {}) {
  const testMetadata = {
    timestamp: new Date().toISOString(),
    testName: this.currentTest.title,
    specFile: Cypress.spec.name,
    browser: Cypress.browser.name,
    version: Cypress.browser.version,
    viewport: `${Cypress.config('viewportWidth')}x${Cypress.config('viewportHeight')}`,
    ...metadata
  };

  cy.wrap(testMetadata).as('testMetadata');
});

// logStep stays the same
Cypress.Commands.add('logStep', (stepName, takeScreenshot = false) => {
  cy.log(`Step: ${stepName}`);
  if (takeScreenshot) {
    cy.screenshot(`${stepName.replace(/\s+/g, '-').toLowerCase()}`);
  }
});

// Performance metrics
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

// Test summary
Cypress.Commands.add('generateTestSummary', function () {
  const duration = this.currentTest.duration;
  const state = this.currentTest.state;

  cy.get('@testMetadata').then((metadata) => {
    cy.get('@performanceMetrics').then((metrics) => {
      const summary = {
        ...metadata,
        performance: metrics,
        duration,
        state
      };

      cy.log('Test Summary:', JSON.stringify(summary, null, 2));
    });
  });
});
