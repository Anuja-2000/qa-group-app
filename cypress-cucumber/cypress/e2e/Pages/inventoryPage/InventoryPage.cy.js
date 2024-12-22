const baseUrl = Cypress.config('baseUrl');

class Inventory {
    visitProductsPage() {
      cy.url().should('eq',baseUrl+'inventory.html');
    }
  
    addItemToCart(itemName) {
      cy.contains('.inventory_item', itemName)
        .find('button[data-test^="add-to-cart"]')
        .click();
    }
  
    removeItemFromCart(itemName) {
      cy.contains('.cart_item', itemName)
        .find('button[data-test^="remove"]')
        .click();
    }
  
    viewCart() {
      cy.get('.shopping_cart_link').click();
    }
  
    verifyItemsInCart(itemNames) {

        const items = Array.isArray(itemNames) ? itemNames : [itemNames];
      
        cy.get('.cart_item').should('have.length', items.length);
      
        items.forEach((itemName) => {
          cy.get('.cart_item').should('contain', itemName);
        });
      }
      
      
  
    verifyCartItemCount(expectedCount) {
      cy.get('.shopping_cart_badge').should('have.text', String(expectedCount));
    }
  }
  
  export default Inventory;  