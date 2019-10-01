const path = require('path')
const fs = require('fs')
const paths = require('../.config/paths')
const CopyPlugin = require('copy-webpack-plugin')

const isDirectory = source => fs.lstatSync(source).isDirectory()
const getDirectories = source =>
  fs
    .readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory)

const sassLoader = ({ includePaths, mode }) => ({
  loader: 'sass-loader',
  options: {
    data:
      mode === 'DEVELOPMENT'
        ? undefined
        : // custom path for Github Pages
          "$ft-assets: '~/gold-features/assets/';",
    includePaths: [paths.app.entry, ...includePaths]
  }
})

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: paths.config.postcss
    }
  }
}

module.exports = async ({ config, mode }) => {
  const babelLoader = config.module.rules.find(rule => '.js'.match(rule.test))
  const packageDirectories = getDirectories('./packages').map(directory =>
    path.resolve(directory)
  )
  const nodeModules = packageDirectories.map(directory =>
    path.resolve(directory, 'node_modules')
  )

  const useRule = babelLoader.use[0]
  babelLoader.exclude = [...babelLoader.exclude, ...nodeModules]
  const rule = {
    test: /\.js$/,
    include: [/@goldinteractive\/js-base/, /@goldinteractive\/feature-/],
    use: {
      ...useRule,
      options: {
        ...useRule.options,
        // prevent auto transformation
        sourceType: 'unambiguous'
      }
    }
  }
  config.module.rules.push(rule)

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      postcssLoader,
      sassLoader({ includePaths: nodeModules, mode })
    ]
  })

  config.module.rules.push({
    test: /\.json/,
    type: 'javascript/auto',
    use: ['file-loader']
  })

  config.module.rules.push({
    test: /\.stories\.js$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: {
          prettierConfig: {
            semi: false,
            singleQuote: true
          }
        }
      }
    ],
    enforce: 'pre'
  })

  const features = packageDirectories.map(name => path.basename(name))

  // Copy static feature assets to out directory
  config.plugins.push(
    new CopyPlugin(
      features.map(feature => ({
        from: `packages/${feature}/assets/features/${feature}`,
        to: `assets/features/${feature}`
      }))
    )
  )

  return config
}
