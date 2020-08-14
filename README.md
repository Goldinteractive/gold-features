# Gold Features

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Maintainability](https://api.codeclimate.com/v1/badges/8f4526e6a5de3ce98e2e/maintainability)](https://codeclimate.com/github/Goldinteractive/gold-features/maintainability)

This project contains all base features. For a user-friendly view of all Gold Features check out the catalog in our documentation: <https://goldinteractive.github.io/gold-features/>.

## Use A Feature

> The name of the feature is always using [`kebab-case`](http://wiki.c2.com/?KebabCase). So for RevealTrigger the corresponding name would be `feature-reveal-trigger`.

include the `@goldinteractive/src/style` in your `.scss file`.

- **Sackmesser** `make feature-install-sample`
- **Plain Old Javascript** `yarn add @goldinteractive/feature-sample` (Make sure to copy the assets folder into your project)

## Maintenance

### Setup your machine

Login to npm using `npm adduser` (Make sure to have access rights to npm registry `@goldinteractive` organization).

Run `yarn lerna:exec yarn install --frozen-lockfile` to install all dependencies of all projects.

Run `yarn install --frozen-lockfile` to install dependencies for `gold-features` maintentance.

> Now you are ready to start working on Gold Features.

### How to do basic feature maintenance

#### Start Docs Watch Mode

`yarn docs:watch` -- watches for project changes and updates the docs.

> The port is fixed because `cypress.json` does require the baseUrl.

#### Start Integration Tests

`yarn test:interactive` - launches Cypress Test Runner

Do your changes and check them using the docs page and Cypress.

### Commit changes

> Make sure to run `yarn test` before commiting to ensure no tests were broken.

If you changed something feature specific use the Feature Name as a prefix for your commit.

#### Commit Template:

```
RevealTrigger: Did something

More detailed comment about commit
```

### Publish changes

> If you only changed the docs there is no need to publish a new feature version.

Run `yarn lerna:updated` to make sure you did not change anything by accident.
This will check whether a new package is required.

> Make sure that only your changed project pops up.

#### Feature Changes

Then using `yarn lerna:publish` you can publish the changed packages to the npm registry.

> Do a prerelease before publishing a new version!
> Make sure to push the tags with `git push --tags`

When a prerelease has been properly tested, you can publish the package using:

`yarn lerna publish --force-publish @goldinteractive/feature-sample`

> This command does not perform a rebuild! Therefore it must only be used when a prerelease has been published previously.

#### Docs Changes

After updating the docs simply publish them using the `yarn docs:publish` command.

### List of specific Lerna Commands

We use `lerna` to orchestrate the build and publish process.

`yarn lerna:build` build all projects

`yarn lerna:updated` lists all packages which must be published. Note that `updated` fails if there is no package which needs to be updated. Lerna will not pick up unchanged packages.

`yarn lerna:publish` build all packages, then checks for changed packages (comparing to last tag). Prompts for each package before release (_Note_ that it will only commit package.json. Therefore all other changes must be commited beforehand)

`yarn lerna:exec command` execute a command in all packages. To remove a package, run: `yarn lerna:exec yarn remove some-dependency`. This is useful in order to update the `js-base` peer-dependency across all packages. (`yarn lerna:exec yarn add @goldinteractive/js-base@latest --tilde --peer`)

> For testing lerna there is a `demo` feature. Note that it must be unpublished manually after performing tests!

### How to create a new Gold Feature

There is a bootstrap script in place to ease the creation of new features.

`yarn create:feature --name sample` will create a new feature and set up the base file structure (replace `sample` with the feature name, e.g. for `feature-modal` use `modal`).

Each feature manages its own local dependencies, make sure to install them in the proper scope ([dev !== peer](https://docs.npmjs.com/files/package.json#peerdependencies)).

Refer to the maintenance guide to start working on the feature.

### How does the documentation work?

The docs are generated using Storybook (https://storybook.js.org/).

Generate it using `yarn docs` in the root directory.

#### Technical notices

Due to the storybook webpack configuration currently JSON files can't be inline loaded in feature code.
