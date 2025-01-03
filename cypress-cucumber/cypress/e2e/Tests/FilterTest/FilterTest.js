import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import Inventory from "../../Pages/InventoryPage/InventoryPage.cy";
import login from "../../Pages/LoginPage/LoginPage.cy";
const inventory = new Inventory();

Given('I am logged into the application', () => {
    login.enterURL();
    login.enterUserNamePassword('standard_user', 'secret_sauce');
    login.clickSubmitButton();
});

Given('the user is on the items page', () => {
    inventory.visitProductsPage();
});

When('the user selects {string} from the dropdown', (sortOption) => {
    inventory.selectFilterOption(sortOption);
});

Then('the items should be sorted alphabetically by name in ascending order', () => {
    inventory.sortByName();
});

Then('the items should be sorted by price in ascending order', () => {
    inventory.sortByPrice();
});