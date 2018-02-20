## Gold Features

This project contains all base features. Check out the examples in our doc: https://goldinteractive.github.io/gold-features/.

### How To Use A Feature
`yarn add @goldinteractive/feature-sample`

Make sure to copy the assets folder into your project.

### How to work with gold features

We use lerna to orchestrate the build and publish process.

`yarn build` build all projects

`yarn lerna updated` lists all packages which must be published

`yarn lerna publish` publish changed projects (only commits package.json!)

`yarn lerna publish --force-publish` publish all projects (required if core change has been performed)