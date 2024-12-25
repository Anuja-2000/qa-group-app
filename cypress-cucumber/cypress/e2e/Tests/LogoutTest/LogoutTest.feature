Feature: Access restricted pages after logout

  Background:
    Given I am logged into the application

  Scenario: User tries to access a restricted page after logging out
    Given the user logs out using the side menu
    When the user attempts to access the product page using a direct URL
    Then the user should be redirected to the login page
