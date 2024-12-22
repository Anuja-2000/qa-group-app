Feature: GET books and GET one book

  Scenario: GET request to fetch books
    Given I send a GET request to "/api/books"
    Then the response status should be 200
    And the response should contain a list of books
