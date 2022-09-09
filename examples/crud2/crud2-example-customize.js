const locators = require("../locators/crud2/locators.json");
const { eye, createContent, saveSnippet } = require("../../lib/eye");

const contents = [
  createContent("updateFeature", {
    updateButton: locators.updateButton,
    feedback: locators.feedbackUpdate,
  }),
];

const locator = eye("crud2", contents);

saveSnippet(locator);
