Feature: Sort Items in a Dropdown
  As a user
  I want to filter the items in the inventory based on the options given

  Background:
    Given I am logged into the application

  Scenario: Sort items by name A-Z
    Given the user is on the items page
    When the user selects "Name (A to Z)" from the dropdown
    Then the items should be sorted alphabetically by name in ascending order

  Scenario: Sort items by price low to high
    Given the user is on the items page
    When the user selects "Price (low to high)" from the dropdown
    Then the items should be sorted by price in ascending order
