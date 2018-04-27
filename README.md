## Gold Features

This project contains all base features. Check out the catalog in our doc: <https://goldinteractive.github.io/gold-features/>.

### How To Use A Feature

include the `@goldinteractive/src/style` in your `.scss file`

#### With Sackmesser

`make feature-install-sample`

#### Plain Old Javascript

`yarn add @goldinteractive/feature-sample`

Make sure to copy the assets folder into your project.

### Setup to work on Gold Features

Login to npm using `npm adduser` (Make sure to have access rights to npm registry`@goldinteractive` organization). Run `yarn lerna:exec yarn install --frozen-lockfile` to install all dependencies of all projects. Run `yarn install --frozen-lockfile`.

Now you are ready to start working on Gold Features.

### How to do basic feature maintenance

Let's assume you want to change something in `feature-xyz`.
Run `yarn watch` in `./packages/xyz`. This will automatically compile your changes.
To have them reflected in the docs run `yarn stylemark:watch` in the root directory.

Do your changes and check them using the docs page.

Once you've finished updating go to the root directory and run `yarn lerna:updated`.
This will check whether a new package is required. Make sure that only your changed project pops up.
Then using `yarn lerna:publish` you can publish the changed packages to the npm registry.

### How to work with gold features

We use lerna to orchestrate the build and publish process.

`yarn lerna:build` build all projects

`yarn lerna:updated` lists all packages which must be published. Note that `updated` fails if there is no package which needs to be updated.

`yarn lerna:publish` build all packages, then checks for changed packages (comparing to last tag). Prompts for each package before release (*Note* that it will only commit package.json. Therefore all other changes must be commited beforehand)

`yarn lerna:publish --force-publish` publish all projects (required if core change has been performed)

`yarn lerna:exec command` execute a command in all packages. To remove a package, run: `yarn lerna:exec yarn remove some-dependency`. This is useful in order to update the `js-base` peer-dependency across all packages. (`yarn lerna:exec yarn add @goldinteractive/js-base@latest --peer`)

### How to create a gold feature

There is a bootstrap script in place to ease the creation of new features.

`yarn create:feature --name sample` will create a new feature and set up the base file structure (replace `sample` with the feature name, e.g. for `feature-modal` use `modal`).

Each feature manages its own local dependencies, make sure to install them in the proper scope (dev !== peer).

Create your feature and update the docs accordingly. Make sure to update `stylemark.config.yml` to ensure that all runtime dependencies are available on the docs pages.

Run `yarn watch` in your feature folder to enable the dev mode and keep watching for changes. This is especially useful with `yarn stylemark:watch`. (Make sure to execute stylemark in the root directory - not your feature dir)

### What is this docs?

The docs are generated using stylemark (https://github.com/nextbigsoundinc/stylemark).

Generate it using `yarn stylemark` in the root directory.

It automatically scans the entire `/packages` dir for `.md` or annotated code. Based on the findings it will generate a static documentation which is being served by Github Pages (Jekyll is disabled because it ignores certain folders, e.g. `node_modules`, `_stylemark`).

`packages/docsHelper` contains scripts which must be embedded into the docs during runtime. (e.g. require.js)