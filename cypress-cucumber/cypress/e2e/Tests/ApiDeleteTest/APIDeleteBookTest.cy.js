import books from "../../API/Books/books.cy";
const baseUrl = Cypress.config('baseUrlAPI');
let authHeader = {};

Given('the user is authenticated as {string} with password {string}', (username, password) => {
    authHeader = {
        Authorization: `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json',
    };
});

Given('the user is not authenticated', () => {
    authHeader = {};  // Clear the authHeader when not authenticated
});

Given('a book exists with ID {int}', (id) => {
    cy.request({
        method: 'POST',
        url: `${baseUrl}/api/books`,
        headers: authHeader,
        body: { id, title: "Sample Book", author: "Sample Author" },
    })
    .its('status')
    .should('be.oneOf', [201, 208]);
});

When('the user sends a DELETE request to {string}', (path) => {
    cy.request({
        method: 'DELETE',
        url: `${baseUrl}${path}`,
        headers: authHeader,
        failOnStatusCode: false,
    }).as('response');
});

Then('the response status code should be {int}', (statusCode) => {
    cy.get('@response').its('status').should('eq', statusCode);
});

Then('the response body should contain {string}', (message) => {
    cy.get('@response').its('body').should('include', message);
});

// Scenario 1: Successfully delete a book as admin
Given('a book exists with ID 1', () => {
    cy.request({
        method: 'POST',
        url: `${baseUrl}/api/books`,
        headers: authHeader,
        body: { id: 1, title: "Sample Book", author: "Sample Author" },
    })
    .its('status')
    .should('be.oneOf', [201, 208]);
});

When('the admin sends a DELETE request to "/api/books/1"', () => {
    books.addBook({ id: 1, title: "Sample Book", author: "Sample Author" });
    books.deleteBook(1);
    /*cy.request({
        method: 'DELETE',
        url: `${baseUrl}/api/books/1`,
        headers: authHeader,
    }).as('response');*/
});

Then('the response status code should be 200', () => {
    cy.get('@response').its('status').should('eq', 200);
});

// Scenario 2: Attempt to delete a book as user (Authorization)
Given('the user is authenticated as "user" with password "password"', () => {
    authHeader = {
        Authorization: `Basic ${btoa('user' + ':' + 'password')}`,
        'Content-Type': 'application/json',
    };
});

When('the user sends a DELETE request to "/api/books/1"', () => {
    cy.request({
        method: 'DELETE',
        url: `${baseUrl}/api/books/1`,
        headers: authHeader,
        failOnStatusCode: false,
    }).as('response');
});

Then('the response status code should be 403', () => {
    cy.get('@response').its('status').should('eq', 403);
});

Then('the response body should contain "User is not permitted"', () => {
    cy.get('@response').its('body').should('include', "User is not permitted");
});

// Scenario 3: Attempt to delete a non-existent book
Given('the user is authenticated as "admin" with password "password"', () => {
    authHeader = {
        Authorization: `Basic ${btoa('admin' + ':' + 'password')}`,
        'Content-Type': 'application/json',
    };
});

When('the user sends a DELETE request to "/api/books/9999"', () => {
    cy.request({
        method: 'DELETE',
        url: `${baseUrl}/api/books/9999`,
        headers: authHeader,
        failOnStatusCode: false,
    }).as('response');
});

Then('the response status code should be 404', () => {
    cy.get('@response').its('status').should('eq', 404);
});

Then('the response body should contain "Book not found"', () => {
    cy.get('@response').its('body').should('include', "Book not found");
});
