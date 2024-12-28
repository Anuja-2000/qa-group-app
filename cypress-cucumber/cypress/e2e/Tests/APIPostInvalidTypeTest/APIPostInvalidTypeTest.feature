Feature: Handle invalid data types via POST API

  Background:
    Given the user is authenticated as 'user' with password 'password'

  Scenario: Adding a book with invalid data types
    Given the user provides invalid data types for the book details
    When the user sends a POST request to add the book with invalid data
    Then the API should return a 400 status code
