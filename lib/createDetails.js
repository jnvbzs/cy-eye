function createDetailedLocator(context, contents) {
  const locator = {};

  locator["context"] = context;

  contents.forEach((content) => {
    locator[content.name] = content.content;
  });

  return locator;
}

function createContent(name, content) {
  return { name, content };
}

module.exports = {
    createDetailedLocator,
    createContent
}