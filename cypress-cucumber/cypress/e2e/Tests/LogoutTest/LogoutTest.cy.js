import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import Inventory from "../../Pages/inventoryPage/InventoryPage.cy";
import login from "../../Pages/LoginPage/LoginPage.cy";
import SideMenuBar from "../../Pages/sideMenuBar/SideManuBar.cy";
const inventory = new Inventory();
const sideMenuBar = new SideMenuBar();

Given('I am logged into the application', () => {
    login.enterURL();
    login.enterUserNamePassword('standard_user', 'secret_sauce');
    login.clickSubmitButton();
});

Given('the user logs out using the side menu', () => {
   sideMenuBar.logout();
});

When('the user attempts to access the product page using a direct URL', () => {
    inventory.visitProductPageFailAttempt();
});

Then('the user should be redirected to the login page', () => {
    login.enterURL();
});

