const baseUrl = Cypress.config('baseUrl');

class Cart {
    visitCartPage() {
        cy.url().should('eq', baseUrl+'cart.html');
    }

    // Scenario steps
    clickCheckout() {
        cy.get('#checkout').click(); // Replace with the checkout button selector
    }
}

export default Cart;