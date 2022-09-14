<div align="center">

![banner](./public/banner.png)

node CLI to group and contextualize your [cypress](https://www.cypress.io/) data tags

</div>

# Usage

```
$ npm install cy-eye
```

Create cy-eye.json.config in your project

```js
{
    basePath: "./locators",
    tagToLocate: "data-cy"
}
```
To generate simple locators in your basePath run:

```
$ cy-eye locate <component_path> <component_name>
```

Locating component tags will create:

- locator js file (with all simple locators)
- customize locators file (to allow you to contextualize and [detail](https://github.com/JeanMenezees/cy-eye#Detailing) your component locator)

# Detailing

## Using details API

In locator.customize.js file you will be able to use:

- createContent: used to create a content to one context
- createDetailedLocator: create one locator js file with context and contents
- saveDetailsWith: save a detailed locator

To detail locators by specific group and functionallity run:

```
$ cy-eye detail
```
