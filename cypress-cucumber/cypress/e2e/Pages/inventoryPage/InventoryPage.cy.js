const baseUrl = Cypress.config("baseUrl");

class Inventory {
    visitProductsPage() {
      cy.url().should('eq',baseUrl+'inventory.html');
    }

    visitProductPageFailAttempt() {
            cy.visit(baseUrl+'inventory.html', { failOnStatusCode: false });
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

    verifyCartEmpty() {
        cy.get('.cart_item').should('not.exist');
    }

    verifyItemsInCart(itemNames) {

        const items = Array.isArray(itemNames) ? itemNames : [itemNames];
      
        cy.get('.cart_item').should('have.length', items.length);
      
        items.forEach((itemName) => {
          cy.get('.cart_item').should('contain', itemName);
        });
      }

  verifyCartItemDetails(itemList) {
        cy.get('.cart_item').each(($cartItem, index) => {
          const item = itemList[index];
          cy.wrap($cartItem).should('contain', item.name);
          cy.wrap($cartItem).should('contain', item.description);
          cy.wrap($cartItem).should('contain', item.price);
          cy.wrap($cartItem).find('.cart_button').should('have.text', 'Remove');
        });
  }

  verifyCartPageComponents() {
    cy.get('[data-test="secondary-header"]').should('have.text', 'Your Cart');
    cy.get('[data-test="cart-quantity-label"]').should('have.text', 'QTY');
    cy.get('[data-test="cart-desc-label"]').should('have.text', 'Description');
    cy.get('[data-test="continue-shopping"]').should('have.text', 'Continue Shopping');
    cy.get('[data-test="checkout"]').should('have.text', 'Checkout');
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
