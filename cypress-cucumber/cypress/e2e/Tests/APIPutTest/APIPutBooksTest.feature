Feature: Update a Book
  As a user
  I want to update a book via the API
  So that I can modify its details

  Background:
    And I am authenticated as "admin" with password "password"

  Scenario: Successfully update a book
    Given a book exists with ID 1
    When I send a PUT request to "/api/books/1" with:
      | id    | title             | author          |
      | 1     | Updated Book      | Updated Author  |
    Then the response status code should be 200
    And the response should include:
      | id    | title             | author          |
      | 1     | Updated Book      | Updated Author  |

  Scenario: Attempt to update a non-existent book
    When I send a PUT request to "/api/books/9999" with:
      | id    | title             | author          |
      | 9999  | Nonexistent Book  | Unknown Author  |
    Then the response status code should be 404
    And the response body should contain "Book not found"

  Scenario: Attempt to update a book with miss-matched id
    When I send a PUT request to "/api/books/1" with:
      | id    | title             | author          |
      | 2     | Nonexistent Book  | Unknown Author  |
    Then the response status code should be 400
    And the response body should contain "Book id is not matched"

  Scenario: Attempt to update a book with invalid data
    When I send a PUT request to "/api/books/1" with:
      | id    | title             | author          |
      | null  | Updated Book      | Updated Author  |
    Then the response status code should be 400
    And the response body should contain "Book id is not matched"

  Scenario: Attempt to update a book without authentication
    Given I am not authenticated
    When I send a PUT request to "/api/books/1" with:
      | id    | title             | author          |
      | 1     | Updated Book      | Updated Author  |
    Then the response status code should be 401

  Scenario: Attempt to update a book with insufficient permissions
    Given I am authenticated as "user" with password "password"
    When I send a PUT request to "/api/books/1" with:
      | id    | title             | author          |
      | 1     | Updated Book      | Updated Author  |
    Then the response status code should be 403
    And the response body should contain "User is not permitted."
