# PageTransition

> Important Notice: This feature must be rewritten before using in a new project. **You must not use this feature**. Why? Because barba v1 is no longer maintained and does not fix outstanding bugs. Potential replacement: [swup](https://github.com/gmrchk/swup) or [barba v2](https://barba.js.org/docs/v2/user/).

Note that one feature instance can use multiple different transitions. Implement `getTransition` to define your custom transition selection behavior.

In order to implement your own Transition have a look at the example Fade Transition. You must **extend the Base Transition** because it handles the destroy event for the old container.

```src:../src/transitions/fade.js

```

In comparison to other features Barba is not restricted to the registered node. It will automatically handle all links on the page - even those outside of its root node. Therefore you should only have one instance of this feature at any given point in time.

The dom structure is rather simple:

```
<body>
  // links here will be handled as well
  <Wrapper>
    // here you shouldn't include any custom markup besides of the container
    <Container>
      // Your Content
    </Container>
  </Wrapper>
</body>
```

This example uses page transition.
