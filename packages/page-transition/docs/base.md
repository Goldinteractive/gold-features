---
name: PageTransition
category: PageTransition
---

> Important Notice: This feature must be rewritten before using in a new project. **You must not use this feature**. Why? Because barba is no longer maintained and does not fix outstanding bugs. Potential replacement: [swup](https://github.com/gmrchk/swup).

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

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-page-transition', path: 'packages/page-transition/lib/main.min.js' }, 'base', 'base.features'], function(PageTransition, base, features) {
    features.add('page-transition', PageTransition.default);
    features.init(document.body);
  });
});
```
```types.html
<p>Not replaced content</p>
<div data-feature="page-transition" id="page-transition-wrapper" class="ft-page-transition">
  <!-- Note that you should not include other content here, because this is where Barba acts -->
  <div class="page-transition-container">
    Test
    <a href="page-transition-destination.html" class="smooth-transition">
      Test
    </a>
  </div>
</div>
```

This example *does not* use page transitions.

```destination.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-page-transition', path: 'packages/page-transition/lib/main.min.js' }, 'base', 'base.features'], function(PageTransition, base, features) {
    features.add('page-transition', PageTransition.default);
    features.init(document.body);
  });
});
```
```destination.html
<div data-feature="page-transition" id="page-transition-wrapper" class="ft-page-transition">
  <div class="page-transition-container">
    <a href="page-transition-types.html">
      Full Page reload back to entry
    </a>
  </div>
</div>
```

Inspect Sources:
```src:../src/index.js
```
```src:../src/style.scss
```
```types:../lib/style.css hidden
```
