
const my_locator = require("./locators");
//require createContent and createDetailedLocator
const { createContent, createDetailedLocator } = require("../../../lib/createDetails");
//require saveDetailsWith
const { saveDetailsWith } = require("../../../bin/commands/detail");

const contents = [
createContent("updateFeature", {
    updateButton: my_locator.updateButton,
    feedback: my_locator.feedbackUpdate
}),
];

const detailedLocator = createDetailedLocator("component2Context", contents);

// Returns
/*
const content = {
    context = "sampleContext",
        sampleFeature: {
            sampleComponent: "[data-test='sampleComponent']"
        }
    }
*/

saveDetailsWith(detailedLocator);
