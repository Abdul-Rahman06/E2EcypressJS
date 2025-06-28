// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to wait for element to be visible and clickable
Cypress.Commands.add('waitAndClick', (selector, options = {}) => {
  const defaultOptions = {
    timeout: Cypress.env('timeout') || 10000,
    force: false,
    ...options
  };
  
  return cy.get(selector, { timeout: defaultOptions.timeout })
    .should('be.visible')
    .should('not.be.disabled')
    .click(defaultOptions);
});

// Custom command to type with clearing
Cypress.Commands.add('clearAndType', (selector, text, options = {}) => {
  const defaultOptions = {
    timeout: Cypress.env('timeout') || 10000,
    force: false,
    ...options
  };
  
  return cy.get(selector, { timeout: defaultOptions.timeout })
    .should('be.visible')
    .clear()
    .type(text, defaultOptions);
});

// Custom command to select from dropdown
Cypress.Commands.add('selectFromDropdown', (dropdownSelector, optionText) => {
  return cy.get(dropdownSelector)
    .should('be.visible')
    .click()
    .then(() => {
      cy.get('option').contains(optionText).click();
    });
});

// Custom command to upload file
Cypress.Commands.add('uploadFile', (selector, fileName) => {
  return cy.get(selector)
    .should('be.visible')
    .attachFile(fileName);
});

// Custom command to scroll to element
Cypress.Commands.add('scrollToElement', (selector) => {
  return cy.get(selector)
    .should('be.visible')
    .scrollIntoView();
});

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  return cy.window().then((win) => {
    return new Cypress.Promise((resolve) => {
      if (win.document.readyState === 'complete') {
        resolve();
      } else {
        win.addEventListener('load', resolve);
      }
    });
  });
});

// Custom command to generate random data
Cypress.Commands.add('generateRandomData', (type) => {
  const data = {
    firstName: `Test${Math.random().toString(36).substring(7)}`,
    lastName: `User${Math.random().toString(36).substring(7)}`,
    email: `test${Math.random().toString(36).substring(7)}@example.com`,
    phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    address: `${Math.floor(Math.random() * 9999)} Test Street`,
    city: 'Test City',
    zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
    password: `Password${Math.random().toString(36).substring(7)}123!`
  };
  
  return type ? data[type] : data;
});

// Custom command to handle alerts
Cypress.Commands.add('handleAlert', (accept = true) => {
  if (accept) {
    cy.on('window:confirm', () => true);
    cy.on('window:alert', () => true);
  } else {
    cy.on('window:confirm', () => false);
  }
});

// Custom command to wait for network requests
Cypress.Commands.add('waitForNetworkIdle', (timeout = 5000) => {
  return cy.wait(timeout);
});

// Custom command to check if element exists
Cypress.Commands.add('elementExists', (selector) => {
  return cy.get('body').then(($body) => {
    return $body.find(selector).length > 0;
  });
});

// Custom command to get element text safely
Cypress.Commands.add('getElementText', (selector) => {
  return cy.get(selector)
    .should('be.visible')
    .invoke('text')
    .then((text) => text.trim());
});

// Custom command to check if element is in viewport
Cypress.Commands.add('isInViewport', (selector) => {
  return cy.get(selector).then(($el) => {
    const rect = $el[0].getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  });
});

// Override visit command to include custom headers
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  const defaultOptions = {
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    ...options
  };
  
  return originalFn(url, defaultOptions);
}); 