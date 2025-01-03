import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import login from "../../API/Login/login.cy";
import Books from "../../API/Books/books.cy";

let bookId;
let response;

Given('the user logs in with username {string} with password {string}', (username, password) => {
    login.loginUser(username, password).then((res) => {
        response= res;
    })
});

And('enter book details with valid id',() =>{
   Books.addBook({id:1, title: "Newton Laws", author: "Author B"});
});

Given('a valid book ID exists {int}', (id) => {
    bookId = id;
});

When('the user fetches the book details with the ID', () => {
    Books.getBook(bookId).then((res) => {
        response = res;
    });
});

Then('the API should return a 200 status code', () => {
    expect(response.status).to.equal(200);
});

Then('the response should contain the correct book details', () => {
    expect(response.body).to.have.property('id', bookId); // Check the book ID matches
    expect(response.body).to.have.property('title').and.to.be.a('string');
    expect(response.body).to.have.property('author').and.to.be.a('string');
});
