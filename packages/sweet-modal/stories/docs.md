# Sweet Modal

The modal uses `sweetalert2` under the hood. Check out the docs for more information.
Modals must define a modal-identifier either as data-attribute or feature option.

## Open / Close
The Modal can be opened and closed with events such as `identifier:open` / `identifier:close`. It also has a click-listener to open it. For example use it on a button.

## Content

- Use a `data-video-url` attribute on the feature node to quickly include an video iframe.
- Set the `htmlContentSelector` option to include the content of an element.
- Set the `endpoint` option to get the data from an ajax endpoint.

## More options

If you like to configure the `sweetalert2` object, just add the options from the docs to the `swalConfig` object option.

> Make sure to import the stylesheet for the fade animation!
