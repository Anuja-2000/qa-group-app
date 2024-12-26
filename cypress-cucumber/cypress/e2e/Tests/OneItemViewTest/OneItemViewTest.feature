Feature: Verify product detail page components after selecting an item

  Scenario: User selects an item from the product list and verifies the page components
    Given the user is logged in as a "standard_user" with the password "secret_sauce"
    When the user selects a product from the list
    Then the user should see the hamburger menu
    And the user should see the page title
    And the user should see the cart icon
    And the user should see the "Back to Products" button
    And the user should see the product image
    And the user should see the product title
    And the user should see the product details
    And the user should see the product price
    And the user should see the "Add to Cart" button
    And the user should see the footer
