import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import login from "../../API/Login/login.cy";
import Books from "../../API/Books/books.cy";

let deleteResponse;
let getResponse;

Given('user sends a DELETE request to remove all books', () => {
  // Log in the user
  login.loginUser('user', 'password');

  // Send the DELETE request to remove all books
  Books.deleteAllBooks().then((res) => {
    deleteResponse = res;
  });
});

Then('the response status should be {int}', (statusCode) => {
  expect(deleteResponse.status).to.eq(statusCode);
});

And('the response message should confirm all books were deleted', () => {
  expect(deleteResponse.body.message).to.eq("All books deleted successfully");
});

And('the response should contain an empty list of books when fetched', () => {
  // Fetch all books to verify deletion
  Books.getBooks().then((res) => {
    getResponse = res;
    expect(getResponse.status).to.eq(200);
    expect(getResponse.body).to.be.an("array").that.is.empty;
  });
});
