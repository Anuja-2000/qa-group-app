import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Inventory from "../../Pages/InventoryPage/InventoryPage.cy";
import Login from "../../Pages/LoginPage/LoginPage.cy";

const inventory = new Inventory();
const addedItems = [{
    name: "Sauce Labs Bike Light",
    description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    price: "$9.99"
  },
  {
    name: "Sauce Labs Fleece Jacket",
    description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
    price: "$49.99"
  },
  {
    name: "Sauce Labs Onesie",
    description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
    price: "$7.99"
  },
  {
    name: "Test.allTheThings() T-Shirt (Red)",
    description: "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.",
    price: "$15.99"
  }];

Given("the user is logged into the application with username {string} and password {string}", () => {
    Login.enterURL();
    Login.enterUserNamePassword("problem_user", "secret_sauce");
    Login.clickSubmitButton();
  });

Given("the user add items to cart", () => {
    inventory.addItemToCart("Sauce Labs Bike Light");
    inventory.addItemToCart("Sauce Labs Fleece Jacket");
    inventory.addItemToCart("Sauce Labs Onesie");
    inventory.addItemToCart("Test.allTheThings() T-Shirt (Red)");
  });

When("the user navigate to view cart page", () => {
    inventory.viewCart();
  });

Then("each item's details should be matched with added items", () => {
    inventory.verifyItemsInCart(["Sauce Labs Bike Light", "Sauce Labs Fleece Jacket", "Sauce Labs Onesie", "Test.allTheThings() T-Shirt (Red)"]);
    inventory.verifyCartItemCount(4);
    inventory.verifyCartItemDetails(addedItems);
  });

Then("page components should be displayed correctly", () => {
    inventory.verifyCartPageComponents();
  });