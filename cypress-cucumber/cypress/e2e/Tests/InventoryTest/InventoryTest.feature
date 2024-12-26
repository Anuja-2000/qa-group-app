Feature: Add Items to Shopping Cart
  As a user
  The user wants to add items to their shopping cart
  So that they can purchase them later

  Background:
    Given the user is logged into the application

  Scenario: Add a single item to the cart
    Given the user is on the products page
    When the user adds the "Sauce Labs Backpack" to the cart
    And the user views the cart
    Then the user should see the "Sauce Labs Backpack" in the cart
    And the cart item count should be 1

  Scenario: Add multiple items to the cart
    Given the user is on the products page
    When the user adds the "Sauce Labs Backpack" to the cart
    And the user adds the "Sauce Labs Bike Light" to the cart
    And the user views the cart
    Then the user should see the "Sauce Labs Backpack" and "Sauce Labs Bike Light" in the cart
    And the cart item count should be 2

