Feature: Get book by ID

  Background:
    Given the user is authenticated as 'admin' with password 'password'

  Scenario: Fetching a valid book by ID
    Given a valid book ID exists
    When the user fetches the book details with the ID
    Then the API should return a 200 status code
    And the response should contain the correct book details

  Scenario: Fetching a valid book by ID with "user"
    Given a valid book ID exists
    And the user is authenticated as 'user' with password 'password'
    When the user fetches the book details with the ID
    Then the API should return a 200 status code
    And the response should contain the correct book details