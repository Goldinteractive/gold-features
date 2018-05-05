const paths = require('./paths')
const webpack = require('webpack')

const mode = process.env.NODE_ENV
const isDev = mode === 'development'

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': isDev ? '"development"' : '"production"'
  })
]

module.exports = {
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
  watch: isDev ? true : false,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  targets: {
                    browsers: ['Explorer 11']
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins
}
