Feature: DemoQA Homepage
  As a user
  I want to navigate through the DemoQA website
  So that I can access different testing tools and features

  Background:
    Given I am on the DemoQA homepage

  @smoke @homepage
  Scenario: Verify homepage loads successfully
    When I wait for the page to load completely
    Then I should see the DemoQA logo
    And I should see 6 category cards
    And the page title should contain "DEMOQA"
    And all category cards should be visible

  @smoke @navigation
  Scenario: Navigate to Elements page
    When I click on the "Elements" card
    Then I should be redirected to the Elements page
    And the URL should contain "elements"

  @smoke @navigation
  Scenario: Navigate to Forms page
    When I click on the "Forms" card
    Then I should be redirected to the Forms page
    And the URL should contain "forms"

  @smoke @navigation
  Scenario: Navigate to Alerts, Frame & Windows page
    When I click on the "Alerts, Frame & Windows" card
    Then I should be redirected to the Alerts, Frame & Windows page
    And the URL should contain "alerts"

  @smoke @navigation
  Scenario: Navigate to Widgets page
    When I click on the "Widgets" card
    Then I should be redirected to the Widgets page
    And the URL should contain "widgets"

  @smoke @navigation
  Scenario: Navigate to Interactions page
    When I click on the "Interactions" card
    Then I should be redirected to the Interactions page
    And the URL should contain "interactions"

  @smoke @navigation
  Scenario: Navigate to Book Store Application page
    When I click on the "Book Store Application" card
    Then I should be redirected to the Book Store Application page
    And the URL should contain "books"

  @regression @homepage
  Scenario: Verify all category cards have correct content
    Then I should see the following category cards:
      | Elements                    |
      | Forms                       |
      | Alerts, Frame & Windows     |
      | Widgets                     |
      | Interactions                |
      | Book Store Application      |

  @regression @homepage
  Scenario: Verify footer is present
    Then I should see the footer
    And the footer should contain copyright information

  @regression @homepage
  Scenario: Verify banner is displayed
    Then I should see the banner image
    And the banner should contain welcome text

  @regression @responsive
  Scenario: Verify page is responsive on different screen sizes
    When I resize the browser to 1920x1080
    Then all elements should be properly displayed
    When I resize the browser to 1366x768
    Then all elements should be properly displayed
    When I resize the browser to 1024x768
    Then all elements should be properly displayed
    When I resize the browser to 768x1024
    Then all elements should be properly displayed
    When I resize the browser to 375x667
    Then all elements should be properly displayed

  @regression @homepage
  Scenario: Verify all links are working
    Then all category card links should be functional
    And I should be able to navigate back to homepage from each page

  @edge @homepage
  Scenario: Verify page behavior with slow internet connection
    When I simulate slow network connection
    Then the page should still load successfully
    And all elements should be visible after loading

  @edge @homepage
  Scenario: Verify page behavior with JavaScript disabled
    When I disable JavaScript
    Then the page should still be accessible
    And basic functionality should work

  @performance @homepage
  Scenario: Verify page load performance
    When I measure the page load time
    Then the page should load within 5 seconds
    And all images should load within 10 seconds 