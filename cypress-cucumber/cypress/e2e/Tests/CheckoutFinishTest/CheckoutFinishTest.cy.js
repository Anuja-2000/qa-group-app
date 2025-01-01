import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Inventory from "../../Pages/InventoryPage/InventoryPage.cy";
import Login from "../../Pages/LoginPage/LoginPage.cy";
import OverviewPage from "../../Pages/OverviewPage/OverviewPage.cy";
import CompletePage from "../../Pages/CompletePage/CompletePage.cy";

const inventory = new Inventory();
const overview = new OverviewPage();
const completePage = new CompletePage();

// User login and navigation to the product page
Given("the user is logged into the application", () => {
  Login.enterURL();
  Login.enterUserNamePassword("standard_user", "secret_sauce");
  Login.clickSubmitButton();
});

Given("the user is on the products page", () => {
  inventory.visitProductsPage();
});

When("the user adds the {string} to the cart", (itemName) => {
  inventory.addItemToCart(itemName);
});

When("the user views the cart", () => {
  inventory.viewCart();
});

Then("the user should see the {string} in the cart", (itemName) => {
  inventory.verifyItemsInCart(itemName);
});

Then("the cart item count should be {int}", (expectedCount) => {
  inventory.verifyCartItemCount(expectedCount);
});

Given(
  "the user has added the {string} and {string} to the cart",
  (item1, item2) => {
    inventory.addItemToCart(item1);
    inventory.addItemToCart(item2);
    inventory.viewCart();
    inventory.verifyItemsInCart([item1, item2]);
    inventory.verifyCartItemCount(2);
  }
);

When("the user proceeds to checkout overview", () => {
  cy.contains("button", "Checkout").click();
  cy.get("#first-name").type("John");
  cy.get("#last-name").type("Doe");
  cy.get("#postal-code").type("12345");

  cy.get("#first-name").should("have.value", "John");
  cy.get("#last-name").should("have.value", "Doe");
  cy.get("#postal-code").should("have.value", "12345");

  cy.get('input[value="Continue"]')
    .should("be.visible")
    .and("not.be.disabled")
    .click();
});

When("the user clicks the finish button", () => {
  overview.finishCheckout();
});

Then("the user should be navigated to the Checkout Complete page", () => {
  cy.url().should("eq", "https://www.saucedemo.com/checkout-complete.html");
});

Then("the user should see the {string} message", (message) => {
  completePage.verifyHeaderText();
});

Then(
  "the user should see the confirmation text {string}",
  (confirmationText) => {
    completePage.verifyConfirmationText();
  }
);

Then("the user clicks the {string} button", (buttonName) => {
  completePage.clickBackHome();
});

Then("the user should be navigated back to the products page", () => {
  completePage.verifyRedirectToProductsPage();
});
