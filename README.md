<div align="center">

# cy-eye

node CLI to group and contextualize your [cypress](https://www.cypress.io/) data tags in [angular](https://angular.io/) projects

</div>

# Purpose

Simple way to create locator objects that contains cypress tags

**To**

Centralize cypress tags

# Usage

```
$ npm install cy-eye
```

Create cy-eye.json.config in project root dir

```js
{
    locatorsDir: "./locators",
    tagToLocate: "data-cy"
}
```

**\*data-test** is the default target tag\*

To generate locators in basePath run:

```
$ cy-eye locate <component_path>
```

Then checkout **basePath**, that will be with this structure:

```
project
└───locators
│   └───componentName
│             locator.js
```
