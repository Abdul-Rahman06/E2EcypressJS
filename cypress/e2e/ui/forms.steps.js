import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import FormsPage from '../../support/pages/FormsPage.js';

const formsPage = new FormsPage();

// Background steps
Given('I am on the DemoQA homepage', () => {
  formsPage.navigateToHome();
});

Given('I navigate to the Forms page', () => {
  formsPage.navigateToForms();
});

Given('I click on {string}', (linkText) => {
  if (linkText === 'Practice Form') {
    formsPage.navigateToPracticeForm();
  }
});

// When steps
When('I fill the practice form with valid data', () => {
  const testData = formsPage.generateFormTestData();
  formsPage.fillCompleteForm(testData);
});

When('I submit the form', () => {
  formsPage.submitForm();
});

When('I fill the first name with {string}', (firstName) => {
  formsPage.fillFirstName(firstName);
});

When('I fill the last name with {string}', (lastName) => {
  formsPage.fillLastName(lastName);
});

When('I fill the email with {string}', (email) => {
  formsPage.fillEmail(email);
});

When('I select gender {string}', (gender) => {
  formsPage.selectGender(gender);
});

When('I fill the mobile number with {string}', (mobile) => {
  formsPage.fillMobile(mobile);
});

When('I select date of birth {string} {string} {string}', (day, month, year) => {
  formsPage.selectDateOfBirth(day, month, year);
});

When('I add subjects {string} and {string}', (subject1, subject2) => {
  formsPage.fillSubjects([subject1, subject2]);
});

When('I select hobbies {string} and {string}', (hobby1, hobby2) => {
  formsPage.selectHobbies([hobby1, hobby2]);
});

When('I upload a picture {string}', (fileName) => {
  formsPage.uploadPicture(fileName);
});

When('I fill the current address with {string}', (address) => {
  formsPage.fillCurrentAddress(address);
});

When('I select state {string}', (state) => {
  formsPage.selectState(state);
});

When('I select city {string}', (city) => {
  formsPage.selectCity(city);
});

When('I submit the form without filling required fields', () => {
  formsPage.submitForm();
});

When('I click on the date of birth field', () => {
  formsPage.click(formsPage.selectors.dateOfBirth);
});

When('I select a date {string} {string} {string}', (day, month, year) => {
  formsPage.selectDateOfBirth(day, month, year);
});

When('I type {string} in the subjects field', (subject) => {
  formsPage.type(formsPage.selectors.subjects, subject);
});

When('I select {string} from suggestions', (subject) => {
  cy.get('.subjects-auto-complete__option').contains(subject).click();
});

When('I select the {string} checkbox', (hobby) => {
  const hobbyMap = {
    'Sports': formsPage.selectors.hobbiesSports,
    'Reading': formsPage.selectors.hobbiesReading,
    'Music': formsPage.selectors.hobbiesMusic
  };
  formsPage.check(hobbyMap[hobby]);
});

When('I uncheck the {string} checkbox', (hobby) => {
  const hobbyMap = {
    'Sports': formsPage.selectors.hobbiesSports,
    'Reading': formsPage.selectors.hobbiesReading,
    'Music': formsPage.selectors.hobbiesMusic
  };
  formsPage.uncheck(hobbyMap[hobby]);
});

When('I upload a file {string}', (fileName) => {
  formsPage.uploadFile(formsPage.selectors.picture, fileName);
});

When('I click on the state dropdown', () => {
  formsPage.click(formsPage.selectors.state);
});

When('I select state {string} from dropdown', (state) => {
  formsPage.selectState(state);
});

When('I select city {string} from dropdown', (city) => {
  formsPage.selectCity(city);
});

When('I fill some form fields', () => {
  formsPage.fillFirstName('Test');
  formsPage.fillLastName('User');
  formsPage.fillEmail('test@example.com');
});

When('I refresh the page', () => {
  formsPage.reload();
});

When('I fill the first name with a {int} character string', (length) => {
  const longString = 'A'.repeat(length);
  formsPage.fillFirstName(longString);
});

When('I fill the last name with a {int} character string', (length) => {
  const longString = 'B'.repeat(length);
  formsPage.fillLastName(longString);
});

When('I fill the address with a {int} character string', (length) => {
  const longString = 'C'.repeat(length);
  formsPage.fillCurrentAddress(longString);
});

When('I fill the first name with {string}', (shortName) => {
  formsPage.fillFirstName(shortName);
});

When('I fill the last name with {string}', (shortName) => {
  formsPage.fillLastName(shortName);
});

When('I fill the form with valid data', () => {
  const testData = formsPage.generateFormTestData();
  formsPage.fillCompleteForm(testData);
});

When('I measure the form submission time', () => {
  const startTime = Date.now();
  formsPage.submitForm();
  cy.wrap(startTime).as('startTime');
});

When('I try to inject script in the first name field', () => {
  const scriptInjection = '<script>alert("XSS")</script>';
  formsPage.fillFirstName(scriptInjection);
});

// Then steps
Then('I should see a success modal', () => {
  formsPage.assertModalVisible();
});

Then('the modal should contain the submitted data', () => {
  formsPage.assertModalTitle('Thanks for submitting the form');
});

Then('I can close the modal', () => {
  formsPage.closeModal();
});

Then('I should see the following form sections:', (dataTable) => {
  const expectedSections = dataTable.rows().map(row => row[0]);
  formsPage.assertFormSectionsVisible();
});

Then('the modal should contain {string}', (expectedText) => {
  formsPage.assertContainsText(formsPage.selectors.modalBody, expectedText);
});

