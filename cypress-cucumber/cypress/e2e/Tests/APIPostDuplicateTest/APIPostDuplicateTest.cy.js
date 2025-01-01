import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import Books from '../../API/Books/books.cy';
import login from "../../API/Login/login.cy";

let response;

Given('the user is authenticated as {string} with password {string}',() => {
    login.loginUser('admin','password').then((res) => {
        response = res;
    });

})

Given('the user sends a POST request to add the book', () => {
    let data = {id:2, title: "Duplicate Book", author: "Author A"};
    Books.addBook(data).then((res) => {
        expect(res.status).to.equal(201);
    })
});
When('the user sends a POST request a book with the same details already exists', () => {
    let data = { id:2, title: "Duplicate Book", author: "Author A"}
    Books.addBook(data).then((res) => {
        response = res;
    })

});

Then('the API should return a 208 status code', () => {
    expect(response.status).to.equal(208);
});
