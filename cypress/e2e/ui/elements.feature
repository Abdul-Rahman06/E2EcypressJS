Feature: DemoQA Elements
  As a user
  I want to interact with various UI elements
  So that I can test different element types and interactions

  Background:
    Given I am on the DemoQA homepage
    And I navigate to the Elements page

  @smoke @elements
  Scenario: Verify Elements page loads successfully
    When I wait for the page to load completely
    Then I should see the Elements page title
    And I should see the following element categories:
      | Text Box        |
      | Check Box       |
      | Radio Button    |
      | Web Tables      |
      | Buttons         |
      | Links           |
      | Broken Links - Images |
      | Upload and Download |
      | Dynamic Properties |

  @smoke @elements @textbox
  Scenario: Fill and submit text box form
    When I click on "Text Box"
    And I fill the full name with "John Doe"
    And I fill the email with "john.doe@example.com"
    And I fill the current address with "123 Main Street"
    And I fill the permanent address with "456 Permanent Street"
    And I submit the text box form
    Then I should see the submitted information
    And the submitted data should match the input

  @regression @elements @checkbox
  Scenario: Test checkbox functionality
    When I click on "Check Box"
    And I expand the home folder
    And I check the desktop checkbox
    And I check the documents checkbox
    Then I should see the success message
    And the selected items should be displayed

  @regression @elements @radiobutton
  Scenario: Test radio button selection
    When I click on "Radio Button"
    And I select the "Yes" radio button
    Then I should see the success message
    And the message should contain "Yes"
    When I select the "Impressive" radio button
    Then I should see the success message
    And the message should contain "Impressive"

  @regression @elements @webtables
  Scenario: Add new record to web table
    When I click on "Web Tables"
    And I click the "Add" button
    And I fill the first name with "Test"
    And I fill the last name with "User"
    And I fill the email with "test.user@example.com"
    And I fill the age with "25"
    And I fill the salary with "50000"
    And I fill the department with "IT"
    And I submit the form
    Then I should see the new record in the table
    And the record should contain the entered data

  @regression @elements @buttons
  Scenario: Test different button interactions
    When I click on "Buttons"
    And I double click the "Double Click Me" button
    Then I should see the double click message
    When I right click the "Right Click Me" button
    Then I should see the right click message
    When I click the "Click Me" button
    Then I should see the dynamic click message

  @regression @elements @links
  Scenario: Test link functionality
    When I click on "Links"
    And I click the "Home" link
    Then I should be redirected to the homepage
    When I navigate back to the Elements page
    And I click on "Links"
    And I click the "Created" link
    Then I should see the "Link has responded with staus 201 and status text Created" message

  @regression @elements @upload
  Scenario: Test file upload functionality
    When I click on "Upload and Download"
    And I upload a file "sample-image.jpg"
    Then I should see the file path displayed
    And the file should be uploaded successfully

  @regression @elements @download
  Scenario: Test file download functionality
    When I click on "Upload and Download"
    And I click the download button
    Then the file should be downloaded
    And the downloaded file should exist in the downloads folder

  @edge @elements @dynamic
  Scenario: Test dynamic properties
    When I click on "Dynamic Properties"
    And I wait for the button to be enabled
    Then the "Will enable 5 seconds" button should be enabled
    When I wait for the button color to change
    Then the "Color Change" button should have a different color
    When I wait for the button to be visible
    Then the "Visible After 5 Seconds" button should be visible

  @performance @elements
  Scenario: Test page load performance
    When I measure the page load time
    Then the page should load within 3 seconds
    When I measure the element interaction time
    Then the element interactions should respond within 1 second

  @accessibility @elements
  Scenario: Test accessibility features
    Then all form elements should have proper labels
    And all interactive elements should be keyboard accessible
    And all elements should have proper ARIA attributes
    And the page should be navigable using Tab key

  @data-driven @elements
  Scenario Outline: Test text box with different data sets
    When I click on "Text Box"
    And I fill the full name with "<fullName>"
    And I fill the email with "<email>"
    And I fill the current address with "<currentAddress>"
    And I fill the permanent address with "<permanentAddress>"
    And I submit the text box form
    Then I should see the submitted information
    And the submitted data should contain "<fullName>"
    And the submitted data should contain "<email>"

    Examples:
      | fullName    | email                    | currentAddress        | permanentAddress      |
      | John Doe    | john.doe@example.com     | 123 Main Street      | 456 Permanent Street |
      | Jane Smith  | jane.smith@example.com   | 789 Oak Avenue       | 321 Pine Road        |
      | Bob Johnson | bob.johnson@example.com  | 654 Elm Street       | 987 Maple Drive      |

  @security @elements
  Scenario: Test input sanitization
    When I click on "Text Box"
    And I fill the full name with "<script>alert('XSS')</script>"
    And I fill the email with "test@example.com"
    And I submit the text box form
    Then I should see the submitted information
    And no script should be executed
    And the input should be properly sanitized

  @regression @elements @validation
  Scenario: Test form validation
    When I click on "Text Box"
    And I submit the text box form without filling required fields
    Then I should see validation messages
    And the form should not be submitted
    When I fill the email with an invalid format
    And I submit the text box form
    Then I should see an email validation message 