Feature: DELETE all books

  Scenario: DELETE request to remove all books
    Given user sends a DELETE request to remove all books
    Then the response status should be 200
    And the response message should confirm all books were deleted
    And the response should contain an empty list of books when fetched