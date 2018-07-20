/*
 * Script for dev watch build
 */
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require('../.config/webpack');
const config = require('../.config/webpack.config');

webpack.run(config());
