Feature: API Testing to Insert Books Data

  Background:
    Given user is logged into the service

  Scenario: Insert new book using POST request
    Given user sends a POST request to add the following book:
      | id    | title             | author          |
      | 1     | "Sample Book"       | "Anuja"  |
    Then the insert response status should be 201
    And the response should contain the book data with title "Sample Book" and author "Anuja"

  Scenario: Insert another new book using POST request
    Given user sends a POST request to add the following book:
      | id | title          | author |
      | 2  | "Sample Book 2" | "Anuja" |
    Then the insert response status should be 201
    And the response should contain the book data with title "Sample Book 2" and author "Anuja"
  Scenario: Insert book with missing mandatory fields
    Given user sends a POST request with missing fields to add the following book:
      | id    | title | author |
      | 2     |       | "Anuja" |
    Then the insert response status should be 400
    And the response should contain an error message "Title is required"