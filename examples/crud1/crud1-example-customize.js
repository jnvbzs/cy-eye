const locators = require("../locators/crud1/locators.json");
const { eye, createContent, saveSnippet } = require("../../lib/eye");

const contents = [
  createContent("removeFeature", {
    removeButton: locators.removeButton,
    removedRedCard: locators.removedCard,
  }),
  createContent("addFeature", {
    addButton: locators.addButton,
    addedGreenCard: locators.addedCard,
  }),
];

const locator = eye("crud1", contents);

saveSnippet(locator);
