import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
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

When('the user clicks on "Back to Products"', () => {
    cy.get('.shopping_cart_link').click();  // Assuming this button redirects to the product page
});

Then('the user should be redirected to the product page', () => {
    cy.url().should('include', '/cart.html'); 
});

Then('the user should see a list of available products', () => {
    cy.get('.inventory_list').should('be.visible');  // Verify that the product list is visible
});

Then('the user should see the following items in the product list', (dataTable) => {
    const items = dataTable.rows().map(row => row[0]);

    items.forEach(item => {
        cy.contains(item).should('be.visible');  // Verify that each item is present in the list
    });
});
