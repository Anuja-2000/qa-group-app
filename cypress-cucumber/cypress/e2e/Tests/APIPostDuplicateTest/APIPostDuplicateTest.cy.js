import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import Books from '../../API/Books/books.cy';
import login from "../../API/Login/login.cy";

let response;
let bookData = {id:2, title: "Duplicate Book", author: "Author A"};
Given('the user log into system',() => {
    login.loginUser('user','password').then((res) => {
        response = res;
    });

})

Given('the user sends a POST request to add the book', () => {

    Books.addBook(bookData).then((res) => {
        expect(res.status).to.equal(201);
    })
});
When('the user sends a POST request a book with the same details already exists', () => {

    Books.addBook(bookData).then((res) => {
        response = res;
    })

});

Then('the API should return a 208 status code', () => {
    expect(response.status).to.equal(208);
});
