Feature: View cart feature

Background:
    Given the user is logged into the application
    
Scenario: Verify that each item's details are correctly displayed in the page
    Given the user add items to cart
    When the user navigate to view cart page
    Then each item's details should be matched with added items

Scenario: Verify other components are displayed correctly on view cart page
    Given the user add items to cart
    When the user navigate to view cart page
    Then page components should be displayed correctly