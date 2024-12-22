Feature: I want to login into the site

  Background: Navigate to the Website
    Given I navigate to the Website

  Scenario: Login as locked out user with valid data
    When I entered username "locked_out_user" and password "secret_sauce"
    And User click on sign in button
    Then Error message "Epic sadface: Sorry, this user has been locked out." is displayed.

  Scenario: Login as standard user with valid data
    When I entered username "standard_user" and password "secret_sauce"
    And User click on sign in button
    Then Validate the title after login