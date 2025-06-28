import LoginPage from '../../support/pages/LoginPage.js';

describe('Sauce Demo Login', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.navigateToLogin();
  });

  it('should display login page correctly', () => {
    loginPage.assertLoginPageDisplayed();
    cy.title().should('eq', 'Swag Labs');
  });

  it('should login successfully with standard user', () => {
    loginPage.loginWithStandardUser();
    loginPage.assertSuccessfulLogin();
  });

  it('should show error for locked out user', () => {
    loginPage.login('locked_out_user', 'secret_sauce');
    loginPage.assertLockedOutError();
  });

  it('should show error for invalid credentials', () => {
    loginPage.login('invalid_user', 'invalid_password');
    loginPage.assertInvalidCredentialsError();
  });

  it('should show error for empty username', () => {
    loginPage.testEmptyUsername('secret_sauce');
  });

  it('should show error for empty password', () => {
    loginPage.testEmptyPassword('standard_user');
  });

  it('should show error for empty fields', () => {
    loginPage.testEmptyFields();
  });

  it('should login with problem user', () => {
    loginPage.login('problem_user', 'secret_sauce');
    loginPage.assertSuccessfulLogin();
  });

  it('should login with performance glitch user', () => {
    loginPage.login('performance_glitch_user', 'secret_sauce');
    loginPage.assertSuccessfulLogin();
  });

  it('should clear form fields', () => {
    loginPage.fillUsername('test_user');
    loginPage.fillPassword('test_password');
    loginPage.clearForm();
    cy.get('#user-name').should('have.value', '');
    cy.get('#password').should('have.value', '');
  });
}); 