<div align="center">

<img src="./public/lib-banner.png">

Cli to map with context and functionallity an pre mapped html file to test with cypress.

</div>

## Install

## Usage

In root of your project run cy-eye command with the path to observe and map html files:

```
$ cy-eye <path_to_observe_html_file>
```

Then in the root of your project will be created a directory with your locator

```
cy-eye-locators
    |___<observed_file_name>.json
```

Example:

Observing this html file:

```html
<!-- add button has locator name -->
<button data-test="addButton" data-locator="addButtonLocator"/>

<!-- remove button has no locator name -->
<button data-test="removeButton"/>
```

The html locator json file shoud be like this:

```
{
    "addButtonLocator": "data-test='addButton'",
    "removeButton": "data-test='removeButton'"
}
```

_a locator file is create only if the html file has some data-test by default, but you can configure witch cy data or locator selector will be observed in_ [customize](https://github.com/JeanMenezees/cy-eye#customize)

## Using context

To contextualize your json mapped tags you can pass one context to command line

```
$ cy-eye <path_to_observe_html_files> --context='my-context'
```

Then will be created an specifc and contextual dir inside the cy-eye main dir

```
cy-eye-locators
    |___my-context
            |___locator.json
```

## Customize

🚧 in progress...

## Contributing

|                                                            |              |                            |
| ---------------------------------------------------------- | ------------ | -------------------------- |
| <img src="https://github.com/JeanMenezees.png" width="48"> | Jean Menezes | jeanvbonimenezes@gmail.com |
