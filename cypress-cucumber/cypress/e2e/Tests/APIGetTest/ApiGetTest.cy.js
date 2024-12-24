import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import login from "../../API/Login/login.cy";
import Books from '../../API/Books/books.cy';

let response;
let books = [
    {
        id: 1,
        title: "Sample Book",
        author: "Anuja",
    },
];

Given('user send a GET request to get all books',() => {
  login.loginUser('user','password');
  Books.getBooks().then((res) => {
    response = res;
  });
})


Then('the response status should be {int}', (statusCode) => {
  expect(response.status).to.eq(statusCode);
});

And('the response should contain a list of books', () => {
    expect(response.body[0]).to.deep.equal(books[0]);
});
