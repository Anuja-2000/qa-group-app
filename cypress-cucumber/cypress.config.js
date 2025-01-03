const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
module.exports = defineConfig({
  projectId: "p4kqj4",
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
    baseUrl: "https://www.saucedemo.com/",
    baseUrlAPI: "http://localhost:7081",
  },
  chromeWebSecurity: false,
});