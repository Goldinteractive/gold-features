# Autocomplete

This feature uses an other autocomplete implementation under the hood, check out the [docs](https://github.com/kraaden/autocomplete).
It is required to define an input element to search for the options.

## Content

Set either the `useEndpoint` or `useValueList` option to true.

- Endpoint: set the data-attribute "action-url" with your endpoint.
- ValueList: set the data-attribute value-list with the values comma-separated.

## More Options

If you like to configure the `autocomplete` object, just add the options from the docs to the `autocompleteConfig` object option.
