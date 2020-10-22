# Sweet Modal

The modal uses `sweetalert2` under the hood. Check out the docs for more information.
Modals must define a modal-identifier either as data-attribute or feature option.

## Open / Close

The Modal can be opened and closed with events such as `identifier:open` / `identifier:close`. It also has a click-listener to open it. For example use it on a button. It can also be loaded on page load without a trigger, set the option `openOnLoad` to true.

## Content

There are three default strategies to load the html data for the modal:

- Video: Set the `video-url` data attribute on the modal node
- HtmlTemplate: Init the strategy with an content selector
- Endpoint: Init the strategy with an endpoint url

You can also use your own strategy. Create a class and implement the `getData(callback)` function. Get your html code and call the callback with the html as a parameter.

## More options

If you like to configure the `sweetalert2` object, just add the options from the docs to the `swalConfig` object option.

> Make sure to import the stylesheet for the fade animation!
