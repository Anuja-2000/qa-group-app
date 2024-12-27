const baseUrl = Cypress.config('baseUrlAPI');

class Books {

    visitBooksPage() {
        cy.url().should('eq',baseUrl+'books');
    }
    
    addBook(bookData) {
        return cy.request({
          method: 'POST',
          url: baseUrl+'/api/books',
          body: bookData,
        });
      }

    addOneBook(bookData,authToken) {
        return cy.request({
            method: 'POST',
            url: baseUrl+'/api/books',
            headers:{ Authorization: `Bearer ${authToken}` },
            body: bookData,
            failOnStatusCode: false,
        });
    }
    
    getBooks() {
        return cy.request('GET', baseUrl + '/api/books');
    }

    getBook(id, authHeader) {
       return cy.request({
            method: 'GET',
            url: baseUrl+`/api/books/${id}`,
        });
    }
    
    deleteBook(bookId) {
        cy.request('DELETE', baseUrl + '/api/books/' + bookId);
    }
    }

const books = new Books();
export default books;
