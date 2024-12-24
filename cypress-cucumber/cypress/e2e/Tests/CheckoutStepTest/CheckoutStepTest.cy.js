import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import CheckoutStep from "../../Pages/CheckoutStepPage/CheckoutStepPage.cy";
import Cart from "../../Pages/CartPage/CartPage.cy";
import login from "../../Pages/LoginPage/LoginPage.cy";
import Inventory from "../../Pages/inventoryPage/InventoryPage.cy";
const checkoutStep = new CheckoutStep();
const inventory = new Inventory();
const cart= new Cart();

Given('the user logged into the application', () => {
    login.enterURL();
    login.enterUserNamePassword('standard_user', 'secret_sauce');
    login.clickSubmitButton();
});

Given('the user is on the inventory page', () => {
    inventory.visitProductsPage();
});

When('the user clicks the cart icon', () => {
    inventory.viewCart();
});

Then('the user is on the cart page', () => {
    cart.visitCartPage();
});

When('the user clicks the checkout button', () => {
    cart.clickCheckout();
});

Then('the user is on the checkout-step-two page', () => {
    checkoutStep.visitCheckoutStepOnePage();
});

And('the title should be {string}', (title) => {
    checkoutStep.getTitle(title);
});

When(
    'the user enters {string} as the first name, {string} as the last name, and {string} as the postal code',
    (firstName, lastName, postalCode) => {
       checkoutStep.fillInformation(firstName, lastName, postalCode);
    }
);

When('the user clicks the "Continue" button', () => {
    checkoutStep.clickContinue();
});

Then('the title should change to {string}', (title) => {
    checkoutStep.getTitle(title);
});

Then('the user should be on the checkout-step-one page', () => {
    checkoutStep.visitCheckoutStepTwoPage();
});

When('the user clicks the "Cancel" button', () => {
   checkoutStep.clickCancel();
});

Then('the user should be navigated back to the cart page', () => {
    cart.visitCartPage();
});