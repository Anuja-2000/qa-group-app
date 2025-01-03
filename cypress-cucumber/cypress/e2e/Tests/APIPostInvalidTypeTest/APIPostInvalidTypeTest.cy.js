import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import Books from '../../API/Books/books.cy';
import Login from "../../API/Login/login.cy";

let response;
let data;

Given('the user login as {string} with password {string}', (username, password) => {
    Login.loginUser(username, password).then((res) => {
        response = res;
    })
});

Given('the user provides invalid data types for the book details', () => {
    data = {
        id: 12,
        title:"true",
        author: false,
    };
});

When('the user sends a POST request to add the book with invalid data', () => {
    Books.addBook(data).then((res) => {
        response = res;
        console.log(data);
    })

});

Then('the API should return a 400 status code', () => {
    expect(response.status).to.equal(400);
});

