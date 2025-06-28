Feature: DemoQA Forms
  As a user
  I want to fill out and submit forms
  So that I can test form validation and submission functionality

  Background:
    Given I am on the DemoQA homepage
    And I navigate to the Forms page
    And I click on "Practice Form"

  @smoke @forms
  Scenario: Fill and submit practice form with valid data
    When I fill the practice form with valid data
    And I submit the form
    Then I should see a success modal
    And the modal should contain the submitted data
    And I can close the modal

  @smoke @forms
  Scenario: Verify form fields are present
    Then I should see the following form sections:
      | Personal Information |
      | Contact Information  |
      | Date of Birth       |
      | Subjects            |
      | Hobbies             |
      | Picture Upload      |
      | Current Address     |
      | State and City      |

  @regression @forms
  Scenario: Fill form with all fields
    When I fill the first name with "John"
    And I fill the last name with "Doe"
    And I fill the email with "john.doe@example.com"
    And I select gender "male"
    And I fill the mobile number with "1234567890"
    And I select date of birth "15" "January" "1990"
    And I add subjects "Maths" and "Physics"
    And I select hobbies "sports" and "reading"
    And I upload a picture "test-image.jpg"
    And I fill the current address with "123 Test Street, Test City"
    And I select state "NCR"
    And I select city "Delhi"
    And I submit the form
    Then I should see a success modal
    And the modal should contain "John"
    And the modal should contain "Doe"
    And the modal should contain "john.doe@example.com"

  @regression @forms
  Scenario: Test form validation with empty fields
    When I submit the form without filling required fields
    Then I should see validation messages for required fields
    And the form should not be submitted

  @regression @forms
  Scenario: Test invalid email format
    When I fill the email with "invalid-email"
    And I submit the form
    Then I should see an email validation message

  @regression @forms
  Scenario: Test invalid mobile number format
    When I fill the mobile number with "abc"
    And I submit the form
    Then I should see a mobile number validation message

  @regression @forms
  Scenario: Test date picker functionality
    When I click on the date of birth field
    Then I should see the date picker
    When I select a date "20" "March" "1985"
    Then the selected date should be displayed in the field

  @regression @forms
  Scenario: Test subjects autocomplete
    When I type "Math" in the subjects field
    Then I should see autocomplete suggestions
    When I select "Maths" from suggestions
    Then "Maths" should be added to subjects

  @regression @forms
  Scenario: Test hobbies selection
    When I select the "Sports" checkbox
    Then the "Sports" checkbox should be checked
    When I select the "Reading" checkbox
    Then the "Reading" checkbox should be checked
    When I uncheck the "Sports" checkbox
    Then the "Sports" checkbox should be unchecked

  @regression @forms
  Scenario: Test file upload
    When I upload a file "sample-image.jpg"
    Then the file should be uploaded successfully
    And the file name should be displayed

  @regression @forms
  Scenario: Test state and city dropdowns
    When I click on the state dropdown
    Then I should see state options
    When I select state "Haryana"
    Then the city dropdown should be enabled
    When I select city "Karnal"
    Then both state and city should be selected

  @regression @forms
  Scenario: Test form reset functionality
    When I fill some form fields
    And I refresh the page
    Then all form fields should be empty
    And no validation messages should be visible

  @edge @forms
  Scenario: Test form with special characters
    When I fill the first name with "José María"
    And I fill the last name with "O'Connor"
    And I fill the email with "test+tag@example.com"
    And I fill the address with "123 Main St, Apt #4B, City, State 12345"
    And I submit the form
    Then I should see a success modal
    And the modal should contain the special characters correctly

  @edge @forms
  Scenario: Test form with maximum length data
    When I fill the first name with a 50 character string
    And I fill the last name with a 50 character string
    And I fill the address with a 200 character string
    And I submit the form
    Then I should see a success modal
    And the modal should contain the long data correctly

  @edge @forms
  Scenario: Test form with minimum length data
    When I fill the first name with "A"
    And I fill the last name with "B"
    And I fill the email with "a@b.c"
    And I submit the form
    Then I should see a success modal
    And the modal should contain the short data correctly

  @performance @forms
  Scenario: Test form submission performance
    When I fill the form with valid data
    And I measure the form submission time
    Then the form should submit within 3 seconds
    And the modal should appear within 1 second

  @accessibility @forms
  Scenario: Test form accessibility
    Then all form fields should have proper labels
    And all form fields should be keyboard accessible
    And all form fields should have proper ARIA attributes
    And the form should be navigable using Tab key
    And the form should be submittable using Enter key

  @security @forms
  Scenario: Test form security
    When I try to inject script in the first name field
    Then the script should be sanitized
    And the form should submit successfully
    And no script should be executed

  @data-driven @forms
  Scenario Outline: Test form with different data sets
    When I fill the first name with "<firstName>"
    And I fill the last name with "<lastName>"
    And I fill the email with "<email>"
    And I fill the mobile number with "<mobile>"
    And I submit the form
    Then I should see a success modal
    And the modal should contain "<firstName>"
    And the modal should contain "<lastName>"

    Examples:
      | firstName | lastName | email                    | mobile      |
      | John      | Doe      | john.doe@example.com     | 1234567890  |
      | Jane      | Smith    | jane.smith@example.com   | 9876543210  |
      | Bob       | Johnson  | bob.johnson@example.com  | 5555555555  | 