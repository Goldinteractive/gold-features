# TouchHover

Using 100vh to create intro visuals is a rather common use case. Unfortunately it does not work as expected on mobile devices (iOS Safari & Android Chrome), because it does not remove the height of the address bar.

This feature calculates the height of the address bar and provides it as a CSS Custom Property - the offset.

Install the feature and create an instance.
`features.add('vh-offset', VhOffset);` is the right setup for most use cases.

> in case you want the vh to update on scrolling you must set `watchResize` to true. It's also possible to use multiple instances on one site.

Initialize the feature on `body` tag: `data-feature="vh-offset"`.

Remember to set an initial value for the Custom Property in your CSS:

```
:root {
  --vh-offset: 0px;
}
```

Then you can use the offset as part of any calculation:

```
.vh100-element {
  /* This is required for IE11 */
  height: 100vh;
  /* Subtract the offset of the address bar from the initial containing block (ICB) */
  height: calc(100vh - var(--vh-offset));
}
```

> Custom Properties do not work in IE11 - but fortunately there are no mobile devices using IE11, hence the issue does not exist in environments using IE11.
