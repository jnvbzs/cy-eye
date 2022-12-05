<div align="center">

# cy-eye

node CLI to group and contextualize your [cypress](https://www.cypress.io/) data tags in [angular](https://angular.io/) projects
</div>

# Purpose

Simple way to create locator objects that contains cypress tags

# Dependencies

- [Nodejs](https://nodejs.org/en/)

# Usage

```
$ npm install cy-eye
```

or

```
$ yarn install cy-eye
```

Create cy-eye.json.config in project root dir

```js
{
    locatorsDir: "./locators",
    tagToLocate: "data-cy"
}
```

Where:

_locatorsDir_ - where locators will be

_tagToLocate_ - tag you are looking for

- _data-cy_ is the default target tag

<br>

To generate locators run:

```
$ cy-eye locate <component_path>
```

Then checkout **locatorsDir**, that will be with this structure:

```
project
└───locators
│   └───componentName
│             locator.js
```
