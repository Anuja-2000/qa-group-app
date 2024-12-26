# cypress/integration/checkout_overview.feature

Feature: Checkout Overview Page

  Scenario: Checkout with no items
    Given the user is logged in
    And the user goes to the cart page
    And the user cart is empty
    When the user proceeds to checkout overview
    And the user should see the "Item total: $0" information
    And the user should see the "Tax: $0.00" information
    And the user should see the "Total: $0.00" information
    And the user should see the "Payment Information: SauceCard #31337" information
    And the user should see the "Shipping Information: Free Pony Express Delivery!" information

  Scenario: Checkout with 1 item
    Given the user is logged in
    And the user has the following items in the user cart
      |         item           |
      | Sauce Labs Backpack    |
    When the user proceeds to checkout overview
    And the user should see the "Item total: $29.99" information
    And the user should see the "Tax: $2.40" information
    And the user should see the "Total: $32.39" information
    And the user should see the "Payment Information: SauceCard #31337" information
    And the user should see the "Shipping Information: Free Pony Express Delivery!" information
    And the user should see the item title "Sauce Labs Backpack" for item 1
    And the user should see the item description for Item 1
    And the user should see the item price "$29.99" for Item 1
    And the user should see the item quantity "1" for Item 1

  Scenario: Checkout with 3 items
    Given the user is logged in
    And the user has the following items in the user cart
      |         item            |
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |
    When the user proceeds to checkout overview
    And the user should see the "Item total: $55.97" information
    And the user should see the "Tax: $4.48" information
    And the user should see the "Total: $60.45" information
    And the user should see the "Payment Information: SauceCard #31337" information
    And the user should see the "Shipping Information: Free Pony Express Delivery!" information
    And the user should see the item title "Sauce Labs Backpack" for item 1
    And the user should see the item description for Item 1
    And the user should see the item price "$29.99" for Item 1
    And the user should see the item quantity "1" for Item 1
    And the user should see the item title "Sauce Labs Bike Light" for item 2
    And the user should see the item description for Item 2
    And the user should see the item price "$9.99" for Item 2
    And the user should see the item quantity "1" for Item 2
    And the user should see the item title "Sauce Labs Bolt T-Shirt" for item 3
    And the user should see the item description for Item 3
    And the user should see the item price "$15.99" for Item 3
    And the user should see the item quantity "1" for Item 3
