import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Inventory from "../../Pages/InventoryPage/InventoryPage.cy";
import CheckoutFormPage from "../../Pages/CheckoutFormPage/CheckoutFormPage.cy";

const inventory = new Inventory();
const checkoutPage = new CheckoutFormPage();

Given("the user is logged into the application", () => {
  cy.login("standard_user", "secret_sauce");
});

Given("the user is on the products page", () => {
  inventory.visitProductsPage();
});

Given("the user has added the {string} to the cart", (item) => {
  inventory.addItemToCart(item);
});

When("the user adds the {string} and {string} to the cart", (item1, item2) => {
  inventory.addItemToCart(item1);
  inventory.addItemToCart(item2);
});

Then("the user views the cart", () => {
  inventory.viewCart();
});

Then(
  "the user should see the {string} and {string} in the cart",
  (item1, item2) => {
    inventory.verifyItemsInCart([item1, item2]);
  }
);

Then("the cart item count should be 2", () => {
  inventory.verifyCartItemCount(2);
});

When("the user clicks the checkout button", () => {
  cy.get(".shopping_cart_link").click();
  cy.url().should("include", "cart.html");
  checkoutPage.clickCheckoutButton();
});

Then(
  'the user should be navigated to the "Checkout: Your Information" page',
  () => {
    cy.url().should("include", "checkout-step-one.html");
    checkoutPage.verifyTitle("Checkout: Your Information");
  }
);

When("the user fills out the checkout information form with valid data", () => {
  checkoutPage.fillCheckoutForm("John", "Doe", "12345");
  checkoutPage.submitForm();
});

Then("the user should proceed to the next step of the checkout process", () => {
  cy.url().should("include", "checkout-step-two.html");
});

When("the user enters an invalid postal code and submits", () => {
  checkoutPage.fillCheckoutForm("John", "Doe", "abcde");
  checkoutPage.submitForm();
});

Then(
  "the user should not see any error message for invalid postal code",
  () => {
    checkoutPage.verifyInvalidPostalCodeError();
  }
);

When(
  "the user leaves the checkout information fields empty and submits",
  () => {
    checkoutPage.fillCheckoutForm("", "", "");
    checkoutPage.submitForm();
  }
);

Then("the user should see an error message for empty fields", () => {
  checkoutPage.verifyFormValidationError("Error: First Name is required");
});

Then("the user should see an error message for invalid postal code", () => {
  checkoutPage.verifyFormValidationError("Error: Postal Code is invalid");
});

When("the user clicks the cancel button", () => {
  checkoutPage.clickCancelButton();
});

Then(
  "the user should be redirected to the previous page when they click cancel",
  () => {
    cy.url().should("eq", `${Cypress.config("baseUrl")}cart.html`);
  }
);
