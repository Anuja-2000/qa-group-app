import books from "../../API/Books/books.cy";
import login from "../../API/Login/login.cy";
const baseUrl = Cypress.config('baseUrlAPI');
let authHeader = {};
let bookId = 100;
let titleNUmber = 0;
let response = {};

// Scenario 1: Successfully delete a book as admin
Given('a book exists with ID', () => {
    titleNUmber = Math.floor(Math.random() * 1000);
    login.loginUser('user', 'password');
    books.addBook({ id: 1, title: "Sample Book " + titleNUmber, author: "Sample Author" }).then((response) => {
        console.log(response);
        bookId = response.body.id;
        expect(response.status).to.be.oneOf([201, 208]);
    });
});

When('the admin sends a DELETE request', () => {

    login.loginUser('admin', 'password');
    authHeader = login.createAuthHeader('admin', 'password');
    books.deleteBook(bookId,authHeader).then((res) => {
        response = res;        
    });
    });

Then('the response status code should be {int}', (statusCode) => {
    expect(response.status).to.be.equal(statusCode);
});

// Scenario 2: Attempt to delete a book as user (Authorization)

Given('the user is authenticated as {string} with password {string}', (username, password) => {
    authHeader = login.createAuthHeader(username, password);
});

When('the user sends a DELETE request', () => {
    titleNUmber = Math.floor(Math.random() * 1000);
    login.loginUser('user', 'password');
    books.addBook({ id: 1, title: "Sample Book " + titleNUmber, author: "Sample Author" }).then((response) => {
        console.log(response);
        bookId = response.body.id;
        expect(response.status).to.be.equal(201);
    });  
    books.deleteBook(bookId,authHeader).then((res) => {
        response = res;
    });
});


Then('the response body should contain {string}', (message) => {
    expect(response.body).to.be.equal(message);
});

// Scenario 3: Attempt to delete a non-existent book
Given('the user is authenticated as "admin" with password "password"', () => {
    authHeader = {
        Authorization: `Basic ${btoa('admin' + ':' + 'password')}`,
        'Content-Type': 'application/json',
    };
});

When('the user sends a DELETE request to delete a not existing book', () => {
    login.loginUser('admin', 'password');
    books.deleteBook(9999,authHeader).then((res) => {
        response = res;
    });
});

