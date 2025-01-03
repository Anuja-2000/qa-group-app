Feature: Get book by ID

  Background:
    Given the user logs in with username 'admin' with password 'password'
    And   enter book details with valid id

  Scenario: Fetching a valid book by ID as admin
    Given a valid book ID exists 1
    When the user fetches the book details with the ID
    Then the API should return a 200 status code
    And the response should contain the correct book details

  Scenario: Fetching a valid book by ID with "user"
    Given a valid book ID exists 1
    And the user logs in with username 'user' with password 'password'
    When the user fetches the book details with the ID
    Then the API should return a 200 status code
    And the response should contain the correct book details
