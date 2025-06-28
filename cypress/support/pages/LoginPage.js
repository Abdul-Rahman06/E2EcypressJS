import BasePage from './common.js';

class LoginPage extends BasePage {
  constructor() {
    super();
    this.url = '/';
    
    // Page elements
    this.selectors = {
      username: '#user-name',
      password: '#password',
      loginButton: '#login-button',
      errorMessage: '[data-test="error"]',
      loginContainer: '.login_container',
      loginBox: '.login-box',
      botImage: '.bot_column'
    };
  }

  // Navigate to login page
  navigateToLogin() {
    this.visit(this.url);
    return this;
  }

  // Fill username
  fillUsername(username) {
    this.type(this.selectors.username, username);
    return this;
  }

  // Fill password
  fillPassword(password) {
    this.type(this.selectors.password, password);
    return this;
  }

  // Click login button
  clickLogin() {
    this.click(this.selectors.loginButton);
    return this;
  }

  // Login with credentials
  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
    return this;
  }

  // Login with standard user
  loginWithStandardUser() {
    return this.getStandardUser().then((user) => {
      this.login(user.username, user.password);
    });
  }

  // Login with random user
  loginWithRandomUser() {
    return this.getRandomUser().then((user) => {
      this.login(user.username, user.password);
    });
  }

  // Verify login page is displayed
  assertLoginPageDisplayed() {
    this.assertIsVisible(this.selectors.loginContainer);
    this.assertIsVisible(this.selectors.username);
    this.assertIsVisible(this.selectors.password);
    this.assertIsVisible(this.selectors.loginButton);
    return this;
  }

  // Verify error message
  assertErrorMessage(expectedMessage) {
    cy.get(this.selectors.errorMessage).should('be.visible');
    cy.get(this.selectors.errorMessage).should('contain.text', expectedMessage);
    return this;
  }

  // Verify successful login (redirected to inventory)
  assertSuccessfulLogin() {
    this.assertUrlContains('/inventory.html');
    return this;
  }

  // Verify locked out user error
  assertLockedOutError() {
    this.assertErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    return this;
  }

  // Verify invalid credentials error
  assertInvalidCredentialsError() {
    this.assertErrorMessage('Epic sadface: Username and password do not match any user in this service');
    return this;
  }

  // Clear form
  clearForm() {
    cy.get(this.selectors.username).clear();
    cy.get(this.selectors.password).clear();
    return this;
  }

  // Test login with empty fields
  testEmptyFields() {
    this.clickLogin();
    this.assertErrorMessage('Epic sadface: Username is required');
    return this;
  }

  // Test login with empty username
  testEmptyUsername(password) {
    this.fillPassword(password);
    this.clickLogin();
    this.assertErrorMessage('Epic sadface: Username is required');
    return this;
  }

  // Test login with empty password
  testEmptyPassword(username) {
    this.fillUsername(username);
    this.clickLogin();
    this.assertErrorMessage('Epic sadface: Password is required');
    return this;
  }
}

export default LoginPage; 