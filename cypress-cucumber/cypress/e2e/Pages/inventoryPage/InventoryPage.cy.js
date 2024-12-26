const baseUrl = Cypress.config("baseUrl");

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

  selectFilterOption(sortOption) {
    cy.get(".product_sort_container") // Replace '#sortDropdown' with the actual dropdown selector
      .select(sortOption); // Select the option by visible text
  }

  sortByName() {
    cy.get(".inventory_item_name ") // Replace '.item-name' with the selector for item names
      .then(($items) => {
        const names = $items.map((_, el) => Cypress.$(el).text()).get();
        const sortedNames = [...names].sort();
        expect(names).to.deep.equal(sortedNames);
      });
  }

  sortByPrice() {
    cy.get(".inventory_item_price") // Replace '.item-price' with the selector for item prices
      .then(($prices) => {
        const prices = $prices
          .map((_, el) => parseFloat(Cypress.$(el).text()))
          .get();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sortedPrices);
      });
  }
}

export default Inventory;
