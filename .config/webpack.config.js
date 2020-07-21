const paths = require('./paths')
const webpack = require('webpack')

const IgnoreAssetsWebpackPlugin = require('@goldinteractive/ignore-assets-webpack-plugin')

const mode = process.env.NODE_ENV
const isDev = mode === 'development'

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': isDev ? '"development"' : '"production"'
  })
]

const sassLoader = {
  loader: 'sass-loader',
  options: {
    includePaths: [paths.app.entry, 'node_modules']
  }
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: paths.config.postcss
    }
  }
}

const imageLoader = ({ isDev }) => ({
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
        outputPath: paths.names.lib + '/files/'
      }
    }
  ]
})

module.exports = () => {
  return [
    {
      entry: paths.app.indexJs,
      externals: [
        (context, request, callback) => {
          // match any gi-* or @goldinteractive/* repo
          if (/^(gi-|@goldinteractive\/).+$/.test(request)) {
            const libName = /^(gi-|@goldinteractive\/)(.+)$/.exec(request)[2]
            return callback(null, libName)
          }
          callback()
        }
      ],
      output: {
        path: paths.app.entry,
        filename: paths.names.lib + paths.names.outputName,
        library: paths.names.libName,
        libraryTarget: 'umd',
        umdNamedDefine: true
      },
      mode,
      watch: isDev,
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', { modules: false }]],
                plugins: [
                  [
                    '@babel/plugin-proposal-decorators',
                    { decoratorsBeforeExport: true }
                  ],
                  '@babel/plugin-proposal-class-properties',
                  '@babel/plugin-proposal-optional-chaining',
                  '@babel/plugin-proposal-nullish-coalescing-operator'
                ]
              }
            }
          }
        ]
      },
      plugins
    },
    {
      watch: isDev,
      entry: paths.app.indexCss,
      resolve: {
        modules: [paths.app.entry, 'node_modules']
      },
      output: {
        filename: '[name].js',
        path: paths.app.entry,
        filename: paths.names.lib + '/style.js'
      },
      mode,
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              'file-loader?name=lib/[name].css',
              'extract-loader',
              'css-loader',
              postcssLoader,
              sassLoader
            ]
          },
          imageLoader({ isDev })
        ]
      },
      plugins: [
        new IgnoreAssetsWebpackPlugin({
          ignore: paths.names.lib + '/style.js'
        })
      ]
    }
  ]
}
