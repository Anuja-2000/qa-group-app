import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"

Given('the user is logged in as a {string} with the password {string}', (username, password) => {
    cy.login(username, password);
});

When('the user selects a product from the list', () => {
    cy.get('.inventory_item .inventory_item_name').first().click();
});


Then('the user should see the hamburger menu', () => {
    cy.get('.bm-burger-button').should('be.visible');
});

Then('the user should see the page title', () => {
    cy.get('.header_label').should('be.visible').and('contain.text', 'Swag Labs');
});

Then('the user should see the cart icon', () => {
    cy.get('.shopping_cart_link').should('be.visible');
});

Then('the user should see the "Back to Products" button', () => {
    cy.get('.inventory_details_back_button').should('be.visible').and('contain.text', 'Back to products');
});

Then('the user should see the product image', () => {
    cy.get('.inventory_details_img').should('be.visible');
});

Then('the user should see the product title', () => {
    cy.get('.inventory_details_name').should('be.visible');
});

Then('the user should see the product details', () => {
    cy.get('.inventory_details_desc').should('be.visible');
});

Then('the user should see the product price', () => {
    cy.get('.inventory_details_price').should('be.visible');
});

Then('the user should see the "Add to Cart" button', () => {
    cy.get('.btn_inventory').should('be.visible').and('contain.text', 'Add to cart');
});

Then('the user should see the footer', () => {
    cy.get('.footer').should('be.visible');
});
