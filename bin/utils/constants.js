const HTML_TAGS_REGEX = /<[^/](.*>)\/?/g;
const DATA_CY_TAG_PROP_REGEX = /data-test="(.*?)"/g;
const LOCATOR_TAG_PROP_REGEX = /data-locator="(.*?)"/g;

module.exports = {
  HTML_TAGS_REGEX,
  DATA_CY_TAG_PROP_REGEX,
  LOCATOR_TAG_PROP_REGEX,
};
