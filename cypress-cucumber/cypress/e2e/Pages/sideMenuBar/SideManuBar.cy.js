const baseUrl = Cypress.config('baseUrl');

class SideMenuBar {
    logout(){
        cy.get('#react-burger-menu-btn').click(); // Replace with your side menu button selector
        cy.get('#logout_sidebar_link').should('be.visible').click(); // Replace with your logout button selector
        cy.url().should('include', baseUrl); // Ensure user is redirected to the login page
    }
}

export default SideMenuBar;