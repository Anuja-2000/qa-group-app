Feature: GET one book and GET books

  Scenario: GET request to fetch all books
    Given user send a GET request to get all books
    Then the response status should be 200
    And the response should contain a list of books

  Scenario: GET request when no books are available
    Given user send a GET request to get books when no books are available
    Then the response status should be 404
    And the response body should indicate no books found
