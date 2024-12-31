Feature: User wants to ensure the product list loads correctly

  Background: Navigate to the Website
    Given User navigate to the Website

  Scenario: Product list should load correctly
    When User navigates to the product page
    Then Product list should be displayed
    And Product list should load within 3 seconds

  Scenario: Product items should have a valid name and price
    When User navigates to the product page
    Then Each product should have a valid name and price
    And Each product image should load correctly


