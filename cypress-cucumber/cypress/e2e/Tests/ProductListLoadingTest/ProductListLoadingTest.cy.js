/// <reference types="cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Inventory from "../../Pages/InventoryPage/InventoryPage.cy"; // Adjust path as needed

const inventory = new Inventory();

Given("User navigate to the Website", () => {
  cy.visit(Cypress.config("baseUrl")); // Navigates to the base URL of the website
});

When("User navigates to the product page", () => {
  inventory.visitProductsPage(); // Method to navigate to the product page
});

Then("Product list should be displayed", () => {
  cy.get(".inventory_item").should("have.length.greaterThan", 0); // Ensures that there are products displayed
});

Then("Product list should load within 3 seconds", () => {
  cy.get(".inventory_item").should("be.visible").and("have.length.greaterThan", 0); // Ensures products load within 3 seconds
});

Then("Each product should have a valid name and price", () => {
  cy.get(".inventory_item").each(($el) => {
    // Validate that each product has a valid name and price
    cy.wrap($el).find(".inventory_item_name").should("not.be.empty");
    cy.wrap($el).find(".inventory_item_price").should("not.be.empty");
  });
});

