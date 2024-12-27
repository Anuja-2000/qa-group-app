Feature: Handle duplicate books via POST API

  Background:
    Given the user is authenticated as 'user' with password 'password'

  Scenario: Adding a duplicate book
    Given the user sends a POST request to add the book
    When the user sends a POST request a book with the same details already exists
    Then the API should return a 208 status code
