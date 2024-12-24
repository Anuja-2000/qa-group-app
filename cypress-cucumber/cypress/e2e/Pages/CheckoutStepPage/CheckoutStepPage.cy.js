const baseUrl = Cypress.config('baseUrl');

class CheckoutStepOne {
    visitCheckoutStepOnePage() {
        cy.url().should('eq', baseUrl+'checkout-step-one.html');
    }
    visitCheckoutStepTwoPage() {
        cy.url().should('eq', baseUrl+'checkout-step-two.html');
    }

    fillInformation(firstName, lastName, postalCode){
        cy.get('#first-name').type(firstName); // Replace with the selector for the first name input
        cy.get('#last-name').type(lastName); // Replace with the selector for the last name input
        cy.get('#postal-code').type(postalCode); // Replace with the selector for the postal code input
    }

    clickContinue(){
        cy.get('#continue').click(); // Replace with the selector for the Continue button
    }

    clickCancel(){
        cy.get('#cancel').click(); // Replace with the cancel button selector
    }

    getTitle(title){
        cy.get('.title').should('contain.text', title); // Replace 'h1' with the actual selector for the title
    }

}

export default CheckoutStepOne;