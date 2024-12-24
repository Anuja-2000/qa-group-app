const baseUrl = Cypress.config('baseUrl');
class LoginPage {
  enterURL() {
   cy.visit(baseUrl);
 }
  enterUserNamePassword(username, password) {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
   return this;
 }

 enterLockedUserNamePassword(username, password) {
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
 return this;
}

clickSubmitButton() {
   cy.get('[type="submit"]').eq(0).click();
   return this;
}

verifyPageTitle() {
   return cy.title().should("eq", "Swag Labs");
}

verifyLockedUserErrorMessage(errorMessage) {
  cy.get('[data-test="error"]').should("have.text", errorMessage);
  return this;
}
}
const login = new LoginPage();
export default login;