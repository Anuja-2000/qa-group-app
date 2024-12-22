import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import Inventory from "../../Pages/inventoryPage/InventoryPage.cy";
import login from "../../Pages/LoginPage/LoginPage.cy";
const inventory = new Inventory();

Given('I am logged into the application', () => {
 login.enterURL();
 login.enterUserNamePassword('standard_user', 'secret_sauce');
 login.clickSubmitButton();
});

Given('I am on the products page', () => {
  inventory.visitProductsPage();
});

When('I add the {string} to the cart', (itemName) => {
  inventory.addItemToCart(itemName);
});

When('I remove the {string} from the cart', (itemName) => {
  inventory.removeItemFromCart(itemName);
});

When('I view the cart', () => {
  inventory.viewCart();
});

Then('I should see the {string} in the cart', (itemName) => {
  inventory.verifyItemsInCart(itemName);
});

Then('I should see the {string} and {string} in the cart', (item1,item2) => {
    const itemNames = [item1, item2];
    inventory.verifyItemsInCart(itemNames);
  });

Then('the cart item count should be {int}', (expectedCount) => {
  inventory.verifyCartItemCount(expectedCount);
});

Given('I have added the {string} and {string} to the cart', (item1,item2) => {
    inventory.addItemToCart(item1);
    inventory.addItemToCart(item2);
    inventory.viewCart();
    inventory.verifyItemsInCart([item1, item2]);
    inventory.verifyCartItemCount(2);
});
