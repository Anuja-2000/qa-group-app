import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import Inventory from "../../Pages/inventoryPage/InventoryPage.cy";
import Login from "../../Pages/LoginPage/LoginPage.cy";
import CheckoutPage from "../../Pages/CheckoutInfoFormPage/CheckoutInfoFormPage.cy";

const inventory = new Inventory();
const checkoutPage = new CheckoutPage();

// User login and navigation to the product page
Given("the user is logged into the application", () => {
  Login.enterURL();
  Login.enterUserNamePassword("standard_user", "secret_sauce");
  Login.clickSubmitButton();
});

Given("the user is on the products page", () => {
  inventory.visitProductsPage();
});

// Adding items to the cart
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

// Adding multiple items to the cart
Given("the user has added the {string} and {string} to the cart", (item1, item2) => {
  inventory.addItemToCart(item1);
  inventory.addItemToCart(item2);
  inventory.viewCart();
  inventory.verifyItemsInCart([item1, item2]);
  inventory.verifyCartItemCount(2);
});

// Navigating to the checkout page
When("the user clicks the checkout button", () => {
  inventory.clickCheckoutButton();
});

Then("the user should be navigated to the Checkout: Your Information page", () => {
  checkoutPage.verifyTitle();
});

// Filling out the checkout form
When("the user fills out the checkout information form with valid data", () => {
  checkoutPage.fillCheckoutForm("John", "Doe", "12345");
  checkoutPage.submitForm();
});

// Handling invalid form submissions
When("the user leaves the checkout information fields empty and submits", () => {
  checkoutPage.fillCheckoutForm("", "", "");
  checkoutPage.submitForm();
});

When("the user enters an invalid postal code and submits", () => {
  checkoutPage.fillCheckoutForm("John", "Doe", "abcde");
  checkoutPage.submitForm();
});

// Cancel checkout
When("the user clicks the cancel button", () => {
  checkoutPage.clickCancelButton();
});

// Validations for form errors and navigation
Then("the user should see an error message for empty fields", () => {
  checkoutPage.verifyFormValidationError("Error: First Name is required");
});

Then("the user should see an error message for invalid postal code", () => {
  checkoutPage.verifyFormValidationError("Error: Postal Code is invalid");
});

Then("the user should be redirected to the previous page when they click cancel", () => {
  cy.url().should("eq", `${Cypress.config("baseUrl")}inventory.html`);
});

