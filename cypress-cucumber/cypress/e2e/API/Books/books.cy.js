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
    
    getBooks() {
        return cy.request('GET', baseUrl + 'books');
    }
    
    deleteBook(bookName) {
        cy.request('DELETE', baseUrl + 'books/' + bookName);
    }
    }

const books = new Books();
export default books;
