// Custom assertion utilities for enhanced validation

// Assert element contains text
Cypress.Commands.add('assertElementContainsText', (selector, expectedText) => {
  return cy.get(selector)
    .should('be.visible')
    .and('contain.text', expectedText);
});

// Assert element has exact text
Cypress.Commands.add('assertElementHasText', (selector, expectedText) => {
  return cy.get(selector)
    .should('be.visible')
    .and('have.text', expectedText);
});

// Assert element is visible and enabled
Cypress.Commands.add('assertElementIsVisibleAndEnabled', (selector) => {
  return cy.get(selector)
    .should('be.visible')
    .and('not.be.disabled');
});

// Assert element is not visible
Cypress.Commands.add('assertElementIsNotVisible', (selector) => {
  return cy.get(selector)
    .should('not.be.visible');
});

// Assert element exists in DOM
Cypress.Commands.add('assertElementExists', (selector) => {
  return cy.get(selector)
    .should('exist');
});

// Assert element does not exist in DOM
Cypress.Commands.add('assertElementDoesNotExist', (selector) => {
  return cy.get(selector)
    .should('not.exist');
});

// Assert element has specific attribute
Cypress.Commands.add('assertElementHasAttribute', (selector, attribute, value) => {
  return cy.get(selector)
    .should('have.attr', attribute, value);
});

// Assert element has class
Cypress.Commands.add('assertElementHasClass', (selector, className) => {
  return cy.get(selector)
    .should('have.class', className);
});

// Assert element has value
Cypress.Commands.add('assertElementHasValue', (selector, expectedValue) => {
  return cy.get(selector)
    .should('have.value', expectedValue);
});

// Assert URL contains path
Cypress.Commands.add('assertUrlContains', (path) => {
  return cy.url()
    .should('include', path);
});

// Assert URL equals
Cypress.Commands.add('assertUrlEquals', (expectedUrl) => {
  return cy.url()
    .should('eq', expectedUrl);
});

// Assert page title contains
Cypress.Commands.add('assertPageTitleContains', (expectedTitle) => {
  return cy.title()
    .should('include', expectedTitle);
});

// Assert page title equals
Cypress.Commands.add('assertPageTitleEquals', (expectedTitle) => {
  return cy.title()
    .should('eq', expectedTitle);
});

// Assert element count
Cypress.Commands.add('assertElementCount', (selector, expectedCount) => {
  return cy.get(selector)
    .should('have.length', expectedCount);
});

// Assert element count greater than
Cypress.Commands.add('assertElementCountGreaterThan', (selector, minCount) => {
  return cy.get(selector)
    .should('have.length.greaterThan', minCount);
});

// Assert element count less than
Cypress.Commands.add('assertElementCountLessThan', (selector, maxCount) => {
  return cy.get(selector)
    .should('have.length.lessThan', maxCount);
});

// Assert element is checked (for checkboxes/radio buttons)
Cypress.Commands.add('assertElementIsChecked', (selector) => {
  return cy.get(selector)
    .should('be.checked');
});

// Assert element is not checked
Cypress.Commands.add('assertElementIsNotChecked', (selector) => {
  return cy.get(selector)
    .should('not.be.checked');
});

// Assert element is selected (for dropdown options)
Cypress.Commands.add('assertElementIsSelected', (selector) => {
  return cy.get(selector)
    .should('be.selected');
});

// Assert element is focused
Cypress.Commands.add('assertElementIsFocused', (selector) => {
  return cy.get(selector)
    .should('be.focused');
});

// Assert element has specific CSS property
Cypress.Commands.add('assertElementHasCSS', (selector, property, value) => {
  return cy.get(selector)
    .should('have.css', property, value);
});

// Assert element is empty
Cypress.Commands.add('assertElementIsEmpty', (selector) => {
  return cy.get(selector)
    .should('be.empty');
});

// Assert element is not empty
Cypress.Commands.add('assertElementIsNotEmpty', (selector) => {
  return cy.get(selector)
    .should('not.be.empty');
});

// Assert element has specific data attribute
Cypress.Commands.add('assertElementHasDataAttribute', (selector, dataAttr, value) => {
  return cy.get(selector)
    .should('have.attr', `data-${dataAttr}`, value);
});

// Assert element is in viewport
Cypress.Commands.add('assertElementInViewport', (selector) => {
  return cy.get(selector).then(($el) => {
    const rect = $el[0].getBoundingClientRect();
    expect(rect.top).to.be.greaterThan(0);
    expect(rect.left).to.be.greaterThan(0);
    expect(rect.bottom).to.be.lessThan(window.innerHeight);
    expect(rect.right).to.be.lessThan(window.innerWidth);
  });
});

// Assert localStorage contains key
Cypress.Commands.add('assertLocalStorageContains', (key, value) => {
  return cy.window().then((win) => {
    expect(win.localStorage.getItem(key)).to.eq(value);
  });
});

// Assert sessionStorage contains key
Cypress.Commands.add('assertSessionStorageContains', (key, value) => {
  return cy.window().then((win) => {
    expect(win.sessionStorage.getItem(key)).to.eq(value);
  });
});

// Assert cookie exists
Cypress.Commands.add('assertCookieExists', (name) => {
  return cy.getCookie(name)
    .should('exist');
});

// Assert cookie value
Cypress.Commands.add('assertCookieValue', (name, value) => {
  return cy.getCookie(name)
    .should('have.property', 'value', value);
}); 