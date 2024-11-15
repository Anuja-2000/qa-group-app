Feature: Home Page

  Scenario: Validate Home Page
    Given I visit the "/home" page
    Then I should see an "h1" tag containing "Hello, Home page!"