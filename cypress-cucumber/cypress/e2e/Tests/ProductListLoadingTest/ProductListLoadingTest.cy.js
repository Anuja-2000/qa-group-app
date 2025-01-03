/// <reference types="cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Inventory from "../../Pages/InventoryPage/InventoryPage.cy"; // Adjust path as needed
import Login from "../../Pages/LoginPage/LoginPage.cy"; // Adjust path as needed

const inventory = new Inventory();

Given("the user is logged into the application with username {string} and password {string}", (username, password) => {
  Login.enterURL();
  Login.enterUserNamePassword(username, password);
  Login.clickSubmitButton();
});

When("User navigates to the product page", () => {
  inventory.visitProductsPage(); // Method to navigate to the product page
});

Then("Product list should be displayed", () => {
  cy.get(".inventory_item")
    .should("have.length.greaterThan", 0); // Ensures that there are products displayed
});

Then("Product list should load within 3 seconds", () => {
  cy.get(".inventory_item")
    .should("be.visible")
    .and("have.length.greaterThan", 0); // Ensures products load within 3 seconds
});

Then("Each product should have a valid name and price", () => {
  cy.get(".inventory_item").each(($el) => {
    cy.wrap($el)
      .find(".inventory_item_name")
      .should("not.be.empty");

    cy.wrap($el)
      .find(".inventory_item_price")
      .should("not.be.empty");
  });
});

And("Each product image should load correctly", () => {
  cy.get(".inventory_item_img img").each(($img) => {
    cy.wrap($img)
      .should("have.attr", "src")
      .and("not.equal", "/static/media/sl-404.168b1cce.jpg");
  });
});
