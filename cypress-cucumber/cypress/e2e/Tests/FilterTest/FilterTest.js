import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import pricing from "../../Pages/PricePage/PricePage";
import login from "../../Pages/LoginPage/LoginPage.cy";
const pricing = new Pricing();

Given('I am logged into the application', () => {
    login.enterURL();
    login.enterUserNamePassword('standard_user', 'secret_sauce');
    login.clickSubmitButton();
});

Given('I am on the products page', () => {
    pricing.visitPricingPage();
});

When('I add the {string} to the cart', (option) => {
    pricing.selectParallelTest(option);
});


