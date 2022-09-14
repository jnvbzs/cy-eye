
const my_locator = require("./locators");
//require createContent and createDetailedLocator
const { createContent, createDetailedLocator } = require("../../../lib/createDetails");
//require saveDetailsWith
const { saveDetailsWith } = require("../../../bin/commands/detail");

const contents = [
createContent("addFeature", {
    addButton: my_locator.addButton,
    addedCard: my_locator.addedCard
}),
createContent("removeFeature", {
    removeButton: my_locator.removeButton,
    removedCard: my_locator.removedCard
}) 
];

const detailedLocator = createDetailedLocator("component1Context", contents);

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