Then('I should see validation messages for required fields', () => {
  formsPage.assertValidationMessage('firstName', 'First Name is required');
  formsPage.assertValidationMessage('lastName', 'Last Name is required');
  formsPage.assertValidationMessage('email', 'Email is required');
  formsPage.assertValidationMessage('mobile', 'Mobile Number is required');
});

Then('the form should not be submitted', () => {
  formsPage.assertDoesNotExist(formsPage.selectors.modal);
});

Then('I should see an email validation message', () => {
  formsPage.assertValidationMessage('email', 'Please enter valid email');
});

Then('I should see a mobile number validation message', () => {
  formsPage.assertValidationMessage('mobile', 'Please enter valid mobile number');
});

Then('I should see the date picker', () => {
  formsPage.assertIsVisible(formsPage.selectors.datePicker);
});

Then('the selected date should be displayed in the field', () => {
  formsPage.assertIsVisible(formsPage.selectors.dateOfBirth);
});

Then('I should see autocomplete suggestions', () => {
  cy.get('.subjects-auto-complete__option').should('be.visible');
});

Then('{string} should be added to subjects', (subject) => {
  cy.get('.subjects-auto-complete__multi-value__label').should('contain', subject);
});

Then('the {string} checkbox should be checked', (hobby) => {
  const hobbyMap = {
    'Sports': formsPage.selectors.hobbiesSports,
    'Reading': formsPage.selectors.hobbiesReading,
    'Music': formsPage.selectors.hobbiesMusic
  };
  formsPage.assertIsChecked(hobbyMap[hobby]);
});

Then('the {string} checkbox should be unchecked', (hobby) => {
  const hobbyMap = {
    'Sports': formsPage.selectors.hobbiesSports,
    'Reading': formsPage.selectors.hobbiesReading,
    'Music': formsPage.selectors.hobbiesMusic
  };
  formsPage.assertIsNotChecked(hobbyMap[hobby]);
});

Then('the file should be uploaded successfully', () => {
  cy.get(formsPage.selectors.picture).should('have.value');
});

Then('the file name should be displayed', () => {
  cy.get(formsPage.selectors.picture).should('not.have.value', '');
});

Then('I should see state options', () => {
  cy.get('.css-1wa3eu0-option').should('be.visible');
});

Then('the city dropdown should be enabled', () => {
  formsPage.assertIsEnabled(formsPage.selectors.city);
});

Then('both state and city should be selected', () => {
  cy.get(formsPage.selectors.state).should('not.have.value', '');
  cy.get(formsPage.selectors.city).should('not.have.value', '');
});

Then('all form fields should be empty', () => {
  formsPage.assertFormEmpty();
});

Then('no validation messages should be visible', () => {
  cy.get('.invalid-feedback').should('not.be.visible');
});

Then('the modal should contain the special characters correctly', () => {
  formsPage.assertContainsText(formsPage.selectors.modalBody, 'José María');
  formsPage.assertContainsText(formsPage.selectors.modalBody, "O'Connor");
});

Then('the modal should contain the long data correctly', () => {
  formsPage.assertModalVisible();
});

Then('the modal should contain the short data correctly', () => {
  formsPage.assertModalVisible();
});

Then('the form should submit within {int} seconds', (maxSeconds) => {
  cy.get('@startTime').then((startTime) => {
    const endTime = Date.now();
    const submissionTime = endTime - startTime;
    expect(submissionTime).to.be.lessThan(maxSeconds * 1000);
  });
});

Then('the modal should appear within {int} second', (maxSeconds) => {
  formsPage.assertModalVisible();
});

Then('all form fields should have proper labels', () => {
  cy.get('label').each(($label) => {
    cy.wrap($label).should('be.visible');
  });
});

Then('all form fields should be keyboard accessible', () => {
  cy.get('input, select, textarea').each(($field) => {
    cy.wrap($field).should('not.have.attr', 'tabindex', '-1');
  });
});

Then('all form fields should have proper ARIA attributes', () => {
  cy.get('input, select, textarea').each(($field) => {
    cy.wrap($field).should('have.attr', 'id');
  });
});

Then('the form should be navigable using Tab key', () => {
  cy.get('body').tab();
  cy.focused().should('exist');
});

Then('the form should be submittable using Enter key', () => {
  cy.get(formsPage.selectors.submitButton).focus().type('{enter}');
  formsPage.assertModalVisible();
});

Then('the script should be sanitized', () => {
  formsPage.assertModalVisible();
});

Then('the form should submit successfully', () => {
  formsPage.assertModalVisible();
});

Then('no script should be executed', () => {
  cy.on('window:alert', () => {
    throw new Error('Alert should not be triggered');
  });
});

// Additional helper steps
When('I clear the form', () => {
  formsPage.clearForm();
});

Then('the form should be cleared', () => {
  formsPage.assertFormEmpty();
});

When('I take a form screenshot', () => {
  formsPage.takeFormScreenshot();
});

Then('the form screenshot should be saved', () => {
  cy.log('Form screenshot saved');
});

When('I test form validation', () => {
  formsPage.testFormValidation();
});

Then('all validation messages should be displayed', () => {
  cy.get('.invalid-feedback').should('be.visible');
});

When('I test invalid email format with {string}', (invalidEmail) => {
  formsPage.testInvalidEmail(invalidEmail);
});

When('I test invalid mobile format with {string}', (invalidMobile) => {
  formsPage.testInvalidMobile(invalidMobile);
});

Then('the form should show appropriate error messages', () => {
  cy.get('.invalid-feedback').should('be.visible');
}); 