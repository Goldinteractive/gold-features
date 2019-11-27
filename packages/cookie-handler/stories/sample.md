# Cookie Handler

You can use the Cookie Handler for any action you want to trigger, when a cookie is not set yet.

## Use Cases

These are only some examples.

- Cookie Disclaimer (This feature also provides base layouting for this case)
- Teasers
- Promotions
- Tutorials

## Setup

If the cookie is not set yet, the event `${cookieIdentifier}:activate` is triggered instantly.
Deactivate the element by triggering the event: `${cookieIdentifier}:deactivate` and the cookie will be set. This can happen for example through a button - or also instantly after activation.

- Use `data-cookie-identifier` to specify the name of your element or if you want to use a default name, you can set the option _cookieIdentifier_. You have to do at least one of them.
- If you want to delay the appearance of your element, you can set the option _delayPopup_ to a number of milliseconds.
- If you want to trigger the activation of your element through an event, set the option _enableEventListener_ to true. This enables you to trigger the event: `${cookieIdentifier}:register` to activate your element (The event `${cookieIdentifier}:activate` gets triggered anyway). This can come in handy when the triggering shall be handled by a `Reveal Triggered Element` for example.
