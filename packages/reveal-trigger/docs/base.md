---
name: At first
category: RevealTrigger
---

This feature helps triggering things when dom elements are revealed.

There are currently two strategies available:
- **CSS Animation Strategy** can be used to toggle a CSS class
- **Lazy Image Strategy** can render images lazily

Each Feature instance requires a **manager** and a **strategy**.

The **manager** is responsible for managing the visibility of the nodes. It will trigger events when visibility changes. Technically it's implemented using the Intersection Observer API.
You can use a `data-trigger` element in order to set the triggering element yourself (See examples of CSS Animation).

The **strategy** on the other hand handles the visibility change actions. It actually performs the actions on the node.
In order to implement your own strategy you must implement the following contract:

```js
class CustomStrategy {
  register(node, manager) {
    // the callback will be executed when the manager encounters the configured visibility states
    manager.register(node, anyCallbackYouWant)
  }
}
```

This features does not load the `intersection-observer` polyfill. If this is required (for IE11 & Safari), you must do so yourself.

Inspect Sources:

Base Feature
```src:../src/index.js
```
Intersection Manager
```manager:../src/intersection-manager.js
```
```src:../src/style.scss
```
```types:../lib/style.css
```
