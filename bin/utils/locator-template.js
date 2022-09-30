module.exports = (component, locators) => `
const ${component} = ${JSON.stringify(locators)}
        
export default ${component};
`;
