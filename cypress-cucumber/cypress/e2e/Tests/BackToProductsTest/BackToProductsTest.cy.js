import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Inventory from "../../Pages/InventoryPage/InventoryPage.cy";
import OverviewPage from "../../Pages/OverviewPage/OverviewPage.cy";

const inventory = new Inventory();
const overviewPage = new OverviewPage();

Given('the user is logged in', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('input[name="user-name"]').type('standard_user');
    cy.get('input[name="password"]').type('secret_sauce');
    cy.get('input[type="submit"]').click();
    cy.url().should('include', '/inventory.html');
});

Given('the user has the following items in the user cart', (dataTable) => {
    const items = dataTable.rows().map(row => row[0]);
    items.forEach(item => {
        cy.contains('.inventory_item', item)
          .find('button[data-test^="add-to-cart"]')
          .click();
    });
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', items.length);
});

When('the user proceeds to checkout overview', () => {
    cy.contains('button', 'Checkout').click();
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').type('12345');
    cy.get('input[value="Continue"]').click();
    cy.url().should('include', '/checkout-step-two.html');
});

When('the user clicks on "Cancel"', () => {
    overviewPage.clickCancel(); // Use the existing method to click the "Cancel" button
});

Then('the user should be redirected to the product page', () => {
    overviewPage.verifyProductPageRedirection();
});

Then('the user should see a list of available products', () => {
    overviewPage.verifyProductsVisible();
});
