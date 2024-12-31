Feature: User wants to ensure the product list loads correctly

  Background:
    Given the user is logged into the application with username "standard_user" and password "secret_sauce"

  Scenario: Product list should load correctly
    When User navigates to the product page
    Then Product list should be displayed
    And Product list should load within 3 seconds

  Scenario: Product items should have a valid name, price and image
    When User navigates to the product page
    Then Each product should have a valid name and price
    And Each product image should load correctly


