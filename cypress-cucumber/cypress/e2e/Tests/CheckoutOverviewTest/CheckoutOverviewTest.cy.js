import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import Inventory from "../../Pages/inventoryPage/InventoryPage.cy";

const inventory = new Inventory();

Given('the user is logged in', () => {
    cy.login('standard_user', 'secret_sauce');
});

Given('the user goes to the cart page', () => {
    inventory.viewCart();
});

Given('the user cart is empty', () => {
    inventory.verifyCartEmpty();
});

Given('the user has the following items in the user cart', (dataTable) => {
    const items = dataTable.rows().map(row => row[0]);

    items.forEach(item => {
        inventory.addItemToCart(item);
    });
    inventory.viewCart();
    inventory.verifyItemsInCart(items);
    inventory.verifyCartItemCount(items.length);
});

When('the user proceeds to checkout overview', () => {
    cy.contains('button', 'Checkout').click();
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').type('12345');
    cy.get('input[value="Continue"]').click();
});

Then('the user should see the "Item total: ${float}" information', (expectedTotal) => {
    cy.get('.summary_subtotal_label').should('contain.text', `Item total: $${expectedTotal}`);
});

Then('the user should see the "Item total: $0" information', () => {
    cy.get('.summary_subtotal_label').should('contain.text', 'Item total: $0');
});

Then('the user should see the "Tax: ${float}" information', (expectedTax) => {
    cy.get('.summary_tax_label').should('contain.text', `Tax: $${expectedTax}`);
});

Then('the user should see the "Total: ${float}" information', (expectedTotal) => {
    cy.get('.summary_total_label').should('contain.text', `Total: $${expectedTotal}`);
});

Then('the user should see the "Payment Information: SauceCard #31337" information', () => {
    cy.get('.summary_value_label[data-test="payment-info-value"]')
        .should('contain.text', 'SauceCard #31337');
});

Then('the user should see the "Shipping Information: Free Pony Express Delivery!" information', () => {
    cy.get('.summary_value_label[data-test="shipping-info-value"]')
        .should('contain.text', 'Free Pony Express Delivery!');
});

Then('the user should see the item title {string} for item {int}', (itemTitle, itemIndex) => {
    cy.get('.cart_item')
        .eq(itemIndex - 1)
        .find('.inventory_item_name')
        .should('have.text', `${itemTitle}`);
});

Then('the user should see the item description for Item {int}', (itemIndex) => {
    cy.get('.cart_item')
        .eq(itemIndex - 1)
        .find('.inventory_item_desc')
        .should('not.be.empty');
});

Then('the user should see the item price {string} for Item {int}', (itemPrice, itemIndex) => {
    cy.get('.cart_item')
        .eq(itemIndex - 1)
        .find('.inventory_item_price')
        .should('have.text', `${itemPrice}`);
});

Then('the user should see the item quantity "{int}" for Item {int}', (itemQty, itemIndex) => {
    cy.get('.cart_item')
        .eq(itemIndex - 1)
        .find('.cart_quantity')
        .should('have.text', `${itemQty}`);
});