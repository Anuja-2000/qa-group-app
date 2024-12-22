Feature: Add Items to Shopping Cart
  As a user
  I want to add items to my shopping cart
  So that I can purchase them later

  Background:
    Given I am logged into the application

  Scenario: Add a single item to the cart
    Given I am on the products page
    When I add the "Sauce Labs Backpack" to the cart
    And I view the cart
    Then I should see the "Sauce Labs Backpack" in the cart
    And the cart item count should be 1

  Scenario: Add multiple items to the cart
    Given I am on the products page
    When I add the "Sauce Labs Backpack" to the cart
    And I add the "Sauce Labs Bike Light" to the cart
    And I view the cart
    Then I should see the "Sauce Labs Backpack" and "Sauce Labs Bike Light" in the cart
    And the cart item count should be 2

  Scenario: Remove an item from the cart
    Given I have added the "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    When I remove the "Sauce Labs Backpack" from the cart
    Then I should see the "Sauce Labs Bike Light" in the cart
    And the cart item count should be 1
