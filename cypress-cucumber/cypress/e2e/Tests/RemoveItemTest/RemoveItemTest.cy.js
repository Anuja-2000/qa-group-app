import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import Inventory from "../../Pages/inventoryPage/InventoryPage.cy";
import Login from "../../Pages/LoginPage/LoginPage.cy";

const inventory = new Inventory();

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

When("the user removes the {string} from the cart", (itemName) => {
  inventory.removeItemBeforeCart(itemName);
});

When("the user views the cart", () => {
  inventory.viewCart();
});

When("the user removes the {string} from the cart", (itemName) => {
  inventory.removeItemFromCart(itemName);
});

Then("the user should see the {string} in the cart", (itemName) => {
  inventory.verifyItemsInCart(itemName);
});

Then("the cart item count should be {int}", (expectedCount) => {
  inventory.verifyCartItemCount(expectedCount);
});

// Given(
//   "the user has added the {string} and {string} to the cart",
//   (item1, item2) => {
//     inventory.addItemToCart(item1);
//     inventory.addItemToCart(item2);
//     inventory.viewCart();
//     inventory.verifyItemsInCart([item1, item2]);
//     inventory.verifyCartItemCount(2);
//   }
// );
