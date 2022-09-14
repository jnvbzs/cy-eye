module.exports = `
const my_locator = require("./locators");
//require createContent and createDetailedLocator
//require saveDetailsWith

const contents = [
createContent("sampleFeature", {
    /*
    sampleComponent: my_locator.sampleComponent
    */
}),
];

const detailedLocator = createDetailedLocator("sample context", contents);

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
`;
