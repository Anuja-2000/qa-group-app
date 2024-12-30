class OverviewPage {

    verifyItemTotal(expectedTotal) {
        cy.get('.summary_subtotal_label')
            .should('contain.text', `Item total: ${expectedTotal}`);
    }

    verifyTax(expectedTax) {
        cy.get('.summary_tax_label')
            .should('contain.text', `Tax: ${expectedTax}`);
    }

    verifyTotal(expectedTotal) {
        cy.get('.summary_total_label')
            .should('contain.text', `Total: ${expectedTotal}`);
    }

    verifyPaymentInformation(expectedPaymentInfo = 'SauceCard #31337') {
        cy.get('.summary_value_label[data-test="payment-info-value"]')
            .should('contain.text', expectedPaymentInfo);
    }

    verifyShippingInformation(expectedShippingInfo = 'Free Pony Express Delivery!') {
        cy.get('.summary_value_label[data-test="shipping-info-value"]')
            .should('contain.text', expectedShippingInfo);
    }

    verifyItemTitle(itemTitle, itemIndex) {
        cy.get('.cart_item')
            .eq(itemIndex - 1)
            .find('.inventory_item_name')
            .should('have.text', itemTitle);
    }

    verifyItemDescriptionIsNotEmpty(itemIndex) {
        cy.get('.cart_item')
            .eq(itemIndex - 1)
            .find('.inventory_item_desc')
            .should('not.be.empty');
    }

    verifyItemPrice(itemPrice, itemIndex) {
        cy.get('.cart_item')
            .eq(itemIndex - 1)
            .find('.inventory_item_price')
            .should('have.text', itemPrice);
    }

    verifyItemQuantity(itemQty, itemIndex) {
        cy.get('.cart_item')
            .eq(itemIndex - 1)
            .find('.cart_quantity')
            .should('have.text', String(itemQty));
    }

    verifyItem({ itemTitle, itemPrice, itemQty }, itemIndex) {
        this.verifyItemTitle(itemTitle, itemIndex);
        this.verifyItemDescriptionIsNotEmpty(itemIndex);
        this.verifyItemPrice(itemPrice, itemIndex);
        this.verifyItemQuantity(itemQty, itemIndex);
    }

    finishCheckout() {
        cy.get('button[data-test="finish"]').click();
    }

    cancelCheckout() {
        cy.get('button[data-test="cancel"]').click();
    }

    clickCancel() {
        cy.log('Clicking "Cancel" button to navigate back to the product page...');
        cy.get('button[data-test="cancel"]').click(); // Selector for Cancel button
    }

    verifyProductPageRedirection() {
        cy.log('Verifying product page redirection...');
        cy.url().should('include', '/inventory.html');
    }

    verifyProductsVisible() {
        cy.log('Verifying product list is visible...');
        cy.get('.inventory_list').should('be.visible');
    }
}

export default OverviewPage;
