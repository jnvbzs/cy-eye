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

  tags.forEach((tag) => {
    const tagLocator = tag.match(LOCATOR_TAG_PROP_REGEX);
    const tagDataCy = tag.match(DATA_CY_TAG_PROP_REGEX);

    if (tagDataCy) {
      if (tagLocator) {
        const locatorName = tagLocator[0]
          .replace('data-locator="', "")
          .replace('"', "'")
          .replace("'", "");

        jsonLocator[locatorName] = tagDataCy[0]
          .replace('"', "'")
          .replace('"', "'");
      } else {
        const locatorName = tagDataCy[0]
          .replace('data-test="', "")
          .replace('"', "'")
          .replace("'", "");

        jsonLocator[locatorName] = tagDataCy[0]
          .replace('"', "'")
          .replace('"', "'");
      }
    }
  });

  return jsonLocator;
}

module.exports = mapCypressTags;
