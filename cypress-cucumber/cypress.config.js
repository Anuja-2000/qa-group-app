const { defineConfig } = require("cypress");
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin  = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run
  await addCucumberPreprocessorPlugin(on, config);

  on('file:preprocessor', createBundler({
    plugins: [createEsbuildPlugin(config)]
  }));

  // Make sure to return the config object as it might have been modified by the plugin
  return config;
}

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents,
    baseUrl: "https://www.saucedemo.com/",
    baseUrlAPI: "http://localhost:7081",
    chromeWebSecurity: false,
  },
});