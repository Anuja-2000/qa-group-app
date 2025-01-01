Feature: Delete a Book from the Library System
  As an admin or user
  I want to delete a book via the API
  So that I can manage the books in the system or handle errors when attempting to delete non-existent books

  Scenario: Successfully delete a book as admin
    Given a book exists with ID
    When the admin sends a DELETE request
    Then the response status code should be 200

  Scenario: Attempt to delete a book as user (Authorization)
    Given the user is authenticated as "user" with password "password"
    When the user sends a DELETE request
    Then the response status code should be 403
    And the response body should contain "User is not permitted"

  Scenario: Attempt to delete a non-existent book
    Given the user is authenticated as "admin" with password "password"
    When the user sends a DELETE request to delete a not existing book
    Then the response status code should be 404
    And the response body should contain "Book not found"
