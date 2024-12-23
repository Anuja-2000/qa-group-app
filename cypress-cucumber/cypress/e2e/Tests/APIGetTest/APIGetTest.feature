Feature: GET one book and GET books

  Scenario: GET request to fetch books
    Given user send a GET request to get all books
    Then the response status should be 200
    And the response should contain a list of books
