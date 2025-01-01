import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
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

Then('the user should see the following information and shipping and payment method', (dataTable) => {
    const [totals] = dataTable.hashes();

    overviewPage.verifyItemTotal(totals['Item total']);
    overviewPage.verifyTax(totals['Tax']);
    overviewPage.verifyTotal(totals['Total']);
    overviewPage.verifyShippingInformation();
    overviewPage.verifyPaymentInformation();
});

Then('the user should see the item {string} with description, price {string}, and quantity "{int}" for item {int}', (itemTitle, itemPrice, itemQty, itemIndex) => {
    overviewPage.verifyItemTitle(itemTitle, itemIndex);
    overviewPage.verifyItemDescriptionIsNotEmpty(itemIndex);
    overviewPage.verifyItemPrice(itemPrice, itemIndex);
    overviewPage.verifyItemQuantity(itemQty, itemIndex);
});

Then('the user should see the following items:', (dataTable) => {
    const items = dataTable.hashes();

    items.forEach((item) => {
        const itemIndex = parseInt(item.itemIndex);
        const cartItem = {
            itemTitle: item.itemTitle,
            itemPrice: item.itemPrice,
            itemQty: parseInt(item.itemQty),
        };
        overviewPage.verifyItem(cartItem, itemIndex);
    });
});
