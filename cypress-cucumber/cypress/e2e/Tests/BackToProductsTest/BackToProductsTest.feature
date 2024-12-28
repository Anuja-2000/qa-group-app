Feature: Navigate back to products from Checkout Overview Page

  Scenario: Navigate back to products after viewing checkout overview
    Given the user is logged in
    And the user has the following items in the user cart
      | item              |
      | Sauce Labs Backpack |
    When the user proceeds to checkout overview
    And the user clicks on "Cancel"
    Then the user should be redirected to the product page
    And the user should see a list of available products

