// Base Page Object class with common methods

class BasePage {
  constructor() {
    this.baseUrl = Cypress.env('baseUrl') || 'https://demoqa.com';
    this.timeout = Cypress.env('timeout') || 10000;
  }

  // Navigate to page
  visit(path = '') {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    cy.visit(url);
    cy.waitForPageLoad();
    return this;
  }

  // Wait for element to be visible
  waitForElement(selector, timeout = this.timeout) {
    cy.get(selector, { timeout }).should('be.visible');
    return this;
  }

  // Wait for element to exist
  waitForElementToExist(selector, timeout = this.timeout) {
    cy.get(selector, { timeout }).should('exist');
    return this;
  }

  // Click element
  click(selector, options = {}) {
    cy.waitAndClick(selector, { timeout: this.timeout, ...options });
    return this;
  }

  // Type text
  type(selector, text, options = {}) {
    cy.clearAndType(selector, text, { timeout: this.timeout, ...options });
    return this;
  }

  // Clear and type
  clearAndType(selector, text, options = {}) {
    cy.clearAndType(selector, text, { timeout: this.timeout, ...options });
    return this;
  }

  // Select from dropdown
  select(selector, optionText) {
    cy.selectFromDropdown(selector, optionText);
    return this;
  }

  // Check checkbox
  check(selector) {
    cy.get(selector).should('be.visible').check();
    return this;
  }

  // Uncheck checkbox
  uncheck(selector) {
    cy.get(selector).should('be.visible').uncheck();
    return this;
  }

  // Upload file
  uploadFile(selector, fileName) {
    cy.uploadFile(selector, fileName);
    return this;
  }

  // Scroll to element
  scrollTo(selector) {
    cy.scrollToElement(selector);
    return this;
  }

  // Get element text
  getText(selector) {
    return cy.getElementText(selector);
  }

  // Get element value
  getValue(selector) {
    return cy.get(selector).invoke('val');
  }

  // Assert element contains text
  assertContainsText(selector, expectedText) {
    cy.assertElementContainsText(selector, expectedText);
    return this;
  }

  // Assert element has text
  assertHasText(selector, expectedText) {
    cy.assertElementHasText(selector, expectedText);
    return this;
  }

  // Assert element is visible
  assertIsVisible(selector) {
    cy.get(selector).should('be.visible');
    return this;
  }

  // Assert element is not visible
  assertIsNotVisible(selector) {
    cy.get(selector).should('not.be.visible');
    return this;
  }

  // Assert element exists
  assertExists(selector) {
    cy.get(selector).should('exist');
    return this;
  }

  // Assert element does not exist
  assertDoesNotExist(selector) {
    cy.get(selector).should('not.exist');
    return this;
  }

  // Assert element is enabled
  assertIsEnabled(selector) {
    cy.get(selector).should('not.be.disabled');
    return this;
  }

  // Assert element is disabled
  assertIsDisabled(selector) {
    cy.get(selector).should('be.disabled');
    return this;
  }

  // Assert element is checked
  assertIsChecked(selector) {
    cy.get(selector).should('be.checked');
    return this;
  }

  // Assert element is not checked
  assertIsNotChecked(selector) {
    cy.get(selector).should('not.be.checked');
    return this;
  }

  // Assert element has value
  assertHasValue(selector, expectedValue) {
    cy.get(selector).should('have.value', expectedValue);
    return this;
  }

  // Assert element has attribute
  assertHasAttribute(selector, attribute, value) {
    cy.get(selector).should('have.attr', attribute, value);
    return this;
  }

  // Assert element has class
  assertHasClass(selector, className) {
    cy.get(selector).should('have.class', className);
    return this;
  }

  // Assert URL contains
  assertUrlContains(path) {
    cy.url().should('include', path);
    return this;
  }

  // Assert URL equals
  assertUrlEquals(expectedUrl) {
    cy.url().should('eq', expectedUrl);
    return this;
  }

  // Assert page title contains
  assertTitleContains(expectedTitle) {
    cy.title().should('include', expectedTitle);
    return this;
  }

  // Assert page title equals
  assertTitleEquals(expectedTitle) {
    cy.title().should('eq', expectedTitle);
    return this;
  }

  // Wait for page load
  waitForPageLoad() {
    cy.waitForPageLoad();
    return this;
  }

  // Wait for network idle
  waitForNetworkIdle(timeout = 5000) {
    cy.waitForNetworkIdle(timeout);
    return this;
  }

  // Handle alert
  handleAlert(accept = true) {
    cy.handleAlert(accept);
    return this;
  }

  // Check if element exists
  elementExists(selector) {
    return cy.elementExists(selector);
  }

  // Check if element is in viewport
  isInViewport(selector) {
    return cy.isInViewport(selector);
  }

  // Take screenshot
  takeScreenshot(name) {
    cy.screenshot(name);
    return this;
  }

  // Wait for element to be stable
  waitForElementStable(selector, timeout = 5000) {
    cy.wait(timeout);
    return this;
  }

  // Retry action with backoff
  retryAction(action, maxRetries = 3) {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return action();
      } catch (error) {
        lastError = error;
        if (i < maxRetries - 1) {
          cy.wait(1000 * (i + 1));
        }
      }
    }
    throw lastError;
  }

  // Generate random data
  generateRandomData(type) {
    return cy.generateRandomData(type);
  }

  // Get current URL
  getCurrentUrl() {
    return cy.url();
  }

  // Get page title
  getPageTitle() {
    return cy.title();
  }

  // Reload page
  reload() {
    cy.reload();
    return this;
  }

  // Go back
  goBack() {
    cy.go('back');
    return this;
  }

  // Go forward
  goForward() {
    cy.go('forward');
    return this;
  }

  // Clear cookies
  clearCookies() {
    cy.clearCookies();
    return this;
  }

  // Clear localStorage
  clearLocalStorage() {
    cy.clearLocalStorage();
    return this;
  }

  // Set viewport
  setViewport(width, height) {
    cy.viewport(width, height);
    return this;
  }

  // Wait for specific time
  wait(ms) {
    cy.wait(ms);
    return this;
  }

  // Log message
  log(message) {
    cy.log(message);
    return this;
  }
}

// Export the base page class
export default BasePage; 