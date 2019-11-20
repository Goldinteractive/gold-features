# Cookie Handler

You can use the Cookie Handler for any element you want to active, when the cookie is not set yet.
This is just a sample.

## Setup

If the cookie is not set yet, the event `${cookieIdentifier}:activate` is triggered instantly.
Deactivate your element by triggering the event: `${cookieIdentifier}:deactivate` and the cookie will be set. For example through a button.

- Use `data-cookie-identifier` to specify the name of your element or if you want to use a default name, you can set the option _cookieIdentifier_. You have to do at least one of them.
- If you want to delay the apperance of your element, you can set the option _delayPopup_ to a number of milliseconds.
- If you want to trigger through an event when your element is activated, you can set the option _enableEventListener_ to true. Then you can use the event: `${cookieIdentifier}:register` to activate your element. (Then the event `${cookieIdentifier}:activate` gets triggered.)
