import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";
import Inventory from "../../Pages/inventoryPage/InventoryPage.cy";
import OverviewPage from "../../Pages/OverviewPage/OverviewPage.cy";

const inventory = new Inventory();
const overviewPage = new OverviewPage();

Given('the user is logged in', () => {
    cy.login('standard_user', 'secret_sauce');
});

Given('the user goes to the cart page', () => {
    inventory.viewCart();
});

Given('the user cart is empty', () => {
    inventory.verifyCartEmpty();
});

Given('the user has the following items in the user cart', (dataTable) => {
    const items = dataTable.rows().map(row => row[0]);

    items.forEach(item => {
        inventory.addItemToCart(item);
    });
    inventory.viewCart();
    inventory.verifyItemsInCart(items);
    inventory.verifyCartItemCount(items.length);
});

When('the user proceeds to checkout overview', () => {
    cy.contains('button', 'Checkout').click();
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').type('12345');
    cy.get('input[value="Continue"]').click();    
});

Then('the user should see the "Item total: ${float}" information', (expectedTotal) => {
    overviewPage.verifyItemTotal(expectedTotal);
});

Then('the user should see the "Item total: $0" information', () => {
    overviewPage.verifyItemTotal(0);
});

Then('the user should see the "Tax: ${float}" information', (expectedTax) => {
    overviewPage.verifyTax(expectedTax);
});

Then('the user should see the "Total: ${float}" information', (expectedTotal) => {
    overviewPage.verifyTotal(expectedTotal);
});

Then('the user should see the "Payment Information: SauceCard #31337" information', () => {
    overviewPage.verifyPaymentInformation();
});

Then('the user should see the "Shipping Information: Free Pony Express Delivery!" information', () => {
    overviewPage.verifyShippingInformation();
});

Then('the user should see the item title {string} for item {int}', (itemTitle, itemIndex) => {
    overviewPage.verifyItemTitle(itemTitle, itemIndex);
});

Then('the user should see the item description for Item {int}', (itemIndex) => {
    overviewPage.verifyItemDescriptionIsNotEmpty(itemIndex);
});

Then('the user should see the item price {string} for Item {int}', (itemPrice, itemIndex) => {
    overviewPage.verifyItemPrice(itemPrice, itemIndex);
});

Then('the user should see the item quantity "{int}" for Item {int}', (itemQty, itemIndex) => {
    overviewPage.verifyItemQuantity(itemQty, itemIndex);
});