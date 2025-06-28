import BasePage from './common.js';

class FormsPage extends BasePage {
  constructor() {
    super();
    this.url = '/forms';
    
    // Page elements
    this.selectors = {
      // Navigation
      practiceFormLink: '.menu-list li:contains("Practice Form")',
      
      // Practice Form elements
      firstName: '#firstName',
      lastName: '#lastName',
      email: '#userEmail',
      genderMale: '#gender-radio-1',
      genderFemale: '#gender-radio-2',
      genderOther: '#gender-radio-3',
      mobile: '#userNumber',
      dateOfBirth: '#dateOfBirthInput',
      subjects: '#subjectsInput',
      hobbiesSports: '#hobbies-checkbox-1',
      hobbiesReading: '#hobbies-checkbox-2',
      hobbiesMusic: '#hobbies-checkbox-3',
      picture: '#uploadPicture',
      currentAddress: '#currentAddress',
      state: '#state',
      city: '#city',
      submitButton: '#submit',
      
      // Date picker
      datePicker: '.react-datepicker',
      datePickerInput: '#dateOfBirthInput',
      datePickerMonth: '.react-datepicker__month-select',
      datePickerYear: '.react-datepicker__year-select',
      datePickerDay: '.react-datepicker__day',
      
      // Dropdowns
      stateDropdown: '#state',
      cityDropdown: '#city',
      
      // Modal
      modal: '.modal-content',
      modalTitle: '.modal-title',
      modalBody: '.modal-body',
      closeModal: '#closeLargeModal',
      
      // Validation messages
      validationMessages: '.invalid-feedback',
      
      // Form sections
      personalInfoSection: '.form-group',
      contactInfoSection: '.form-group',
      dateSection: '.form-group',
      subjectsSection: '.form-group',
      hobbiesSection: '.form-group',
      pictureSection: '.form-group',
      addressSection: '.form-group',
      stateCitySection: '.form-group'
    };
  }

  // Navigate to practice form
  navigateToPracticeForm() {
    this.click(this.selectors.practiceFormLink);
    return this;
  }

  // Fill first name
  fillFirstName(firstName) {
    this.type(this.selectors.firstName, firstName);
    return this;
  }

  // Fill last name
  fillLastName(lastName) {
    this.type(this.selectors.lastName, lastName);
    return this;
  }

  // Fill email
  fillEmail(email) {
    this.type(this.selectors.email, email);
    return this;
  }

  // Select gender
  selectGender(gender) {
    const genderMap = {
      'male': this.selectors.genderMale,
      'female': this.selectors.genderFemale,
      'other': this.selectors.genderOther
    };
    
    const selector = genderMap[gender.toLowerCase()];
    if (selector) {
      this.click(selector);
    }
    return this;
  }

  // Fill mobile number
  fillMobile(mobile) {
    this.type(this.selectors.mobile, mobile);
    return this;
  }

  // Select date of birth
  selectDateOfBirth(day, month, year) {
    this.click(this.selectors.dateOfBirth);
    cy.get(this.selectors.datePickerMonth).select(month);
    cy.get(this.selectors.datePickerYear).select(year);
    cy.get(this.selectors.datePickerDay).contains(day).click();
    return this;
  }

  // Fill subjects
  fillSubjects(subjects) {
    subjects.forEach(subject => {
      this.type(this.selectors.subjects, subject);
      cy.get('.subjects-auto-complete__option').contains(subject).click();
    });
    return this;
  }

  // Select hobbies
  selectHobbies(hobbies) {
    const hobbiesMap = {
      'sports': this.selectors.hobbiesSports,
      'reading': this.selectors.hobbiesReading,
      'music': this.selectors.hobbiesMusic
    };
    
    hobbies.forEach(hobby => {
      const selector = hobbiesMap[hobby.toLowerCase()];
      if (selector) {
        this.check(selector);
      }
    });
    return this;
  }

  // Upload picture
  uploadPicture(fileName) {
    this.uploadFile(this.selectors.picture, fileName);
    return this;
  }

  // Fill current address
  fillCurrentAddress(address) {
    this.type(this.selectors.currentAddress, address);
    return this;
  }

  // Select state
  selectState(state) {
    this.click(this.selectors.state);
    cy.get('.css-1wa3eu0-placeholder').contains('Select State').click();
    cy.get('.css-1wa3eu0-option').contains(state).click();
    return this;
  }

  // Select city
  selectCity(city) {
    this.click(this.selectors.city);
    cy.get('.css-1wa3eu0-placeholder').contains('Select City').click();
    cy.get('.css-1wa3eu0-option').contains(city).click();
    return this;
  }

  // Submit form
  submitForm() {
    this.click(this.selectors.submitButton);
    return this;
  }

