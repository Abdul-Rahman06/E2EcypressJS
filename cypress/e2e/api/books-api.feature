Feature: Book Store API
  As a developer
  I want to test the Book Store API endpoints
  So that I can ensure the API functionality works correctly

  Background:
    Given I have access to the Book Store API

  @smoke @api @books
  Scenario: Get all books from the store
    When I send a GET request to "/BookStore/v1/Books"
    Then I should receive a 200 status code
    And the response should contain a list of books
    And each book should have required fields

  @smoke @api @books
  Scenario: Get a specific book by ISBN
    When I send a GET request to "/BookStore/v1/Book" with ISBN "9781449325862"
    Then I should receive a 200 status code
    And the response should contain book details
    And the book ISBN should be "9781449325862"

  @regression @api @books
  Scenario: Get book with invalid ISBN
    When I send a GET request to "/BookStore/v1/Book" with ISBN "invalid-isbn"
    Then I should receive a 400 status code
    And the response should contain an error message

  @regression @api @books
  Scenario: Verify book response structure
    When I send a GET request to "/BookStore/v1/Books"
    Then I should receive a 200 status code
    And the response should have the following structure:
      | isbn        | string |
      | title       | string |
      | subTitle    | string |
      | author      | string |
      | publish_date| string |
      | publisher   | string |
      | pages       | number |
      | description | string |
      | website     | string |

  @regression @api @books
  Scenario: Verify book data types
    When I send a GET request to "/BookStore/v1/Books"
    Then I should receive a 200 status code
    And the first book should have:
      | isbn        | string  |
      | title       | string  |
      | pages       | number  |
      | publish_date| string  |

  @performance @api @books
  Scenario: Test API response time
    When I send a GET request to "/BookStore/v1/Books"
    Then I should receive a 200 status code
    And the response time should be less than 2000ms

  @security @api @books
  Scenario: Test API with invalid headers
    When I send a GET request to "/BookStore/v1/Books" with invalid headers
    Then I should receive a 400 status code
    And the response should contain an error message

  @edge @api @books
  Scenario: Test API with malformed request
    When I send a malformed request to "/BookStore/v1/Books"
    Then I should receive a 400 status code
    And the response should contain an error message

  @data-driven @api @books
  Scenario Outline: Test different book ISBNs
    When I send a GET request to "/BookStore/v1/Book" with ISBN "<isbn>"
    Then I should receive a "<expectedStatus>" status code
    And the response should contain "<expectedContent>"

    Examples:
      | isbn           | expectedStatus | expectedContent |
      | 9781449325862  | 200            | Git Pocket Guide|
      | 9781449331818  | 200            | Learning JavaScript Design Patterns |
      | invalid-isbn   | 400            | error           |
      | 1234567890123  | 400            | error           |

  @regression @api @books
  Scenario: Test API pagination
    When I send a GET request to "/BookStore/v1/Books" with page size 5
    Then I should receive a 200 status code
    And the response should contain at most 5 books

  @regression @api @books
  Scenario: Test API filtering
    When I send a GET request to "/BookStore/v1/Books" with author filter
    Then I should receive a 200 status code
    And all returned books should have the specified author

  @regression @api @books
  Scenario: Test API sorting
    When I send a GET request to "/BookStore/v1/Books" with title sort
    Then I should receive a 200 status code
    And the books should be sorted by title alphabetically

  @load @api @books
  Scenario: Test API under load
    When I send 10 concurrent GET requests to "/BookStore/v1/Books"
    Then all requests should receive a 200 status code
    And all responses should be consistent

  @regression @api @books
  Scenario: Verify book content integrity
    When I send a GET request to "/BookStore/v1/Books"
    Then I should receive a 200 status code
    And all books should have valid ISBNs
    And all books should have non-empty titles
    And all books should have valid publish dates
    And all books should have positive page counts

  @regression @api @books
  Scenario: Test API with different content types
    When I send a GET request to "/BookStore/v1/Books" with Accept: application/xml
    Then I should receive a 200 status code
    And the response should be in XML format

  @regression @api @books
  Scenario: Test API with compression
    When I send a GET request to "/BookStore/v1/Books" with Accept-Encoding: gzip
    Then I should receive a 200 status code
    And the response should be compressed

  @monitoring @api @books
  Scenario: Monitor API health
    When I send a GET request to "/BookStore/v1/Books"
    Then I should receive a 200 status code
    And the response headers should contain cache control
    And the response should have proper CORS headers 