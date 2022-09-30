module.exports = (componentName) => `
import ${componentName} from './locator.js';
import {createContent, saveDetailsWith} from '@cy-eye/details';

const contents = [
createContent("sampleFeature", {
    /*
    sampleComponent: my_locator.sampleComponent
    */
}),
];

const detailedLocator = createDetailedLocator("sampleContext", contents);

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
