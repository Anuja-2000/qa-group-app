import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import login from "../../API/Login/login.cy";
import Books from "../../API/Books/books.cy";

let response;
let books = [
  {
    id: 1,
    title: "Sample Book",
    author: "Anuja",
  },
  {
    id: 2,
    title: null,
    author: "Anuja",
  },
];
let id = 0;
Given("the id is {int}", (id) => {
  id = id;
});

When("user send a GET request to get one book", () => {
  login.loginUser("admin", "password");
  Books.getBook(id).then((res) => {
    response = res;
  });
});

Given("user send a GET request to get all books", () => {
  login.loginUser("user", "password");
  Books.getBooks().then((res) => {
    response = res;
  });
});

Given(
  "user send a GET request to get books when no books are available",
  () => {
    login.loginUser("user", "password");
    Books.getBooks().then((res) => {
      response = res;
    });
  }
);

Then("the GET response status should be {int}", (statusCode) => {
  expect(response.status).to.eq(statusCode);
});

Then("the response should contain a list of books", () => {
  expect(response.body).to.deep.equal(books);
});

Then("the response should contain a message mentioning {string}", (message) => {
  expect(response.body).to.deep.equal(message);
});

Then("the response body should indicate no books found", () => {
  expect(response.body.message).to.eq(undefined);
});
