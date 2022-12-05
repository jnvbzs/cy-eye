module.exports = (componentFileName) => {
  const componentName = componentFileName.replace(/.component.html/, "");

  const componentNameArray = componentName.split("");

  const unexpectedChars = ["-"];

  componentNameArray.forEach((char) => {
    if (unexpectedChars.find((unexpectedChar) => unexpectedChar === char)) {
      const unexpectedCharIndex = componentNameArray.indexOf(char);

      componentNameArray[unexpectedCharIndex + 1] =
        componentNameArray[unexpectedCharIndex + 1].toUpperCase();

      componentNameArray.splice(unexpectedCharIndex, 1);
    }
  });

  return componentNameArray.join("");
};
