// Base Page Object class with common methods

class BasePage {
  constructor() {
    this.baseUrl = Cypress.env('baseUrl') || 'https://www.saucedemo.com';
    this.timeout = Cypress.env('timeout') || 10000;
  }

  // Navigate to page
  visit(path = '') {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    cy.visit(url);
    cy.wait(2000); // Wait for page to load
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
    cy.wait(2000);
    return this;
  }

  // Wait for network idle
  waitForNetworkIdle(timeout = 5000) {
    cy.waitForNetworkIdle(timeout);
    return this;
  }

  // Handle alerts
  handleAlert(accept = true) {
    if (accept) {
      cy.on('window:confirm', () => true);
      cy.on('window:alert', () => true);
    } else {
      cy.on('window:confirm', () => false);
    }
    return this;
  }

  // Check if element exists
  elementExists(selector) {
    return cy.get('body').then(($body) => {
      return $body.find(selector).length > 0;
    });
  }

  // Check if element is in viewport
  isInViewport(selector) {
    return cy.get(selector).then(($el) => {
      const rect = $el[0].getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    });
  }

  // Take screenshot
  takeScreenshot(name) {
    cy.screenshot(name);
    return this;
  }

  // Wait for element to be stable
  waitForElementStable(selector, timeout = 5000) {
    cy.get(selector, { timeout }).should('be.visible');
    return this;
  }

  // Retry action
  retryAction(action, maxRetries = 3) {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return action();
      } catch (error) {
        lastError = error;
        if (i < maxRetries - 1) {
          cy.wait(1000);
        }
      }
    }
    throw lastError;
  }

  // Generate random data
  generateRandomData(type) {
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

  // Wait
  wait(ms) {
    cy.wait(ms);
    return this;
  }

  // Log
  log(message) {
    cy.log(message);
    return this;
  }

  // Load test data
  loadTestData() {
    return cy.fixture('testData.json');
  }

  // Get random user
  getRandomUser() {
    return this.loadTestData().then((data) => {
      const userTypes = Object.keys(data.users);
      const randomType = userTypes[Math.floor(Math.random() * userTypes.length)];
      return data.users[randomType];
    });
  }

  // Get standard user
  getStandardUser() {
    return this.loadTestData().then((data) => data.users.standard);
  }

  // Get random product
  getRandomProduct() {
    return this.loadTestData().then((data) => {
      const randomIndex = Math.floor(Math.random() * data.products.length);
      return data.products[randomIndex];
    });
  }
}

export default BasePage; 