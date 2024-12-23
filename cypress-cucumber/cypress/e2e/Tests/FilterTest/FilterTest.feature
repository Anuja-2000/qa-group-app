Feature: select parallel tests plan
  As a user
  I want to select the parallel tests plan

  Background:
    Given I am logged into the application

  Scenario: slect the parallel tests plan
    Given I am on the pricing page
    When I select the "12 Parallel Tests" from drop down
    And I view the cart
    Then I should see the "Sauce Labs Backpack" in the cart
    And the cart item count should be 1
