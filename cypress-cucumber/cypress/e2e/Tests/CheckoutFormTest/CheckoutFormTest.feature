Feature: Checkout Functionality
  To ensure that users can fill out the checkout form and navigate through the checkout process correctly.

  Background:
    Given the user is logged into the application
    And the user is on the products page

  Scenario: Adding a single item to the cart
    When the user adds the "Sauce Labs Backpack" to the cart
    And the user views the cart
    Then the user should see the "Sauce Labs Backpack" in the cart
    And the cart item count should be 1

  Scenario: Adding multiple items to the cart
    When the user adds the "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    And the user views the cart
    Then the user should see the "Sauce Labs Backpack" and "Sauce Labs Bike Light" in the cart
    And the cart item count should be 2

  Scenario: Proceeding to checkout
    Given the user has added the "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    When the user clicks the checkout button
    Then the user should be navigated to the "Checkout: Your Information" page

  Scenario: Filling out the checkout form with valid data
    Given the user has added the "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    When the user clicks the checkout button
    And the user fills out the checkout information form with valid data
    Then the user should proceed to the next step of the checkout process

  Scenario: Submitting the checkout form with empty fields
    Given the user has added the "Sauce Labs Backpack" to the cart
    When the user clicks the checkout button
    And the user leaves the checkout information fields empty and submits
    Then the user should see an error message for empty fields

  Scenario: Submitting the checkout form with an invalid postal code
    Given the user has added the "Sauce Labs Backpack" to the cart
    When the user clicks the checkout button
    And the user enters an invalid postal code "abcde" and submits
    Then the user should see an error message for invalid postal code
    And the user should **not** be allowed to proceed to the next step of the checkout process

  Scenario: Canceling the checkout process
    Given the user has added the "Sauce Labs Backpack" to the cart
    When the user clicks the checkout button
    And the user clicks the cancel button
    Then the user should be redirected to the previous page when they click cancel
