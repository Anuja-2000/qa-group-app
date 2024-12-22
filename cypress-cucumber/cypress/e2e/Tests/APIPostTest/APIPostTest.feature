Feature: API Testing to Insert Books Data

  Background:
    Given I am logged into the service

  Scenario: Insert new book using POST request
    Given I send a POST request to add the following book:
      | id    | title             | author          |
      | 1     | "Cypress Testing"  | "John Doe"      |
      | 2     | "Sample Book       | "Anuja"  |
    Then the response status should be 201
    And the response should contain the book data with title "Cypress Testing" and author "John Doe"
