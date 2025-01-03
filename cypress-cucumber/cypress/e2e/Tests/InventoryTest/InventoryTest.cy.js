import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Inventory from "../../Pages/InventoryPage/InventoryPage.cy";
import Login from "../../Pages/LoginPage/LoginPage.cy";

const inventory = new Inventory();

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

Then(
  "the user should see the {string} and {string} in the cart",
  (item1, item2) => {
    const itemNames = [item1, item2];
    inventory.verifyItemsInCart(itemNames);
  }
);

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
