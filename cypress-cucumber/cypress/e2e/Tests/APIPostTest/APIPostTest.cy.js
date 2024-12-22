import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import login from "../../API/Login/login.cy";
import Books from '../../API/Books/books.cy';

let response;

Given('I am logged into the service',() => {
  login.loginUser('user','password').then((res) => {
    response = res;
  });

})

Given('I send a POST request to add the following book:', (dataTable) => {
  const books = dataTable.hashes().map((row) => ({
    id: row.id ? parseInt(row.id) : undefined, // Convert id to an integer if provided
    title: row.title.replace(/"/g, ''), // Remove quotes from the title
    author: row.author.replace(/"/g, ''), // Remove quotes from the author
  }));
  
  Books.addBook({
    id: books[0].id ? parseInt(books[0].id) : undefined, 
    title: books[0].title, 
    author: books[0].author,
  }).then((res) => {
    response = res;
  });
});

Then('the response status should be {int}', (statusCode) => {
  expect(response.status).to.eq(statusCode);
});

And('the response should contain the book data with title {string} and author {string}', (expectedTitle, expectedAuthor) => {
  expect(response.body).to.have.property('title', expectedTitle);
  expect(response.body).to.have.property('author', expectedAuthor);
});
