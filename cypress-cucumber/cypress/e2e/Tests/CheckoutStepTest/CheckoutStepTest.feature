Feature: Checkout Process Form
  As a user
  I want to fill my information fields and submit for delivery

  Background: User logs in navigates to the cart page
    Given the user logged into the application
    Given the user is on the inventory page
    When the user clicks the cart icon
    Then the user is on the cart page

  Scenario: Fill out the form and transition to the overview page
    When the user clicks the checkout button
    Then the user is on the checkout-step-two page
    And the title should be "Checkout: Your Information"
    When the user enters "John" as the first name, "Doe" as the last name, and "12345" as the postal code
    And the user clicks the "Continue" button
    Then the title should change to "Checkout: Overview"
    And the user should be on the checkout-step-one page

  Scenario: Cancel button navigates back to the cart page
    When the user clicks the checkout button
    Then the user is on the checkout-step-two page
    When the user clicks the "Cancel" button
    Then the user should be navigated back to the cart page