  // Fill complete form
  fillCompleteForm(formData) {
    this.fillFirstName(formData.firstName || '');
    this.fillLastName(formData.lastName || '');
    this.fillEmail(formData.email || '');
    
    if (formData.gender) {
      this.selectGender(formData.gender);
    }
    
    this.fillMobile(formData.mobile || '');
    
    if (formData.dateOfBirth) {
      this.selectDateOfBirth(
        formData.dateOfBirth.day,
        formData.dateOfBirth.month,
        formData.dateOfBirth.year
      );
    }
    
    if (formData.subjects) {
      this.fillSubjects(formData.subjects);
    }
    
    if (formData.hobbies) {
      this.selectHobbies(formData.hobbies);
    }
    
    if (formData.picture) {
      this.uploadPicture(formData.picture);
    }
    
    this.fillCurrentAddress(formData.address || '');
    
    if (formData.state) {
      this.selectState(formData.state);
    }
    
    if (formData.city) {
      this.selectCity(formData.city);
    }
    
    return this;
  }

  // Assert modal is visible
  assertModalVisible() {
    this.assertIsVisible(this.selectors.modal);
    return this;
  }

  // Assert modal title
  assertModalTitle(expectedTitle) {
    this.assertContainsText(this.selectors.modalTitle, expectedTitle);
    return this;
  }

  // Get modal content
  getModalContent() {
    return this.getText(this.selectors.modalBody);
  }

  // Assert modal contains data
  assertModalContainsData(expectedData) {
    Object.entries(expectedData).forEach(([key, value]) => {
      this.assertContainsText(this.selectors.modalBody, value);
    });
    return this;
  }

  // Close modal
  closeModal() {
    this.click(this.selectors.closeModal);
    return this;
  }

  // Assert validation message
  assertValidationMessage(field, expectedMessage) {
    const fieldMap = {
      'firstName': this.selectors.firstName,
      'lastName': this.selectors.lastName,
      'email': this.selectors.email,
      'mobile': this.selectors.mobile
    };
    
    const fieldSelector = fieldMap[field];
    if (fieldSelector) {
      cy.get(fieldSelector).parent().find('.invalid-feedback').should('contain', expectedMessage);
    }
    return this;
  }

  // Assert field is required
  assertFieldRequired(field) {
    const fieldMap = {
      'firstName': this.selectors.firstName,
      'lastName': this.selectors.lastName,
      'email': this.selectors.email,
      'mobile': this.selectors.mobile
    };
    
    const fieldSelector = fieldMap[field];
    if (fieldSelector) {
      cy.get(fieldSelector).should('have.attr', 'required');
    }
    return this;
  }

  // Clear form
  clearForm() {
    cy.get(this.selectors.firstName).clear();
    cy.get(this.selectors.lastName).clear();
    cy.get(this.selectors.email).clear();
    cy.get(this.selectors.mobile).clear();
    cy.get(this.selectors.currentAddress).clear();
    return this;
  }

  // Assert form is empty
  assertFormEmpty() {
    cy.get(this.selectors.firstName).should('have.value', '');
    cy.get(this.selectors.lastName).should('have.value', '');
    cy.get(this.selectors.email).should('have.value', '');
    cy.get(this.selectors.mobile).should('have.value', '');
    cy.get(this.selectors.currentAddress).should('have.value', '');
    return this;
  }

  // Test form validation
  testFormValidation() {
    // Try to submit empty form
    this.submitForm();
    
    // Assert validation messages
    this.assertValidationMessage('firstName', 'First Name is required');
    this.assertValidationMessage('lastName', 'Last Name is required');
    this.assertValidationMessage('email', 'Email is required');
    this.assertValidationMessage('mobile', 'Mobile Number is required');
    
    return this;
  }

  // Test invalid email format
  testInvalidEmail(email) {
    this.fillEmail(email);
    this.submitForm();
    this.assertValidationMessage('email', 'Please enter valid email');
    return this;
  }

  // Test invalid mobile format
  testInvalidMobile(mobile) {
    this.fillMobile(mobile);
    this.submitForm();
    this.assertValidationMessage('mobile', 'Please enter valid mobile number');
    return this;
  }

  // Generate test data for form
  generateFormTestData() {
    return {
      firstName: this.generateRandomData('firstName'),
      lastName: this.generateRandomData('lastName'),
      email: this.generateRandomData('email'),
      gender: 'male',
      mobile: this.generateRandomData('phone'),
      dateOfBirth: {
        day: '15',
        month: 'January',
        year: '1990'
      },
      subjects: ['Maths', 'Physics'],
      hobbies: ['sports', 'reading'],
      picture: 'test-image.jpg',
      address: this.generateRandomData('address'),
      state: 'NCR',
      city: 'Delhi'
    };
  }

  // Take form screenshot
  takeFormScreenshot(name = 'practice-form') {
    cy.get('form').screenshot(name);
    return this;
  }

  // Assert form sections are visible
  assertFormSectionsVisible() {
    this.assertIsVisible(this.selectors.personalInfoSection);
    this.assertIsVisible(this.selectors.contactInfoSection);
    this.assertIsVisible(this.selectors.dateSection);
    this.assertIsVisible(this.selectors.subjectsSection);
    this.assertIsVisible(this.selectors.hobbiesSection);
    this.assertIsVisible(this.selectors.pictureSection);
    this.assertIsVisible(this.selectors.addressSection);
    this.assertIsVisible(this.selectors.stateCitySection);
    return this;
  }
}

export default FormsPage; 