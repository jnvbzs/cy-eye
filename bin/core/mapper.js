const {
  HTML_TAGS_REGEX,
  LOCATOR_TAG_PROP_REGEX,
  DATA_CY_TAG_PROP_REGEX,
} = require("../utils/constants");
const chalk = require("chalk");

function mapCypressTags(fileName, htmlContent) {
  const jsonLocator = {};

  const tags = htmlContent.match(HTML_TAGS_REGEX);

  if (!tags)
    console.log(chalk.red(`No tags detected in ${fileName} html file`));
  else {
    tags.forEach((tag) => {
      const tagLocator = tag.match(LOCATOR_TAG_PROP_REGEX);
      const tagDataCy = tag.match(DATA_CY_TAG_PROP_REGEX);
      const firstDataCyIndex = 0;

      if (tagDataCy) {
        const tagDataCySelector = `[${tagDataCy[firstDataCyIndex]}]`;

        if (tagLocator) {
          const locatorName = tagLocator[firstDataCyIndex]
            .replace('data-locator="', "")
            .replace('"', "'")
            .replace("'", "");

          jsonLocator[locatorName] = tagDataCySelector
            .replace('"', "'")
            .replace('"', "'");
        } else {
          const locatorName = tagDataCy[firstDataCyIndex]
            .replace('data-test="', "")
            .replace('"', "'")
            .replace("'", "");

          jsonLocator[locatorName] = tagDataCySelector
            .replace('"', "'")
            .replace('"', "'");
        }
      }
    });
  }

  return jsonLocator;
}

module.exports = mapCypressTags;
