Feature: Update a Book
  As a user
  I want to update a book via the API
  So that I can modify its details

  Background:
    And the user is authenticated with username "admin" and password "password"

  Scenario: Successfully update a book
    Given a book exists with ID 1
    When the user sends a PUT request to "/api/books/1" with:
      | id    | title             | author          |
      | 1     | Updated Book      | Updated Author  |
    Then the response status code should be 200
    And the response should include:
      | id    | title             | author          |
      | 1     | Updated Book      | Updated Author  |

  Scenario: Attempt to update a non-existent book
    When the user sends a PUT request to "/api/books/9999" with:
      | id    | title             | author          |
      | 9999  | Nonexistent Book  | Unknown Author  |
    Then the response status code should be 404
    And the response body should contain "Book not found"

  Scenario: Attempt to update a book without authentication
    Given the user is not authenticated
    When the user sends a PUT request to "/api/books/1" with:
      | id    | title             | author          |
      | 1     | Updated Book      | Updated Author  |
    Then the response status code should be 401

  Scenario: Attempt to update a book with non-existent user
    Given the user is authenticated with username "dasuni" and password "password"
    When the user sends a PUT request to "/api/books/1" with:
      | id    | title             | author          |
      | 1     | Updated Book      | Updated Author  |
    Then the response status code should be 401

Scenario: Attempt to update a book with invalid authorization 
    Given the user is authenticated with username "user" and password "password"
    When the user sends a PUT request to "/api/books/1" with:
      | id    | title             | author          |
      | 1     | Updated Book      | Updated Author  |
    Then the response status code should be 403
      And the response body should contain "User is not permitted"

  Scenario: Attempt to update a book with mismatched ID 
    When the user sends a PUT request to "/api/books/1" with:
      | id    | title             | author          |
      | 2     | Mismatched Book   | Unknown Author  |
    Then the response status code should be 400
    And the response body should contain "Book id is not matched"

  Scenario: Attempt to update a book with missing parameters
    When the user sends a PUT request to "/api/books/1" with:
      | id    | title             | author          |
      | 1     |                   |                 |
    Then the response status code should be 400 due to missing parameters
    And the response body should contain "Missing mandatory parameters"
    
  Scenario: Attempt to update a book with invalid data types
    Given the user is authenticated as "admin" with password "password"
    When the user sends a PUT request to "/api/books/1" with:
      | id    | title             | author          |
      | 1     | Updated Book      | true            |
    Then the response status code should be 400 due to missing parameters
    And the response body should contain "Invalid data type"