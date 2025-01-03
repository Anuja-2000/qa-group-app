import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import Inventory from "../../Pages/InventoryPage/InventoryPage.cy";
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

When("the user removes the {string} from the cart early", (itemName) => {
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

Then("the user should not see the {string} in the cart", (itemName) => {
  inventory.verifyCartEmpty();
});

And("the cart item count should be {string}", (expectedCount) => {
  inventory.verifyCartItemCount(expectedCount);
});


