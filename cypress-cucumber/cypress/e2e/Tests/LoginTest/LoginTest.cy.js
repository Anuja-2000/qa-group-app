/// <reference types="cypress" />
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import login from "../../Pages/LoginPage/LoginPage.cy";
Given("User navigate to the Website", () => {
login.enterURL();
});
When("User entered username {string} and password {string}", (username,password) => {
login.enterLockedUserNamePassword(username,password);
});
And("User click on sign in button", () => {
    login.clickSubmitButton();
});
Then("Error message {string} is displayed.", (errorMessage) => {
    login.verifyLockedUserErrorMessage(errorMessage);
});

When("User entered username {string} and password {string}", (username,password) => {
    login.enterUserNamePassword(username,password);
});
And("User click on sign in button", () => {
    login.clickSubmitButton();
});
Then("Validate the title after login", () => {
    login.verifyPageTitle();
});