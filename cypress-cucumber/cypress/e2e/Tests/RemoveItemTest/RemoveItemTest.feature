Feature: Cart Management with Remove Operation
  Background:
    Given the user is logged into the application
    And the user is on the products page

  Scenario: Remove a single item from product home page
    And the user is on the products page
    When the user adds the "Sauce Labs Backpack" to the cart
    And the user removes the "Sauce Labs Backpack" from the cart early
    And the user views the cart
    Then the user should not see the "Sauce Labs Backpack" in the cart

  Scenario: Remove a single item from the cart
    Given the user is logged into the application
    And the user is on the products page
    When the user adds the "Sauce Labs Backpack" to the cart
    And the user views the cart
    And the user removes the "Sauce Labs Backpack" from the cart
    Then the user should not see the "Sauce Labs Backpack" in the cart

  Scenario: Remove one item while keeping another
    Given the user is logged into the application
    And the user is on the products page
    And the user has added the "Sauce Labs Backpack" and "Sauce Labs Fleece Jacket" to the cart
    When the user removes the "Sauce Labs Backpack" from the cart
    Then the user should see the "Sauce Labs Fleece Jacket" in the cart
    And the cart item count should be 1