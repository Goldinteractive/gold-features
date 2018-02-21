/*
 * Script for dev watch build
 */
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const parallel = require('run-parallel');

const webpack = require('../.config/webpack');
const config = require('../.config/webpack.config');
const sass = require('../.config/sass');

parallel([
  () => {
    // build js
    webpack.run(config);
  },
  () => {
    // build css
    sass.run();
  }
]);
