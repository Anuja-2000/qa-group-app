const baseUrl = Cypress.config("baseUrl");

class Inventory {
  visitCheckoutYourInformationPage() {
    cy.url().should("eq", baseUrl + "inventory.html");
  }

  addItemToCart(itemName) {
    cy.contains(".inventory_item", itemName)
      .find('button[data-test^="add-to-cart"]')
      .click();
  }

  removeItemFromCart(itemName) {
    cy.contains(".cart_item", itemName)
      .find('button[data-test^="remove"]')
      .click();
  }

  viewCart() {
    cy.get(".shopping_cart_link").click();
  }

  verifyItemsInCart(itemNames) {
    const items = Array.isArray(itemNames) ? itemNames : [itemNames];
    cy.get(".cart_item").should("have.length", items.length);
    items.forEach((itemName) => {
      cy.get(".cart_item").should("contain", itemName);
    });
  }

  verifyCartItemCount(expectedCount) {
    cy.get(".shopping_cart_badge").should("have.text", String(expectedCount));
  }

  selectFilterOption(sortOption) {
    cy.get(".product_sort_container").select(sortOption);
  }

  sortByName() {
    cy.get(".inventory_item_name").then(($items) => {
      const names = $items.map((_, el) => Cypress.$(el).text()).get();
      const sortedNames = [...names].sort();
      expect(names).to.deep.equal(sortedNames);
    });
  }

  sortByPrice() {
    cy.get(".inventory_item_price").then(($prices) => {
      const prices = $prices
        .map((_, el) => parseFloat(Cypress.$(el).text()))
        .get();
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });
  }
}

export default Inventory;
