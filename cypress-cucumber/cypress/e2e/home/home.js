import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I visit the {string} page', (page) => {
  cy.visit(page);
});

Then('I should see an {string} tag containing {string}', (tag, text) => {
  cy.get(tag).contains(text).should('be.visible');
});