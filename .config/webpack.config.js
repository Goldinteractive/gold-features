const paths = require('./paths');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': isDev ? '"development"' : '"production"'
  })
];

if (!isDev) {
  plugins = plugins.concat(
    new UglifyJsPlugin({
      sourceMap: true
    })
  );
}

module.exports = {
  entry: paths.app.indexJs,
  externals: [ 
    (context, request, callback) => {
      if (/^gi-.+$/.test(request)){
        // TODO generate define name based on required package...
        return callback(null, request)
      }
      callback();
    }
  ],
  output: {
    path: paths.app.entry,
    filename: paths.names.lib + '/main.min.js',
    library: paths.names.libName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
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
              ['env', {
                targets: {
                  browsers: [
                    'Explorer 11'
                  ]
                }
              }]
            ]
          }
        }
      }
    ]
  },
  plugins
}