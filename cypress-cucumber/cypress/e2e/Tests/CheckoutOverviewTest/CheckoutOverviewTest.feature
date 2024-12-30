# cypress/integration/checkout_overview.feature

Feature: Checkout Overview Page

  Scenario: Checkout with no items
    Given the user is logged in
    And the user goes to the cart page
    And the user cart is empty
    When the user proceeds to checkout overview
    Then the user should see the following information and shipping and payment method
      | Item total | Tax   | Total  |
      | $0         | $0.00 | $0.00  |

  Scenario: Checkout with 1 item
    Given the user is logged in
    And the user has the following items in the user cart
      |         item           |
      | Sauce Labs Backpack    |
    When the user proceeds to checkout overview
    Then the user should see the following information and shipping and payment method
      | Item total | Tax   | Total   |
      | $29.99     | $2.40 | $32.39  |
    And the user should see the following items:
      | itemIndex | itemTitle                | itemPrice | itemQty |
      | 1         | Sauce Labs Backpack      | $29.99    | 1       |

  Scenario: Checkout with 3 items
    Given the user is logged in
    And the user has the following items in the user cart
      |         item            |
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |
    When the user proceeds to checkout overview
    Then the user should see the following information and shipping and payment method
      | Item total | Tax  | Total   |
      | $55.97     | $4.48 | $60.45 |
    And the user should see the following items:
      | itemIndex | itemTitle                | itemPrice | itemQty |
      | 1         | Sauce Labs Backpack      | $29.99    | 1       |
      | 2         | Sauce Labs Bike Light    | $9.99     | 1       |
      | 3         | Sauce Labs Bolt T-Shirt  | $15.99    | 1       |
