Feature: Handle duplicate books via POST API

  Background:
    Given the user log into system

  Scenario: Adding a duplicate book
    Given the user sends a POST request to add the book
    When the user sends a POST request a book with the same details already exists
    Then the API should return a 208 status code
