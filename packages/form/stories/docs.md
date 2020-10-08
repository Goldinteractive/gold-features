# Form

This demo uses the new **Gold Form Server**. Please note that for the old implementation (without Goldform) you can use 0.0.x versions.

In order to use a **Gold Form** follow these steps:

- Login to the [Admin UI](https://form.goldinteractive.ch)
- Create a new project and configure the SMTP Settings
- Make sure to use straightforward handles
- Create the HTML Markup.
- Set the proper names based on the configured handles. For the handle `salutation` the name attribute of the input element must be `fields[salutation].`
- Install the Form Feature (`yarn add @goldinteractive/feature-form` or `make feature-install-form`)
- init the Form in your js: `features.add('form', Form)` (don't forget `import Form from '@goldinteractive/feature-form'`)
- Use `data-feature="form"` and `class="ft-form"` on a container element.
- Create `<div data-feedback class="form-feedback"></div>` in the container.
- Set **Post Endpoint** (https://form.goldinteractive.ch/be/api/v1/p/form/post/FORMID) as action for the `<form>`tag
- Make sure you set the `language` input properly (See example). This is required for localized validation messages.

> Note that the feature enables you to set a csrf token endpoint. For the default Gold Form this endpoint **is not** required.

As of version 1.1.0 a message placeholder can be defined to be more independent in markup/styling.
Form success/error events now also allow you to access the form instance.
