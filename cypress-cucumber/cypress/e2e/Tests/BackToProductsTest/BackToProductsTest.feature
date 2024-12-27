# cypress/integration/backtoProducts.feature

Feature: Back to Products Page

  Scenario: Go back to products after checkout with no items
    Given the user is logged in
    And the user goes to the cart page
    And the user cart is empty
    When the user proceeds to checkout overview
    And the user clicks on "Back to Products"
    Then the user should be redirected to the product page
    And the user should see a list of available products

  Scenario: Go back to products after checkout with 1 item
    Given the user is logged in
    And the user has the following items in the user cart
      |         item           |
      | Sauce Labs Backpack    |
    When the user proceeds to checkout overview
    And the user clicks on "Back to Products"
    Then the user should be redirected to the product page
    And the user should see the "Sauce Labs Backpack" item in the product list

  Scenario: Go back to products after checkout with 3 items
    Given the user is logged in
    And the user has the following items in the user cart
      |         item            |
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |
    When the user proceeds to checkout overview
    And the user clicks on "Back to Products"
    Then the user should be redirected to the product page
    And the user should see the following items in the product list:
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |
