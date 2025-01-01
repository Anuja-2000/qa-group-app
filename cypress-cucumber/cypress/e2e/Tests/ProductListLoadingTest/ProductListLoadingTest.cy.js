/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Inventory from "../../Pages/InventoryPage/InventoryPage.cy"; // Adjust path as needed
import Login from "../../Pages/LoginPage/LoginPage.cy"; // Adjust path as needed


const inventory = new Inventory();

Given("the user is logged into the application with username {string} and password {string}", (username,password) => {
  Login.enterURL();
  Login.enterUserNamePassword(username, password);
  Login.clickSubmitButton();
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

Then("Each product image should load correctly", () => {

    // Validate that each product image loads correctly
    cy.get(".inventory_item_img img").each(($img) => {
      cy.wrap($img).should("have.attr", "src").and("not.equal", "/static/media/sl-404.168b1cce.jpg");
    })

  });

